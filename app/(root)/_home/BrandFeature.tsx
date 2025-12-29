'use client';
import { useBrands, useCategories, useFeaturedBrands, useTopCategories } from "@/hooks/useProducts";
import { Brand } from "@/types/product";
import Image from "next/image";
import React from "react";

type Props = {};

// data.ts (or inside same component file)
// const featureBrands = [
//   { id: 1, img: "/brand1.png" },
//   { id: 2, img: "/brand2.png" },
//   { id: 3, img: "/brand3.png" },
//   { id: 4, img: "/brand4.png" },
//   { id: 5, img: "/brand5.png" },
//   { id: 6, img: "/brand6.png" },
//   { id: 7, img: "/brand7.png" },
//   { id: 8, img: "/brand1.png" },
// ];


// const topCategories = [
//   { id: 1, img: "/laptop1.png", label: "Laptops" },
//   { id: 2, img: "/laptop2.png", label: "Laptops" },
//   { id: 3, img: "/laptop3.png", label: "Laptops" },
//   { id: 4, img: "/laptop4.png", label: "Laptops" },
// ];

const BrandFeature = (props: Props) => {
  // const { data: categories, isLoading, error } = useCategories();
  const { data: brands, isLoading, error } = useFeaturedBrands();
  const { data: top, isLoading: loadingTop } = useTopCategories({ limit: 4 });
  if (isLoading || loadingTop) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  // const featureBrands = brands?.results.slice(0, 8);
  const featureBrands = brands?.results.filter((brand: Brand)=> brand.is_featured).slice(0, 10) || [];
  const topCategories = top?.results || [];
  // const featured
  return (
    <div className="flex flex-col md:flex-row w-full mt-2 gap-2 justify-between ">
      {/* Feature Brands */}
      <div className="rounded-xl p-6 w-full md:w-1/2 bg-white">
        <div className="flex justify-between mt-2">
          <div className="uppercase font-bold">Feature Brands</div>
          <div className="text-gray-400 font-extralight">View All</div>
        </div>

        <div className="grid grid-cols-5 place-content-center gap-8 mt-8">
          {featureBrands.map((item) => (
            <Image
              key={item.id}
              src={item?.logo || ""}
              alt="feature-brand"
              width={81}
              height={31}
              className="justify-self-center"
            />
          ))}
        </div>
      </div>

      {/* Top Categories */}
      <div className="rounded-xl p-6 w-full md:w-1/2 bg-white">
        <div className="flex justify-between mt-2">
          <div className="uppercase font-bold">Top Categories</div>
          <div className="text-gray-400 font-extralight">View All</div>
        </div>

        <div className="flex flex-row h-full justify-around items-center gap-8">
          {topCategories.map((cat) => (
            <div key={cat.id} className="text-center flex flex-col items-center gap-2">
              <Image src={cat.image || ""} alt={cat.name} width={40} height={30} />
              <p>{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandFeature;
