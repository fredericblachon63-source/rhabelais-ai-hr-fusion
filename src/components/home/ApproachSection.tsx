import { CheckCircle2, Heart, Lightbulb, Target } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Solutions concrètes",
    description: "Opérationnelles immédiatement et adaptées à votre réalité terrain.",
  },
  {
    icon: CheckCircle2,
    title: "Standards RH",
    description: "Conformes aux meilleures pratiques et aux exigences réglementaires.",
  },
  {
    icon: Lightbulb,
    title: "Accessibles à tous",
    description: "Conçues pour être comprises et utilisées par tous, sans barrières techniques.",
  },
  {
    icon: Heart,
    title: "Inclusion & Diversité",
    description: "Sensibilité au handicap et à la diversité guide chaque projet.",
  },
];

const ApproachSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Une approche{" "}
              <span className="gradient-text">pragmatique et humaine</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              RHabelais incarne une nouvelle manière de concevoir et de pratiquer 
              les Ressources Humaines, adaptée aux défis contemporains. L'innovation 
              n'est pas une option, c'est un levier pour valoriser l'humain.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl gradient-bg-secondary flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden card-elevated">
              <div className="absolute inset-0 gradient-bg-primary opacity-10" />
              <div className="relative p-8 h-full flex flex-col justify-center">
                <blockquote className="text-2xl md:text-3xl font-serif text-center italic text-primary">
                  "Et si la technologie devenait un véritable levier humain ?"
                </blockquote>
                <p className="text-center mt-6 text-muted-foreground">
                  Simplifier la vie des RH, pas la dénaturer. Préserver l'essence 
                  humaine du métier tout en gagnant en efficacité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
