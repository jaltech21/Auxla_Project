import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Shield, Users, BookOpen, Phone, ExternalLink } from "lucide-react";

const Resources = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Resources" },
    { id: "anxiety", label: "Anxiety" },
    { id: "depression", label: "Depression" },
    { id: "stress", label: "Stress Management" },
    { id: "support", label: "Support Groups" },
  ];

  const resources = [
    {
      icon: Brain,
      title: "Understanding Anxiety",
      description: "Learn about anxiety disorders, symptoms, and coping strategies to manage your mental health.",
      category: "anxiety",
      link: "#",
    },
    {
      icon: Heart,
      title: "Depression Resources",
      description: "Comprehensive guide to recognizing depression and finding effective treatment options.",
      category: "depression",
      link: "#",
    },
    {
      icon: Shield,
      title: "Stress Management",
      description: "Practical techniques and tools to reduce stress and build resilience in daily life.",
      category: "stress",
      link: "#",
    },
    {
      icon: Users,
      title: "Support Groups",
      description: "Connect with others who understand. Find local and online support groups near you.",
      category: "support",
      link: "#",
    },
    {
      icon: BookOpen,
      title: "Self-Help Resources",
      description: "Evidence-based self-help materials, worksheets, and guided exercises for mental wellness.",
      category: "all",
      link: "#",
    },
    {
      icon: Phone,
      title: "Crisis Helpline",
      description: "24/7 crisis support and immediate help for those experiencing mental health emergencies.",
      category: "all",
      link: "#",
    },
  ];

  const filteredResources =
    activeFilter === "all" ? resources : resources.filter((r) => r.category === activeFilter || r.category === "all");

  return (
    <section id="resources" className="py-16 md:py-24 bg-gradient-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Mental Health Resources</h2>
          <p className="text-lg text-muted-foreground">
            Access our comprehensive library of resources designed to support your mental health journey
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "soft"}
              onClick={() => setActiveFilter(filter.id)}
              className="transition-all duration-300"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border"
            >
              <CardHeader>
                <div className="p-3 bg-primary-light rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <resource.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-muted-foreground">{resource.description}</CardDescription>
                <Button variant="link" className="p-0 h-auto group/link" asChild>
                  <a href={resource.link}>
                    Learn More
                    <ExternalLink className="h-4 w-4 ml-1 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Banner */}
        <div className="mt-12 p-6 md:p-8 bg-secondary-light border-2 border-secondary rounded-2xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="p-4 bg-secondary rounded-xl">
                <Phone className="h-8 w-8 text-secondary-foreground" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-foreground mb-2">Need Immediate Help?</h3>
              <p className="text-muted-foreground">
                If you're in crisis, call the National Suicide Prevention Lifeline at <strong>988</strong> or text
                "HELLO" to 741741
              </p>
            </div>
            <Button variant="secondary" size="lg" className="flex-shrink-0">
              Get Help Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
