import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Filter, Search } from "lucide-react";

const ResourcesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Page Header */}
      <div className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">Mental Health Resources</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find the Support You Need
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Access our comprehensive library of mental health resources, guides, and tools
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resources Grid - Will be implemented with actual data */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Resources Coming Soon
          </h2>
          <p className="text-muted-foreground">
            This page will display a searchable and filterable list of mental health resources
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
