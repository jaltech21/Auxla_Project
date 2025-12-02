import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, AlertCircle, Phone } from 'lucide-react';
import { useResources } from '@/hooks/useResources';
import { useDebounce } from '@/hooks/useDebounce';
import { ResourceFilters as IResourceFilters } from '@/types';
import { ResourceCard } from '@/components/features/ResourceCard';
import { ResourceListSkeleton } from '@/components/features/ResourceCardSkeleton';
import { ResourceFilters, ActiveFilters } from '@/components/features/ResourceFilters';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CRISIS_HOTLINES } from '@/constants';

const ResourcesPage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<IResourceFilters>({});

  // Debounce search query
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Build filters with search
  const activeFilters: IResourceFilters = {
    ...filters,
    ...(debouncedSearch && { search: debouncedSearch }),
  };

  // Fetch resources
  const { data, isLoading, isError, error } = useResources(page, 12, activeFilters);

  const handleRemoveFilter = (key: keyof IResourceFilters) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
    setPage(1);
  };

  const handleFiltersChange = (newFilters: IResourceFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <div className="-mt-8 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search resources by title, description, or tags..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setPage(1);
                    }}
                    className="pl-10 h-12"
                  />
                </div>
                <ResourceFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  resultCount={data?.meta.totalItems}
                />
              </div>

              {/* Active Filters */}
              <div className="mt-4">
                <ActiveFilters filters={filters} onRemoveFilter={handleRemoveFilter} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Crisis Banner */}
        <Alert className="mb-8 border-secondary bg-secondary-light">
          <Phone className="h-5 w-5 text-secondary" />
          <AlertTitle className="text-secondary-foreground">Need Immediate Help?</AlertTitle>
          <AlertDescription className="text-secondary-foreground/90">
            If you're in crisis, call the National Suicide Prevention Lifeline at{' '}
            <a href={`tel:${CRISIS_HOTLINES.suicide.phone}`} className="font-bold underline">
              {CRISIS_HOTLINES.suicide.phone}
            </a>{' '}
            or text "HELLO" to{' '}
            <a href={`sms:${CRISIS_HOTLINES.crisis.phone}`} className="font-bold underline">
              {CRISIS_HOTLINES.crisis.phone}
            </a>
          </AlertDescription>
        </Alert>

        {/* Results Count */}
        {data && !isLoading && (
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{data.data.length}</span> of{' '}
              <span className="font-semibold text-foreground">{data.meta.totalItems}</span>{' '}
              resources
              {debouncedSearch && (
                <>
                  {' '}
                  for "<span className="font-semibold text-foreground">{debouncedSearch}</span>"
                </>
              )}
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <ResourceListSkeleton count={12} />}

        {/* Error State */}
        {isError && (
          <Alert variant="destructive" className="my-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Loading Resources</AlertTitle>
            <AlertDescription>
              {error instanceof Error ? error.message : 'Failed to load resources. Please try again.'}
            </AlertDescription>
          </Alert>
        )}

        {/* Resources Grid */}
        {!isLoading && !isError && data && (
          <>
            {data.data.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {data.data.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mx-auto mb-4 p-4 bg-muted rounded-full w-fit">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">No Resources Found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filters to find what you're looking for
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({});
                    setPage(1);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {data.meta.totalPages > 1 && (
              <div className="flex justify-center gap-2 pb-12">
                <Button
                  variant="outline"
                  disabled={!data.meta.hasPrevPage}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2 px-4">
                  <span className="text-sm text-muted-foreground">
                    Page {data.meta.currentPage} of {data.meta.totalPages}
                  </span>
                </div>
                <Button
                  variant="outline"
                  disabled={!data.meta.hasNextPage}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;
