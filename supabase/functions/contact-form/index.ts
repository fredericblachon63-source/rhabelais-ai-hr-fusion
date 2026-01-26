import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Rate limiting configuration
const RATE_LIMIT = 3; // Max requests per IP
const RATE_WINDOW = 3600000; // 1 hour in milliseconds
const rateLimitMap = new Map<string, number[]>();

// Clean up old rate limit entries periodically
function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const validTimestamps = timestamps.filter(time => now - time < RATE_WINDOW);
    if (validTimestamps.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, validTimestamps);
    }
  }
}

// Check rate limit for an IP
function checkRateLimit(clientIp: string): { allowed: boolean; remaining: number } {
  cleanupRateLimitMap();
  
  const now = Date.now();
  const requests = rateLimitMap.get(clientIp) || [];
  const recentRequests = requests.filter(time => now - time < RATE_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }
  
  recentRequests.push(now);
  rateLimitMap.set(clientIp, recentRequests);
  
  return { allowed: true, remaining: RATE_LIMIT - recentRequests.length };
}

// Verify Cloudflare Turnstile token
async function verifyTurnstileToken(token: string, clientIp: string): Promise<{ success: boolean; error?: string }> {
  const secretKey = Deno.env.get("TURNSTILE_SECRET_KEY");
  
  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    return { success: false, error: "CAPTCHA configuration error" };
  }
  
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
        remoteip: clientIp,
      }),
    });
    
    const data = await response.json();
    
    if (!data.success) {
      console.error("Turnstile verification failed:", data["error-codes"]);
      return { success: false, error: "Vérification CAPTCHA échouée" };
    }
    
    return { success: true };
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return { success: false, error: "Erreur lors de la vérification CAPTCHA" };
  }
}

// Simple validation function
function validateContactForm(data: unknown): { 
  success: boolean; 
  data?: { name: string; email: string; company: string; subject: string; message: string; turnstileToken: string }; 
  error?: string 
} {
  if (!data || typeof data !== 'object') {
    return { success: false, error: "Données invalides" };
  }
  
  const { name, email, company, subject, message, turnstileToken } = data as Record<string, unknown>;
  
  // Validate Turnstile token
  if (typeof turnstileToken !== 'string' || turnstileToken.trim().length === 0) {
    return { success: false, error: "Veuillez compléter la vérification CAPTCHA" };
  }
  
  // Validate name
  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
    return { success: false, error: "Le nom doit contenir entre 2 et 100 caractères" };
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== 'string' || !emailRegex.test(email.trim()) || email.trim().length > 255) {
    return { success: false, error: "Email invalide" };
  }
  
  // Validate company (optional)
  const companyValue = typeof company === 'string' ? company.trim() : "";
  if (companyValue.length > 100) {
    return { success: false, error: "Le nom de l'entreprise ne doit pas dépasser 100 caractères" };
  }
  
  // Validate subject
  if (typeof subject !== 'string' || subject.trim().length < 5 || subject.trim().length > 200) {
    return { success: false, error: "Le sujet doit contenir entre 5 et 200 caractères" };
  }
  
  // Validate message
  if (typeof message !== 'string' || message.trim().length < 20 || message.trim().length > 2000) {
    return { success: false, error: "Le message doit contenir entre 20 et 2000 caractères" };
  }
  
  return {
    success: true,
    data: {
      name: name.trim(),
      email: email.trim(),
      company: companyValue,
      subject: subject.trim(),
      message: message.trim(),
      turnstileToken: turnstileToken.trim(),
    }
  };
}

// HTML escape function to prevent XSS in emails
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendEmail(apiKey: string, options: {
  from: string;
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  
  if (!response.ok) {
    const errorData = await response.text();
    // Log detailed error server-side only for debugging
    console.error("Resend API error:", errorData);
    // Throw generic error - don't expose API details to client
    throw new Error("EMAIL_SEND_FAILED");
  }
  
  return response.json();
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    
    const rateLimitResult = checkRateLimit(clientIp);
    
    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Trop de requêtes. Veuillez réessayer dans une heure." 
        }),
        {
          status: 429,
          headers: { 
            "Content-Type": "application/json", 
            "Retry-After": "3600",
            ...corsHeaders 
          },
        }
      );
    }

    const body = await req.json();
    
    // Server-side validation
    const validationResult = validateContactForm(body);
    
    if (!validationResult.success || !validationResult.data) {
      return new Response(
        JSON.stringify({ success: false, error: validationResult.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    const validatedData = validationResult.data;
    
    // Verify Turnstile CAPTCHA token
    const turnstileResult = await verifyTurnstileToken(validatedData.turnstileToken, clientIp);
    
    if (!turnstileResult.success) {
      return new Response(
        JSON.stringify({ success: false, error: turnstileResult.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    // Store message in database
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (supabaseUrl && supabaseServiceKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const { error: dbError } = await supabase
          .from("contact_messages")
          .insert({
            name: validatedData.name,
            email: validatedData.email,
            company: validatedData.company || null,
            subject: validatedData.subject,
            message: validatedData.message,
          });
        
        if (dbError) {
          console.error("Database insert error:", dbError);
          // Continue with email sending even if DB insert fails
        } else {
          console.log("Message stored in database successfully");
        }
      } catch (dbErr) {
        console.error("Database connection error:", dbErr);
        // Continue with email sending even if DB fails
      }
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ success: false, error: "Une erreur de configuration est survenue. Veuillez réessayer plus tard." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    // Send confirmation email to the user (with HTML-escaped user input)
    await sendEmail(apiKey, {
      from: "RH Abelais <onboarding@resend.dev>",
      to: [validatedData.email],
      subject: "Merci pour votre message - RH Abelais",
      html: `
        <h1>Merci pour votre message, ${escapeHtml(validatedData.name)} !</h1>
        <p>Nous avons bien reçu votre demande concernant : <strong>${escapeHtml(validatedData.subject)}</strong></p>
        <p>Nous vous répondrons dans les plus brefs délais.</p>
        <br>
        <p>Cordialement,<br>L'équipe RH Abelais</p>
      `,
    });

    // Send notification email to the site owner (with HTML-escaped user input)
    await sendEmail(apiKey, {
      from: "Site Contact <onboarding@resend.dev>",
      to: ["contact@rhabelais.fr"],
      replyTo: validatedData.email,
      subject: `[Contact Form] ${escapeHtml(validatedData.subject)}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${escapeHtml(validatedData.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(validatedData.email)}</p>
        <p><strong>Entreprise:</strong> ${escapeHtml(validatedData.company || "Non spécifiée")}</p>
        <p><strong>Sujet:</strong> ${escapeHtml(validatedData.subject)}</p>
        <hr>
        <h3>Message:</h3>
        <p>${escapeHtml(validatedData.message).replace(/\n/g, "<br>")}</p>
      `,
    });

    console.log("Emails sent successfully to:", validatedData.email);

    return new Response(
      JSON.stringify({ success: true, message: "Message envoyé avec succès" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    // Log detailed error server-side only
    console.error("Error in contact-form function:", error);
    
    // Return generic error message to client - never expose internal details
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer." 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
