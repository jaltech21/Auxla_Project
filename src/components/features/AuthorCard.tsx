import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Author } from "@/types/blog";
import { Link } from "react-router-dom";
import { Mail, Twitter, Linkedin } from "lucide-react";

interface AuthorCardProps {
  author: Author;
  postCount?: number;
  compact?: boolean;
}

const AuthorCard = ({ author, postCount, compact = false }: AuthorCardProps) => {
  const getAuthorInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (compact) {
    return (
      <Link
        to={`/blog/author/${author.id}`}
        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
      >
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{getAuthorInitials(author.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground truncate">{author.name}</p>
          <p className="text-sm text-muted-foreground truncate">{author.title}</p>
        </div>
      </Link>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Avatar */}
          <Link to={`/blog/author/${author.id}`}>
            <Avatar className="h-24 w-24 ring-2 ring-primary/10 hover:ring-primary/30 transition-all">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback className="text-2xl">{getAuthorInitials(author.name)}</AvatarFallback>
            </Avatar>
          </Link>

          {/* Name & Title */}
          <div className="space-y-1">
            <Link to={`/blog/author/${author.id}`}>
              <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors">
                {author.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground">{author.title}</p>
          </div>

          {/* Credentials */}
          {author.credentials && author.credentials.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {author.credentials.map((credential, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {credential}
                </Badge>
              ))}
            </div>
          )}

          {/* Bio */}
          {author.bio && (
            <p className="text-sm text-muted-foreground line-clamp-3">{author.bio}</p>
          )}

          {/* Post Count */}
          {postCount !== undefined && (
            <p className="text-sm font-medium text-primary">
              {postCount} {postCount === 1 ? "Post" : "Posts"}
            </p>
          )}

          {/* Social Links */}
          {author.socialLinks && (
            <div className="flex items-center gap-3 pt-2">
              {author.socialLinks.email && (
                <a
                  href={`mailto:${author.socialLinks.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              )}
              {author.socialLinks.twitter && (
                <a
                  href={author.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {author.socialLinks.linkedin && (
                <a
                  href={author.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthorCard;
