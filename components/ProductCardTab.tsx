import Longtextmore from "@/app/(root)/product/[slug]/Longtextmore";
import Image from "next/image";
import React from "react";
import ProductCardList from "./ProductCardList";
import { products } from "@/data/data";
import { CardCarousel } from "./CardCarousel";

type Props = {};

const ProductCardTab = (props: Props) => {
  return (
    <div className="bg-white my-2 p-8 space-y-4  rounded-lg">
    <div className="flex flex-wrap gap-4 sm:gap-5 mb-8 lg:gap-8  text-thin lg:text-lg   text-secondary">
        <button className=" text-black font-semibold uppercase cursor-pointer">DESCRIPTION</button>
        <button className=" uppercase cursor-pointer">New in</button>
        <button className="uppercase cursor-pointer">popular</button>
    </div>

    <div>
        <CardCarousel products={products} />
    </div>
    </div>
  );
};

export default ProductCardTab;
