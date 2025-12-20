import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BlogCardSkeleton = () => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      {/* Image Skeleton */}
      <Skeleton className="aspect-video w-full" />

      <CardHeader className="space-y-3">
        {/* Category Badge Skeleton */}
        <Skeleton className="h-5 w-24" />

        {/* Title Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Excerpt Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Tags Skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-14" />
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4 flex-col items-start gap-3">
        {/* Author Skeleton */}
        <div className="flex items-center gap-3 w-full">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>

        {/* Meta Info Skeleton */}
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-4">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

// Component to render multiple skeletons
export const BlogListSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default BlogCardSkeleton;
