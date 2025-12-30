"use client";
import React from "react";
import Image from "next/image";
import Navigation from "./Navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRecentlyViewed } from "@/hooks/useProducts";
import Link from "next/link";
import RecentlyViewedSkeleton from "./skeleton/AdsRecentViewSkeleton";

function Adsrecentview() {
  const { data, isLoading, error } = useRecentlyViewed({ limit: 10 });

  const [api, setApi] = React.useState<CarouselApi>();
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    if (!api) return;
  }, [api]);

  // 🔒 NOT logged in or forbidden → don't show component
  if (error) return <p className="text-xs text-gray-500">
            Need to be logged in to see recently viewed products.
          </p>;

  // ⏳ loading → don't show component
  if (isLoading) return <RecentlyViewedSkeleton />;

  // 📭 no recently viewed items
  if (!data || data.length === 0) return null;

  return (
    <div className="pb-2">
      <div className="w-full bg-white rounded-xl border p-5 shadow-sm">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4 items-center">
            <h2 className="font-semibold text-sm md:text-base">
              YOUR RECENTLY VIEWED
            </h2>
            <button className="text-xs text-gray-500">
              View All
            </button>
          </div>
      
          <Navigation
            variant="outlined"
            onNext={() => api?.scrollNext()}
            onPrevious={() => api?.scrollPrev()}
          />
        </div>

        {/* CAROUSEL */}
        <Carousel
          opts={{ align: "start" }}
          setApi={setApi}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          plugins={[plugin.current]}
        >
          <CarouselContent className="-ml-4">
            {data.map((item) => {
              const product = item.product;
              const variant = product.default_variant;

              return (
                <CarouselItem
                  key={item.id}
                  className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4"
                >
                  <Link href={`/products/${product.slug}`} className="flex flex-col md:flex-row items-center rounded-lg p-3 h-full">
                    <div className="relative">
                      {product.is_new && (
                        <span className="absolute top-4 left-1 z-10 bg-black text-white text-[10px] px-2 py-1 rounded-sm">
                          NEW
                        </span>
                      )}

                      {product.discount && (
                        <span className="absolute top-4 left-1 z-10 bg-primary text-white text-[10px] px-2 py-1 rounded-md">
                          SAVE <br />
                          {product.discount.percentage}%
                        </span>
                      )}
                      {product.primary_image && (
                      <div className="relative w-[90px] h-[90px] mx-auto mt-5">
                        <Image
                          src={product.primary_image}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
            )}
                    </div>

                    <div className="mt-3 text-left">
                      <p className="text-xs text-black font-bold">
                        {product.name}
                      </p>

                      <p className="text-sm mt-1 font-semibold text-black">
                        Rs. {variant?.price}
                      </p>
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export default Adsrecentview;
