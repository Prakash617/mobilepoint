"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function PriceRangeSliderSkeleton() {
  return (
    <div className="w-full space-y-4">
      <Skeleton className="h-4 w-16 rounded-full" />


      {/* Slider track */}
      <Skeleton className="h-4 w-full rounded-full" />

      {/* Min / Max inputs and Go button */}
      <div className="flex flex-row items-center  gap-2">
        {/* Min input */}
        <div className="flex items-center gap-2 bg-white border border-gray-300 p-3 rounded-md">
          <Skeleton className="h-3 w-6" /> {/* Rs. label */}
          <Skeleton className="h-4 w-6 rounded-sm" /> {/* min input */}
        </div>

        {/* Dash separator */}
        <div className="flex items-center">
          <Skeleton className="h-0.5 w-4" />
        </div>

        {/* Max input */}
        <div className="flex  items-center gap-2 bg-white border border-gray-300 p-3 rounded-md">
          <Skeleton className="h-3 w-6" /> {/* Rs. label */}
          <Skeleton className="h-4 w-6 rounded-sm " /> {/* max input */}
        </div>

        {/* Go button */}
        <Skeleton className="h-10 w-14 rounded-lg" />
      </div>
    </div>
  );
}
