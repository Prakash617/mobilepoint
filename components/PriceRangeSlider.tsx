import { Slider } from "@/components/ui/slider";
import React from "react";

type PriceRangeSliderProps = {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (values: { min: number; max: number }) => void;
  onGoClick: () => void;
  className?: string;
};

export default function PriceRangeSlider({
  minPrice,
  maxPrice,
  onPriceChange,
  onGoClick,
  className,
  ...props
}: PriceRangeSliderProps) {
  const overallMin = 0;
  const overallMax = 10000;

  const handleSliderChange = (value: number[]) => {
    const min = Math.round((value[0] / 100) * overallMax);
    const max = Math.round((value[1] / 100) * overallMax);
    onPriceChange({ min, max });
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onPriceChange({ min: value, max: maxPrice });
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onPriceChange({ min: minPrice, max: value });
  };

  const range = [(minPrice / overallMax) * 100, (maxPrice / overallMax) * 100];

  return (
    <div className="w-full">
      <Slider
        value={range}
        onValueChange={handleSliderChange}
        max={100}
        step={1}
        className={`w-full mb-4 ${className || ""}`}
        {...props}
      />
      <div className="flex items-center justify-between flex-nowrap w-full">
        <div className="bg-white border border-gray-300 p-3 gap-2 text-[12px] flex rounded-md font-semibold shrink-0">
          <span>Rs.</span>
          <input
            type="text"
            min={overallMin}
            max={overallMax}
            value={minPrice}
            onChange={handleMinInputChange}
            className="w-8 outline-none"
          />
        </div>

        <div className="text-gray-400 shrink-0">
          <svg
            width="12"
            height="2"
            viewBox="0 0 12 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="1" x2="12" y2="1" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        <div className="bg-white border border-gray-300 p-3 pr-1 text-[12px] flex rounded-md font-semibold shrink-0">
          <span>Rs.</span>
          <input
            type="text"
            min={overallMin}
            max={overallMax}
            value={maxPrice}
            onChange={handleMaxInputChange}
            className="w-12 outline-none"
          />
        </div>

        <div className="shrink-0">
          <button
            onClick={onGoClick}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg font-semibold"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
}
