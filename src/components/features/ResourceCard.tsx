import { Resource } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Video,
  FileText,
  Headphones,
  Download,
  ExternalLink,
  Eye,
  ThumbsUp,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ResourceCardProps {
  resource: Resource;
  className?: string;
}

const getResourceIcon = (type: Resource['type']) => {
  const iconClass = 'h-5 w-5';
  switch (type) {
    case 'article':
      return <FileText className={iconClass} />;
    case 'video':
      return <Video className={iconClass} />;
    case 'podcast':
      return <Headphones className={iconClass} />;
    case 'worksheet':
      return <Download className={iconClass} />;
    case 'guide':
      return <BookOpen className={iconClass} />;
    default:
      return <FileText className={iconClass} />;
  }
};

const getTypeLabel = (type: Resource['type']) => {
  const labels: Record<Resource['type'], string> = {
    article: 'Article',
    video: 'Video',
    podcast: 'Podcast',
    worksheet: 'Worksheet',
    guide: 'Guide',
    tool: 'Tool',
    helpline: 'Helpline',
  };
  return labels[type] || type;
};

const getCategoryColor = (category: Resource['category']) => {
  const colors: Record<Resource['category'], string> = {
    anxiety: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    depression: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    stress: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    support: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    crisis: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    therapy: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
    medication: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    'self-help': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    general: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  };
  return colors[category] || colors.general;
};

export const ResourceCard = ({ resource, className }: ResourceCardProps) => {
  return (
    <Card
      className={cn(
        'group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden',
        className
      )}
    >
      {/* Thumbnail */}
      {resource.thumbnail && (
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={resource.thumbnail}
            alt={resource.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {resource.featured && (
            <Badge className="absolute top-3 left-3 bg-primary">Featured</Badge>
          )}
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="gap-1">
              {getResourceIcon(resource.type)}
              <span className="ml-1">{getTypeLabel(resource.type)}</span>
            </Badge>
          </div>
        </div>
      )}

      <CardHeader>
        {/* Category Badge */}
        <Badge className={cn('w-fit mb-2', getCategoryColor(resource.category))}>
          {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
        </Badge>

        <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
          <Link to={`/resources/${resource.id}`}>{resource.title}</Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-3">{resource.description}</CardDescription>

        {/* Metadata */}
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{resource.viewCount.toLocaleString()} views</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{resource.helpfulCount} helpful</span>
          </div>
          {resource.duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{resource.duration} min</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {resource.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {resource.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{resource.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button variant="default" size="sm" asChild className="flex-1">
            <Link to={`/resources/${resource.id}`}>
              View Resource
              <ExternalLink className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          {resource.downloadUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={resource.downloadUrl} download>
                <Download className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
