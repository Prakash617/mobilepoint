"use client"
import { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider"

type PriceRangeSliderProps = {
  min?: number;
  max?: number;
  onValueCommit?: (value: [number, number]) => void;
  className?: string;
};

export default function PriceRangeSlider({ 
  min = 0, 
  max = 100000, 
  onValueCommit, 
  className 
}: PriceRangeSliderProps) {
  const [localMin, setLocalMin] = useState(min);
  const [localMax, setLocalMax] = useState(max);

  useEffect(() => {
    setLocalMin(min);
    setLocalMax(max);
  }, [min, max]);

  const handleSliderCommit = (value: number[]) => {
    if (onValueCommit) {
      onValueCommit([value[0], value[1]]);
    }
  };

  const handleSliderChange = (value: number[]) => {
    setLocalMin(value[0]);
    setLocalMax(value[1]);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setLocalMin(value);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setLocalMax(value);
  };

  const handleInputBlur = () => {
    if (onValueCommit) {
      onValueCommit([localMin, localMax]);
    }
  };

  return (
    <div className="w-full">
      <Slider
        min={min}
        max={max}
        value={[localMin, localMax]}
        onValueChange={handleSliderChange}
        onValueCommit={handleSliderCommit}
        step={100}
        className={`w-full mb-4 ${className || ''}`}
      />
      <div className="flex items-center flex-wrap gap-2">
        <div className="bg-white border border-gray-300 p-3 gap-2 flex rounded-md font-semibold">
          <p>Rs.</p>
          <input
            type="number"
            min={min}
            max={max}
            value={localMin}
            onChange={handleMinInputChange}
            onBlur={handleInputBlur}
            className="w-24 outline-none"
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
            min={min}
            max={max}
            value={localMax}
            onChange={handleMaxInputChange}
            onBlur={handleInputBlur}
            className="w-24 outline-none"
          />
        </div>
      </div>
    </div>
  )
}