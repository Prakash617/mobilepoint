'use client';

import React from "react";
import Image from "next/image";
import FreeAdvertizemantCard from "./FreeAdvertizemantCard";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import Link from "next/link";
import { Product } from "@/types/product";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  // Destructure product
  const {
    name,
    slug,
    primary_image,
    base_price,
    default_variant,
    is_featured,
    free_shipping,
    free_gift,
  } = product;

  // Safe destructure default_variant
  const {
    price: variantPrice,
    compare_at_price,
    stock_quantity = 0,
    images = [],
  } = default_variant ?? {};

  const finalPrice = variantPrice ?? base_price;

  const inStock = stock_quantity > 0;

  // Example: Featured tag
  const tag = true;
  const tagText = "Save";
  const tagColor = "primary"; // Tailwind bg-green

  return (
    <Link
      href={`/products/${slug}`}
      className="cursor-pointer justify-center h-[450px] w-[220px] hover:border border-gray p-2 rounded-lg space-y-4 flex flex-col"
    >
      {/* Product Image */}
      <div className="relative w-[150px] h-[150px] mx-auto">
        <Image
          src={primary_image ?? "/placeholder.png"}
          alt={name ?? "Product"}
          fill
          className="object-contain"
        />

        {tag && (
          <div
            className={`absolute bg-${tagColor} py-1 top-2 -left-4 px-2 rounded-lg text-white leading-tight`}
          >
            <p className="text-[10px] font-semibold text-left">{tagText}</p>
            {compare_at_price && (
              <p className="text-[11px] text-left">10% off </p>
            )}
          </div>
        )}
      </div>

      <hr />

      {/* Title + Price */}
      <div>
        <div className="flex justify-center items-center">
          <p className="text-secondary text-sm">({stock_quantity})</p>
        </div>
        <p className="font-semibold text-sm">{name}</p>
        <div className="flex flex-row items-end">
          <p className="font-semibold text-danger text-md">Rs. {finalPrice}/-</p>
          {compare_at_price && (
            <p className="font-semibold text-secondary ml-2 mb-1 line-through text-xs">
              Rs. {compare_at_price}/-
            </p>
          )}
        </div>
      </div>

      {/* Free Shipping / Gift */}
      <div className="flex gap-2">
        {/* You can add actual free_shipping / free_gift flags from API */}
        {free_shipping && <FreeAdvertizemantCard text="Free shipping" color="primary" /> } 
        {free_gift &&  <FreeAdvertizemantCard text="Free gift" color="danger" /> } 
        
        
      </div>

      {/* Stock */}
      <div className="mb-auto">
        {inStock ? (
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

      {/* Variant Images */}
      {images.length > 0 && (
        <div className="flex gap-2 mt-2 items-center justify-start">
          {images.map((img) => (
            <div key={img.id}>
              {/* <p>{img.image}</p> */}
              <Image
                src={img.image ?? "/placeholder.png"}
                alt={img.alt_text ?? name ?? "Product"}
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
