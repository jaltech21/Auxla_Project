import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, AlertCircle, Phone, Heart, ArrowRight, Zap, Users, Lightbulb, MessageCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-b from-white via-primary/5 to-white">
      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
            opacity: 1;
          }
          50% {
            box-shadow: 0 0 40px rgba(16, 185, 129, 0.6);
            opacity: 0.85;
          }
        }

        .hero-title {
          animation: slideInDown 0.7s ease-out;
        }

        .hero-subtitle {
          animation: slideInUp 0.7s ease-out 0.3s both;
        }

        .glow-badge {
          animation: slideInDown 0.7s ease-out 0.1s both;
          animation-fill-mode: both;
        }

        .search-card {
          animation: slideInUp 0.7s ease-out 0.4s both;
        }

        .crisis-banner {
          animation: slideInUp 0.7s ease-out 0.5s both;
        }

        .floating-icon {
          animation: float 6s ease-in-out infinite;
        }

        .service-card {
          animation: slideInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        ${Array.from({ length: 12 }).map((_, i) => `
          .service-card:nth-child(${i + 1}) {
            animation-delay: ${i * 0.08}s;
          }
        `).join('')}
      `}</style>

      {/* Hero Section - Major Redesign */}
      <div className="relative overflow-hidden py-20 md:py-40">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent"></div>
        
        {/* Animated decorative elements */}
        <div className="absolute top-20 right-10 opacity-10 floating-icon hidden lg:block">
          <BookOpen className="h-40 w-40 text-primary stroke-[0.5]" />
        </div>
        <div className="absolute bottom-10 left-20 opacity-15 floating-icon hidden lg:block" style={{animationDelay: '2s'}}>
          <Lightbulb className="h-32 w-32 text-primary stroke-[0.5]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary/10 border border-primary/30 mb-8 glow-badge group cursor-default">
              <Zap className="h-4 w-4 text-primary group-hover:animate-spin" />
              <span className="text-sm font-semibold text-primary">Explore Our Resources</span>
            </div>

            {/* Main title with gradient */}
            <h1 className="text-6xl md:text-7xl font-black mb-6 hero-title leading-tight">
              Find the Support
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                You Need
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 hero-subtitle max-w-2xl mx-auto leading-relaxed font-light">
              Access our comprehensive range of mental health services, guides, and resources tailored to support your unique journey toward wellness and recovery.
            </p>

            {/* CTA Button */}
            <div className="hero-subtitle">
              <Button
                size="lg"
                variant="hero"
                className="px-8 py-6 text-lg group font-semibold rounded-xl"
              >
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filters Card - Enhanced */}
        <div className="max-w-5xl mx-auto -mb-16 relative z-20 search-card">
          <Card className="shadow-2xl border-0 bg-white">
            <CardContent className="p-8 md:p-10">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Search & Filter</h2>
                <p className="text-muted-foreground">Find the exact resources you're looking for</p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search by title, description, or tags..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setPage(1);
                    }}
                    className="pl-12 h-12 text-base border-2 border-primary/20 rounded-xl focus:border-primary focus:ring-primary/20"
                  />
                </div>
                <ServiceFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  resultCount={data?.meta.totalItems}
                />
              </div>

              {/* Active Filters */}
              <ActiveFilters filters={filters} onRemoveFilter={handleRemoveFilter} />
            </CardContent>
          </Card>
        </div>

        {/* Spacer */}
        <div className="h-24"></div>

        {/* Crisis Alert Banner - Professional Design */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-secondary via-secondary/95 to-secondary/90 text-secondary-foreground rounded-lg p-8 md:p-12 relative overflow-hidden shadow-xl">
            {/* Animated background element */}
            <div className="absolute top-4 right-8 opacity-10">
              <Phone className="h-20 w-20 floating-icon" fill="currentColor" />
            </div>

            <style>{`
              .crisis-title {
                animation: slideInDown 0.6s ease-out;
              }

              .crisis-subtitle {
                animation: slideInUp 0.6s ease-out 0.2s both;
              }

              .crisis-content {
                animation: slideInUp 0.6s ease-out 0.4s both;
              }

              .floating-icon {
                animation: float 3s ease-in-out infinite;
              }
            `}</style>

            <div className="relative z-10">
              <div className="flex items-start gap-4 md:gap-6 mb-6">
                <div className="flex p-3 bg-secondary-foreground/10 rounded-lg flex-shrink-0">
                  <Phone className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-secondary-foreground crisis-title">
                    Need Immediate Help?
                  </h3>
                  <p className="text-sm md:text-base text-secondary-foreground/90 mt-1 crisis-subtitle">
                    If you're in crisis, reach out now — available 24/7
                  </p>
                </div>
              </div>

              <div className="crisis-content">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                  <a 
                    href={`tel:${CRISIS_HOTLINES.suicide.phone}`}
                    className="bg-secondary-foreground/15 hover:bg-secondary-foreground/25 transition-colors rounded-lg p-4 md:p-5"
                  >
                    <div className="text-xs md:text-sm font-semibold text-secondary-foreground/80 mb-1">
                      Suicide Prevention Lifeline
                    </div>
                    <div className="text-lg md:text-xl font-bold text-secondary-foreground">
                      {CRISIS_HOTLINES.suicide.phone}
                    </div>
                  </a>

                  <a 
                    href={`sms:${CRISIS_HOTLINES.crisis.phone}`}
                    className="bg-secondary-foreground/15 hover:bg-secondary-foreground/25 transition-colors rounded-lg p-4 md:p-5"
                  >
                    <div className="text-xs md:text-sm font-semibold text-secondary-foreground/80 mb-1">
                      Crisis Text Line
                    </div>
                    <div className="text-lg md:text-xl font-bold text-secondary-foreground">
                      Text {CRISIS_HOTLINES.crisis.phone}
                    </div>
                  </a>
                </div>

                <div className="text-xs md:text-sm text-secondary-foreground/80 font-medium">
                  ✓ Free & Confidential • ✓ 24/7 Support • ✓ Trained Counselors
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        {data && !isLoading && (
          <div className="max-w-5xl mx-auto mb-10 flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-muted-foreground">Results:</span>
              <span className="text-3xl font-bold text-foreground">{data.data.length}</span>
              <span className="text-muted-foreground">of</span>
              <span className="text-3xl font-bold text-primary">{data.meta.totalItems}</span>
              <span className="text-muted-foreground">services</span>
              {debouncedSearch && (
                <span className="text-muted-foreground">
                  for <span className="font-semibold text-foreground">"{debouncedSearch}"</span>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <ServiceListSkeleton count={12} />}

        {/* Error State */}
        {isError && (
          <Alert variant="destructive" className="my-8 max-w-5xl mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Loading Services</AlertTitle>
            <AlertDescription>
              {error instanceof Error ? error.message : 'Failed to load services. Please try again.'}
            </AlertDescription>
          </Alert>
        )}

        {/* Services Grid */}
        {!isLoading && !isError && data && (
          <>
            {data.data.length > 0 ? (
              <>
                <div className="max-w-5xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {data.data.map((resource, idx) => (
                      <div key={resource.id} className="service-card" style={{animationDelay: `${idx * 0.08}s`}}>
                        <ServiceCard resource={resource} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="max-w-5xl mx-auto text-center py-32">
                <div className="mb-8 p-8 bg-primary/10 rounded-3xl w-fit mx-auto">
                  <Search className="h-20 w-20 text-primary/60 mx-auto" />
                </div>
                <h3 className="text-4xl font-bold text-foreground mb-4">No Services Found</h3>
                <p className="text-muted-foreground mb-10 text-lg max-w-xl mx-auto">
                  Try adjusting your search or filters to find the support you're looking for
                </p>
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({});
                    setPage(1);
                  }}
                  className="group px-8 py-6 text-lg rounded-xl"
                >
                  Clear All Filters & Reset
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}

            {/* Enhanced Pagination */}
            {data.meta.totalPages > 1 && (
              <div className="max-w-5xl mx-auto mb-16">
                <div className="flex justify-center items-center gap-2 sm:gap-4">
                  <Button
                    variant="outline"
                    disabled={!data.meta.hasPrevPage}
                    onClick={() => {
                      setPage((p) => p - 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold group"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Previous
                  </Button>

                  <div className="px-4 sm:px-8 py-2 sm:py-3 bg-primary/10 rounded-lg border border-primary/20 flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Page</span>
                    <span className="text-2xl sm:text-3xl font-bold text-primary">{data.meta.currentPage}</span>
                    <span className="text-sm text-muted-foreground">of {data.meta.totalPages}</span>
                  </div>

                  <Button
                    variant="outline"
                    disabled={!data.meta.hasNextPage}
                    onClick={() => {
                      setPage((p) => p + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold group"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
