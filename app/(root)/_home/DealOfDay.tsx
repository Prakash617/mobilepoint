import FreeAdvertizemantCard from "@/components/FreeAdvertizemantCard";
import Image from "next/image";
import React from "react";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

type Props = {};

const DealOfDay = (props: Props) => {
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

            <div className="rounded-full w-[60px] flex justify-around items-center bg-[#EC84FA] text-white">
              <button>
                <MdOutlineChevronLeft />
              </button>
              <button>
                <MdOutlineChevronRight />
              </button>
            </div>
          </div>

          {/* MAIN PRODUCT BLOCK */}
          <div className="flex flex-col md:flex-row rounded-xl pt-8 pb-4 px-4 bg-white mt-3">
            {/* IMAGE BLOCK */}
            <div className="w-full md:w-1/2 flex">
              {/* Thumbnail List */}
              <div className="w-16 flex flex-col gap-4 justify-center items-center">
                <Image src="/mobile.png" alt="phone" width={30} height={30} />
                <Image src="/mobile2.png" alt="phone" width={30} height={30} />
                <Image src="/mobile2.png" alt="phone" width={30} height={30} />
                <Image src="/mobile2.png" alt="phone" width={30} height={30} />
              </div>

              {/* Main Image */}
              <div className="flex flex-1 justify-center items-center">
                <Image src="/mobile.png" alt="phone" width={200} height={200} />
              </div>
            </div>

            {/* TEXT SECTION */}
            <div className="w-full md:w-1/2 p-4">
              <p className="font-bold text-lg">
                Xioma Redmi Note 11 Pro 256GB 2023, Black Smartphone
              </p>

              <div className="flex items-center font-bold mt-1">
                <p className="text-[#F1352B] mr-6 text-xl">Rs.2500/-</p>
                <span className="line-through text-gray-500 text-sm">
                  Rs. 3500
                </span>
              </div>

              <ul className="list-disc list-inside mt-3 text-sm text-gray-500 space-y-1">
                <li>Display: 6.67 inches, AMOLED, 120Hz, HDR10</li>
                <li>Processor: MediaTek Helio G96</li>
                <li>RAM & Storage: 6GB RAM, 128GB Storage</li>
              </ul>

              {/* Badges */}
              <div className="flex mt-4 gap-2 flex-wrap">
                <FreeAdvertizemantCard text="Free shipping" color="primary" />
                <FreeAdvertizemantCard text="Free shipping" color="danger" />
              </div>

              {/* Countdown */}
              <div className="flex justify-between my-8 border-b border-gray-200 pb-6">
                <p className="uppercase font-semibold text-sm leading-4">
                  hurry up!
                  <br /> Promotion will <br /> expires in
                </p>

                <div className="flex items-center gap-2">
                  <div className="bg-secondary-background text-center rounded-md px-2 py-1">
                    <p className="font-bold">02</p>
                    <p className="text-[10px]">H</p>
                  </div>

                  <div className="bg-secondary-background text-center rounded-md px-2 py-1">
                    <p className="font-bold">34</p>
                    <p className="text-[10px]">M</p>
                  </div>

                  <div className="bg-secondary-background text-center rounded-md px-2 py-1">
                    <p className="font-bold">52</p>
                    <p className="text-[10px]">S</p>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="text-sm">
                <div className="h-1 bg-gray-300 rounded-full mb-1">
                  <div className="h-full w-[40%] bg-primary rounded-full"></div>
                </div>
                <p>
                  <span className="text-gray-500">Sold: </span>
                  <span className="font-bold">20/75</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE BANNERS */}
        <div className="w-full md:w-1/4 flex gap-2  flex-row md:flex-col">
          <div className="relative h-32 md:h-1/3 w-1/3 md:w-full rounded-lg overflow-hidden">
            <Image
              src="/side1.png"
              alt="side-banner"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative h-32 md:h-1/3 w-1/3 md:w-full rounded-lg overflow-hidden">
            <Image
              src="/side2.png"
              alt="side-banner"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative h-32 md:h-1/3 w-1/3 md:w-full rounded-lg overflow-hidden">
            <Image
              src="/side3.png"
              alt="side-banner"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row my-2 items-center justify-center gap-2 sm:gap-4 p-3 sm:p-4       bg-linear-to-br from-[#9c6500] to-[#fca301] rounded-xl w-full">
        {/* Icon */}
        <Image
          src="/start.png"
          alt="star"
          width={24}
          height={24}
          className="mr-0 sm:mr-2"
        />

        {/* Text */}
        <p className="text-white text-center sm:text-left text-sm sm:text-base font-light leading-snug">
          Member get
          <span className="text-[#ffe400] font-extrabold uppercase ml-1">
            Free Shipping*
          </span>
          with no order minimum!. *Restrictions apply
          <span className="font-extralight underline underline-offset-2 ml-1 decoration-[#ffe400]">
            Try free 30-days trails!
          </span>
        </p>
      </div>
    </>
  );
};

export default DealOfDay;
