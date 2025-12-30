import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const AdsCardsSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2 my-2">
      
      {/* LEFT CARD SKELETON */}
      <div className="w-full md:w-1/2 relative rounded-lg h-[180px] overflow-hidden">
        {/* Background image */}
        <Skeleton className="w-full h-full rounded-lg" />

        {/* Overlay text */}
        <div className="absolute top-1/2 right-4 md:right-12 -translate-y-1/2 pl-4 space-y-2">
          <Skeleton className="h-8 md:h-10 w-28" />
          <Skeleton className="h-3 md:h-4 w-44" />
          <Skeleton className="h-3 md:h-4 w-36" />
        </div>
      </div>

      {/* RIGHT CARD SKELETON */}
      <div className="w-full md:w-1/2 relative rounded-lg h-[180px] overflow-hidden">
        {/* Background image */}
        <Skeleton className="w-full h-full rounded-lg" />

        {/* Overlay content */}
        <div className="absolute top-1/2 left-2 md:left-6 -translate-y-1/2 pl-4 w-[90%] md:w-auto">
          <div className="space-y-4">
            
            {/* Title + description */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="space-y-1">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-20" />
              </div>

              <div className="space-y-1">
                <Skeleton className="h-3 w-44" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>

            {/* Input + button */}
            <div className="flex flex-col sm:flex-row w-full sm:w-[310px] items-center bg-muted rounded-sm h-9 overflow-hidden gap-2 sm:gap-0">
              <Skeleton className="h-full flex-1" />
              <Skeleton className="h-5 w-20 mx-2" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdsCardsSkeleton;
