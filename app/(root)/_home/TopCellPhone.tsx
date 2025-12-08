"use client";

import Image from 'next/image';
import { FaCheckCircle } from "react-icons/fa";
import { useRef } from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";

type Props = {}

const TopCellPhone = (props: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      name: "SROK Smart Phone 128GB, Oled Retina",
      price: 60000,
      image: "/topcell2.png",
      tag: "Save",
      tagColor: "#C40EDC",
      tagPrice: "$199.0",
    },
    {
      name: "aPod Pro Tablet 2023 LTE+ Wifi, GPS Cellular 12.9 Inch, 512GB",
      price: 98000,
      image: "/topcell1.png",
      tag: "New",
      tagColor: "black",
    },
    {
      name: "OPod Pro 12.9 Inch M1 2023, 64GB + Wifi, GPS",
      price: 70000,
      image: "/topcell3.png",
      tag: "New",
      tagColor: "black",
    },
    {
      name: "aPod Pro Tablet 2023 LTE+ Wifi, GPS Cellular 12.9 Inch, 512GB",
      price: 98000,
      image: "/topcell1.png",
      tag: "New",
      tagColor: "black",
    },
    {
      name: "SROK Smart Phone 128GB, Oled Retina",
      price: 60000,
      image: "/topcell2.png",
      tag: "Save",
      tagColor: "#C40EDC",
      tagPrice: "$199.0",
    },
    {
      name: "SROK Smart Phone 128GB, Oled Retina",
      price: 60000,
      image: "/topcell2.png",
      tag: "Save",
      tagColor: "#C40EDC",
      tagPrice: "$199.0",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = 250 + 20; 
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className='bg-white border border-solid rounded  border-gray-300  '>
      <div className='flex justify-between items-center pt-3 px-5'>
        <h3 className='ml-3 mt-2 '>Top CellPhones & Tablets</h3>
        <button className='text-gray-400 ml-3 mt-2 '>View All</button>
      </div>

      {/* Featured Grid */}
      <div className=' pt-3'>
        <div className="grid grid-cols-6 grid-rows-2 gap-5 p-4">
          <div className="row-span-2 col-span-3 w-[560px] h-[200px] ml-3  relative overflow-hidden">
            <div className='absolute top-8 left-5 z-10'>
              <h1 className='text-3xl'>REDMI NOTE<br />12 PRO+ 5G</h1>
              <p className='text-sm mt-2'>Rise to the challenge</p>
              <button className="bg-black text-white px-2 py-1 rounded hover:bg-gray-800 mt-2">
                Shop Now
              </button>
            </div>
            <Image
              src="/topcellphone.png"
              alt="phone"
              fill
              className="object-contain"
            />
          </div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className='flex justify-between mt-5 ml-1'>
              <div>
                <h3>Iphone(IOS)</h3>
                <p>74 Items</p>
              </div>
              <div className="relative w-[50px] h-[50px] mr-7">
                <Image
                  src="/mobile2.png"
                  alt="phone"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-2.5 px-15">
        <div className="h-0.5 bg-amber-100"></div>
      </div>

      {/* Button-controlled Carousel */}
      <div className=" pl-5 pr-7 pt-3 pb-2  flex items-center gap-3">
        <button
          onClick={() => scroll('left')}
          className="bg-[#EDEFF6] text-gray rounded-md p-3 hover:bg-primary transition z-10"
        >
          <FaAngleLeft />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-hidden scroll-smooth" 
        >
          {products.map((product, index) => (
            <div
              key={index}
              className="w-[250px] h-120 shrink-0 bg-white rounded-xl border border-gray-200 p-4 transition-all duration-300 hover:shadow-xl cursor-pointer"
            >
              <div className="relative w-full h-[170px]">
                {product.tag && (
                  <div
                    className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded-lg z-10`}
                    style={{ backgroundColor: product.tagColor }}
                  >
                    <h1>{product.tag}</h1>
                    {product.tagPrice && <p>{product.tagPrice}</p>}
                  </div>
                )}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain mt-5"
                />
              </div>
              <div className=" mt-10">
                <p className="text-sm h-15">{product.name}</p>
                <h3 className="mt-2">RS. {product.price}</h3>
                <button className="bg-[#ead6ec] text-[#C40EDC] px-2 py-0.5 rounded-md hover:bg-gray-800 transition duration-300 text-sm mt-2">
                  Shop Now
                </button>
                <div className="flex gap-3 mt-2">
                  <FaCheckCircle size={15} className="mt-1" color="#C40EDC" />
                  <span className="text-sm mt-1">Instock</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="bg-[#EDEFF6] text-gray rounded-md p-3 hover:bg-blue-700 transition z-10"
        >
          <FaAngleRight />

        </button>
      </div>
    </div>
  );
}

export default TopCellPhone;
