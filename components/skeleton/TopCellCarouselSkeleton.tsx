"use client";

import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  slides?: number;
};

export default function CardCarouselSkeleton({ slides = 5 }: Props) {
  return (
    <div className="relative w-full max-w-full px-8">
      {/* Skeleton arrows */}
      <Skeleton className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-20 rounded-md" />
      <Skeleton className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-20 rounded-md" />

      {/* Carousel content skeleton */}
      <div className="flex gap-2 ml-2 sm:ml-0 overflow-hidden">
        {Array.from({ length: slides }).map((_, index) => (
          <div
            key={index}
            className="
              shrink-0
              basis-full
              sm:basis-1/2
              md:basis-1/3
              lg:basis-1/4
              xl:basis-1/5
              flex justify-center
            "
          >
            {/* Product Card Skeleton */}
            <div className="h-[450px] w-[220px] p-2 rounded-lg border space-y-4 flex flex-col">
              {/* Image */}
              <Skeleton className="h-[150px] w-[150px] mx-auto rounded-lg" />

              <Skeleton className="h-px w-full" />

              {/* Stock */}
              <Skeleton className="h-3 w-10 mx-auto" />

              {/* Title */}
              <Skeleton className="h-4 w-3/4 mx-auto" />

              {/* Price */}
              <div className="flex justify-center gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-3 w-10" />
              </div>

              {/* Badges */}
              <div className="flex justify-center gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>

              {/* Stock status */}
              <Skeleton className="h-4 w-20 mx-auto mt-auto" />

              {/* Variant images */}
              <div className="flex gap-2 justify-start">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-10 rounded" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
