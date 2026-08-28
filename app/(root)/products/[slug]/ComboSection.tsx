'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { resolveImageUrl } from "@/lib/utils";
import { ProductDetail } from "@/types/product";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

type ComboItem = {
  id: number;
  product: {
    id: number;
    name: string;
    slug: string;
    base_price: string;
    primary_image: string;
    stock_quantity: number;
  };
  quantity: number;
};

type Combo = {
  id: number;
  name: string;
  slug: string;
  combo_regular_price: string;
  combo_selling_price: string;
  image?: string;
  items: ComboItem[];
};

type Props = {
  product: ProductDetail;
};

const ComboSection = ({ product: mainProduct }: Props) => {
  const addItem = useCartStore((state) => state.addItem);

  const combos = mainProduct.combos as Combo[] | undefined;

  if (!combos || combos.length === 0) return null;

  return (
    <div className="space-y-6 mb-8">
      {combos.map((combo) => {
        const outOfStock = combo.items.some(
          (item) => (item.product.stock_quantity ?? 0) < item.quantity
        );

        const handleAddCombo = () => {
          if (outOfStock) return;
          
          addItem({
            comboId: combo.id,
            productId: mainProduct.id,
            name: combo.name,
            slug: mainProduct.slug,
            price: parseFloat(combo.combo_selling_price || "0"),
            quantity: 1,
            image: resolveImageUrl(combo.image || mainProduct.primary_image || "/placeholder.png"),
            maxStock: 10, // Assuming 10 for now
          });
          toast.success("Combo added to cart!");
        };

        const discount = parseFloat(combo.combo_regular_price) - parseFloat(combo.combo_selling_price);

        return (
          <div key={combo.id} className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col lg:flex-row gap-8 items-stretch shadow-sm mb-6">
            
            {/* Left side: Main Image */}
            <div className="w-full lg:w-1/4 flex-shrink-0">
              <div className="relative w-full aspect-square bg-[#f8f9fc] rounded-xl flex items-center justify-center p-6 overflow-hidden border border-gray-100">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
                      Special Combo
                    </span>
                  </div>
                <Image
                  src={resolveImageUrl(combo.image || mainProduct.primary_image || "/placeholder.png")}
                  alt={combo.name}
                  fill
                  className="object-contain mix-blend-multiply transition-transform hover:scale-105 duration-300"
                />
              </div>
            </div>

            {/* Middle: Items List */}
            <div className="flex-1 w-full flex flex-col justify-center py-2">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{combo.name}</h3>
              <p className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">This bundle includes:</p>
              <ul className="space-y-3">
                {combo.items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3 text-sm text-gray-800 bg-gray-50 p-2.5 rounded-lg border border-gray-100 transition-colors hover:bg-gray-100">
                    <div className="relative w-12 h-12 bg-white rounded border border-gray-200 p-1 flex-shrink-0">
                        <Image 
                          src={resolveImageUrl(item.product.primary_image || "/placeholder.png")} 
                          alt={item.product.name} 
                          fill 
                          className="object-contain mix-blend-multiply" 
                        />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <span className="font-semibold line-clamp-1">{item.product.name}</span>
                      <span className="text-xs font-bold text-gray-500 mt-0.5">Rs. {parseFloat(item.product.base_price || "0").toLocaleString()}</span>
                    </div>
                    <span className="font-black text-gray-400 bg-white px-2 py-1 rounded text-xs border border-gray-200">
                      Qty: {item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side: Pricing & Add */}
            <div className="w-full lg:w-1/3 bg-[#f8f9fc] p-6 rounded-xl border border-gray-100 text-center flex flex-col justify-center">
              <div className="text-sm text-gray-400 line-through mb-1 font-medium">
                Original Total: Rs. {parseFloat(combo.combo_regular_price).toLocaleString()}
              </div>
              <div className="text-3xl font-black text-gray-900 mb-3">
                Rs. {parseFloat(combo.combo_selling_price).toLocaleString()}
              </div>
              {discount > 0 && (
                <div className="text-xs font-bold text-green-600 mb-6 bg-green-100 inline-block px-3 py-1.5 rounded-full mx-auto uppercase tracking-wide">
                  You Save: Rs. {discount.toLocaleString()}
                </div>
              )}
              
              <button
                onClick={handleAddCombo}
                disabled={outOfStock}
                className="w-full bg-primary text-white font-bold py-3.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-wide text-sm shadow-md hover:shadow-lg"
              >
                {outOfStock ? "Unavailable" : "Add Bundle to Cart"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ComboSection;
