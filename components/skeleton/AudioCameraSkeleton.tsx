"use client";

import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  count?: number;
};

export default function AudioCameraSkeleton({ count = 3 }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 rounded-lg">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="pt-2">
          <div className="bg-white border rounded-lg p-8">
            
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <Skeleton className="h-6 w-40 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>

            {/* MAIN IMAGE */}
            <div className="mb-4 relative h-[190px] w-full">
              <Skeleton className="absolute inset-0 rounded-lg 
                bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />
            </div>

            {/* DIVIDER */}
            <div className="border-t border-gray-300 mt-4 mb-4"></div>

            {/* SUB ITEMS GRID */}
            <div className="grid grid-cols-2 gap-5 pt-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center"
                >
                  {/* Circle Image */}
                  <Skeleton className="w-20 h-20 rounded-full 
                    bg-linear-to-r from-gray-200 via-gray-300 to-gray-200" />

                  {/* Title */}
                  <Skeleton className="h-4 w-20 mt-3 rounded-md" />

                  {/* Items count */}
                  <Skeleton className="h-3 w-14 mt-2 rounded-md" />
                </div>
              ))}
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}
