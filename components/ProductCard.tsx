import React from "react";
import Image from "next/image";
import FreeAdvertizemantCard from "./FreeAdvertizemantCard";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import Link from "next/link";

type ProductCardProps = {
  name: string;
  price: number;
  image: string;
  tag?: string;
  tagColor?: string;
  tagPrice?: number;
  free_shipping?: boolean;
  free_gift?: boolean;
  new?: boolean;
  sub_images?: string[];
  slug: string;
  in_stock: true | false;
  quantity?: number

};

const ProductCard = ({
  name,
  price,
  image,
  tag,
  tagColor,
  tagPrice,
  free_shipping,
  free_gift,
  new: isNew,
  sub_images,
  slug,
  in_stock,
  quantity
}: ProductCardProps) => {
  return (
    <Link href={`/product/${slug}`} className="cursor-pointer justify-center h-[480px] w-[225px] hover:border border-gray p-2 rounded-lg space-y-4 flex flex-col">
      {/* Image */}
      <div className="relative w-[200px] h-[200px]">
        <Image src={image} alt="product" fill className="object-contain" />

        {tag && (
          <div className="absolute bg-primary py-1 top-2 left-2  px-2 rounded-lg text-white  leading-tight">
            <p className="text-[10px] font-semibold text-left">{tag}</p>
            {tagPrice && <p className="text-[11px] text-left">$ {tagPrice}</p>}
          </div>
        )}
      </div>

      <hr />
      

      {/* Title + Price */}
      <div>
        <div className="flex justify-center items-center">
        <p className="text-secondary text-sm">({quantity})</p>
      </div>
        <p className="font-semibold text-sm">{name}</p>
        <p className="font-semibold text-md">Rs. {price}/-</p>
      </div>

      {/* Free Shipping / Gift */}
      <div className="flex gap-2">
        {free_shipping && (
          <FreeAdvertizemantCard text="Free shipping" color="primary" />
        )}
        {free_gift && <FreeAdvertizemantCard text="Free gift" color="danger" />}
      </div>

      {/*  ⭐ Push this block to the bottom using mt-auto  */}
     <div className="mt-auto">
  {in_stock ? (
    <div className="flex items-center gap-1.5">
      <IoIosCheckmarkCircle className="text-green-500 text-sm" />
      <span className="text-xs text-green-600 font-semibold">In stock</span>
    </div>
  ) : (
    <div className="flex items-center gap-1.5">
      <IoIosCloseCircle className="text-red-500 text-sm" />
      <span className="text-xs text-red-600 font-semibold">Out of stock</span>
    </div>
  )}
</div>


        {/* Sub Images */}
        {sub_images && (
          <div className="flex gap-2 mt-2 items-center justify-start">
            {sub_images.map((img) => (
              <div key={img}>
                <Image
                  src={img}
                  alt="product"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        )}
      
    </Link>
  );
};

export default ProductCard;
