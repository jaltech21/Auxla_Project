import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      title: "5 Daily Habits for Better Mental Health",
      excerpt: "Discover simple yet effective practices that can significantly improve your mental wellness and emotional resilience.",
      author: "Dr. Sarah Johnson",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Wellness Tips",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    },
    {
      title: "Understanding Anxiety: A Comprehensive Guide",
      excerpt: "Learn about the different types of anxiety disorders, their symptoms, and evidence-based treatment approaches.",
      author: "Dr. Michael Chen",
      date: "March 12, 2024",
      readTime: "8 min read",
      category: "Mental Health",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80",
    },
    {
      title: "The Power of Community in Mental Health Recovery",
      excerpt: "Explore how connection and support groups play a crucial role in healing and maintaining mental wellness.",
      author: "Emma Rodriguez",
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "Community",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    },
  ];

  return (
    <section id="blog" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Latest Insights</h2>
          <p className="text-lg text-muted-foreground">
            Stay informed with our latest articles, tips, and stories about mental health and wellness
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-muted-foreground line-clamp-3">{post.excerpt}</CardDescription>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <Button variant="link" className="p-0 h-auto group/link">
                  Read Article
                  <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover/link:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
