import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Peaceful landscape representing mental wellness"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-2xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light border border-primary/20">
            <Heart className="h-4 w-4 text-primary" fill="currentColor" />
            <span className="text-sm font-medium text-primary">You're Not Alone</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Healing Starts with
            <span className="block text-primary mt-2">Understanding</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
            Join our community in breaking the stigma around mental health. Access resources, connect with support, and
            start your journey to wellness today.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" asChild>
              <a href="#resources" className="group">
                Get Support Now
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#about">Learn More</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-secondary-light rounded-lg">
                  <Users className="h-5 w-5 text-secondary" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">50K+</p>
              <p className="text-sm text-muted-foreground">People Helped</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-secondary-light rounded-lg">
                  <BookOpen className="h-5 w-5 text-secondary" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">200+</p>
              <p className="text-sm text-muted-foreground">Resources</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-secondary-light rounded-lg">
                  <Heart className="h-5 w-5 text-secondary" fill="currentColor" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">24/7</p>
              <p className="text-sm text-muted-foreground">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
