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





export const ListCardCarousel = ({ products }: { products: Product[] }) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-full px-8"
    >
      <CarouselContent className="gap-4 ">
        {products?.map((product) => (
          <CarouselItem
            key={product.id}
            className="
              shrink-0
              basis-full
              sm:basis-1/2
              md:basis-1/3
              lg:basis-1/4
              
            "
          >
            <ProductCard
              product={product}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute w-10 h-20  left-0 top-1/2 -translate-y-1/2 z-10" />
      <CarouselNext className="absolute  w-10 h-20 right-0 top-1/2 -translate-y-1/2 z-10" />
    </Carousel>
  );
}
