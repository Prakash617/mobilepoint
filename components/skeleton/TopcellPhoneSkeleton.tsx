import { Skeleton } from "@/components/ui/skeleton";
import { CardCarouselSkeleton } from "./ProductCardCarosoleSkeleton";

const TopCellPhoneSkeleton = () => {
  return (
    <div className="bg-white border mt-2 border-solid space-y-4 rounded-xl p-8">
      {/* HEADER */}
      <div className="flex flex-row justify-between items-center gap-2">
        <Skeleton className="h-5 w-60" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* MAIN WRAPPER */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* LEFT BANNER SKELETON */}
        <div className="w-full md:w-1/2 h-[220px] relative rounded-lg overflow-hidden">
          <Skeleton className="w-full h-full" />

          {/* Banner Text Overlay */}
          <div className="absolute top-1/2 left-6 sm:left-10 -translate-y-1/2 w-44 sm:w-52 space-y-3">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-9 w-28 rounded-md" />
          </div>
        </div>

        {/* RIGHT CATEGORY GRID */}
        <div className="w-full md:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-4 place-items-center">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="flex w-full items-center justify-between bg-white rounded-lg p-2 sm:p-3"
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-14" />
              </div>

              <Skeleton className="w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] rounded-md" />
            </div>
          ))}
        </div>
      </div>

      {/* HORIZONTAL LINE */}
      <Skeleton className="h-px w-full my-4" />

      {/* PRODUCT CAROUSEL SKELETON */}
      <div className="relative px-8">
        <CardCarouselSkeleton />
      </div>
    </div>
  );
};

export default TopCellPhoneSkeleton;
