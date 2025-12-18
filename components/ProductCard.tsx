import React from "react";
import Image from "next/image";
import FreeAdvertizemantCard from "./FreeAdvertizemantCard";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import Link from "next/link";
import { ProductCardProps } from "@/types";

const ProductCard = ({
  name,
  price,
  image,
  tag,
  tagText='nothing',
  tagColor = "success",
  tagPrice,
  free_shipping,
  free_gift,
  new: isNew,
  sub_images,
  slug,
  in_stock,
  quantity,
}: ProductCardProps) => {
  return (
    <Link
      href={`/products/${slug}`}
      className="cursor-pointer justify-center h-[480px] w-[220px] hover:border border-gray p-2 rounded-lg space-y-4 flex flex-col"
    >
      {/* Image */}
      <div className="relative w-[150px] h-[150px] mx-auto">
        <Image src={image} alt="product" fill className="object-contain" />

        {tag && (
          <div
            className={`absolute bg-${tagColor} py-1 top-2 left-2 px-2 rounded-lg text-white leading-tight`}
          >
            <p className="text-[10px] font-semibold text-left">{tagText}</p>
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
        <div className="flex flex-row   items-end">
          <p className="font-semibold  text-danger text-md">Rs. {price}/-</p>
          {tagPrice && (
            <p className="font-semibold  text-secondary ml-2  line-through text-sm inline-block">
              Rs. {tagPrice}/-
            </p>
          )}
          {/* <p className="font-semibold  text-secondary ml-2  line-through text-sm inline-block">Rs. {tagPrice}/-</p> */}
        </div>
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
            <span className="text-xs text-green-600 font-semibold">
              In stock
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <IoIosCloseCircle className="text-red-500 text-sm" />
            <span className="text-xs text-red-600 font-semibold">
              Out of stock
            </span>
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
