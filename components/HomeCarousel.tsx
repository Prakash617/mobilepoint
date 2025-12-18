"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const carouselData = [
  {
    title: "Noise Cancelling",
    sub_title: "Headphone",
    description:
      "Bose Over-Ear Headphone\nWifi, Voice Assistant\nLow Latency Game Mode",
    image: "/carousel1.png",
  },
  {
    title: "Premium Laptop",
    description:
      "High Performance Processor\nFast SSD Storage\nExtended Battery Life",
    image: "/laptop.png",
  },
  {
    title: "Latest Smartphone",
    description:
      "Advanced Camera System\nHigh Refresh Rate Display\nFast Charging Technology",
    image: "/mobile2.png",
  },
];

const HomeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  return (
    <div className="relative w-full">
      <Carousel
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        setApi={setApi}
        className="w-full"
        opts={{ align: "start" }}
      >
        <CarouselContent>
          {carouselData.map((item) => (
            <CarouselItem key={item.title}>
              <div className="relative w-full h-[310px] rounded-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover -z-10 rounded-lg"
                />
                <div className="w-1/2 space-y-7 px-10 text-white font-bold absolute top-1/2 left-8 -translate-y-1/2">
                  <p className="text-2xl">
                    {item.title} <br />
                    {item.sub_title && (
                      <span className="text-xl font-medium">
                        {item.sub_title}
                      </span>
                    )}
                  </p>
                  <p className="font-extralight whitespace-pre-line">
                    {item.description}
                  </p>
                  <button className="bg-white px-4 py-1 font-medium text-black rounded-[10px]">
                    Buy Now
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation Buttons */}
        {/* <button
          onClick={() => api?.scrollPrev()}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-md z-10"
        >
          <MdChevronLeft size={24} />
        </button> */}

        {/* <button
          onClick={() => api?.scrollNext()}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-md z-10"
        >
          <MdChevronRight size={24} />
        </button> */}

        {/* Slide Indicators */}
        <div className="absolute bottom-4 right-8 px-4 py-2  flex items-center gap-1  rounded-full bg-white text-black text-sm font-semibold">
          <button
            onClick={() => api?.scrollPrev()}
            className="  text-[#B3B3B3]  hover:text-black cursor-pointer "
          >
            <MdChevronLeft size={24} />
          </button>
          <div className="font-medium">
            <span>{currentIndex + 1}</span>
            <span className=" mx-1 text-md">/</span>
            <span>{carouselData.length}</span>
          </div>
          <button
            onClick={() => api?.scrollNext()}
            className=" text-[#B3B3B3]  hover:text-black cursor-pointer  "
          >
            <MdChevronRight size={24} />
          </button>
        </div>
      </Carousel>
    </div>
  );
};

export default HomeCarousel;
