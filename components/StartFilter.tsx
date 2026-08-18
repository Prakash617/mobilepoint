"use client";
import { AiFillStar } from "react-icons/ai";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface Rating {
  rating?: number; // 1-5
  value?: string; // "1"-"5"
  count: number;
}

interface StarFilterProps {
  ratings: Rating[];
  selectedRatings?: string[];
  onRatingChange?: (rating: number) => void;
}

const StarFilter = ({ ratings, selectedRatings = [], onRatingChange }: StarFilterProps) => {
  const starsArray = [1, 2, 3, 4, 5];

  const handleRatingChange = (rating: number) => {
    if (onRatingChange) {
      onRatingChange(rating);
    }
  };

  // Convert the mixed input (rating or value) to a number for safety
  const normalizedRatings = ratings.map(r => ({
    ...r,
    ratingNum: Number(r.value ?? r.rating)
  })).sort((a, b) => b.ratingNum - a.ratingNum); // Sort 5 to 1

  return (
    <div className="flex flex-col space-y-3">
      {normalizedRatings.map((r) => (
        <div key={r.ratingNum} className="flex items-center gap-3">
          <Checkbox
            id={`star-${r.ratingNum}`}
            checked={selectedRatings.includes(String(r.ratingNum))}
            onCheckedChange={() => handleRatingChange(r.ratingNum)}
            className="bg-white rounded-full w-4 h-4 border-gray-300 data-[state=checked]:bg-white data-[state=checked]:text-primary"
          />
          <Label
            htmlFor={`star-${r.ratingNum}`}
            className="flex items-center gap-2 cursor-pointer flex-1"
          >
            <div className="flex items-center gap-[2px]">
              {starsArray.map((num) => (
                <AiFillStar
                  key={num}
                  className={num <= r.ratingNum ? "text-[#fbc02d] w-4 h-4" : "text-[#e0e0e0] w-4 h-4"}
                />
              ))}
            </div>
            <span className="text-gray-500 text-[13px] ml-4">&amp; up</span>
          </Label>
        </div>
      ))}
    </div>
  );
};

export default StarFilter;
