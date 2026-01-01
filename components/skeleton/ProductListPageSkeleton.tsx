import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "./ProductCardSkeleton";
import HomeCarouselSkeleton from "./HomeCarouselSkeleton";
import AdsRecentViewSkeleton from "./AdsRecentViewSkeleton";

const ProductListPageSkeleton = () => {
  return (
    <div className="p-4">
      {/* DynamicBreadcrumb Skeleton */}
      <Skeleton className="h-6 w-1/4 mb-4" />

      {/* HomeCarousel Skeleton */}
      <div className="p-4 bg-white rounded-lg space-y-8">
        <Skeleton className="h-8 w-1/3 mb-4" /> {/* Title */}
        <div className="flex flex-col md:flex-row gap-4 rounded-lg bg-white ">
          <div className="w-2/3">
            <HomeCarouselSkeleton />
          </div>
          <Skeleton className="w-1/3 h-[200px] rounded-lg" />{" "}
          {/* Ad banner */}
        </div>
      </div>

      {/* Popular Categories Skeleton */}
      <div className="p-4 bg-white rounded-lg space-y-8 my-2">
        <Skeleton className="h-8 w-1/3 mb-4" /> {/* Title */}
        <div className="w-full grid md:grid-cols-5 grid-cols-2 sm:grid-cols-3 gap-4 place-items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex w-full items-center justify-between bg-white rounded-lg p-2 sm:p-3"
            >
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area Skeleton */}
      <div className="bg-white my-2 flex flex-col md:flex-row gap-4 p-4 rounded-lg">
        {/* Left Sidebar (CategoriesFilter) Skeleton */}
        <div className="md:w-1/4 w-full space-y-4">
          <Skeleton className="h-[200px] w-full rounded-lg" /> {/* Filter block */}
          <Skeleton className="h-[100px] w-full rounded-lg" /> {/* Price filter */}
          <Skeleton className="h-[150px] w-full rounded-lg" /> {/* Other filters */}
          <Skeleton className="h-[300px] w-full rounded-lg" /> {/* Ad banner */}
        </div>

        {/* Right Content Area Skeleton */}
        <div className="rounded-lg w-full border-2 border-gray p-4 md:w-3/4">
          {/* Best Seller in this category Skeleton */}
          <Skeleton className="h-8 w-1/2 mb-4" /> {/* Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 place-items-center">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>

          <Skeleton className="h-1 w-full my-8" /> {/* Horizontal line */}

          {/* Filtered products controls skeleton */}
          <div className="flex items-center flex-wrap gap-2 mb-4">
            <Skeleton className="h-4 w-32" /> {/* Result count */}
            <Skeleton className="h-8 w-24" /> {/* Show item dropdown */}
            <Skeleton className="h-8 w-24" /> {/* Sort By dropdown */}
            <Skeleton className="h-4 w-16" /> {/* View As */}
          </div>

          {/* Filtered products list Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 place-items-center">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="my-4 flex justify-center">
            <Skeleton className="h-8 w-64" />
          </div>
        </div>
      </div>

      {/* AdsRecentview Skeleton */}
      <AdsRecentViewSkeleton />
    </div>
  );
};

export default ProductListPageSkeleton;
