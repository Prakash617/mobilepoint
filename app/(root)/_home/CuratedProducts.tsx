'use client'

import React from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'

const products = [
  {
    id: 1,
    image: '/curated1.jpg',
    title: 'Zumac Steel Computer Case',
    description: 'Arrive in style with this compact and modern gaming PC case',
    bgColor: 'bg-primary',
    buttonColor: 'border-pink-500 text-pink-500',
    buttonText: 'SHOP NOW',
  },
  {
    id: 2,
    image: '/api/placeholder/140/140',
    title: 'Summer Sale with Sale up to 50% OFF for Foam Gaming Chair',
    description: 'Limited time offer, hurry up',
    bgColor: 'bg-gray-200',
    buttonColor: 'border-pink-500 text-pink-500',
    buttonText: 'SHOP NOW',
    badge: '200Hz Curved Gaming Monitor',
  },
  {
    id: 3,
    image: '/api/placeholder/140/140',
    title: 'Summer Sale with Sale up to 50% OFF for Foam Gaming Chair',
    description: 'Limited time offer, hurry up',
    bgColor: 'bg-gray-300',
    buttonColor: 'border-pink-500 text-pink-500',
    buttonText: 'SHOP NOW',
    badge: 'BRATECK DESK',
  },
  {
    id: 4,
    image: '/api/placeholder/140/140',
    title: 'iPad Pro Mini 6 - Powerful in hand',
    description: 'From $43.06/month for 48 months, $940.19 total',
    bgColor: 'bg-orange-500',
    buttonColor: 'border-purple-500 text-purple-500',
    buttonText: 'SHOP NOW',
    badge: '50%',
  },
  {
    id: 5,
    image: '/api/placeholder/140/140',
    title: 'iPad Pro Mini 6 - Powerful in hand',
    description: 'From $43.06/month for 48 months, $940.19 total',
    bgColor: 'bg-orange-500',
    buttonColor: 'border-purple-500 text-purple-500',
    buttonText: 'SHOP NOW',
    badge: '50%',
  },
]

const CuratedProductsCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>()

  return (
    <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
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
      <Carousel
        opts={{ align: 'start' }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-4 my-1">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
                {/* IMAGE */}
                <div
                  className={`${product.bgColor} relative h-[230px] flex items-center justify-center p-4`}
                >
                

                 

                  <Image
                    src={product.image}
                    alt={product.title}
                   fill
                    className="object-cover"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col h-[190px]">
                  <h3 className="font-extrabold text-sm mb-2 line-clamp-2">
                    {product.title}
                  </h3>

                  <p className="text-xs text-gray-500 my-4 line-clamp-2">
                    {product.description}
                  </p>

                  <button
  className=" border border-primary rounded-lg hover:bg-primary duration-300 ease-in-out hover:text-white w-[120px] text-primary py-2 px-4 text-xs font-semibold inline-block cursor-pointer"
>
  {product.buttonText}
</button>

                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default CuratedProductsCarousel
