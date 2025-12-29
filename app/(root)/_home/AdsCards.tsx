import Image from "next/image";
import React from "react";

type Props = object;

const adsrecentdata = ["/topcell6.png", "/topcell20.png"];

const AdsCards = (props: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 my-2">
      {/* Left Card */}
      <div className="w-full md:w-1/2 relative rounded-lg h-[180px]">
        <Image
          src={adsrecentdata[0]}
          alt="ads"
          fill
          className="object-cover rounded-lg"
        />
        <div className="absolute top-1/2 right-4 md:right-12 transform -translate-y-1/2 text-white pl-4">
          <p className="text-2xl md:text-4xl text-[#FFE400] font-extrabold">
            10% Back
          </p>
          <p className="text-xs md:text-base leading-tight">
            Earn 10% Cash back on <br />
            Swootech. <span className="underline underline-offset-1">Learn How</span>
          </p>
        </div>
      </div>

      {/* Right Card */}
      <div className="w-full md:w-1/2 relative rounded-lg h-[180px]">
        <Image
          src={adsrecentdata[1]}
          alt="ads"
          fill
          className="object-cover rounded-lg"
        />
        <div className="absolute top-1/2 left-2 md:left-6 transform -translate-y-1/2 text-white pl-4 w-[90%] md:w-auto">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start text-start">
              <div>
                <p className="font-bold text-lg leading-tight">
                  Download <br /> our app
                </p>
              </div>
              <div>
                <p className="text-[10px] md:text-sm text-[#CCCCCC] leading-tight">
                  Enter your phone number and we&apos;ll <br /> send you a download link.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full sm:w-[310px] items-center bg-[#353739] rounded-sm h-9 mt-2 overflow-hidden">
              <input
                type="text"
                className="flex-1 bg-transparent p-2 text-white placeholder:text-[#999999] text-sm focus:outline-none w-full sm:w-auto"
                placeholder="(+xx) xxx..."
              />
              <button className="text-green-600 px-3 text-xs hover:underline whitespace-nowrap mt-1 sm:mt-0">
                SEND LINK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsCards;
