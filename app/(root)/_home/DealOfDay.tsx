'use client'

import FreeAdvertizemantCard from "@/components/FreeAdvertizemantCard"
import Navigation from "@/components/Navigation"
import Image from "next/image"
import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

// ✅ Data array for deals
const dealsData = [
  {
    id: 1,
    title: "Xioma Redmi Note 11 Pro 256GB 2023, Black Smartphone",
    price: "Rs.2500/-",
    originalPrice: "Rs. 3500",
    thumbnails: ["/mobile.png", "/mobile2.png", "/mobile2.png", "/mobile2.png"],
    mainImage: "/mobile.png",
    specs: [
      "Display: 6.67 inches, AMOLED, 120Hz, HDR10",
      "Processor: MediaTek Helio G96",
      "RAM & Storage: 6GB RAM, 128GB Storage",
    ],
    badges: [
      { text: "Free shipping", color: "primary" },
      { text: "Free shipping", color: "danger" },
    ],
    progress: 40, // in percent
    sold: "20/75",
    countdown: ["02", "34", "52"],
  },
  {
    id: 2,
    title: "Xiaomi Poco X5 Pro 128GB Smartphone",
    price: "Rs. 2200/-",
    originalPrice: "Rs. 3000",
    thumbnails: ["/mobile3.png", "/mobile4.png"],
    mainImage: "/mobile3.png",
    specs: ["Display: 6.5 inches AMOLED", "Processor: Snapdragon 732G", "RAM & Storage: 6GB/128GB"],
    badges: [{ text: "Free shipping", color: "primary" }],
    progress: 60,
    sold: "30/50",
    countdown: ["01", "20", "45"],
  },
  // Add more deals as needed
]

const DealOfDay = () => {
  const [api, setApi] = React.useState<CarouselApi>()

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-2 my-2">
        {/* LEFT SECTION */}
        <div className="w-full md:w-3/4 flex flex-col">
          {/* Header */}
          <div className="bg-primary rounded-xl flex p-4 justify-between items-center">
            <div className="uppercase text-white font-bold">
              Deal of the day
            </div>

            <Navigation
              variant="filled"
              onNext={() => api?.scrollNext()}
              onPrevious={() => api?.scrollPrev()}
            />
          </div>

          {/* CAROUSEL */}
          <Carousel opts={{ align: "start" }} setApi={setApi} className="w-full">
            <CarouselContent>
              {dealsData.map((deal) => (
                <CarouselItem key={deal.id} className="basis-full">
                  <div className="flex flex-col md:flex-row rounded-xl pt-8 pb-4 px-4 bg-white mt-3">
                    {/* IMAGE BLOCK */}
                    <div className="w-full md:w-1/2 flex">
                      <div className="w-16 flex flex-col gap-4 justify-center items-center">
                        {deal.thumbnails.map((thumb, i) => (
                          <Image key={i} src={thumb} alt="phone" width={30} height={30} />
                        ))}
                      </div>

                      <div className="flex flex-1 justify-center items-center">
                        <Image src={deal.mainImage} alt="phone" width={200} height={200} />
                      </div>
                    </div>

                    {/* TEXT SECTION */}
                    <div className="w-full md:w-1/2 p-4">
                      <p className="font-bold text-lg">{deal.title}</p>

                      <div className="flex items-center font-bold mt-1">
                        <p className="text-[#F1352B] mr-6 text-xl">{deal.price}</p>
                        <span className="line-through text-gray-500 text-sm">{deal.originalPrice}</span>
                      </div>

                      <ul className="list-disc list-inside mt-3 text-sm text-gray-500 space-y-1">
                        {deal.specs.map((spec, i) => (
                          <li key={i}>{spec}</li>
                        ))}
                      </ul>

                      <div className="flex mt-4 gap-2 flex-wrap">
                        {deal.badges.map((badge, i) => (
                          <FreeAdvertizemantCard key={i} text={badge.text} color={badge.color} />
                        ))}
                      </div>

                      <div className="flex justify-between my-8 border-b border-gray-200 pb-6">
                        <p className="uppercase font-semibold text-sm leading-4">
                          hurry up!
                          <br /> Promotion will <br /> expires in
                        </p>

                        <div className="flex items-center gap-2">
                          {deal.countdown.map((t, i) => (
                            <div
                              key={i}
                              className="bg-secondary-background text-center rounded-md px-2 py-1"
                            >
                              <p className="font-bold">{t}</p>
                              <p className="text-[10px]">{i === 0 ? "H" : i === 1 ? "M" : "S"}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-sm">
                        <div className="h-1 bg-gray-300 rounded-full mb-1">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${deal.progress}%` }} />
                        </div>
                        <p>
                          <span className="text-gray-500">Sold: </span>
                          <span className="font-bold">{deal.sold}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* RIGHT SIDE BANNERS */}
        <div className="w-full md:w-1/4 flex gap-2 flex-row md:flex-col">
          {["/side1.png", "/side2.png", "/side3.png"].map((img, i) => (
            <div key={i} className="relative h-32 md:h-1/3 w-1/3 md:w-full rounded-lg overflow-hidden">
              <Image src={img} alt="side-banner" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM BANNER */}
      <div className="flex flex-col sm:flex-row my-2 items-center justify-center gap-2 sm:gap-4 p-3 sm:p-4 bg-linear-to-br from-[#9c6500] to-[#fca301] rounded-xl w-full">
        <Image src="/start.png" alt="star" width={24} height={24} />

        <p className="text-white text-center sm:text-left text-sm sm:text-base font-light">
          Member get
          <span className="text-[#ffe400] font-extrabold uppercase ml-1">Free Shipping*</span>
          with no order minimum!. *Restrictions apply
          <span className="underline underline-offset-2 ml-1 decoration-[#ffe400]">
            Try free 30-days trails!
          </span>
        </p>
      </div>
    </>
  )
}

export default DealOfDay
