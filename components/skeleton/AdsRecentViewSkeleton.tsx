"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type Props = {
  count?: number;
};

export default function RecentlyViewedSkeleton({ count = 6 }: Props) {
  return (
    <div className="pb-2">
      <div className="w-full bg-white rounded-xl border p-5 shadow-sm">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4 items-center">
            <Skeleton className="h-4 w-44 rounded-md" />
            <Skeleton className="h-3 w-14 rounded-md" />
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>

        {/* CAROUSEL */}
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="-ml-4">
            {Array.from({ length: count }).map((_, idx) => (
              <CarouselItem
                key={idx}
                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4"
              >
                <div className="flex flex-col md:flex-row items-center rounded-lg p-3 h-full gap-3">
                  
                  {/* IMAGE + TAGS */}
                  <div className="relative">
                    {/* Tag placeholder */}
                    <Skeleton className="absolute top-4 left-1 h-5 w-10 rounded-sm z-10" />

                    {/* Image */}
                    <div className="relative w-[90px] h-[90px] mx-auto mt-5">
                      <Skeleton className="absolute inset-0 rounded-md 
                        bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
                    </div>
                  </div>

                  {/* TEXT */}
                  <div className="mt-3 md:mt-0 text-left w-full">
                    {/* Product name (2 lines) */}
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-4/5 rounded-md mt-1" />

                    {/* Price */}
                    <Skeleton className="h-5 w-20 mt-2 rounded-md" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
