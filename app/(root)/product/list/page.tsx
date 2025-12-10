"use client";
import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import StarFilter from "@/components/StartFilter";

type Props = {};

const categories = [
  "All",
  "Iphone",
  "Samsung",
  "Xiaomi",
  "Asus",
  "Gaming Smartphone",
  "Window Tablets",
  "eReader",
  "Smartphone Chargers",
  "5G Support Smartphone",
  "Smartphone Accessories",
  "Tablets Accessories",
  "Cell Phones ",
];

const filters = [
  "Min: Rs 2500/-",
  "10.9 Inch",
  "Color: Red",
  "128 GB",
  "128 GB",
];

const brands = [
{
  id: 1,
  name: "Apple",
  img: "/branditem1.png",
  quantity: 14,
},
{
  id: 2,
  name: "Apple",
  img: "/branditem2.png",
  quantity: 6,
},
{
  id: 3,
  name: "Apple",
  img: "/branditem3.png",
  quantity: 10,
},
{
  id: 4,
  name: "Apple",
  img: "/branditem4.png",
  quantity: 18,
},
{
  id: 5,
  name: "Apple",
  img: "/branditem5.png",
  quantity: 1,
},
];

const screenSizes = [
  {
    id: 1,
    size: "7” & Under",
  },
  {
    id: 2,
    size: "7.1” - 8.9”",
  },
  {
    id: 3,
    size: "9” - 10.9”",
  },
  {
    id: 4,
    size: "11” & Greater",
  },
];

const memories = [
  { size: "64GB", count: 12 },
  { size: "128GB", count: 25 },
  { size: "256GB", count: 8 },
  { size: "512GB", count: 5 },
  { size: "1TB", count: 3 },
  { size: "2TB", count: 2 },
  { size: "4TB", count: 1 },
  { size: "8TB", count: 1 },
  { size: "16TB", count: 1 },
];
const conditions = [
  { name: "New", count: 12 },
  { name: "Like New", count: 25 },
  { name: "Open Box", count: 8 },
];

const colors = [
  { name: "Red", hex: "#f87171" },
  { name: "Blue", hex: "#60a5fa" },
  { name: "Green", hex: "#34d399" },
  { name: "Yellow", hex: "#facc15" },
  { name: "Black", hex: "#000000" },
  { name: "white", hex: "#ffffff" },
  { name: "Orange", hex: "#ffa500" },
  { name: "Brown", hex: "#964b00" },
];

