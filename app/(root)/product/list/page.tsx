"use client";
import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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

const ProductList = (props: Props) => {
  return (
    <>
      <DynamicBreadcrumb />

      <div className="bg-white my-2  flex flex-col md:flex-row gap-4 p-4  rounded-lg">
        <div className="md:w-1/4 w-full space-y-4 ">
          <div className="rounded-lg p-6 space-y-6 bg-background ">
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
          <div className="rounded-lg p-6 space-y-6 bg-background ">
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
        <div className="rounded-lg w-full bg-red-300 p-4 md:w-3/4">page</div>
      </div>
    </>
  );
};

export default ProductList;
