"use client";

import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { type UseEmblaCarouselType } from "embla-carousel-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const carouselData = [
  {
    title: "Noise Cancelling ",
    sub_title: "Headphone",
    description:
      "Bose Over-Ear Headphone\nWifi, Voice Assisant\nLow Latency Game Mode",
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
  const [api, setApi] = useState<UseEmblaCarouselType[1]>();

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="w-full relative"
      setApi={setApi}
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
                  {item.title} <br />{" "}
                  <span className="text-xl font-medium">{item.sub_title}</span>
                </p>

                <p className="font-extralight">{item.description}</p>
                <button className="bg-white px-4 py-1 font-medium  text-black rounded-[10px]">
                  {" "}
                  Buy Now
                </button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation Arrows */}
      <div className="absolute"></div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 right-8 flex items-center gap-1 px-2  rounded-full bg-white text-black text-sm font-semibold">
        <CarouselPrevious className=" bg-white/80 hover:bg-white border-0" />

        <span>{currentIndex + 1}</span>
        <span>/</span>
        <span>{carouselData.length}</span>
        <CarouselNext className=" bg-white/80 hover:bg-white border-0" />
      </div>
    </Carousel>
  );
};

export default HomeCarousel;
