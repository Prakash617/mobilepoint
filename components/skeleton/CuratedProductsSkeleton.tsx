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

export default function CuratedCarouselSkeleton({ count = 4 }: Props) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-6 w-48 rounded-md" />

        <div className="flex gap-2">
          <Skeleton className="h-8 w-16 rounded-md" />
         
        </div>
      </div>

      {/* CAROUSEL */}
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent className=" my-1">
          {Array.from({ length: count }).map((_, idx) => (
            <CarouselItem
              key={idx}
              className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4"
            >
              <div className="bg-white rounded-lg overflow-hidden h-full">
                
                {/* IMAGE (matches original exactly) */}
                <div className="relative h-60 ">
                  <Skeleton className="absolute inset-2 rounded-top-lg 
                    bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
                </div>

                {/* CONTENT */}
                <div className="py-4 space-y-3 flex flex-col">
                  
                  {/* Title (2 lines) */}
                  <Skeleton className="h-5 w-5/6 rounded-md" />
                 

                  {/* Subtitle (2 lines) */}
                  <Skeleton className="h-4 w-full rounded-md" />
                  

                  {/* Button */}
                  <Skeleton className="h-8 w-[120px] rounded-lg mt-1" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
