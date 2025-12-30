"use client";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  slides?: number; // number of carousel slides to render
  categoriesCount?: number; // number of category skeletons
  adsCount?: number; // number of ad skeletons
}

export default function HomeCarouselSectionSkeleton({
  slides = 3,
  categoriesCount = 5,
  adsCount = 4,
}: Props) {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Mobile Layout (< 768px) */}
      <div className="flex flex-col gap-4 md:hidden">
        {/* Carousel Skeleton */}
        <div className="rounded-lg overflow-hidden">
          <div className="relative w-full flex flex-col gap-4">
            {Array.from({ length: slides }).map((_, index) => (
              <div
                key={index}
                className="relative w-full h-[310px] rounded-lg overflow-hidden bg-gray-200"
              >
                {/* Image Skeleton */}
                <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />

                {/* Text Overlay Skeleton */}
                <div className="absolute top-1/2 left-8 -translate-y-1/2 w-1/2 space-y-3">
                  <Skeleton className="h-6 w-3/4 rounded" /> {/* Title */}
                  <Skeleton className="h-4 w-1/2 rounded" /> {/* Subtitle */}
                  <Skeleton className="h-3 w-full rounded" /> {/* Description */}
                  <Skeleton className="h-8 w-32 rounded" /> {/* Button */}
                </div>
              </div>
            ))}

            {/* Indicators Skeleton */}
            <div className="flex justify-end items-center gap-2 px-4 py-2 bg-white rounded-full w-max ml-auto">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
        </div>

        {/* Categories Skeleton */}
        <div className="rounded-xl bg-white text-left py-4 px-6 space-y-2">
          <Skeleton className="h-4 w-24 rounded" /> {/* Sale label */}
          {Array.from({ length: categoriesCount }).map((_, index) => (
            <Skeleton key={index} className="h-3 w-3/4 rounded" />
          ))}
        </div>

        {/* Ads Skeleton 2x2 grid */}
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: adsCount }).map((_, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden bg-gray-200"
            >
              <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout (>1024px) */}
      <div className="hidden lg:grid grid-layout gap-2">
        {/* Left Side Categories Skeleton */}
        <div className="area-left-side rounded-xl bg-white text-left py-6 px-10 space-y-2">
          <Skeleton className="h-4 w-28 rounded" /> {/* Sale label */}
          {Array.from({ length: categoriesCount }).map((_, index) => (
            <Skeleton key={index} className="h-3 w-3/4 rounded" />
          ))}
        </div>

        {/* Carousel Skeleton */}
        <div className="area-mid-main rounded-lg overflow-hidden">
          <div className="relative w-full flex flex-col gap-4">
            {Array.from({ length: slides }).map((_, index) => (
              <div
                key={index}
                className="relative w-full h-[310px] rounded-lg overflow-hidden bg-gray-200"
              >
                {/* Image Skeleton */}
                <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />

                {/* Text Overlay Skeleton */}
                <div className="absolute top-1/2 left-8 -translate-y-1/2 w-1/2 space-y-3">
                  <Skeleton className="h-6 w-3/4 rounded" /> {/* Title */}
                  <Skeleton className="h-4 w-1/2 rounded" /> {/* Subtitle */}
                  <Skeleton className="h-3 w-full rounded" /> {/* Description */}
                  <Skeleton className="h-8 w-32 rounded" /> {/* Button */}
                </div>
              </div>
            ))}

            {/* Indicators Skeleton */}
            <div className="flex justify-end items-center gap-2 px-4 py-2 bg-white rounded-full w-max ml-auto">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
        </div>

        {/* Right Ads Skeleton */}
       <div className="area-right-side grid grid-rows-2 gap-2">
      
      {/* AD 1 */}
      <div className="my-border relative rounded-lg overflow-hidden">
        <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />
      </div>

      {/* AD 2 */}
      <div className="my-border relative rounded-lg overflow-hidden">
        <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />
      </div>

    </div>

        {/* Middle ads left/right */}
        <div className="area-main-left relative">
          <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />
        </div>
        <div className="area-main-right relative">
          <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
