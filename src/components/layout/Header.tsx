import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavDropdown } from "@/components/NavDropdown";
import ocslaaLogo from "@/assets/ocslaaLogo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const aboutDropdownItems = [
    { name: "Our Vision, Purpose and Values", href: "/about" },
    { name: "Our Leadership", href: "/about/leadership" },
    { name: "Advocacy and Policy", href: "/about/advocacy" },
    { name: "Strategic Plan 2026 – 2028", href: "/about/strategic-plan" },
    { name: "Annual Reviews", href: "/about/annual-reviews" },
    { name: "Accreditation", href: "/about/accreditation" },
  ];

  const servicesDropdownItems = [
    { name: "All Services & Resources", href: "/services" },
    { name: "Youth Services", href: "/services/youth" },
    { name: "Families and Carers", href: "/services/families" },
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={ocslaaLogo}
              alt="OCSLAA Logo"
              className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground leading-tight">OCSLAA</span>
              <span className="text-[10px] text-muted-foreground leading-tight hidden md:block">Our Concern Sierra Leone Australia Alliance</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={cn(
                "text-sm font-medium transition-colors duration-300 relative",
                location.pathname === "/"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Home
              {location.pathname === "/" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </NavLink>

            <NavDropdown
              label="About"
              items={aboutDropdownItems}
              isActive={location.pathname.startsWith("/about")}
            />

            <NavDropdown
              label="Services"
              items={servicesDropdownItems}
              isActive={location.pathname.startsWith("/services")}
            />

            <NavLink
              to="/blog"
              className={cn(
                "text-sm font-medium transition-colors duration-300 relative",
                location.pathname.startsWith("/blog")
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Blog
              {location.pathname.startsWith("/blog") && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </NavLink>

            <NavLink
              to="/contact"
              className={cn(
                "text-sm font-medium transition-colors duration-300 relative",
                location.pathname === "/contact"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Contact Us
              {location.pathname === "/contact" && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </NavLink>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="default" asChild>
              <Link to="/services?category=crisis">Get Help Now</Link>
            </Button>
            <Button variant="hero" size="default" asChild>
              <Link to="/donate">Donate Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <NavLink
              to="/"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                location.pathname === "/"
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-accent"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavDropdown
              label="About"
              items={aboutDropdownItems}
              isActive={location.pathname.startsWith("/about")}
              onItemClick={() => setIsMenuOpen(false)}
            />

            <NavDropdown
              label="Services"
              items={servicesDropdownItems}
              isActive={location.pathname.startsWith("/services")}
              onItemClick={() => setIsMenuOpen(false)}
            />

            <NavLink
              to="/blog"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                location.pathname.startsWith("/blog")
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-accent"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </NavLink>

            <NavLink
              to="/contact"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                location.pathname === "/contact"
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-accent"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </NavLink>

            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <Button variant="outline" size="default" asChild className="w-full">
                <Link to="/services?category=crisis">Get Help Now</Link>
              </Button>
              <Button variant="hero" size="default" asChild className="w-full">
                <Link to="/donate">Donate Now</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
