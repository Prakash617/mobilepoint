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

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  tag?: boolean;
  tag_text?: string;
  tagColor?: string;
  tagPrice?: string | null;
  free_shipping?: boolean;
  free_gift?: boolean;
  new?: boolean;
  sub_images?: string[];
  in_stock?: boolean;
  quantity?: number;
};

type CardCarouselProps = {
  products: Product[];
};

export function ListCardCarousel({ products }: CardCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-full px-8"
    >
      <CarouselContent className="gap-4 ">
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="
              flex-shrink-0
              basis-full
              sm:basis-1/2
              md:basis-1/3
              lg:basis-1/4
              
            "
          >
            <ProductCard
              name={product.name}
              price={product.price}
              image={product.image}
              tag={product.tag_text}
              tagColor={product.tagColor}
              tagPrice={product.tagPrice ? Number(product.tagPrice) : undefined}
              free_shipping={product.free_shipping}
              free_gift={product.free_gift}
              new={product.new}
              sub_images={product.sub_images}
              slug={product.slug}
              in_stock={product.in_stock ?? true}
              quantity={product.quantity}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute w-[40px] h-[80px]  left-0 top-1/2 -translate-y-1/2 z-10" />
      <CarouselNext className="absolute  w-[40px] h-[80px] right-0 top-1/2 -translate-y-1/2 z-10" />
    </Carousel>
  );
}
