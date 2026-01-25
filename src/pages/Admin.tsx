import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  MailOpen,
  Archive,
  Trash2,
  RefreshCw,
  Building2,
  Calendar,
  ArrowLeft,
  Inbox,
  ArchiveX,
  LogOut,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link, Navigate } from "react-router-dom";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string | null;
  subject: string;
  message: string;
  created_at: string;
  read_at: string | null;
  archived_at: string | null;
}

export default function Admin() {
  const { user, isAdmin, loading: authLoading, signOut } = useAdminAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [activeTab, setActiveTab] = useState("active");
  const [total, setTotal] = useState(0);

  const fetchMessages = useCallback(async (status: string = "active") => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-messages?status=${status}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const result = await response.json();
      setMessages(result.messages || []);
      setTotal(result.total || 0);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchMessages(activeTab);
    }
  }, [activeTab, user, isAdmin, fetchMessages]);

  const handleAction = async (action: string, messageId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-message-action`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action, messageId }),
        }
      );

      if (!response.ok) {
        throw new Error("Action failed");
      }

      toast({
        title: "Succès",
        description: "Action effectuée avec succès",
      });

      fetchMessages(activeTab);
      
      if (selectedMessage?.id === messageId) {
        if (action === "delete" || action === "archive") {
          setSelectedMessage(null);
        } else {
          const updatedMessage = messages.find((m) => m.id === messageId);
          if (updatedMessage) {
            setSelectedMessage({
              ...updatedMessage,
              read_at: action === "markRead" ? new Date().toISOString() : action === "markUnread" ? null : updatedMessage.read_at,
            });
          }
        }
      }
    } catch (error) {
      console.error("Error performing action:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'effectuer l'action",
        variant: "destructive",
      });
    }
  };

  const handleSelectMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.read_at) {
      await handleAction("markRead", message.id);
    }
  };

  // Auth loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect if not authenticated or not admin
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au site
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Administration - Messages</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => fetchMessages(activeTab)}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Messages ({total})</span>
                </CardTitle>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full">
                    <TabsTrigger value="active" className="flex-1">
                      <Inbox className="h-4 w-4 mr-1" />
                      Actifs
                    </TabsTrigger>
                    <TabsTrigger value="archived" className="flex-1">
                      <Archive className="h-4 w-4 mr-1" />
                      Archives
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-4 text-center text-muted-foreground">
                    Chargement...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    Aucun message
                  </div>
                ) : (
                  <div className="divide-y max-h-[600px] overflow-y-auto">
                    {messages.map((message) => (
                      <button
                        key={message.id}
                        onClick={() => handleSelectMessage(message)}
                        className={`w-full text-left p-4 hover:bg-muted/50 transition-colors ${
                          selectedMessage?.id === message.id ? "bg-muted" : ""
                        } ${!message.read_at ? "bg-primary/5" : ""}`}
                      >
                        <div className="flex items-start gap-2">
                          {message.read_at ? (
                            <MailOpen className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                          ) : (
                            <Mail className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`font-medium truncate ${!message.read_at ? "text-foreground" : "text-muted-foreground"}`}>
                                {message.name}
                              </span>
                              {!message.read_at && (
                                <Badge variant="default" className="text-xs">
                                  Nouveau
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {message.subject}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {format(new Date(message.created_at), "dd MMM yyyy HH:mm", { locale: fr })}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{selectedMessage.subject}</CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {selectedMessage.email}
                        </span>
                        {selectedMessage.company && (
                          <span className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {selectedMessage.company}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(selectedMessage.created_at), "dd MMMM yyyy à HH:mm", { locale: fr })}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {selectedMessage.read_at ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction("markUnread", selectedMessage.id)}
                        >
                          <Mail className="h-4 w-4 mr-1" />
                          Non lu
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction("markRead", selectedMessage.id)}
                        >
                          <MailOpen className="h-4 w-4 mr-1" />
                          Lu
                        </Button>
                      )}
                      {selectedMessage.archived_at ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction("unarchive", selectedMessage.id)}
                        >
                          <ArchiveX className="h-4 w-4 mr-1" />
                          Désarchiver
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAction("archive", selectedMessage.id)}
                        >
                          <Archive className="h-4 w-4 mr-1" />
                          Archiver
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleAction("delete", selectedMessage.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="font-medium mb-2">De : {selectedMessage.name}</p>
                    <div className="whitespace-pre-wrap text-foreground">
                      {selectedMessage.message}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button asChild>
                      <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Répondre par email
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64 text-muted-foreground">
                  <div className="text-center">
                    <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Sélectionnez un message pour le lire</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
