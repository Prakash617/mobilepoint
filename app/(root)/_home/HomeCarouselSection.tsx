import HomeCarousel from '@/components/HomeCarousel'
import Image from 'next/image'
import React from 'react'

type Props = {}

const HomeCarouselSection = (props: Props) => {
  return (
    <div className="w-full ">
      {/* Mobile Layout (< 768px) - Stacked vertically */}
      <div className="flex flex-col gap-4 md:hidden">
        {/* Carousel first on mobile */}
        <div className="rounded-lg overflow-hidden">
          <HomeCarousel />
        </div>

        {/* Categories */}
        <div className="rounded-xl bg-white text-left py-4 px-6 space-y-2">
          <p className="text-red-600 font-semibold text-sm">Sale 40% Off</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
            <p>Laptops</p>
            <p>PC & Computers</p>
            <p>Cell Phones</p>
            <p>Tablets</p>
            <p>Gaming & VR</p>
            <p>Networking</p>
            <p>Accessories</p>
            <p>Tablets</p>
            <p>Gaming & VR</p>
            <p>Networking</p>
            <p>Accessories</p>
          </div>
        </div>

        {/* Ad banners in 2x2 grid on mobile */}
        <div className="grid grid-cols-2 gap-2">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src="/ads1.png"
              alt="ad-banner"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src="/ads2.png"
              alt="ad-banner"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src="/ads3.png"
              alt="ad-banner"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src="/ads4.png"
              alt="ad-banner"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Tablet Layout (768px - 1024px) */}
      <div className="hidden md:flex lg:hidden flex-col gap-3">
        <div className="grid grid-cols-12 gap-3">
          {/* Left sidebar - 3 columns */}
          <div className="col-span-3 rounded-xl bg-white text-left py-6 px-4 space-y-2">
            <p className="text-red-600 font-semibold text-sm">Sale 40% Off</p>
            <p className="text-xs">Laptops</p>
            <p className="text-xs">PC & Computers</p>
            <p className="text-xs">Cell Phones</p>
            <p className="text-xs">Tablets</p>
            <p className="text-xs">Gaming & VR</p>
            <p className="text-xs">Networking</p>
            <p className="text-xs">Accessories</p>
            <p className="text-xs">Tablets</p>
            <p className="text-xs">Gaming & VR</p>
            <p className="text-xs">Networking</p>
          </div>

          {/* Main carousel - 6 columns */}
          <div className="col-span-6 rounded-lg overflow-hidden">
            <HomeCarousel />
          </div>

          {/* Right side ads - 3 columns stacked */}
          <div className="col-span-3 grid grid-rows-2 gap-3">
            <div className="relative min-h-[140px] rounded-lg overflow-hidden">
              <Image
                src="/ads1.png"
                alt="ad-banner"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-h-[140px] rounded-lg overflow-hidden">
              <Image
                src="/ads2.png"
                alt="ad-banner"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom ads - full width */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative h-28 rounded-lg overflow-hidden">
            <Image
              src="/ads3.png"
              alt="ad-banner"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-28 rounded-lg overflow-hidden">
            <Image
              src="/ads4.png"
              alt="ad-banner"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Desktop Layout (> 1024px) - Original grid layout */}
      <div className="hidden lg:block">
        <div className="grid-layout gap-2">
          <div className="area-left-side rounded-xl bg-white text-left py-6 px-10 space-y-2">
            <p className="text-red-600 font-semibold">Sale 40% Off</p>
            <p>Laptops</p>
            <p>PC & Computers</p>
            <p>Cell Phones</p>
            <p>Tablets</p>
            <p>Gaming & VR</p>
            <p>Networking</p>
            <p>Accessories</p>
            <p>Tablets</p>
            <p>Gaming & VR</p>
            <p>Networking</p>
            <p>Accessories</p>
          </div>
          
          <div className="area-mid-main rounded-lg overflow-hidden">
            <HomeCarousel />
          </div>

          <div className="area-main-left my-border relative">
            <Image
              src="/ads4.png"
              alt="ad-banner"
              fill
              className="rounded-lg object-cover w-full"
            />
          </div>

          <div className="area-main-right my-border relative">
            <Image
              src="/ads3.png"
              alt="ad-banner"
              fill
              className="rounded-lg object-cover w-full"
            />
          </div>

          <div className="area-right-side grid grid-rows-2 gap-2">
            <div className="my-border relative">
              <Image
                src="/ads1.png"
                alt="ad-banner"
                fill
                className="rounded-lg object-cover w-full"
              />
            </div>
            <div className="my-border relative">
              <Image
                src="/ads2.png"
                alt="ad-banner"
                fill
                className="rounded-lg object-cover w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeCarouselSection