"use client";

import Image from "next/image";
import React from "react";
import { useGroupedCategories } from "@/hooks/useGroupedCategories";
import AudioCameraSkeleton from "@/components/skeleton/AudioCameraSkeleton";
import { resolveImageUrl } from "@/lib/utils";
import ErrorFallback from "@/components/ErrorFallback";

export default function AudioCamera() {
  const { data, isLoading, error, refetch } = useGroupedCategories();

  if (isLoading) return <AudioCameraSkeleton />;
  if (error) {
    return <ErrorFallback message="Failed to load categories" onRetry={() => refetch()} />;
  }

  // 🔹 MAP API DATA INTO EXISTING UI SHAPE
  const audiocamera = (data ?? []).map((category) => {
    const children = category.children.slice(0, 4);

    return {
      title: category.name,
      image: [
        resolveImageUrl(category.image),        // main image
        ...children.map((c) => resolveImageUrl(c.image)) // sub images
      ],
      idata: children.map((c) => c.name),
      items: children.map((c) => String(c.total_products)),
    };
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 rounded-lg">
      {audiocamera.map((acproduct, index) => (
        <div key={index} className="pt-2">
          <div className="bg-white border hover:shadow-lg transition-shadow duration-200 rounded-lg p-8 h-full flex flex-col">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="font-bold text-lg uppercase truncate pr-2">
                {acproduct.title}
              </h1>
              <button className="text-sm text-gray-500 cursor-pointer hover:text-primary transition-colors focus:outline-none shrink-0">
                View All
              </button>
            </div>

            {/* Main Image */}
            <div className="mb-4 relative h-[190px] w-full flex-shrink-0">
              <Image
                src={acproduct.image[0]}
                alt={acproduct.title}
                fill
                className="w-full h-auto object-contain rounded"
              />
            </div>

            {acproduct.idata.length > 0 && (
              <>
                <div className="border-t border-gray-300 mt-4 mb-4"></div>

                {/* Sub Items Grid */}
                <div className="grid grid-cols-2 gap-5 pt-2 mt-auto">
                  {acproduct.idata.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="w-20 h-20 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center p-2">
                        <Image
                          src={acproduct.image[idx + 1]}
                          alt={item}
                          width={60}
                          height={60}
                          className="object-contain mix-blend-multiply"
                        />
                      </div>

                      <h2 className="text-sm font-bold mt-2 line-clamp-1">
                        {item}
                      </h2>

                      <button className="text-xs text-gray-500 cursor-pointer">
                        {acproduct.items[idx]} items
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

          </div>
        </div>
      ))}
    </div>
  );
}
