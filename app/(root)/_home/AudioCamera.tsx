"use client";

import Image from "next/image";
import React from "react";
import { useGroupedCategories } from "@/hooks/useGroupedCategories";

export default function AudioCamera() {
  const { data, isLoading, error } = useGroupedCategories();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  // 🔹 MAP API DATA INTO EXISTING UI SHAPE
  const audiocamera = (data ?? []).map((category) => {
    const children = category.children.slice(0, 4);

    return {
      title: category.name,
      image: [
        category.image,                 // main image
        ...children.map((c) => c.image) // sub images
      ],
      idata: children.map((c) => c.name),
      items: children.map((c) => String(c.total_products)),
    };
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 rounded-lg">
      {audiocamera.map((acproduct, index) => (
        <div key={index} className="pt-2">
          <div className="bg-white border hover:shadow-lg transition-shadow duration-200 rounded-lg p-8">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="font-bold text-lg uppercase">
                {acproduct.title}
              </h1>
              <button className="text-sm text-gray-500 cursor-pointer">
                View All
              </button>
            </div>

            {/* Main Image */}
            <div className="mb-4 relative h-[190px] w-full ">
              <Image
                src={acproduct.image[0]}
                alt={acproduct.title}
                // width={368}
                // height={190}
                fill
                className="w-full h-auto object-contain rounded"
              />
            </div>

            <div className="border-t border-gray-300 mt-4 mb-4"></div>

            {/* Sub Items Grid */}
            <div className="grid grid-cols-2 gap-5 pt-2">
              {acproduct.idata.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 bg-gray rounded-full overflow-hidden flex items-center justify-center">
                    <Image
                      src={acproduct.image[idx + 1]}
                      alt={item}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>

                  <h2 className="text-sm font-bold mt-2">
                    {item}
                  </h2>

                  <button className="text-xs text-gray-500 cursor-pointer">
                    {acproduct.items[idx]} items
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}
