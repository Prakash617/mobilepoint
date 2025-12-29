"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "./ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useCarousels } from "@/hooks/useCarousels";
import Link from "next/link";
import type { Carousel as CarouselType, CarouselSlide } from "@/types/carousel"; // type alias

const HomeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | undefined>(undefined);

  const {
    data: carousels,
    isLoading,
    error,
  } = useCarousels({
    position: "home_main",
  });

  /** ✅ Hooks MUST run every render */
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
      return;
    };
  }, [api]);


const carouselData: CarouselSlide[] =
  carousels?.results
    ?.flatMap((carousel: CarouselType) => carousel.slides ?? [])
    .filter((slide: CarouselSlide) => slide.is_active)
    .sort((a: CarouselSlide, b: CarouselSlide) => a.order - b.order) ?? [];



  /** ✅ Render logic AFTER hooks */
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading carousel</div>;
  }

  if (carouselData.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <Carousel
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        setApi={setApi}
        className="w-full"
        opts={{ align: "start" }}
      >
        <CarouselContent>
          {carouselData.map((item:CarouselSlide, index:number) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[310px] rounded-lg">
                {item.image && (
                  
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover -z-10 rounded-lg"
                />
                )}

                <div className="w-1/2 space-y-7 px-10 text-white font-bold absolute top-1/2 left-8 -translate-y-1/2">
                  <p className="text-2xl">
                    {item.title} <br />
                    {item.subtitle && (
                      <span className="text-xl font-medium">
                        {item.subtitle}
                      </span>
                    )}
                  </p>

                  {item.description && (
                    <p className="font-extralight whitespace-pre-line">
                      {item.description}
                    </p>
                  )}

                  {item.link_url && (
                    <Link href={item.link_url} className="bg-white px-4 py-2 font-medium text-black rounded-[10px]">
                      {item.link_text || "Buy Now"}
                    </Link>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Indicators */}
        <div className="absolute bottom-4 right-8 px-4 py-2 flex items-center gap-1 rounded-full bg-white text-black text-sm font-semibold">
          <button
            onClick={() => api?.scrollPrev()}
            className="text-[#B3B3B3] hover:text-black"
          >
            <MdChevronLeft size={24} />
          </button>

          <div className="font-medium">
            <span>{currentIndex + 1}</span>
            <span className="mx-1">/</span>
            <span>{carouselData.length}</span>
          </div>

          <button
            onClick={() => api?.scrollNext()}
            className="text-[#B3B3B3] hover:text-black"
          >
            <MdChevronRight size={24} />
          </button>
        </div>
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
