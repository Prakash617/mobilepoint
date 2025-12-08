import { AiFillStar } from "react-icons/ai";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

const ratings = [
  { id: 5, count: 52 },
  { id: 4, count: 23 },
  { id: 3, count: 10 },
  { id: 2, count: 5 },
  { id: 1, count: 2 },
];

const StarFilter = () => {
  const starsArray = [1, 2, 3, 4, 5]; // helper to render stars

  return (
    <div className="flex flex-col space-y-4">
      {ratings.map((rating) => (
        <div key={rating.id} className="flex items-center gap-2">
          <Checkbox id={`star-${rating.id}`} className="bg-white" />
          <Label
            htmlFor={`star-${rating.id}`}
            className="flex items-center gap-2 text-secondary"
          >
            {starsArray
              .slice(0, rating.id)
              .map((_, index) => (
                <AiFillStar key={index} className="text-yellow-400" />
              ))}
            ({rating.count})
          </Label>
        </div>
      ))}
    </div>
  );
};

export default StarFilter;
