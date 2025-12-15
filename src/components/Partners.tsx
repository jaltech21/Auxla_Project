/**
 * Partners component
 * Displays partner organizations by category
 */

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { partners } from "@/data/mockContent";
import { Building2, Heart, GraduationCap, Globe } from "lucide-react";

const Partners = () => {
  const categories = {
    government: { label: "Government Partners", icon: Building2, color: "text-blue-600" },
    ngo: { label: "NGO Partners", icon: Heart, color: "text-rose-600" },
    healthcare: { label: "Healthcare Partners", icon: Heart, color: "text-green-600" },
    academic: { label: "Academic Partners", icon: GraduationCap, color: "text-purple-600" },
  };

  const partnersByCategory = {
    government: partners.filter((p) => p.category === "government"),
    ngo: partners.filter((p) => p.category === "ngo"),
    healthcare: partners.filter((p) => p.category === "healthcare"),
    academic: partners.filter((p) => p.category === "academic"),
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Partners & Collaborators
          </h2>
          <p className="text-lg text-muted-foreground">
            Working together with leading organizations to expand mental health support across Sierra Leone
          </p>
        </div>

        {/* Partners by Category */}
        <div className="space-y-12">
          {(Object.keys(partnersByCategory) as Array<keyof typeof partnersByCategory>).map(
            (category) => {
              const categoryPartners = partnersByCategory[category];
              if (categoryPartners.length === 0) return null;

              const { label, icon: Icon, color } = categories[category];

              return (
                <div key={category}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 bg-background rounded-lg ${color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground">{label}</h3>
                    <Badge variant="secondary">{categoryPartners.length}</Badge>
                  </div>

                  {/* Partners Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categoryPartners.map((partner) => (
                      <Card
                        key={partner.id}
                        className="group hover:shadow-lg transition-all duration-300 border-border bg-card"
                      >
                        <CardContent className="p-6">
                          {/* Icon/Logo Placeholder */}
                          <div className="mb-4 p-4 bg-muted rounded-xl flex items-center justify-center h-24 group-hover:bg-primary-light transition-colors duration-300">
                            <Globe className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                          </div>

                          {/* Partner Info */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {partner.name}
                            </h4>
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {partner.description}
                            </p>

                            {/* Link */}
                            {partner.website && partner.website !== "#" && (
                              <a
                                href={partner.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium mt-2"
                              >
                                Visit website
                                <svg
                                  className="ml-1 h-3 w-3"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Partnership CTA */}
        <div className="text-center mt-16 p-8 bg-primary-light rounded-2xl border border-primary/20">
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Interested in Partnering with OCSLAA?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always looking to collaborate with organizations that share our commitment to
            mental health advocacy and support in Sierra Leone.
          </p>
          <a
            href="/contact?type=partnership"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Explore Partnership Opportunities
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

export default Partners;
