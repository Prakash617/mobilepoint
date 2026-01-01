"use client";

import { Skeleton } from "@/components/ui/skeleton";
import DynamicBreadcrumbSkeleton from "./BreadcrumsSkeleton";
import HomeCarouselSkeleton from "./ProductCarouselSkeleton";
import PriceRangeSliderSkeleton from "./PriceRangeSliderSkeleton";
import StarFilterSkeleton from "./RatingSkeleton";
import ListCardCarouselSkeleton from "./ListCardCarouselProductsSkeleton";
import ProductCardListSkeleton from "./ProductCardListSkeleton";
import PaginationBarSkeleton from "./PaginationSkeleton";
import RecentlyViewedSkeleton from "../AdsRecentViewSkeleton";

const ProductListSkeleton = () => {
  return (
    <>
      {/* Breadcrumb */}
      <DynamicBreadcrumbSkeleton />

      {/* Top banner section */}
      <div className="p-4 bg-white rounded-lg space-y-8">
        <Skeleton className="h-6 w-64" />

        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-2/3 w-full">
            <HomeCarouselSkeleton />
          </div>

          <div className="md:w-1/3 w-full relative">
            <Skeleton className="h-[310px] rounded-lg" />
          </div>
        </div>
      </div>

      {/* Popular categories */}
      <div className="p-4 bg-white rounded-lg space-y-8 my-2">
        <Skeleton className="h-6 w-56" />

        <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="w-[55px] h-[55px] rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white my-2 flex flex-col md:flex-row gap-4 p-4 rounded-lg">
        {/* ================= SIDEBAR ================= */}
        <div className="md:w-1/4 w-full space-y-4">
          {/* Categories */}
          <div className="rounded-lg p-6 space-y-6 bg-gray h-auto">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-40 rounded-lg" />
            <Skeleton className="h-4 w-48" />

            <div className="space-y-3">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                  
                  
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="rounded-lg p-6 space-y-6 bg-gray">
            <div className="flex justify-between ">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Active filters */}
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-7 w-25 rounded-lg" />
              ))}
            </div>

            {/* Brand */}
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-full rounded-sm" />

            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-4 w-8" />
                </div>
              ))}
            </div>

            <hr className="h-px bg-gray-300 border-0" />

            {/* Price */}
            <PriceRangeSliderSkeleton />

            <hr className="h-px bg-gray-300 border-0" />

            {/* Rating */}
            <Skeleton className="h-4 w-24 " />
           <StarFilterSkeleton />

            <hr className="h-px bg-gray-300 border-0" />

            {/* Screen Size */}
            <Skeleton className="h-4 w-28 " />
            <div className="flex flex-wrap gap-2  ">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-7 w-20 rounded-lg" />
              ))}
            </div>

            <hr className="h-px bg-gray-300 border-0" />

            {/* Color */}
            <Skeleton className="h-4 w-20" />
            <div className="flex flex-wrap gap-2 pr-10 ">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="w-8 h-8 rounded-md" />
              ))}
            </div>

            <hr className="h-px bg-gray-300 border-0" />

            {/* Memory */}
            <Skeleton className="h-4 w-24" />
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-6 w-30 rounded-lg" />
                  <Skeleton className="h-4 w-5" />
                </div>
              ))}
            </div>

            <hr className="h-px bg-gray-300 border-0" />

            {/* Conditions */}
            <Skeleton className="h-4 w-28" />
            <div className="space-y-3 ">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-6 w-24 rounded-lg" />
                  <Skeleton className="h-4 w-8" />
                </div>
              ))}
            </div>

            <hr className="h-px bg-gray-300 border-0 " />
          </div>

          {/* Sidebar ad */}
          <Skeleton className="my-2 w-full h-[300px] rounded-lg bg-gray-300 " />
        </div>

        {/* ================= PRODUCT AREA ================= */}
        <div className="rounded-lg w-full md:w-3/4 border-2 p-4 space-y-6 ">
          <Skeleton className="h-6 w-72 " />
          

            <ListCardCarouselSkeleton />
           

            <div className="flex flex-1 flex-col gap-2">
      <div className="flex items-center flex-wrap gap-2 font-normal text-xs text-secondary">
        {/* Results count */}
        <div className="flex-1">
          <Skeleton className="h-4 w-24 rounded-sm" />
        </div>

        {/* Show item section (first) */}
        <div className="flex-1 flex items-center gap-2">
          <div>
            <Skeleton className="h-4 w-12 rounded-sm" />
          </div>
          <div className="flex flex-row rounded-sm w-30 h-10 bg-gray-100 justify-around items-center gap-1">
            <Skeleton className="h-4 w-4 rounded-sm" />
            <Skeleton className="h-4 w-4 rounded-sm" />
            <Skeleton className="h-4 w-4 rounded-sm" />
          </div>
        </div>

        {/* Show item section (second) */}
        <div className="flex-1 flex items-center gap-2 ">
          <Skeleton className="h-4 w-12 rounded-sm" />
          <div>
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>
        </div>

        {/* View As */}
        <div className="px-2 flex-1 text-center">
          <Skeleton className="h-4 w-16 mx-auto rounded-sm" />
        </div>
      </div>
    </div>

          <ProductCardListSkeleton />

          <PaginationBarSkeleton />
        </div>
      </div>

      {/* Bottom ad */}
      <RecentlyViewedSkeleton />
    </>
  );
};

export default ProductListSkeleton;
