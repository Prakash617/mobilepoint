import Button from "@/components/Button";
import { FaHeart, FaPlus } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

import { Label } from "@/components/ui/label";

type Props = {};

const frequentitem = [
  {
    name: "Somseng Galatero X6 Ultra LTE 4G/128 Gb, Black Smartphone",
    price: "Rs. 35000/-",
    textColor: "text-[#333333]",
  },
  {
    name: "BOSO 2 Wireless On Ear Headphone",
    price: "Rs. 25000/-",
    textColor: "text-red-600",
  },
  {
    name: "Opplo Watch Series 8 GPS + Cellular Stainless Stell Case with Milanese Loop",
    price: "Rs. 15000/-",
    textColor: "text-red-600",
  },
];

const FrequantlyBrout = (props: Props) => {
  return (
    <div className=" rounded-lg  mb-2">
      <div className="grid grid-rows-[3fr_2fr_2fr_2fr]   sm:grid-cols-[3fr_2fr_2fr_2fr] sm:grid-rows-1 ">
        <div className="row-span-2 sm:col-span-2  rounded-bl-lg rounded-tl-lg   bg-white  ">
          <h1 className="ml-20 mt-3 sm:mt-4 font-bold  sm:ml-5 ">
            FREQUENTLY BOUGHT TOGETHER
          </h1>
          <div className="grid grid-cols-8 mt-3 ">
            <div className="col-span-2 pl-0 sm:pl-20">
              <img
                src="/productDetail.jpg"
                alt="My Image"
                className="object-cover w-full h-full rounded-lg "
              />
            </div>
            <div className="col-span-1 ml-0 sm:ml-5">
              <div className="w-8 h-8 ml-3 mt-9 sm:mt-15 sm:ml-5 bg-[#e2e4eb] rounded-full flex justify-center items-center">
                <FaPlus />
              </div>{" "}
            </div>
            <div className="col-span-2">
              <img
                src="/topcell25.jpg"
                alt="My Image"
                className="object-cover w-full h-full rounded-lg "
              />
            </div>
            <div className="col-span-1">
              <div className="w-8 h-8 ml-3 mt-9 sm:mr-10  sm:mt-15 sm:ml-5 bg-[#e2e4eb] rounded-full flex justify-center items-center">
                <FaPlus />
              </div>
            </div>
            <div className="col-span-2 sm:pr-15">
              <img
                src="/topcell26.jpg"
                alt="My Image"
                className="object-cover w-full h-full rounded-lg opacity-30 "
              />
            </div>
          </div>
          <div className="mt-2 pb-3">
            {frequentitem.map((item, index) => {
              // Create safe ID using item.name
              const safeId = item.name
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");

              return (
                <div className="mt-3" key={index}>
                  <div  className=" mb-2">
                    <div className="flex items-center gap-3 pl-7">
                      <Checkbox id={safeId} className="bg-white  " />
                      <Label
                        htmlFor={safeId}
                        className="flex text-left gap-2 text-secondary"
                      >
                        <span className="opacity-75">
                          {item.name}{" "}
                          <span className={`${item.textColor} font-bold`}>
                            {item.price}
                          </span>
                        </span>
                      </Label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="row-span-2   bg-white rounded-br-lg rounded-tr-lg    sm:mr-2">
          <div className="mt-8 p-4 space-y-4">
            <div>

            <h1 className="text-sm text-[#999999] ">Total Price:</h1>
            <h1 className="text-3xl  font-bold">Rs. 65,000/- </h1>
            </div>
            <div className="">
              <div className="">
                <Button
                  bgColor="bg-[#1ABA1A] "
                  text="ADD TO CART"
                  fullWidth = {true}
                  textColor="text-white text-sm "
                />
              </div>
              <div className="flex mt-5">
                <FaHeart className="text-[#999999] text-sm mt-1 mr-2" />
                <p className="text-sm text-[#999999]"> Ad all to Wishlist</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-2 mt-2 md:mt-0 ">

           <div className="relative h-[240px] md:h-1/2 w-full">
            <Image
              src="/topcell27.png"
              alt="Banner"
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="relative h-[240px] md:h-1/2 w-full">
            <Image
              src="/topcell28.png"
              alt="Banner"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequantlyBrout;
