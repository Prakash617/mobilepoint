import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

import HomeCarousel from "@/components/HomeCarousel";
import BrandFeature from "./_home/BrandFeature";
import TopCellPhone from "./_home/TopCellPhone";
import AudioCamera from "./_home/AudioCamera";
import Adsrecentview from "./_home/Adsrecentview";
import FreeAdvertizemantCard from "@/components/FreeAdvertizemantCard";

export default function Home() {
  return (
    <>
      
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
          <p>Clearance</p>
          <p>Clearance</p>
          <p>Clearance</p>
          <p>Clearance</p>
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
      <BrandFeature/>
      <div className="flex gap-2 my-2">
        <div className="w-3/4 flex flex-col">
          <div className="bg-primary rounded-xl flex p-4 justify-between">
            <div className="uppercase text-white font-bold">
              Deal of the day
            </div>

            <div className="rounded-full w-[60px] flex justify-around bg-[#EC84FA] text-white">
              <button>
                <MdOutlineChevronLeft />
              </button>
              <button>
                <MdOutlineChevronRight />
              </button>
            </div>
          </div>
          <div className="flex rounded-xl pt-8 pb-4 px-4 bg-white mt-2">
            <div className="w-1/2 flex  ">
              <div className="w-16  flex flex-col gap-4 justify-center items-center ">
                <Image src="/mobile.png" alt="phone" width={30} height={30} />
                <Image src="/mobile2.png" alt="phone" width={30} height={30} />
                <Image src="/mobile2.png" alt="phone" width={30} height={30} />
                <Image src="/mobile2.png" alt="phone" width={30} height={30} />
              </div>
              <div className="flex flex-1 justify-center items-center">
                <Image src="/mobile.png" alt="phone" width={200} height={200} />
              </div>
            </div>
            <div className="w-1/2 p-4">
              <div>
                <p className="font-bold">
                  Xioma Redmi Note 11 Pro 256GB 2023, Black Smartphone
                </p>
                <div className="flex font-bold">
                  <p className="font-lg text-[#F1352B] mr-6 text-lg">
                    Rs.2500/-
                  </p>
                  <span className="line-through text-gray-500 text-sm my-auto">
                    Rs. 3500
                  </span>
                </div>
                <div>
                  <ul className="list-disc list-inside mt-2 text-sm text-gray-500">
                    <li>Display: 6.67 inches, AMOLED, 120Hz, HDR10</li>
                    <li>Processor: MediaTek Helio G96</li>
                    <li>RAM & Storage: 6GB RAM, 128GB Storage</li>
                  </ul>
                </div>
                <div className="flex mt-4 gap-2">
                
                  <FreeAdvertizemantCard text="Free shipping" color="primary" />
                  <FreeAdvertizemantCard text="Free shipping" color="danger" />
                </div>
                <div className="flex justify-between my-8 border-b-2 border-gray-200 pb-8">
                  <div>
                    <p className="uppercase font-semibold text-sm">
                      hurry up!
                      <br />
                      Promotion will
                      <br />
                      expires in
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <div className="bg-secondary-background text-center rounded-xs px-2  py-1 ">
                      <p className="font-bold">02</p>
                      <p className="text-[10px]">H</p>
                    </div>
                    <div className="bg-secondary-background text-center rounded-xs px-2  py-1">
                      <p className="font-bold">34</p>
                      <p className="text-[10px]">M</p>
                    </div>
                    <div className="bg-secondary-background text-center rounded-xs px-2 py-1">
                      <p className="font-bold">52</p>
                      <p className="text-[10px]">S</p>
                    </div>
                  </div>
                </div>
                <div className="text-sm">
                  <div className="h-1 bg-gray-400 mb-2 rounded-full">
                    <div className="h-full w-[40%] bg-primary mb-2 rounded-full"></div>
                  </div>
                  <p>
                    <span className="text-gray-500 ">Sold: </span>
                    <span className="font-bold">20/75</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 gap-1 flex flex-col ">
          <div className="h-1/3 w-full flex-1 relative">
            <Image
              src="/side1.png"
              alt="side-banner"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
          <div className="h-1/3 w-full flex-1 relative">
            <Image
              src="/side2.png"
              alt="side-banner"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
          <div className="h-1/3 w-full flex-1 relative">
            <Image
              src="/side3.png"
              alt="side-banner"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center  h-16 my-2 bg-linear-to-br from-[#9c6500] to-[#fca301] rounded-xl w-full">
        <Image
          src="/start.png"
          alt="star"
          width={20}
          height={20}
          className="inline-block mr-4 mb-4"
        />
        <div className=" text-white font-light">
          Member get
          <span className="text-[#ffe400] font-extrabold uppercase ml-1">
            Free Shipping*
          </span>
          with no order minimum!. *Restrictions apply
          <span className="font-extralight underline underline-offset-3 ml-1 decoration-[#ffe400] ">
            Try free 30-days trails!
          </span>
        </div>
     
      </div>
         <TopCellPhone/>
         <AudioCamera />
         <Adsrecentview/>
    </>
  );
}
