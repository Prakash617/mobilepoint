"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCombos } from "@/hooks/useProducts";
import { resolveImageUrl } from "@/lib/utils";

const ComboProducts = () => {
  const { data, isLoading } = useCombos({ limit: 4 });

  if (isLoading) return null;
  if (!data?.results || data.results.length === 0) return null;

  return (
    <div className="bg-white border mt-2 border-solid space-y-4 rounded-xl p-8">
      {/* Header */}
      <div className="flex flex-row justify-between sm:items-center gap-2 mb-4">
        <p className="font-bold text-lg uppercase">
          Special Combos
        </p>
        <Link href="/products" className="text-gray-400 font-light sm:mt-0 text-sm sm:text-base hover:text-primary transition-colors">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.results.map((combo: any) => {
          const regularPrice = parseFloat(combo.combo_regular_price);
          const sellingPrice = parseFloat(combo.combo_selling_price);
          const discountAmount = regularPrice - sellingPrice;
          
          return (
            <Link 
              href={`/products/${combo.main_product.slug}`} 
              key={combo.id} 
              className="group relative flex flex-col w-full h-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-transparent transition-all duration-300"
            >
              {/* Badges Container */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                <span className="bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
                  Combo
                </span>
                {discountAmount > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
                    Save Rs. {discountAmount.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Image Section */}
              <div className="relative w-full aspect-square bg-[#f8f9fc] flex items-center justify-center p-6 overflow-hidden">
                <Image
                  src={resolveImageUrl(combo.image || combo.main_product.primary_image) || "/placeholder.png"}
                  alt={combo.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-500 ease-out mix-blend-multiply"
                />
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-1 p-4">
                <div className="text-[11px] text-orange-500 font-bold uppercase tracking-widest mb-1.5 line-clamp-1">
                  BUNDLE OFFER
                </div>

                <h3 className="text-[14px] font-semibold text-gray-800 line-clamp-2 leading-snug mb-3 group-hover:text-primary transition-colors min-h-[40px]">
                  {combo.name}
                </h3>

                <div className="mt-auto flex flex-col gap-3">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-[16px] font-bold text-gray-900">
                      Rs. {sellingPrice.toLocaleString()}
                    </span>
                    {discountAmount > 0 && (
                      <span className="text-[12px] text-gray-400 line-through">
                        Rs. {regularPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-100">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full text-center">
                      <span className="text-[11px] font-bold text-primary uppercase tracking-wide">
                        View Bundle
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ComboProducts;
