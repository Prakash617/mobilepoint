'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { resolveImageUrl } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { FaCartPlus } from "react-icons/fa";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { toast } from "sonner";

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
    free_shipping,
    free_gift,
    is_in_stock,
    is_new,
    brand,
  } = product;

  // Safe destructure default_variant
  const { price: variantPrice } = default_variant ?? {};
  const compareAtPrice =
    (default_variant as { compare_at_price?: string | null } | null | undefined)
      ?.compare_at_price ?? null;

  const currentPrice = variantPrice ?? base_price;
  const oldPrice = compareAtPrice;

  const variantStock = default_variant?.stock_quantity ?? 0;
  const inStock = is_in_stock ?? variantStock > 0;

  // Calculate discount percentage if old price exists
  const discountPercent = oldPrice && Number(oldPrice) > Number(currentPrice)
    ? Math.round(((Number(oldPrice) - Number(currentPrice)) / Number(oldPrice)) * 100)
    : 0;

  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;
    addItem({
      productId: product.id,
      slug,
      name,
      image: primary_image ?? "",
      price: Number(currentPrice) || 0,
      quantity: 1,
      maxStock: default_variant?.stock_quantity ?? product.stock_quantity,
    });
    toast.success("Added to cart");
  };

  return (
    <Link
      href={`/products/${slug}`}
      className="group relative flex flex-col w-full h-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-transparent transition-all duration-300"
    >
      {/* Badges Container */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {is_new && (
          <span className="bg-[#fbc02d] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
            New
          </span>
        )}
        {discountPercent > 0 && (
          <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Image Section */}
      <div className="relative w-full aspect-square bg-[#f8f9fc] flex items-center justify-center p-6 overflow-hidden">
        <Image
          src={resolveImageUrl(primary_image) || '/placeholder.png'}
          alt={name ?? "Product"}
          fill
          className="object-contain group-hover:scale-110 transition-transform duration-500 ease-out mix-blend-multiply"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4">
        {/* Brand */}
        <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-widest mb-1.5 line-clamp-1">
          {brand?.name || "Local Brand"}
        </div>

        {/* Title */}
        <h3 className="text-[14px] font-semibold text-gray-800 line-clamp-2 leading-snug mb-3 group-hover:text-primary transition-colors min-h-[40px]">
          {name}
        </h3>

        <div className="mt-auto flex flex-col gap-3">
          {/* Prices */}
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-[16px] font-bold text-gray-900">
              Rs. {Number(currentPrice).toLocaleString()}
            </span>
            {oldPrice && Number(oldPrice) > Number(currentPrice) && (
              <span className="text-[12px] text-gray-400 line-through">
                Rs. {Number(oldPrice).toLocaleString()}
              </span>
            )}
          </div>

          {/* Features / Shipping Tags */}
          {(free_shipping || free_gift) && (
            <div className="flex flex-wrap gap-2">
              {free_shipping && (
                <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap">
                  Free Shipping
                </span>
              )}
              {free_gift && (
                <span className="bg-purple-50 text-purple-700 text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap">
                  Free Gift
                </span>
              )}
            </div>
          )}

          {/* Stock Status & Action */}
          <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-100">
            {inStock ? (
              <div className="flex items-center gap-1.5">
                <IoCheckmarkCircle className="text-green-500 text-[14px]" />
                <span className="text-[11px] text-green-600 font-medium">In Stock</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <IoCloseCircle className="text-red-500 text-[14px]" />
                <span className="text-[11px] text-red-500 font-medium">Out of Stock</span>
              </div>
            )}
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[11px] font-bold text-primary flex items-center gap-1 uppercase tracking-wide">
                Details <span className="text-[14px] leading-none">›</span>
              </span>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!inStock}
            className="mt-2 w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-white text-[12px] font-semibold py-2 uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FaCartPlus className="text-sm" />
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
