"use client";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { CardCarouselSkeleton } from "./ProductCardCarosoleSkeleton";

interface Props {
  slides?: number; // number of product cards to show
  tabsCount?: number; // number of tabs skeleton
}

export default function CardCarouselSectionSkeleton({
  slides = 5,
  tabsCount = 3,
}: Props) {
  return (
    <div className="bg-white my-5 p-8 space-y-5 rounded-lg">
      {/* Header & Tabs Skeleton */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          {Array.from({ length: tabsCount }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-6 w-20 sm:w-24 lg:w-28 rounded"
            />
          ))}
        </div>
        <Skeleton className="h-4 w-16 rounded" /> {/* View All */}
      </div>

      {/* Product Cards Skeleton - Grid Layout */}
     <CardCarouselSkeleton />
    </div>
  );
}
