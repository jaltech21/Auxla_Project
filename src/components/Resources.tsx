import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Shield, Users, BookOpen, Phone, ExternalLink, Loader } from "lucide-react";
import { useBlogPosts } from "@/hooks/useBlog";

const Resources = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Fetch blog posts from Sanity
  const { data, isLoading } = useBlogPosts();
  const allPosts = data?.posts || [];

  const filters = [
    { id: "all", label: "All Resources" },
    { id: "anxiety", label: "Anxiety" },
    { id: "depression", label: "Depression" },
    { id: "stress", label: "Stress Management" },
    { id: "support", label: "Support Groups" },
  ];

  // Map category slugs to filter IDs
  const categoryMap: { [key: string]: string } = {
    "anxiety-disorders": "anxiety",
    "depression": "depression",
    "stress-management": "stress",
    "support-groups": "support",
    "mental-health": "all",
    "wellness": "all",
    "coping-strategies": "all",
  };

  // Convert blog posts to resource format
  const resources = allPosts.slice(0, 6).map((post: any) => {
    // post.category is already a string (the slug) from Sanity transformation
    const categorySlug = post.category || "";
    const filterCategory = categoryMap[categorySlug] || "all";
    
    // Select appropriate icon based on category
    let icon = BookOpen;
    if (filterCategory === "anxiety") icon = Brain;
    else if (filterCategory === "depression") icon = Heart;
    else if (filterCategory === "stress") icon = Shield;
    else if (filterCategory === "support") icon = Users;

    return {
      icon,
      title: post.title,
      description: post.excerpt,
      category: filterCategory,
      slug: post.slug,
      readTime: post.readTime || "5 min read",
      author: post.author?.name || "Author",
      isCommunity: false,
      link: `/blog/${post.slug}`,
    };
  });

  // Keep some hardcoded community resources that complement blog posts
  const communityResources = [
    {
      icon: Phone,
      title: "Crisis Helpline",
      description: "24/7 crisis support and immediate help for those experiencing mental health emergencies.",
      category: "all",
      slug: "crisis-helpline",
      link: "/services?category=crisis",
      isCommunity: true,
      readTime: "",
      author: "",
    },
  ];

  const allResources = [...resources, ...communityResources];
  const filteredResources =
    activeFilter === "all" 
      ? allResources 
      : allResources.filter((r) => r.category === activeFilter || r.category === "all");

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
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-2">
                <Loader className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading resources...</p>
              </div>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No resources found for this category.</p>
            </div>
          ) : (
            filteredResources.map((resource, index) => (
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
                  {resource.isCommunity ? (
                    <Button variant="link" className="p-0 h-auto group/link" asChild>
                      <a href={resource.link}>
                        Learn More
                        <ExternalLink className="h-4 w-4 ml-1 transition-transform group-hover/link:translate-x-1" />
                      </a>
                    </Button>
                  ) : (
                    <Button variant="link" className="p-0 h-auto group/link" asChild>
                      <Link to={`/blog/${resource.slug}`}>
                        Learn More
                        <ExternalLink className="h-4 w-4 ml-1 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Emergency Banner */}
        <div className="mt-12 p-6 md:p-8 bg-secondary-light border-2 border-secondary rounded-2xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="p-4 bg-secondary rounded-xl">
                <Phone className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Need Immediate Help?</h3>
              <p className="text-gray-700">
                If you're in crisis, call the National Suicide Prevention Lifeline at <strong>988</strong> or text
                "HELLO" to 741741
              </p>
            </div>
            <Link to="/contact">
              <Button variant="secondary" size="lg" className="flex-shrink-0">
                Get Help Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
