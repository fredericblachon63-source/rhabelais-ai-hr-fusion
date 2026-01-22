import { Link } from "react-router-dom";
import { Mail, Linkedin } from "lucide-react";
import logo from "@/assets/logo-rhabelais.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <img src={logo} alt="Rhabelais" className="h-16 w-auto mb-4 brightness-0 invert" />
            <p className="text-primary-foreground/80 max-w-md">
              L'innovation au service des Ressources Humaines. Consultant RH spécialisé en IA, 
              No-Code et transformation digitale.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/expertises" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Expertises
                </Link>
              </li>
              <li>
                <Link to="/ia-nocode" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  IA & No-Code
                </Link>
              </li>
              <li>
                <Link to="/automatisations" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Automatisations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@rhabelais.fr"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Mail size={18} />
                  contact@rhabelais.fr
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/hugo-music-24606b25b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Linkedin size={18} />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-primary-foreground/60 text-sm">
          <p>© {new Date().getFullYear()} Rhabelais - rhabelais.fr. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
