"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ListCardCarouselSkeleton() {
  const skeletonItems = Array.from({ length: 8 });

  return (
    <div className="relative w-full max-w-full px-8">
      {/* CarouselContent mimic */}
      <div className="flex gap-4 overflow-hidden pb-4">
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="
              shrink-0
              basis-full
              sm:basis-1/2
              md:basis-1/3
              lg:basis-1/4
            "
          >
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </div>
        ))}
      </div>

      {/* Previous & Next buttons skeleton */}
      <Skeleton className="absolute w-10 h-20 left-0 top-1/2 -translate-y-1/2 z-10" />
      <Skeleton className="absolute w-10 h-20 right-0 top-1/2 -translate-y-1/2 z-10" />
    </div>
  );
}
