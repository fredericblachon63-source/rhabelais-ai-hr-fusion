import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import personnage from "@/assets/personnage.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-rhabelais-cream-dark" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles size={16} />
              Consultant RH & Expert IA
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
              L'innovation au service des{" "}
              <span className="gradient-text">Ressources Humaines</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              RHabelais accompagne votre transformation RH en alliant expertise métier, 
              Intelligence Artificielle et outils No-Code. Simplifiez vos processus, 
              valorisez l'humain.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="gradient-bg-primary border-0 text-primary-foreground hover:opacity-90 shadow-elevated">
                <Link to="/contact" className="flex items-center gap-2">
                  Discutons de votre projet
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                <Link to="/expertises">Découvrir mes expertises</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">10+</p>
                <p className="text-sm text-muted-foreground">Années d'expérience</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">IA & No-Code</p>
                <p className="text-sm text-muted-foreground">Expertise digitale</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-3xl scale-110" />
              <img
                src={personnage}
                alt="Consultant RH Rhabelais"
                className="relative w-80 lg:w-[450px] h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
