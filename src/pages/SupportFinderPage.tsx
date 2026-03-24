import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { MapPin, Search, Users, Phone, Mail, Star, Clock, DollarSign } from "lucide-react";

const SupportFinderPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock support provider data
  const providers = [
    {
      id: 1,
      name: "Sierra Leone Mental Health Services",
      type: "Clinic",
      category: "therapist",
      location: "Freetown, Sierra Leone",
      phone: "+232 76 123456",
      email: "contact@slmhs.org",
      description: "Licensed therapists offering individual and group counseling",
      services: ["Individual Therapy", "Group Therapy", "Crisis Support"],
      rating: 4.8,
      availability: "Monday - Friday, 9AM-5PM",
      cost: "Sliding Scale",
    },
    {
      id: 2,
      name: "Community Mental Health Support Group",
      type: "Support Group",
      category: "support-group",
      location: "Freetown, Sierra Leone",
      phone: "+232 76 987654",
      email: "support@cmhsg.org",
      description: "Weekly support groups for anxiety, depression, and grief",
      services: ["Anxiety Support", "Depression Support", "Grief Counseling"],
      rating: 4.6,
      availability: "Thursdays, 6PM-8PM",
      cost: "Free",
    },
    {
      id: 3,
      name: "Dr. Aminata Bangura - Psychologist",
      type: "Individual Provider",
      category: "therapist",
      location: "Freetown, Sierra Leone",
      phone: "+232 76 555666",
      email: "dr.bangura@psych.org",
      description: "Specialized in trauma, anxiety, and depression treatment",
      services: ["Individual Therapy", "Trauma Therapy", "Medication Management"],
      rating: 4.9,
      availability: "By Appointment",
      cost: "Fee-based",
    },
    {
      id: 4,
      name: "Youth Mental Wellness Center",
      type: "Clinic",
      category: "youth",
      location: "Freetown, Sierra Leone",
      phone: "+232 76 444555",
      email: "youth@mentalwellness.org",
      description: "Specialized services for adolescents and young adults",
      services: ["Youth Counseling", "Family Therapy", "School Support"],
      rating: 4.7,
      availability: "Monday - Saturday, 10AM-6PM",
      cost: "Affordable Rates",
    },
    {
      id: 5,
      name: "Crisis Support Hotline",
      type: "Helpline",
      category: "crisis",
      location: "24/7 National Service",
      phone: "988",
      email: "N/A",
      description: "24/7 crisis support and mental health emergency services",
      services: ["Crisis Support", "Suicide Prevention", "Emotional Support"],
      rating: 4.9,
      availability: "24/7",
      cost: "Free",
    },
    {
      id: 6,
      name: "Women's Mental Health Initiative",
      type: "Community Organization",
      category: "womens",
      location: "Freetown, Sierra Leone",
      phone: "+232 76 333444",
      email: "info@womensmentalhealth.org",
      description: "Mental health resources and support for women",
      services: ["Women's Support Groups", "Trauma Recovery", "Empowerment"],
      rating: 4.8,
      availability: "Tuesday & Thursday, 5PM-7PM",
      cost: "Free",
    },
  ];

  const categories = [
    { id: "all", label: "All Resources" },
    { id: "therapist", label: "Therapists & Counselors" },
    { id: "support-group", label: "Support Groups" },
    { id: "crisis", label: "Crisis Support" },
    { id: "youth", label: "Youth Services" },
    { id: "womens", label: "Women's Health" },
  ];

  // Filter providers
  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      searchQuery === "" ||
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory =
      !selectedCategory || selectedCategory === "all" || provider.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <Helmet>
        <title>Find Support - OCSLAA</title>
        <meta
          name="description"
          content="Find therapists, counselors, and support groups near you. Connect with mental health professionals within the Sierra Leonean community."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-soft">
        {/* Page Header */}
        <div className="bg-secondary text-secondary-foreground py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-foreground/10 border border-secondary-foreground/20 mb-6">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">Find Support</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find Therapists & Support Groups
              </h1>
              <p className="text-xl text-secondary-foreground/90">
                Connect with mental health professionals and support groups in your area
              </p>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Enter your location (city, state, or zip code)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button size="lg" className="gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Category Filters */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id === "all" ? null : category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredProviders.length > 0 ? (
            <div className="space-y-6">
              {filteredProviders.map((provider) => (
                <Card
                  key={provider.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{provider.name}</CardTitle>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary">{provider.type}</Badge>
                          <div className="flex items-center gap-0.5">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{provider.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardDescription>{provider.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Services */}
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Services</p>
                      <div className="flex flex-wrap gap-2">
                        {provider.services.map((service) => (
                          <Badge key={service} variant="outline">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Location</p>
                          <p className="text-sm font-medium">{provider.location}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Availability</p>
                          <p className="text-sm font-medium">{provider.availability}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <DollarSign className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Cost</p>
                          <p className="text-sm font-medium">{provider.cost}</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {provider.phone !== "N/A" && (
                          <Button variant="outline" size="sm" className="gap-2" asChild>
                            <a href={`tel:${provider.phone}`}>
                              <Phone className="h-4 w-4" />
                              {provider.phone}
                            </a>
                          </Button>
                        )}
                        {provider.email !== "N/A" && (
                          <Button variant="outline" size="sm" className="gap-2" asChild>
                            <a href={`mailto:${provider.email}`}>
                              <Mail className="h-4 w-4" />
                              Email
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No providers found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or contact us for more information
              </p>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="bg-primary-light border-primary/20">
            <CardHeader>
              <CardTitle>Need Immediate Help?</CardTitle>
              <CardDescription>
                If you're in crisis, please reach out immediately
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Crisis Line</p>
                    <a href="tel:988" className="text-primary hover:underline font-semibold">
                      Call 988
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Email Support</p>
                    <a href="mailto:support@ocslaa.org" className="text-primary hover:underline font-semibold">
                      support@ocslaa.org
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SupportFinderPage;
