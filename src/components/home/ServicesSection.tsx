import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import iconAdp from "@/assets/icon-adp.png";
import iconDialogue from "@/assets/icon-dialogue.png";
import iconGepp from "@/assets/icon-gepp.png";
import iconRse from "@/assets/icon-rse.png";
import iconIa from "@/assets/icon-ia.png";
const services = [{
  icon: iconAdp,
  title: "Administration du Personnel",
  description: "Gestion des contrats, dossiers individuels et conformité légale pour une gestion RH irréprochable.",
  link: "/expertises"
}, {
  icon: iconDialogue,
  title: "Relations Sociales",
  description: "Construction d'un climat social sain par le dialogue, la prévention des conflits et le bien-être au travail.",
  link: "/expertises"
}, {
  icon: iconGepp,
  title: "GEPP",
  description: "Gestion des Emplois et Parcours Professionnels. Développement des talents et évolution professionnelle.",
  link: "/expertises"
}, {
  icon: iconRse,
  title: "RSE",
  description: "Responsabilité Sociale et Environnementale. Diversité, inclusion et engagement durable.",
  link: "/expertises"
}, {
  icon: iconIa,
  title: "IA & No-Code",
  description: "Automatisation des tâches RH grâce à l'Intelligence Artificielle et aux outils No-Code.",
  link: "/ia-nocode"
}];
const ServicesSection = () => {
  return <section className="py-20 bg-rhabelais-cream-dark">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Un ancrage RH <span className="gradient-text">solide et éprouvé</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Après plus de 10 ans dans les Ressources Humaines, j'accompagne les entreprises 
            dans leurs enjeux stratégiques et opérationnels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => <Link key={index} to={service.link} className="group card-elevated rounded-2xl p-6 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
              <div className="mb-4 flex justify-center">
                <img src={service.icon} alt={service.title} className="w-24 h-24 object-contain" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-secondary transition-colors text-center">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-4 text-center">{service.description}</p>
              <span className="inline-flex items-center gap-2 text-secondary font-medium text-sm group-hover:gap-3 transition-all justify-center w-full">
                En savoir plus
                <ArrowRight size={16} />
              </span>
            </Link>)}
        </div>
      </div>
    </section>;
};
export default ServicesSection;