import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { BlogFilters } from "@/types/blog";

interface BlogFiltersProps {
  filters: BlogFilters;
  onFiltersChange: (filters: BlogFilters) => void;
  onSearch: (query: string) => void;
}

const categories = [
  { value: "wellness-tips", label: "Wellness Tips" },
  { value: "mental-health", label: "Mental Health" },
  { value: "community", label: "Community" },
  { value: "personal-stories", label: "Personal Stories" },
  { value: "research", label: "Research" },
  { value: "treatment", label: "Treatment" },
  { value: "prevention", label: "Prevention" },
];

const BlogFiltersComponent = ({ filters, onFiltersChange, onSearch }: BlogFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryToggle = (category: string) => {
    onFiltersChange({
      ...filters,
      category: filters.category === category ? undefined : (category as any),
    });
  };

  const handleFeaturedToggle = () => {
    onFiltersChange({
      ...filters,
      featured: filters.featured === undefined ? true : filters.featured ? undefined : true,
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    onFiltersChange({});
    onSearch("");
  };

  const activeFilterCount = [
    filters.category,
    filters.featured,
    filters.search,
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              onSearch("");
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {/* Filters Sheet & Active Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Filter Sheet Trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Articles</SheetTitle>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {/* Category Filter */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Category</Label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.value}
                        checked={filters.category === category.value}
                        onCheckedChange={() => handleCategoryToggle(category.value)}
                      />
                      <label
                        htmlFor={category.value}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Filter */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Special</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={filters.featured === true}
                    onCheckedChange={handleFeaturedToggle}
                  />
                  <label
                    htmlFor="featured"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Featured Articles
                  </label>
                </div>
              </div>

              {/* Clear Filters Button */}
              {activeFilterCount > 0 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    handleClearFilters();
                    setIsOpen(false);
                  }}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Active Filter Badges */}
        {filters.category && (
          <Badge
            variant="secondary"
            className="gap-1 cursor-pointer hover:bg-secondary/80"
            onClick={() => handleCategoryToggle(filters.category!)}
          >
            {categories.find((c) => c.value === filters.category)?.label}
            <X className="h-3 w-3" />
          </Badge>
        )}

        {filters.featured && (
          <Badge
            variant="secondary"
            className="gap-1 cursor-pointer hover:bg-secondary/80"
            onClick={handleFeaturedToggle}
          >
            Featured
            <X className="h-3 w-3" />
          </Badge>
        )}

        {filters.search && (
          <Badge
            variant="secondary"
            className="gap-1 cursor-pointer hover:bg-secondary/80"
            onClick={() => {
              setSearchQuery("");
              onSearch("");
            }}
          >
            Search: {filters.search}
            <X className="h-3 w-3" />
          </Badge>
        )}

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
};

export default BlogFiltersComponent;
