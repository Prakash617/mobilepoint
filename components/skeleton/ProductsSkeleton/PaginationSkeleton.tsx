"use client";

import { Skeleton } from "@/components/ui/skeleton";

const PaginationBarSkeleton = () => {
  const totalButtons = 5; // approximate number of visible buttons including ellipsis

  return (
    <div className="flex justify-center gap-2 mt-4">
      {/* Previous button */}
      <Skeleton className="h-11 w-11 rounded-md" />

      {/* Page buttons */}
      {Array.from({ length: totalButtons }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-11 w-11 rounded-md"
        />
      ))}

      {/* Next button */}
      <Skeleton className="h-11 w-11 rounded-md" />
    </div>
  );
};

export default PaginationBarSkeleton;
