import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuthor, useBlogPostsByAuthor } from "@/hooks/useBlog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import BlogCard from "@/components/features/BlogCard";
import {
  ArrowLeft,
  Mail,
  Twitter,
  Linkedin,
  BookOpen,
  Award,
  AlertCircle,
} from "lucide-react";

const AuthorPage = () => {
  const { authorId } = useParams<{ authorId: string }>();
  const { data: author, isLoading: authorLoading, error: authorError } = useAuthor(authorId!);
  const { data: posts, isLoading: postsLoading } = useBlogPostsByAuthor(authorId!);

  // Loading State
  if (authorLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-6">
              <Skeleton className="h-32 w-32 rounded-full" />
              <div className="space-y-3 flex-1">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (authorError || !author) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {authorError ? "Failed to load author information." : "Author not found."}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{author.name} - Author Profile | OCSLAA Blog</title>
        <meta name="description" content={author.bio || `Read articles by ${author.name}`} />
        <meta property="og:title" content={`${author.name} - OCSLAA Blog`} />
        <meta property="og:description" content={author.bio || `Read articles by ${author.name}`} />
        <meta property="og:type" content="profile" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        {/* Author Profile Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar */}
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary/10"
                />

                {/* Author Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {author.name}
                    </h1>
                    <p className="text-lg text-primary font-medium">{author.title}</p>
                  </div>

                  {author.bio && (
                    <p className="text-muted-foreground leading-relaxed">{author.bio}</p>
                  )}

                  {/* Credentials */}
                  {author.credentials && author.credentials.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {author.credentials.map((credential, index) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                          <Award className="h-3 w-3" />
                          {credential}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Social Links */}
                  {author.socialLinks && (
                    <div className="flex gap-3 pt-2">
                      {author.socialLinks.email && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={`mailto:${author.socialLinks.email}`} target="_blank" rel="noopener noreferrer">
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </a>
                        </Button>
                      )}
                      {author.socialLinks.twitter && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={author.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-4 w-4 mr-2" />
                            Twitter
                          </a>
                        </Button>
                      )}
                      {author.socialLinks.linkedin && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4 mr-2" />
                            LinkedIn
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Articles by Author */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                Articles by {author.name}
              </h2>
              {posts && (
                <Badge variant="secondary">{posts.length} articles</Badge>
              )}
            </div>

            {/* Loading State */}
            {postsLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Articles Grid */}
            {!postsLoading && posts && posts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* No Articles State */}
            {!postsLoading && posts && posts.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No articles yet</h3>
                <p className="text-muted-foreground">
                  {author.name} hasn't published any articles yet.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default AuthorPage;
