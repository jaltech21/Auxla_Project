import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useBlogPosts, useFeaturedPosts } from "@/hooks/useBlog";
import { BlogFilters } from "@/types/blog";
import BlogCard from "@/components/features/BlogCard";
import { BlogListSkeleton } from "@/components/features/BlogCardSkeleton";
import BlogFiltersComponent from "@/components/features/BlogFilters";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, BookOpen } from "lucide-react";

const BlogPage = () => {
  const [filters, setFilters] = useState<BlogFilters>({});
  
  const { data, isLoading, error } = useBlogPosts(filters);
  const { data: featuredPosts } = useFeaturedPosts(3);

  const handleSearch = (query: string) => {
    setFilters((prev) => ({
      ...prev,
      search: query || undefined,
    }));
  };

  const handleFiltersChange = (newFilters: BlogFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Helmet>
        <title>Blog - OCSLAA | Mental Health Articles & Resources</title>
        <meta
          name="description"
          content="Read the latest articles on mental health, wellness tips, personal stories, and community support from OCSLAA's mental health professionals in Sierra Leone."
        />
        <meta property="og:title" content="Blog - OCSLAA | Mental Health Articles & Resources" />
        <meta
          property="og:description"
          content="Expert mental health articles, wellness tips, and community stories from Sierra Leone."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-soft border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light border border-primary/20 mb-6">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Blog</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Mental Health Insights & Stories
              </h1>
              <p className="text-lg text-muted-foreground">
                Expert advice, personal experiences, and community support for mental wellness in Sierra Leone.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        {featuredPosts && featuredPosts.length > 0 && !filters.search && !filters.category && (
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Main Content Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters */}
          <div className="mb-8">
            <BlogFiltersComponent
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onSearch={handleSearch}
            />
          </div>

          {/* Error State */}
          {error && (
            <Alert variant="destructive" className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load blog posts. Please try again later.
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {isLoading && <BlogListSkeleton count={6} />}

          {/* Posts Grid */}
          {!isLoading && data && (
            <>
              {data.posts.length > 0 ? (
                <>
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground">
                      Showing {data.posts.length} of {data.total} articles
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.posts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No articles found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default BlogPage;
