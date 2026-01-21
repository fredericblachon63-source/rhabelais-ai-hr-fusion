import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Database, Workflow, Layers, Calendar, Users, FileText, BarChart3, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const automationExamples = [
  {
    tool: "Notion",
    color: "bg-primary",
    examples: [
      {
        icon: Users,
        title: "Base de données collaborateurs",
        description: "Centralisation des informations collaborateurs avec vues personnalisées par équipe, département ou statut.",
      },
      {
        icon: FileText,
        title: "Onboarding automatisé",
        description: "Checklist d'intégration interactives, suivi des étapes et notifications automatiques aux managers.",
      },
      {
        icon: Calendar,
        title: "Suivi des entretiens annuels",
        description: "Planification, rappels automatiques et archivage des compte-rendus dans une base centralisée.",
      },
    ],
  },
  {
    tool: "Airtable",
    color: "bg-secondary",
    examples: [
      {
        icon: Users,
        title: "ATS personnalisé",
        description: "Suivi des candidatures du sourcing à l'embauche, avec pipeline visuel et scoring automatique.",
      },
      {
        icon: BarChart3,
        title: "Tableau de bord RH",
        description: "KPIs en temps réel : turnover, effectifs, formations suivies, avec graphiques dynamiques.",
      },
      {
        icon: Database,
        title: "Gestion des compétences",
        description: "Cartographie des skills par collaborateur, identification des gaps et plans de formation.",
      },
    ],
  },
  {
    tool: "Make (Integromat)",
    color: "bg-accent",
    examples: [
      {
        icon: Workflow,
        title: "Workflow d'onboarding",
        description: "Création automatique des comptes, envoi des documents, notifications Slack et mise à jour du SIRH.",
      },
      {
        icon: Bell,
        title: "Alertes intelligentes",
        description: "Notifications automatiques pour fin de période d'essai, anniversaires de travail, renouvellements.",
      },
      {
        icon: Layers,
        title: "Synchronisation multi-outils",
        description: "Connexion entre vos outils RH (SIRH, paie, formation) pour une donnée unifiée et à jour.",
      },
    ],
  },
];

const Automatisations = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-background to-rhabelais-cream-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Workflow size={16} />
              Exemples concrets
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              <span className="gradient-text">Automatisations</span> & Outils RH
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Découvrez des exemples concrets d'automatisations RH réalisées 
              avec Notion, Airtable et Make. Des solutions pratiques et 
              immédiatement opérationnelles.
            </p>
            
            {/* Engagement éthique */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-left">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full gradient-bg-primary flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-lg mb-2">Engagement éthique et responsable</h3>
                  <p className="text-muted-foreground text-sm">
                    <strong>Rhabelais</strong> s'engage à proposer des automatisations conformes à la législation en vigueur 
                    (<strong>RGPD</strong>, <strong>IA Act</strong>). Par exemple, aucune automatisation de tri de CV par l'IA 
                    ne sera proposée afin de garantir un processus de recrutement équitable et non-discriminatoire. 
                    Notre approche privilégie l'humain et la responsabilité dans l'usage des technologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Examples */}
      <section className="py-16 bg-rhabelais-cream-dark">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {automationExamples.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-xl ${section.color} flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">{section.tool.charAt(0)}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold">{section.tool}</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {section.examples.map((example, index) => (
                    <div key={index} className="card-elevated rounded-2xl p-6 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                      <div className={`w-12 h-12 rounded-xl ${section.color} flex items-center justify-center mb-4`}>
                        <example.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-serif text-lg font-semibold mb-2">{example.title}</h3>
                      <p className="text-muted-foreground text-sm">{example.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-center mb-12">
              Pourquoi automatiser vos <span className="gradient-text">processus RH</span> ?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full gradient-bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Gain de temps considérable</h3>
                    <p className="text-muted-foreground text-sm">
                      Éliminez les tâches répétitives et concentrez-vous sur l'humain.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full gradient-bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Réduction des erreurs</h3>
                    <p className="text-muted-foreground text-sm">
                      Des processus fiables et cohérents, sans oublis ni approximations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full gradient-bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Meilleure expérience collaborateur</h3>
                    <p className="text-muted-foreground text-sm">
                      Des réponses rapides et un accompagnement fluide à chaque étape.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full gradient-bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Données centralisées</h3>
                    <p className="text-muted-foreground text-sm">
                      Une vision 360° de vos données RH pour des décisions éclairées.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary-foreground mb-4">
            Envie d'automatiser vos processus RH ?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Je vous accompagne dans la conception et la mise en place 
            de vos automatisations sur mesure.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
            <Link to="/contact" className="flex items-center gap-2">
              Parlons de votre projet
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Automatisations;
