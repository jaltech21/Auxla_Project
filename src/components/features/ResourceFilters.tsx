import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Filter, X } from 'lucide-react';
import { ResourceFilters as IResourceFilters, ResourceCategory, ResourceType } from '@/types';
import { RESOURCE_CATEGORIES } from '@/constants';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface ResourceFiltersProps {
  filters: IResourceFilters;
  onFiltersChange: (filters: IResourceFilters) => void;
  resultCount?: number;
}

const resourceTypes: { value: ResourceType; label: string }[] = [
  { value: 'article', label: 'Articles' },
  { value: 'video', label: 'Videos' },
  { value: 'podcast', label: 'Podcasts' },
  { value: 'worksheet', label: 'Worksheets' },
  { value: 'guide', label: 'Guides' },
  { value: 'tool', label: 'Tools' },
  { value: 'helpline', label: 'Helplines' },
];

export const ResourceFilters = ({
  filters,
  onFiltersChange,
  resultCount,
}: ResourceFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (category: ResourceCategory) => {
    onFiltersChange({
      ...filters,
      category: filters.category === category ? undefined : category,
    });
  };

  const handleTypeChange = (type: ResourceType) => {
    onFiltersChange({
      ...filters,
      type: filters.type === type ? undefined : type,
    });
  };

  const handleFeaturedToggle = () => {
    onFiltersChange({
      ...filters,
      featured: filters.featured === true ? undefined : true,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
    setIsOpen(false);
  };

  const activeFiltersCount = [
    filters.category,
    filters.type,
    filters.featured,
  ].filter(Boolean).length;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 relative">
          <Filter className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge
              variant="default"
              className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter Resources</SheetTitle>
          <SheetDescription>
            {resultCount !== undefined &&
              `Showing ${resultCount} ${resultCount === 1 ? 'result' : 'results'}`}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Categories */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Categories</Label>
            <div className="space-y-2">
              {RESOURCE_CATEGORIES.map((category) => (
                <div key={category.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.value}`}
                    checked={filters.category === category.value}
                    onCheckedChange={() =>
                      handleCategoryChange(category.value as ResourceCategory)
                    }
                  />
                  <Label
                    htmlFor={`category-${category.value}`}
                    className="text-sm font-normal cursor-pointer flex-1"
                  >
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Resource Types */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Resource Types</Label>
            <div className="space-y-2">
              {resourceTypes.map((type) => (
                <div key={type.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type.value}`}
                    checked={filters.type === type.value}
                    onCheckedChange={() => handleTypeChange(type.value)}
                  />
                  <Label
                    htmlFor={`type-${type.value}`}
                    className="text-sm font-normal cursor-pointer flex-1"
                  >
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Featured */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Other Filters</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={filters.featured === true}
                onCheckedChange={handleFeaturedToggle}
              />
              <Label htmlFor="featured" className="text-sm font-normal cursor-pointer flex-1">
                Featured resources only
              </Label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button onClick={() => setIsOpen(false)} className="flex-1">
              Apply Filters
            </Button>
            {activeFiltersCount > 0 && (
              <Button onClick={clearFilters} variant="outline" className="gap-2">
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Active Filters Display Component
interface ActiveFiltersProps {
  filters: IResourceFilters;
  onRemoveFilter: (key: keyof IResourceFilters) => void;
}

export const ActiveFilters = ({ filters, onRemoveFilter }: ActiveFiltersProps) => {
  const activeFilters: Array<{ key: keyof IResourceFilters; label: string }> = [];

  if (filters.category) {
    const category = RESOURCE_CATEGORIES.find((c) => c.value === filters.category);
    if (category) {
      activeFilters.push({ key: 'category', label: category.label });
    }
  }

  if (filters.type) {
    const type = resourceTypes.find((t) => t.value === filters.type);
    if (type) {
      activeFilters.push({ key: 'type', label: type.label });
    }
  }

  if (filters.featured) {
    activeFilters.push({ key: 'featured', label: 'Featured' });
  }

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      {activeFilters.map((filter) => (
        <Badge
          key={filter.key}
          variant="secondary"
          className="gap-1 cursor-pointer hover:bg-secondary/80"
          onClick={() => onRemoveFilter(filter.key)}
        >
          {filter.label}
          <X className="h-3 w-3" />
        </Badge>
      ))}
    </div>
  );
};
