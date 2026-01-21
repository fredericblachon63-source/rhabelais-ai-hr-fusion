import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import iconAdp from "@/assets/icon-adp.png";
import iconDialogue from "@/assets/icon-dialogue.png";
import iconGepp from "@/assets/icon-gepp.png";
import iconRse from "@/assets/icon-rse.png";
const expertises = [{
  icon: iconAdp,
  title: "Administration du Personnel (ADP)",
  description: "Pilotage complet de la gestion administrative des collaborateurs.",
  details: ["Gestion de la paie et des déclarations sociales", "Rédaction et suivi des contrats de travail", "Gestion des dossiers individuels", "Conformité légale et réglementaire", "Optimisation des processus administratifs"]
}, {
  icon: iconDialogue,
  title: "Relations Sociales",
  description: "Construction et maintien d'un dialogue social constructif.",
  details: ["Animation des instances représentatives (CSE)", "Négociations collectives et accords d'entreprise", "Prévention et gestion des conflits", "Promotion du bien-être au travail", "Accompagnement du changement organisationnel"]
}, {
  icon: iconGepp,
  title: "GEPP (Gestion des Emplois et Parcours Professionnels)",
  description: "Anticipation des besoins en compétences et développement des talents.",
  details: ["Cartographie des compétences", "Plans de développement individuels", "Gestion prévisionnelle des effectifs", "Accompagnement des mobilités internes", "Identification et valorisation des talents"]
}, {
  icon: iconRse,
  title: "RSE (Responsabilité Sociale et Environnementale)",
  description: "Intégration des enjeux sociaux et environnementaux dans la stratégie RH.",
  details: ["Politique diversité et inclusion", "Accompagnement du handicap en entreprise", "Démarches de développement durable", "Engagement sociétal des collaborateurs", "Indicateurs et reporting RSE"]
}];
const Expertises = () => {
  return <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-background to-rhabelais-cream-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Mes <span className="gradient-text">Expertises RH</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Des fondamentaux solides pour accompagner votre transformation RH. 
              Plus de 10 ans d'expérience au service de votre réussite.
            </p>
          </div>
        </div>
      </section>

      {/* Expertises Grid */}
      <section className="py-16 bg-rhabelais-cream-dark">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {expertises.map((expertise, index) => <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-4 mb-4">
                    <img src={expertise.icon} alt={expertise.title} className="w-20 h-20 object-contain" />
                    <h2 className="text-2xl md:text-3xl font-serif font-bold">
                      {expertise.title}
                    </h2>
                  </div>
                  <p className="text-muted-foreground text-lg mb-6">
                    {expertise.description}
                  </p>
                  <ul className="space-y-3">
                    {expertise.details.map((detail, i) => {})}
                  </ul>
                </div>
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="card-elevated rounded-3xl p-4 h-full flex items-center justify-center min-h-[300px]">
                    <img src={expertise.icon} alt={expertise.title} className="w-full h-full max-w-[280px] max-h-[280px] object-contain" />
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Besoin d'accompagnement sur ces thématiques ?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Discutons ensemble de vos enjeux RH et trouvons les solutions adaptées à votre contexte.
          </p>
          <Button asChild size="lg" className="gradient-bg-primary border-0 text-primary-foreground">
            <Link to="/contact" className="flex items-center gap-2">
              Me contacter
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>;
};
export default Expertises;