import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, Cpu, GraduationCap, Zap, Users, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import iconIa from "@/assets/icon-ia.png";

const aiImpacts = [
  {
    icon: Users,
    title: "Recrutement augmenté",
    description: "Tri intelligent des candidatures, matching automatisé des compétences, et préqualification par chatbot.",
  },
  {
    icon: Brain,
    title: "Gestion des compétences",
    description: "Cartographie dynamique des skills, identification des gaps et recommandations de formations personnalisées.",
  },
  {
    icon: Bot,
    title: "Assistant RH virtuel",
    description: "Réponses automatisées aux questions fréquentes des collaborateurs, 24/7.",
  },
  {
    icon: Zap,
    title: "Automatisation administrative",
    description: "Génération de documents, suivi des congés, reporting automatisé et alertes intelligentes.",
  },
];

const formations = [
  {
    title: "Introduction à l'IA pour les RH",
    duration: "1 jour",
    level: "Débutant",
    topics: ["Comprendre l'IA et ses applications", "Démystifier les outils", "Identifier les opportunités"],
  },
  {
    title: "IA Générative & Prompting",
    duration: "1 jour",
    level: "Intermédiaire",
    topics: ["Maîtriser ChatGPT et Claude", "Rédiger des prompts efficaces", "Cas pratiques RH"],
  },
  {
    title: "Transformation RH par l'IA",
    duration: "2 jours",
    level: "Avancé",
    topics: ["Stratégie d'adoption", "Accompagnement du changement", "Éthique et RGPD"],
  },
];

const noCodeTools = [
  { name: "Notion", use: "Base de données RH, onboarding, documentation" },
  { name: "Airtable", use: "Suivi des candidatures, gestion des entretiens" },
  { name: "Make (Integromat)", use: "Automatisation des workflows RH" },
  { name: "n8n", use: "Intégrations personnalisées et automatisations" },
];

const IANoCode = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-background to-rhabelais-cream-dark overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Cpu size={16} />
                Innovation & Formation
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                <span className="gradient-text">IA & No-Code</span> au service des RH
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Découvrez comment l'Intelligence Artificielle et les outils No-Code 
                révolutionnent les pratiques RH. Formations, conseil et accompagnement 
                pour une transformation réussie.
              </p>
              <Button asChild size="lg" className="gradient-bg-primary border-0 text-primary-foreground">
                <Link to="/contact" className="flex items-center gap-2">
                  Demander une formation
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
            <div className="flex justify-center">
              <img src={iconIa} alt="IA" className="w-64 h-64 object-contain animate-float" />
            </div>
          </div>
        </div>
      </section>

      {/* Impact IA sur les RH */}
      <section className="py-16 bg-rhabelais-cream-dark">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              L'impact de l'IA sur les <span className="gradient-text">Ressources Humaines</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              L'Intelligence Artificielle transforme profondément les métiers RH. 
              Voici les domaines clés où l'IA apporte une réelle valeur ajoutée.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {aiImpacts.map((impact, index) => (
              <div key={index} className="card-elevated rounded-2xl p-6 hover:shadow-elevated transition-all duration-300">
                <div className="w-14 h-14 rounded-xl gradient-bg-secondary flex items-center justify-center mb-4">
                  <impact.icon className="w-7 h-7 text-secondary-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">{impact.title}</h3>
                <p className="text-muted-foreground">{impact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formations */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
              <GraduationCap size={16} />
              Formations
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Formations <span className="gradient-text">IA pour les RH</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Des formations pratiques pour maîtriser l'IA et l'intégrer 
              efficacement dans vos pratiques RH quotidiennes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {formations.map((formation, index) => (
              <div key={index} className="card-elevated rounded-2xl p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-secondary/10 text-secondary text-xs font-medium px-3 py-1 rounded-full">
                    {formation.level}
                  </span>
                  <span className="text-sm text-muted-foreground">{formation.duration}</span>
                </div>
                <h3 className="font-serif text-xl font-semibold mb-4">{formation.title}</h3>
                <ul className="space-y-2 flex-1">
                  {formation.topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="mt-6 w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                  <Link to="/contact">En savoir plus</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outils No-Code */}
      <section className="py-16 bg-rhabelais-cream-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Maîtrise des outils <span className="gradient-text">No-Code</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Des outils puissants et accessibles pour automatiser 
              et optimiser vos processus RH sans coder.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {noCodeTools.map((tool, index) => (
              <div key={index} className="card-elevated rounded-xl p-5 text-center">
                <h3 className="font-semibold text-lg mb-2 text-primary">{tool.name}</h3>
                <p className="text-sm text-muted-foreground">{tool.use}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
              <Link to="/automatisations" className="flex items-center gap-2">
                Voir des exemples d'automatisations
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary-foreground mb-4">
            Prêt à transformer vos RH avec l'IA ?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Contactez-moi pour discuter de vos besoins en formation ou en accompagnement.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
            <Link to="/contact" className="flex items-center gap-2">
              Discutons ensemble
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default IANoCode;
