import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 gradient-bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <MessageCircle className="w-16 h-16 mx-auto mb-6 text-primary-foreground/80" />
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-6">
            Quelle transformation RH aimeriez-vous amorcer ?
          </h2>
          
          <p className="text-primary-foreground/80 text-lg mb-8">
            Ensemble, construisons les Ressources Humaines de demain, 
            ancrées dans leurs fondamentaux et ouvertes sur l'avenir.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Link to="/contact" className="flex items-center gap-2">
                Prenons contact
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/ia-nocode">Découvrir les formations IA</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
