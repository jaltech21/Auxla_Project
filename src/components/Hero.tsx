import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, BookOpen } from "lucide-react";
import heroImage from "@/assets/hands-together.jpg";

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
              <a href="/support-finder" className="group">
                Find Support Now
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-2">
              <a href="#about">Learn More About Us</a>
            </Button>
          </div>

          {/* Trust Indicator */}
          <div className="flex items-center gap-2 pt-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-secondary-light border-2 border-background"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Trusted by <span className="font-semibold text-foreground">52,000+</span> Sierra Leoneans
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 pt-8">
            <div className="space-y-2 group">
              <div className="flex items-center gap-2">
                <div className="p-2.5 bg-primary-light rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">52K+</p>
              <p className="text-xs md:text-sm text-muted-foreground">People Supported</p>
            </div>
            <div className="space-y-2 group">
              <div className="flex items-center gap-2">
                <div className="p-2.5 bg-secondary-light rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-secondary" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">235+</p>
              <p className="text-xs md:text-sm text-muted-foreground">Resources</p>
            </div>
            <div className="space-y-2 group">
              <div className="flex items-center gap-2">
                <div className="p-2.5 bg-accent/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-5 w-5 md:h-6 md:w-6 text-accent" fill="currentColor" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">15</p>
              <p className="text-xs md:text-sm text-muted-foreground">Districts Reached</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
