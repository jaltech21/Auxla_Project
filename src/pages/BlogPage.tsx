import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Search } from "lucide-react";

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-gradient-soft py-16 md:py-24 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light border border-primary/20 mb-6">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Blog & Insights</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Latest Mental Health Insights
            </h1>
            <p className="text-xl text-muted-foreground">
              Expert advice, personal stories, and the latest research in mental health
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blog Grid - Will be implemented with actual data */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Blog Posts Coming Soon
          </h2>
          <p className="text-muted-foreground">
            This page will display all blog posts with filtering and search capabilities
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
