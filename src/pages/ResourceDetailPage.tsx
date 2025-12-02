import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  ArrowLeft,
  ExternalLink,
  ThumbsUp,
  Eye,
  Clock,
  Calendar,
  Tag,
  BookOpen,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useResource, useRelatedResources, useMarkResourceHelpful } from '@/hooks/useResources';
import { ResourceCard } from '@/components/features/ResourceCard';
import { ResourceListSkeleton } from '@/components/features/ResourceCardSkeleton';
import { formatDate } from '@/lib/utils';

const ResourceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: resource, isLoading, isError } = useResource(id!);
  const { data: relatedResources } = useRelatedResources(id!);
  const markHelpfulMutation = useMarkResourceHelpful();

  const handleMarkHelpful = () => {
    if (resource) {
      markHelpfulMutation.mutate(resource.id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-soft py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="h-8 w-32 bg-muted rounded" />
              <div className="h-12 bg-muted rounded" />
              <div className="h-6 w-48 bg-muted rounded" />
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 w-3/4 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !resource) {
    return (
      <div className="min-h-screen bg-gradient-soft py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Resource not found. Please check the URL or return to the resources page.
              </AlertDescription>
            </Alert>
            <div className="mt-6">
              <Button variant="outline" onClick={() => navigate('/resources')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Resources
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate('/resources')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Button>

          {/* Main Content Card */}
          <Card className="shadow-card mb-8">
            <CardHeader>
              {/* Category & Type Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="capitalize">
                  {resource.category}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {resource.type}
                </Badge>
                {resource.featured && (
                  <Badge variant="default">Featured</Badge>
                )}
              </div>

              {/* Title */}
              <CardTitle className="text-3xl md:text-4xl mb-4">
                {resource.title}
              </CardTitle>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {resource.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{resource.duration} min</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{resource.viewCount.toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{resource.helpfulCount.toLocaleString()} found helpful</span>
                </div>
                {resource.updatedAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Updated {formatDate(resource.updatedAt)}</span>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Thumbnail */}
              {resource.thumbnail && (
                <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  About This Resource
                </h3>
                <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                  {resource.description}
                </p>
              </div>

              <Separator />

              {/* Tags */}
              {resource.tags && resource.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <Button asChild className="flex-1 sm:flex-none">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Resource
                  </a>
                </Button>

                <Button
                  variant="outline"
                  onClick={handleMarkHelpful}
                  disabled={markHelpfulMutation.isPending}
                  className="flex-1 sm:flex-none"
                >
                  {markHelpfulMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <ThumbsUp className="h-4 w-4 mr-2" />
                  )}
                  Mark as Helpful
                </Button>
              </div>

              {/* Success Message */}
              {markHelpfulMutation.isSuccess && (
                <Alert className="bg-secondary-light border-secondary">
                  <AlertDescription className="text-secondary-foreground">
                    Thank you for your feedback! This helps us recommend better resources.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Related Resources */}
          {relatedResources && relatedResources.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Related Resources</h2>
                <Link to="/resources">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedResources.map((relatedResource) => (
                  <ResourceCard key={relatedResource.id} resource={relatedResource} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceDetailPage;
