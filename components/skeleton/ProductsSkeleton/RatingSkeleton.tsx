"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function StarFilterSkeleton() {
  return (
    <div className="flex flex-col space-y-4">
      {Array.from({ length: 5 }).map((_, i) => {
        const starsCount = 5 - i; // descending stars
        return (
          <div key={i} className="flex items-center gap-2">
            {/* Checkbox skeleton */}
            <Skeleton className="h-5 w-5 rounded-sm" />

            {/* Stars + count skeleton */}
            <div className="flex items-center gap-1">
              {Array.from({ length: starsCount }).map((_, j) => (
                <Skeleton key={j} className="h-4 w-4 rounded-sm" />
              ))}
              <Skeleton className="h-4 w-6 ml-2" /> {/* count */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
