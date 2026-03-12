import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, AlertCircle, Phone, Heart, ArrowRight } from 'lucide-react';
import { useServices } from '@/hooks/useServices';
import { useDebounce } from '@/hooks/useDebounce';
import { ServiceFilters as IServiceFilters } from '@/types';
import { ServiceCard } from '@/components/features/ServiceCard';
import { ServiceListSkeleton } from '@/components/features/ServiceCardSkeleton';
import { ServiceFilters, ActiveFilters } from '@/components/features/ServiceFilters';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CRISIS_HOTLINES } from '@/constants';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<IServiceFilters>({});

  // Debounce search query
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Build filters with search
  const activeFilters: IServiceFilters = {
    ...filters,
    ...(debouncedSearch && { search: debouncedSearch }),
  };

  // Fetch services
  const { data, isLoading, isError, error } = useServices(page, 12, activeFilters);

  const handleRemoveFilter = (key: keyof IServiceFilters) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
    setPage(1);
  };

  const handleFiltersChange = (newFilters: IServiceFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
          }
          50% {
            opacity: 0.8;
            box-shadow: 0 0 40px rgba(16, 185, 129, 0.5);
          }
        }

        .hero-title {
          animation: slideInDown 0.8s ease-out;
        }

        .hero-subtitle {
          animation: slideInUp 0.8s ease-out 0.2s both;
        }

        .glow-badge {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .search-card {
          animation: slideInUp 0.6s ease-out 0.3s both;
        }

        .crisis-banner {
          animation: slideInUp 0.6s ease-out 0.4s both;
        }
      `}</style>

      {/* Page Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-16 md:py-32">
        {/* Animated background elements */}
        <div className="absolute top-10 right-20 opacity-10">
          <BookOpen className="h-32 w-32 animate-pulse" />
        </div>
        <div className="absolute bottom-10 left-20 opacity-10">
          <Search className="h-24 w-24 animate-pulse" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Badge with animation */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6 glow-badge w-fit">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">All Services & Resources</span>
            </div>

            {/* Animated title */}
            <h1 className="text-5xl md:text-6xl font-bold mb-4 hero-title leading-tight">
              Find the Support
              <br />
              <span className="bg-gradient-to-r from-primary-foreground via-primary-foreground/90 to-primary-foreground/80 bg-clip-text text-transparent">
                You Need
              </span>
            </h1>

            {/* Animated subtitle */}
            <p className="text-xl text-primary-foreground/90 mb-8 hero-subtitle leading-relaxed">
              Access our comprehensive range of mental health services, guides, and resources tailored to support your journey.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Search and Filters */}
        <div className="-mt-8 mb-12 relative z-20 search-card">
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Search & Filter Resources</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search services by title, description, or tags..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setPage(1);
                    }}
                    className="pl-12 h-12 text-base"
                  />
                </div>
                <ServiceFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  resultCount={data?.meta.totalItems}
                />
              </div>

              {/* Active Filters */}
              <div className="mt-6">
                <ActiveFilters filters={filters} onRemoveFilter={handleRemoveFilter} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Crisis Banner */}
        <Alert className="mb-8 crisis-banner border-2 border-secondary bg-gradient-to-r from-secondary/10 to-secondary/5">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-secondary rounded-lg flex-shrink-0 mt-0.5">
              <Phone className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <AlertTitle className="text-lg text-secondary-foreground font-bold mb-2">Need Immediate Help?</AlertTitle>
              <AlertDescription className="text-secondary-foreground/90">
                If you're in crisis, call the National Suicide Prevention Lifeline at{' '}
                <a href={`tel:${CRISIS_HOTLINES.suicide.phone}`} className="font-bold hover:underline transition-all">
                  {CRISIS_HOTLINES.suicide.phone}
                </a>{' '}
                or text "HELLO" to{' '}
                <a href={`sms:${CRISIS_HOTLINES.crisis.phone}`} className="font-bold hover:underline transition-all">
                  {CRISIS_HOTLINES.crisis.phone}
                </a>
                . Available 24/7, free and confidential.
              </AlertDescription>
            </div>
          </div>
        </Alert>

        {/* Results Count */}
        {data && !isLoading && (
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">
                Showing <span className="font-bold text-foreground text-lg">{data.data.length}</span> of{' '}
                <span className="font-bold text-foreground text-lg">{data.meta.totalItems}</span>{' '}
                <span className="font-medium">services</span>
                {debouncedSearch && (
                  <>
                    {' '}
                    for "<span className="font-semibold text-primary">{debouncedSearch}</span>"
                  </>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <ServiceListSkeleton count={12} />}

        {/* Error State */}
        {isError && (
          <Alert variant="destructive" className="my-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Loading Services</AlertTitle>
            <AlertDescription>
              {error instanceof Error ? error.message : 'Failed to load services. Please try again.'}
            </AlertDescription>
          </Alert>
        )}

        {/* Resources Grid */}
        {!isLoading && !isError && data && (
          <>
            {data.data.length > 0 ? (
              <>
                <style>{`
                  .service-card {
                    animation: slideInUp 0.6s ease-out forwards;
                    opacity: 0;
                  }

                  ${data.data.map((_, i) => `
                    .service-card:nth-child(${(i % 12) + 1}) {
                      animation-delay: ${(i % 12) * 0.08}s;
                    }
                  `).join('')}
                `}</style>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {data.data.map((resource) => (
                    <div key={resource.id} className="service-card">
                      <ServiceCard resource={resource} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-24">
                <style>{`
                  .empty-state {
                    animation: slideInUp 0.6s ease-out;
                  }
                `}</style>
                <div className="empty-state">
                  <div className="mx-auto mb-6 p-6 bg-primary/10 rounded-2xl w-fit">
                    <Search className="h-16 w-16 text-primary/60" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-3">No Services Found</h3>
                  <p className="text-muted-foreground mb-8 text-lg">
                    Try adjusting your search or filters to find what you're looking for
                  </p>
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({});
                      setPage(1);
                    }}
                    className="group"
                  >
                    Clear All Filters
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* Pagination */}
            {data.meta.totalPages > 1 && (
              <div className="flex justify-center gap-4 pb-12">
                <Button
                  variant="outline"
                  disabled={!data.meta.hasPrevPage}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-6"
                >
                  ← Previous
                </Button>
                <div className="flex items-center gap-3 px-6 py-2 bg-primary/5 rounded-lg">
                  <span className="text-sm font-medium text-foreground">
                    Page <span className="font-bold text-primary">{data.meta.currentPage}</span> of{' '}
                    <span className="font-bold text-primary">{data.meta.totalPages}</span>
                  </span>
                </div>
                <Button
                  variant="outline"
                  disabled={!data.meta.hasNextPage}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-6"
                >
                  Next →
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
