'use client';
import React from "react";
import Image from "next/image";
import Navigation from "./Navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const data = [
  {
    id: 1,
    label: "NEW",
    image: "/topcell21.png",
    title: "Xomie Remid 8 Sport Water Resistance Watch",
    price: "Rs. 4200/-",
  },
  {
    id: 2,
    label: "NEW",
    image: "/topcell2.png",
    title: "Microtec Surface 2.0 Laptop",
    price: "Rs. 94,000/-",
  },
  {
    id: 3,
    image: "/topcell1.png",
    title:
      "aPod Pro Tablet 2023 LTE + Wifi, GPS Cellular 12.9 Inch, 512GB",
    price: "Rs. 12,000/-",
  },
  {
    id: 4,
    discount: "20%",
    image: "/topcell2.png",
    title: "SROK Smart Phone 128GB, OLED Retina",
    price: "Rs. 20,000/-",
    priceColor: "text-red-500",
  },
    {
    id: 5,
    image: "/topcell1.png",
    title:
      "aPod Pro Tablet 2023 LTE + Wifi, GPS Cellular 12.9 Inch, 512GB",
    price: "Rs. 12,000/-",
  },
];
function Adsrecentview() {

    const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  
  React.useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  

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

          <Navigation variant="outlined" onNext={() => api?.scrollNext()} onPrevious={() => api?.scrollPrev()} />
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
            {data.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4"
              >
                <div className=" flex flex-col md:flex-row items-center rounded-lg p-3 h-full">
                
                  <div className="relative">
                    {item.label && (
                      <span className="absolute top-4 left-1 z-10 bg-black text-white text-[10px] px-2 py-1 rounded-sm">
                        {item.label}
                      </span>
                    )}

                    {item.discount && (
                      <span className="absolute top-4 left-1 z-10 bg-primary text-white text-[10px] px-2 py-1 rounded-md">
                        SAVE <br></br>{item.discount}
                      </span>
                    )}

                    <div className="relative w-[90px] h-[90px] mx-auto mt-5">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="mt-3 text-left ">
                    <p className="text-xs text-black font-bold ">
                      {item.title} 
                    </p>

                    <p
                      className={`text-sm mt-1 font-semibold ${
                        item.priceColor || "text-black"
                      }`}
                    >
                      {item.price}
                    </p>
                  </div>
                </div> 
            
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export default Adsrecentview;
