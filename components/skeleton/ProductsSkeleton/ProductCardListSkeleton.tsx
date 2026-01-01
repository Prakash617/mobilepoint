"use client";

import { Skeleton } from "@/components/ui/skeleton";

const ProductCardListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 place-items-center gap-4">
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          className="cursor-pointer justify-center h-[450px] w-[220px] border border-gray-200 p-2 rounded-lg space-y-4 flex flex-col"
        >
          {/* Product Image */}
          <div className="relative w-[150px] h-[150px] mx-auto">
            <Skeleton className="w-full h-full rounded-md" />
            {/* Tag */}
            <Skeleton className="absolute top-2 -left-4 w-12 h-5 rounded-lg" />
          </div>

          <hr />

          {/* Title + Price */}
          <div className="space-y-1">
            <div className="flex justify-center items-center">
              <Skeleton className="h-3 w-8 rounded-sm" />
            </div>
            <Skeleton className="h-4 w-32 mx-auto rounded-sm" />
            <div className="flex flex-row items-end justify-center gap-2">
              <Skeleton className="h-4 w-16 rounded-sm" />
              <Skeleton className="h-3 w-12 rounded-sm" />
            </div>
          </div>

          {/* Free Shipping / Gift */}
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16 rounded-md" />
            <Skeleton className="h-5 w-16 rounded-md" />
          </div>

          {/* Stock */}
          <div className="mb-auto flex justify-center">
            <Skeleton className="h-4 w-20 rounded-sm" />
          </div>

          {/* Variant Images */}
          <div className="flex gap-2 mt-2 items-center justify-start">
            {Array.from({ length: 3 }).map((_, j) => (
              <Skeleton key={j} className="w-12 h-12 rounded-md" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardListSkeleton;
