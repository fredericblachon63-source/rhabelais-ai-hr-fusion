import Layout from "@/components/layout/Layout";
import { Award, Target, Heart, Lightbulb, Users } from "lucide-react";
import avatarRH from "@/assets/avatar-rh.png";
const APropos = () => {
  const valeurs = [{
    icon: Heart,
    title: "Humanisme",
    description: "Placer l'humain au cœur de chaque transformation"
  }, {
    icon: Target,
    title: "Excellence",
    description: "Viser l'excellence dans chaque accompagnement"
  }, {
    icon: Lightbulb,
    title: "Innovation",
    description: "Conjuguer tradition RH et innovation technologique"
  }, {
    icon: Users,
    title: "Proximité",
    description: "Un accompagnement personnalisé et sur-mesure"
  }];
  const parcours = [{
    periode: "15+ ans",
    titre: "Expérience RH",
    description: "Dans des environnements variés : PME, ETI, grands groupes"
  }, {
    periode: "500+",
    titre: "Collaborateurs accompagnés",
    description: "Dans leurs transformations professionnelles"
  }, {
    periode: "50+",
    titre: "Projets menés",
    description: "Relations sociales, restructurations, transformations digitales"
  }];
  return <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-6">
                Fondateur de Rhabelais
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
                Entre tradition RH et{" "}
                <span className="text-secondary">innovation humaine</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">Je me présente, je suis Frédéric Blachon. Passionné par les ressources humaines depuis plus de 15 ans, j'ai fondé Rhabelais avec une conviction : l'innovation technologique doit servir l'humain, jamais l'inverse.<strong className="text-foreground"> Rhabelais</strong> avec une conviction : 
                l'innovation technologique doit servir l'humain, jamais l'inverse.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Mon parcours m'a permis de développer une expertise complète en gestion des 
                ressources humaines, des relations sociales à la transformation digitale, 
                en passant par la GEPP et la RSE.
              </p>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-3xl blur-3xl" />
                <img src={avatarRH} alt="Consultant RH Rhabelais" className="relative z-10 w-80 h-auto rounded-3xl shadow-elegant" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parcours Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Mon parcours en chiffres
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Une expérience riche et diversifiée au service de votre transformation RH
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {parcours.map((item, index) => <div key={index} className="bg-card p-8 rounded-2xl border border-border text-center hover:shadow-lg transition-shadow">
                <div className="text-5xl font-display font-bold text-secondary mb-4">
                  {item.periode}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.titre}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Philosophie Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Award className="w-12 h-12 text-secondary mb-6" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Ma philosophie
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  Je crois fermement que <strong className="text-foreground">l'intelligence artificielle 
                  et les outils no-code</strong> représentent une opportunité extraordinaire pour 
                  les professionnels RH, à condition de les mettre au service de l'humain.
                </p>
                <p className="leading-relaxed">
                  Mon approche combine une <strong className="text-foreground">expertise traditionnelle 
                  des ressources humaines</strong> — relations sociales, droit du travail, GEPP, RSE — 
                  avec une maîtrise des <strong className="text-foreground">technologies modernes</strong> 
                  : IA générative, automatisation avec Make, bases de données avec Notion et Airtable.
                </p>
                <p className="leading-relaxed">
                  L'objectif ? Libérer les professionnels RH des tâches répétitives pour leur 
                  permettre de se concentrer sur ce qui compte vraiment : 
                  <strong className="text-foreground"> l'accompagnement humain</strong>.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {valeurs.map((valeur, index) => <div key={index} className="bg-card p-6 rounded-xl border border-border hover:border-secondary/50 transition-colors">
                  <valeur.icon className="w-8 h-8 text-secondary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{valeur.title}</h3>
                  <p className="text-sm text-muted-foreground">{valeur.description}</p>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Compétences Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Mes domaines d'expertise
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl border border-primary/20">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                🎯 Expertise RH traditionnelle
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Relations sociales et dialogue social</li>
                <li>• GEPP (Gestion des Emplois et Parcours Professionnels)</li>
                <li>• RSE et politique sociale</li>
                <li>• Administration du personnel</li>
                <li>• Droit du travail</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-6 rounded-xl border border-secondary/20">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                🚀 Innovation & Technologies
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Intelligence Artificielle appliquée aux RH</li>
                <li>• Outils No-Code (Notion, Airtable, Make)</li>
                <li>• Automatisation des processus RH</li>
                <li>• Formation et accompagnement digital</li>
                <li>• Transformation digitale RH</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6">
            Envie d'échanger ?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Discutons de vos enjeux RH et voyons ensemble comment je peux vous accompagner 
            dans votre transformation.
          </p>
          <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-colors">
            Prendre contact
          </a>
        </div>
      </section>
    </Layout>;
};
export default APropos;