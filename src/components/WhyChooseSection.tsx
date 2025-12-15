/**
 * Why Choose OCSLAA section
 * Displays key differentiators and unique value propositions
 */

import { Card, CardContent } from "@/components/ui/card";
import { whyChooseReasons } from "@/data/mockContent";
import {
  ShieldCheck,
  Users,
  Award,
  Map,
  HeartHandshake,
  Clock,
  type LucideIcon,
} from "lucide-react";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  users: Users,
  award: Award,
  map: Map,
  "heart-handshake": HeartHandshake,
  clock: Clock,
};

const WhyChooseSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose OCSLAA?
          </h2>
          <p className="text-lg text-muted-foreground">
            What makes us different in our approach to mental health support in Sierra Leone
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {whyChooseReasons.map((reason) => {
            const Icon = iconMap[reason.icon] || ShieldCheck;

            return (
              <Card
                key={reason.id}
                className="group hover:shadow-xl hover:border-primary/30 transition-all duration-300 border-border bg-card"
              >
                <CardContent className="pt-8 pb-6 px-6 space-y-4">
                  {/* Icon */}
                  <div className="p-3 bg-primary-light rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Ready to take the first step towards better mental health?
          </p>
          <a
            href="/support-finder"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Find Support Now
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

export default WhyChooseSection;
