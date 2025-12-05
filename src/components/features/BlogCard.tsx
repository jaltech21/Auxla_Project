import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Calendar, Eye, Heart } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { formatDistanceToNow } from "date-fns";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
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

  const getAuthorInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      {/* Featured Image */}
      <Link to={`/blog/${post.slug}`} className="relative overflow-hidden">
        <div className="aspect-video relative">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {post.featured && (
            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
        </div>
      </Link>

      <CardHeader className="space-y-3">
        {/* Category Badge */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={getCategoryColor(post.category)}>
            {formatCategoryName(post.category)}
          </Badge>
        </div>

        {/* Title */}
        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-xl font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="flex-1">
        {/* Excerpt */}
        <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4 flex-col items-start gap-3">
        {/* Author Info */}
        <Link
          to={`/blog/author/${post.author.id}`}
          className="flex items-center gap-3 w-full hover:opacity-80 transition-opacity"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{getAuthorInitials(post.author.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{post.author.name}</p>
            <p className="text-xs text-muted-foreground truncate">{post.author.title}</p>
          </div>
        </Link>

        {/* Meta Info */}
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{post.viewCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              <span>{post.likeCount}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
