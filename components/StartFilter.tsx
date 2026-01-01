"use client";
import { AiFillStar } from "react-icons/ai";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface Rating {
  rating: number; // 1-5
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

  return (
    <div className="flex flex-col space-y-4">
      {ratings.map((r) => (
        <div key={r.rating} className="flex items-center gap-2">
          <Checkbox
            id={`star-${r.rating}`}
            checked={selectedRatings.includes(String(r.rating))}
            onCheckedChange={() => handleRatingChange(r.rating)}
            className="bg-white"
          />
          <Label
            htmlFor={`star-${r.rating}`}
            className="flex items-center gap-2 cursor-pointer text-secondary"
          >
            {/* Render stars */}
            {starsArray.slice(0, r.rating).map((_, i) => (
              <AiFillStar key={i} className="text-yellow-400" />
            ))}
            <span className="opacity-75">({r.count})</span>
          </Label>
        </div>
      ))}
    </div>
  );
};

export default StarFilter;