const ProductList = (props: Props) => {
  const [rating, setRating] = useState(0); // selected rating
  return (
    <>
      <DynamicBreadcrumb />

      <div className="bg-white my-2  flex flex-col md:flex-row gap-4 p-4  rounded-lg">
        <div className="md:w-1/4 w-full space-y-4 ">
          <div className="rounded-lg p-6 space-y-6 bg-gray ">
            <p className="uppercase font-bold">Categories</p>
            <div>
              <button className="bg-white cursor-pointer pl-6 pr-2 text-sm font-semibold text- py-2 mt-3 rounded-lg">
                All Categories
              </button>

              <p className="my-4 text-sm font-semibold">
                Cell Phones & Tablets
              </p>

              <div className="flex flex-col items-left gap-3">
                {categories.map((item, index) => {
                  const safeId = item
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, "");
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <Checkbox id={safeId} className="bg-white" />
                      <Label htmlFor={safeId}>{item}</Label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="rounded-lg p-6 space-y-6 bg-gray ">
            <div className="flex justify-between">
              <p className="uppercase font-bold">Categories</p>
              <p>Reset All</p>
            </div>
            <div>
              <div className="flex flex-wrap space-x-2 space-y-2  text-right">
                <div className="flex flex-wrap gap-2 justify-start">
                  {filters.map((item, index) => (
                    <button
                      key={index}
                      className="bg-white cursor-pointer p-2 px-3 text-xs rounded-lg"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <p className="my-4 text-sm font-semibold">By Brands</p>
            <div>
              <input
                type="text"
                className="bg-white p-2 rounded-sm outline-none"
              />
            </div>
            <div className="flex flex-col items-start gap-3">
              {brands.map((item, index) => {
                // Ensure unique IDs even if names repeat
                const safeId = `${item.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "")}-${item.id}`;

                return (
                  <div key={item.id} className="flex items-center gap-2">
                    <Checkbox id={safeId} className="bg-white" />
                    <Label
                      htmlFor={safeId}
                      className="flex items-center gap-2 text-secondary "
                    >
                      <Image
                        src={item.img}
                        width={80}
                        height={25}
                        alt={item.name}
                      />
                      <span className="opacity-75">({item.quantity})</span>
                    </Label>
                  </div>
                );
              })}
            </div>
            <hr className="h-px bg-gray-300 border-0" />

            <div>
              <p className="my-4 text-sm font-semibold">By Price</p>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-wrap gap-2 justify-start">
                  {filters.map((item, index) => (
                    <button
                      key={index}
                      className="bg-white cursor-pointer p-2 px-3 text-xs rounded-lg"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <hr className="h-px bg-gray-300 border-0" />

            <div>
              <p className="my-4 text-sm font-semibold">By Rating</p>
              <div className="flex flex-col space-y-4">
                <StarFilter />
              </div>
            </div>

            <hr className="h-px bg-gray-300 border-0" />
            <div>
              <p className="my-4 text-sm font-semibold">By Screen Size</p>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-wrap gap-2 justify-start">
                  {screenSizes.map((item, index) => (
                    <button
                      key={index}
                      className="bg-white cursor-pointer p-2 px-3 text-xs rounded-lg"
                    >
                      {item.size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <hr className="h-px bg-gray-300 border-0" />
            <div>
              <p className="my-4 text-sm font-semibold">By Color</p>
              <div className="flex flex-wrap gap-2">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-md border-2 border-gray-200 cursor-pointer`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name} // hover shows color name
                  />
                ))}
              </div>
            </div>
            <hr className="h-px bg-gray-300 border-0" />
            <div>
              <p className="my-4 text-sm font-semibold">By Memory</p>

              <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                {memories.slice(0, 5).map((memory, index) => {
                  const safeId = `memory-left-${memory.size}-${index}`;
                  return (
                    <div key={safeId} className="flex items-center gap-2">
                      <Checkbox id={safeId} className="bg-white" />
                      <Label
                        htmlFor={safeId}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <span className="px-3 py-1 rounded-lg text-xs font-medium">
                          {memory.size}
                        </span>
                        <span className="opacity-75">({memory.count})</span>
                      </Label>
                    </div>
                  );
                })}

                {memories.slice(5).map((memory, index) => {
                  const safeId = `memory-right-${memory.size}-${index}`;
                  return (
                    <div key={safeId} className="flex items-center gap-2">
                      <Checkbox id={safeId} className="bg-white" />
                      <Label
                        htmlFor={safeId}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <span className="px-3 py-1 rounded-lg text-xs font-medium">
                          {memory.size}
                        </span>
                        <span className="opacity-75">({memory.count})</span>
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
            <hr className="h-px bg-gray-300 border-0" />
            <div>
              <p className="my-4 text-sm font-semibold">By Conditions</p>

              <div className="grid grid-cols-1 gap-y-3 gap-x-2">
                {conditions.map((condition, index) => {
                  const safeId = `condition-${condition.name}-${index}`;

                  return (
                    <div key={safeId} className="flex items-center gap-2">
                      <Checkbox id={safeId} className="bg-white" />

                      <Label
                        htmlFor={safeId}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <span className="px-3 py-1 rounded-lg text-xs font-medium">
                          {condition.name}
                        </span>

                        <span className="opacity-75">({condition.count})</span>
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>

            <hr className="h-px bg-gray-300 border-0" />
          </div>
          <div className="my-2 w-full h-[300px] rounded-lg relative">
            <Image
              src="/ads5.png"
              alt="ad-banner"
              fill
              className="object-cover  rounded-lg w-full"
            />
          </div>
        </div>
        <div className="rounded-lg w-full border-2 border-gray p-4 md:w-3/4">
        
        <div>
          <p className="text-lg font-bold uppercase">Best seller in this category</p>
        </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
