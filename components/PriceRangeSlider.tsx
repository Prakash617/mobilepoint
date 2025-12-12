import { useState } from 'react';
import { Slider } from "@/components/ui/slider"

type SliderProps = React.ComponentProps<typeof Slider>

export default function PriceRangeSlider({ className, ...props }: SliderProps) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [range, setRange] = useState([0, 100]);

  const handleSliderChange = (value: number[]) => {
    setRange(value);
    // Convert slider percentage to price range
    const min = Math.round((value[0] / 100) * 10000);
    const max = Math.round((value[1] / 100) * 10000);
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setMinPrice(value);
    setRange([Math.round((value / 10000) * 100), range[1]]);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setMaxPrice(value);
    setRange([range[0], Math.round((value / 10000) * 100)]);
  };

  const handleGo = () => {
    console.log('Price range:', minPrice, '-', maxPrice);
    // Add your filter logic here
  };

  return (
    <div className="w-full">
      <Slider
        value={range}
        onValueChange={handleSliderChange}
        max={100}
        step={1}
        className={`w-full mb-4 ${className || ''}`}
        {...props}
      />
      <div className="flex items-center flex-wrap gap-2">
        <div className="bg-white border border-gray-300 p-3 gap-2 flex rounded-md font-semibold">
          <p>Rs.</p>
          <input
            type="number"
            min={0}
            value={minPrice}
            onChange={handleMinInputChange}
            className="w-16 outline-none"
          />
        </div>
        <div className="text-gray-400">
          <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="1" x2="12" y2="1" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        <div className="bg-white border border-gray-300 p-3 gap-2 flex rounded-md font-semibold">
          <p>Rs.</p>
          <input
            type="number"
            value={maxPrice}
            onChange={handleMaxInputChange}
            className="w-16 outline-none"
          />
        </div>
        <div>
          <button 
            onClick={handleGo}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  )
}