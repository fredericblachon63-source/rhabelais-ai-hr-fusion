import { useEffect, useRef, useState, useCallback } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: TurnstileOptions) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onTurnstileLoad?: () => void;
  }
}

interface TurnstileOptions {
  sitekey: string;
  callback: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
  language?: string;
}

const TURNSTILE_SITE_KEY = "0x4AAAAAACOavdHstqsy3_ht";

export function useTurnstile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setToken(null);
    setError(null);
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, []);

  useEffect(() => {
    // Load Turnstile script if not already loaded
    const loadScript = () => {
      if (document.getElementById("cf-turnstile-script")) {
        return;
      }
      
      const script = document.createElement("script");
      script.id = "cf-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    const renderWidget = () => {
      if (!containerRef.current || !window.turnstile) return;
      
      // Remove existing widget if any
      if (widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }

      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (newToken: string) => {
            setToken(newToken);
            setError(null);
          },
          "error-callback": () => {
            setError("Erreur de vérification CAPTCHA");
            setToken(null);
          },
          "expired-callback": () => {
            setToken(null);
          },
          theme: "light",
          language: "fr",
        });
        setIsLoading(false);
      } catch {
        setError("Impossible de charger le CAPTCHA");
        setIsLoading(false);
      }
    };

    // Set up callback for when Turnstile loads
    window.onTurnstileLoad = renderWidget;

    // If Turnstile is already loaded, render immediately
    if (window.turnstile) {
      renderWidget();
    } else {
      loadScript();
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  return {
    containerRef,
    token,
    isLoading,
    error,
    reset,
    isValid: !!token,
  };
}
