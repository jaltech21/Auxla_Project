import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, Users } from "lucide-react";

const SupportFinderPage = () => {
  return (
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Enter your location (city, state, or zip code)"
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button size="lg" className="gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results - Will be implemented with actual data */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Provider Directory Coming Soon
          </h2>
          <p className="text-muted-foreground">
            This page will help you find therapists, counselors, and support groups near you
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupportFinderPage;
