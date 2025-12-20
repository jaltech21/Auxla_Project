/**
 * Impact Statistics component
 * Displays key metrics with animated counter effect
 */

import { Card, CardContent } from "@/components/ui/card";
import { impactStats } from "@/data/mockContent";
import {
  Users,
  BookOpen,
  Heart,
  MapPin,
  MessageCircle,
  Star,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  users: Users,
  "book-open": BookOpen,
  heart: Heart,
  "map-pin": MapPin,
  "message-circle": MessageCircle,
  star: Star,
};

// Animated counter hook
const useCountUp = (end: number, duration: number = 2000, start: number = 0) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * (end - start) + start));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
};

// Individual stat card with animation
const StatCard = ({ stat, isVisible }: { stat: typeof impactStats[0]; isVisible: boolean }) => {
  const Icon = iconMap[stat.icon] || Users;
  const count = useCountUp(isVisible ? stat.value : 0, 2500);

  const colorClasses = {
    primary: "bg-primary-light text-primary",
    secondary: "bg-secondary-light text-secondary",
    accent: "bg-accent/10 text-accent",
  };

  const colorClass = colorClasses[stat.color as keyof typeof colorClasses] || colorClasses.primary;

  return (
    <Card className="text-center hover:shadow-lg transition-all duration-300 border-border bg-card group">
      <CardContent className="pt-8 pb-6 space-y-4">
        {/* Icon */}
        <div className={`mx-auto p-4 rounded-2xl w-fit ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-8 w-8" />
        </div>

        {/* Value */}
        <div>
          <p className="text-4xl md:text-5xl font-bold text-foreground">
            {count.toLocaleString()}
            {isVisible && stat.suffix}
          </p>
          <p className="text-lg font-semibold text-foreground mt-2">{stat.label}</p>
          {stat.description && (
            <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ImpactStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-muted-foreground">
            Together, we're making mental health support accessible across Sierra Leone
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {impactStats.map((stat) => (
            <StatCard key={stat.id} stat={stat} isVisible={isVisible} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Every number represents a life touched, a stigma broken, and hope restored
          </p>
          <a
            href="#about"
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Learn more about our work
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
