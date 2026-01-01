"use client";

import { Skeleton } from "@/components/ui/skeleton";

const HomeCarouselSkeleton = () => {
  return (
    <div className="relative w-full">
      {/* Main carousel slide */}
      <div className="relative w-full h-[310px] rounded-lg overflow-hidden">
        {/* Background image */}
        <Skeleton className="absolute inset-0 rounded-lg" />

        {/* Text content */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 w-1/2 space-y-6 px-10">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-6 w-1/2" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <Skeleton className="h-10 w-32 rounded-[10px]" />
        </div>
      </div>

      {/* Indicator */}
      <div className="absolute bottom-4 right-8 px-4 py-2 flex items-center gap-2 rounded-full bg-white">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
    </div>
  );
};

export default HomeCarouselSkeleton;
