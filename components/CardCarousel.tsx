import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

type CardCarouselProps = {
  products: Product[];
};

export function CardCarousel({ products }: CardCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-full px-8"
    >
      <CarouselContent className="gap-2 ml-2 sm:ml-0">
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="
              flex-shrink-0
              basis-full
              sm:basis-1/2
              md:basis-1/3
              lg:basis-1/4
              xl:basis-1/5
            "
          >
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute w-[40px] h-[80px]  left-0 top-1/2 -translate-y-1/2 z-10" />
      <CarouselNext className="absolute  w-[40px] h-[80px] right-0 top-1/2 -translate-y-1/2 z-10" />
    </Carousel>
  );
}
