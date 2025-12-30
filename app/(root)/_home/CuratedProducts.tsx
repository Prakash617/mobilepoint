"use client";

import React from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useCurated } from "@/hooks/useCurated";
import Link from "next/link";
import CuratedForYouCarouselSkeleton from "@/components/skeleton/CuratedProductsSkeleton";

const CuratedProductsCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();

  // Fetch curated items from API
  const { data, isLoading, error } = useCurated();

  const products = data?.results || [];

  if (isLoading) return <CuratedForYouCarouselSkeleton />;
  if (error) return <div>Failed to load curated products</div>;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold uppercase">
          Curated For You
        </h2>

        <Navigation
          variant="outlined"
          onNext={() => api?.scrollNext()}
          onPrevious={() => api?.scrollPrev()}
        />
      </div>

      {/* CAROUSEL */}
      <Carousel opts={{ align: "start" }} setApi={setApi} className="w-full">
        <CarouselContent className="-ml-4 my-1">
          {products.map((product) =>
            product.image ? (
              <CarouselItem
                key={product.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4"
              >
                <div className="bg-white rounded-lg overflow-hidden h-full">
                  {/* IMAGE */}
                  <div className="relative h-[230px] flex items-center justify-center p-4">
                    <Image
                      src={product.image}
                      alt={product.title || "curated item"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="py-4 space-y-3 flex flex-col ">
                    <h3 className="font-extrabold text-md mb-2 line-clamp-2">
                      {product.title}
                    </h3>

                    {product.subtitle && (
                      <p className="text-xs text-gray-500  line-clamp-2">
                        {product.subtitle}
                      </p>
                    )}

                    {product.button_text && (
                      <Link href={product.link_url || '#'} className="border border-primary rounded-lg hover:bg-primary duration-300 ease-in-out hover:text-white w-[120px] text-primary py-2 px-4 text-xs font-semibold inline-block text-center cursor-pointer">
                        {product.button_text}
                      </Link>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ) : null
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CuratedProductsCarousel;
