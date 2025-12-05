import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useBlogPost, useRelatedPosts, useLikeBlogPost } from "@/hooks/useBlog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AuthorCard from "@/components/features/AuthorCard";
import BlogCard from "@/components/features/BlogCard";
import {
  Calendar,
  Clock,
  Eye,
  Heart,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPost(slug!);
  const { data: relatedPosts } = useRelatedPosts(post?.id || "", 3);
  const likeMutation = useLikeBlogPost();
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (post && !hasLiked) {
      likeMutation.mutate(post.id);
      setHasLiked(true);
    }
  };

  const handleShare = (platform: string) => {
    if (!post) return;

    const url = window.location.href;
    const text = post.title;

    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "wellness-tips": "bg-green-100 text-green-800 border-green-200",
      "mental-health": "bg-blue-100 text-blue-800 border-blue-200",
      community: "bg-purple-100 text-purple-800 border-purple-200",
      "personal-stories": "bg-pink-100 text-pink-800 border-pink-200",
      research: "bg-orange-100 text-orange-800 border-orange-200",
      treatment: "bg-teal-100 text-teal-800 border-teal-200",
      prevention: "bg-indigo-100 text-indigo-800 border-indigo-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const formatCategoryName = (category: string) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="max-w-4xl mx-auto space-y-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="aspect-video w-full" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !post) {
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
              {error ? "Failed to load blog post." : "Blog post not found."}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - OCSLAA Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:author" content={post.author.name} />
        <meta property="article:section" content={formatCategoryName(post.category)} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Category & Featured Badge */}
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="outline" className={getCategoryColor(post.category)}>
                {formatCategoryName(post.category)}
              </Badge>
              {post.featured && (
                <Badge className="bg-primary text-primary-foreground">Featured</Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{post.title}</h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span>{post.viewCount} views</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4" />
                <span>{post.likeCount} likes</span>
              </div>
            </div>

            {/* Featured Image */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full aspect-video object-cover rounded-2xl mb-12"
            />

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              {post.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 text-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Engagement Actions */}
            <div className="flex items-center justify-between mb-12 pb-12 border-b">
              <Button
                onClick={handleLike}
                variant={hasLiked ? "default" : "outline"}
                className="gap-2"
                disabled={hasLiked}
              >
                <Heart className={`h-4 w-4 ${hasLiked ? "fill-current" : ""}`} />
                {hasLiked ? "Liked" : "Like this article"}
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground mr-2">Share:</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare("twitter")}
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare("facebook")}
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare("linkedin")}
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Author Info */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-6">About the Author</h3>
              <AuthorCard author={post.author} />
            </div>

            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <BlogCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogDetailPage;
