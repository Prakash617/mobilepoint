'use client';

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCardSkeleton from "./ProductCardSkeleton";

type CardCarouselSkeletonProps = {
  count?: number; // number of skeleton cards to show
  variantsCount?: number; // variant images per card
};

export function CardCarouselSkeleton({
  count = 5,
  variantsCount = 3,
}: CardCarouselSkeletonProps) {
  return (
    <Carousel
      opts={{ align: "start" }}
      className="w-full max-w-full px-8"
    >
      <CarouselContent className="gap-2 ml-2 sm:ml-0">
        {Array.from({ length: count }).map((_, idx) => (
          <CarouselItem
            key={idx}
            className="
              shrink-0
              basis-full
              sm:basis-1/2
              md:basis-1/3
              lg:basis-1/4
              xl:basis-1/5
            "
          >
            <ProductCardSkeleton  />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute w-10 h-20 left-0 top-1/2 -translate-y-1/2 z-10" />
      <CarouselNext className="absolute w-10 h-20 right-0 top-1/2 -translate-y-1/2 z-10" />
    </Carousel>
  );
}
