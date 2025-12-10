import HomeCarousel from '@/components/HomeCarousel'
import Image from 'next/image'
import React from 'react'

type Props = {}

const HomeCarouselSection = (props: Props) => {
  return (
    <div>
         <div className="grid-layout gap-2 ">
        <div className="area-left-side rounded-xl bg-white text-left py-6 px-10 space-y-2">
          <p className="text-red-600">Sale 40% Off</p>
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
        <div className="area-mid-main rounded-lg ">
          <HomeCarousel />
        </div>

        <div className="area-main-left my-border  relative">
          <Image
            src="/ads4.png"
            alt="ad-banner"
            fill
            className="rounded-lg object-cover w-full"
          />
        </div>

        <div className="area-main-right my-border  relative">
          <Image
            src="/ads3.png"
            alt="ad-banner"
            fill
            className="rounded-lg object-cover w-full"
          />
        </div>

        <div className="area-right-side grid grid-rows-2 gap-2">
          <div className="my-border  relative">
            <Image
              src="/ads1.png"
              alt="ad-banner"
              fill
              className="rounded-lg object-cover w-full"
            />
          </div>
          <div className="my-border  relative">
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
  )
}

export default HomeCarouselSection