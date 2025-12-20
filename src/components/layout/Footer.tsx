import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsletterSignup from "@/components/NewsletterSignup";

const Footer = () => {
  return (
    <footer className="bg-gradient-soft border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary-light rounded-lg">
                <Heart className="h-6 w-6 text-primary" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground leading-tight">OCSLAA</span>
                <span className="text-xs text-muted-foreground leading-tight">Our Concern Sierra Leone Alliance</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Supporting mental health awareness in Sierra Leone and providing resources for those in need. You're not alone.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Resources", "Blog", "Events"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {["Crisis Helpline", "Find a Therapist", "Support Groups", "Self-Help Tools", "FAQ"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Crisis Line</p>
                  <a href="tel:988" className="text-sm text-muted-foreground hover:text-primary">
                    988
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:support@ocslaa.org"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  support@ocslaa.org
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  123 Wellness St<br />
                  Suite 100<br />
                  City, State 12345
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Stay Informed</h3>
            <p className="text-muted-foreground mb-6">
              Get the latest mental health resources, tips, and updates delivered to your inbox.
            </p>
            <NewsletterSignup source="footer" />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} OCSLAA - Our Concern Sierra Leone Alliance. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
