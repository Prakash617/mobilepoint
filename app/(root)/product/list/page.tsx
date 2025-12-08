"use client";
import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
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
                {filters.map((item, index) => (
                  <button
                    key={index}
                    className="bg-white cursor-pointer p-2 px-3 text-sm rounded-lg"
                  >
                    {item}
                  </button>
                ))}
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
              
              <StarFilter/>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg w-full bg-red-300 p-4 md:w-3/4">page</div>
      </div>
    </>
  );
};

export default ProductList;
