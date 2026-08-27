'use client';

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { resolveImageUrl } from "@/lib/utils";
import { ProductDetail } from "@/types/product";
import { IoAdd } from "react-icons/io5";
import { useCartStore } from "@/stores/cartStore";
import { productService } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

type Props = {
  product: ProductDetail;
};

const FrequantlyBrout = ({ product: mainProduct }: Props) => {
  const addItem = useCartStore((state) => state.addItem);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['fbt', mainProduct.slug],
    queryFn: () => productService.getFBT(mainProduct.slug),
    retry: 1,
  });

  const allProducts = useMemo(() => {
    if (!data || !data.products || data.products.length === 0) return [];
    
    // Map main product from the mainProduct prop
    const mainProdMapped = {
      id: mainProduct.id,
      name: mainProduct.name,
      slug: mainProduct.slug,
      price: mainProduct.base_price?.toString() || "0",
      image: mainProduct.images?.[0]?.image || null,
      stock_quantity: mainProduct.stock_quantity,
    };
    
    return [mainProdMapped, ...data.products];
  }, [data, mainProduct]);

  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  // Initialize selected items when products load
  useEffect(() => {
    if (allProducts.length > 0 && selectedItems.size === 0) {
      setSelectedItems(new Set(allProducts.filter(p => p.stock_quantity > 0).map(p => p.id)));
    }
  }, [allProducts]);

  if (isLoading) return <div className="p-6 md:p-8 animate-pulse bg-white rounded-xl shadow-sm border border-gray-100 mb-2 h-64"></div>;
  if (isError) return <div className="p-6 md:p-8 bg-red-50 text-red-500 rounded-xl mb-2 text-sm font-semibold">Failed to load frequently bought together recommendations.</div>;
  if (!data || !data.products || data.products.length === 0) return null;

  const handleCheckboxChange = (productId: number) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const handleAddToCart = () => {
    const itemsToAdd = allProducts.filter((p) => selectedItems.has(p.id));
    
    itemsToAdd.forEach((p) => {
      addItem({
        productId: p.id,
        name: p.name,
        slug: p.slug,
        price: parseFloat(p.price),
        quantity: 1,
        image: p.image || "",
        maxStock: p.stock_quantity || 10,
      });
    });
  };

  const totalPrice = useMemo(() => {
    let sum = 0;
    allProducts.forEach((p) => {
      if (selectedItems.has(p.id)) {
        sum += parseFloat(p.price || "0");
      }
    });
    return sum;
  }, [selectedItems, allProducts]);

  return (
    <div className="p-6 md:p-8 bg-white rounded-xl shadow-sm border border-gray-100 mb-2">
      <h2 className="text-xl font-bold text-black tracking-tight uppercase mb-6">
        Frequently Bought Together
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-4 lg:gap-6 mb-8">
            {allProducts.map((p, index) => {
              const outOfStock = p.stock_quantity <= 0;
              return (
              <React.Fragment key={p.id}>
                <Link href={`/products/${p.slug}`} className="block">
                  <div className={`w-28 h-28 relative bg-white rounded-xl overflow-hidden border ${selectedItems.has(p.id) ? 'border-gray-200 shadow-sm' : 'border-transparent opacity-50'} ${outOfStock ? 'grayscale opacity-40' : ''} p-2 hover:border-gray-300 transition-colors`}>
                    <Image
                      src={resolveImageUrl(p.image) || '/placeholder.png'}
                      alt={p.name}
                      fill
                      className="object-contain mix-blend-multiply"
                    />
                  </div>
                </Link>
                {index < allProducts.length - 1 && (
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                    <IoAdd size={20} />
                  </div>
                )}
              </React.Fragment>
            )})}
          </div>

          <div className="space-y-4 max-w-xl">
            {allProducts.map((p, index) => {
              const isMainProduct = index === 0;
              const outOfStock = p.stock_quantity <= 0;
              
              return (
                <div key={p.id} className={`flex items-center gap-4 ${outOfStock ? 'opacity-50' : ''}`}>
                  <label className="relative flex items-center justify-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(p.id)}
                      onChange={() => handleCheckboxChange(p.id)}
                      disabled={outOfStock || isMainProduct}
                      className={`w-5 h-5 rounded border-2 border-gray-300 appearance-none checked:bg-[#0073bc] checked:border-[#0073bc] transition-colors ${
                        (outOfStock || isMainProduct) ? 'cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    />
                    <svg className={`absolute w-3.5 h-3.5 text-white pointer-events-none ${selectedItems.has(p.id) ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </label>
                  
                  <div className="flex-1 text-sm font-semibold">
                    {isMainProduct ? (
                      <span className="text-gray-900">
                        <span className="text-gray-500 mr-2 font-normal">This item:</span>
                        {p.name}
                      </span>
                    ) : (
                      <Link href={`/products/${p.slug}`} className="text-gray-700 hover:text-[#0073bc] transition-colors">
                        {p.name}
                      </Link>
                    )}
                  </div>
                  
                  <div className="text-sm font-bold text-gray-900">
                    Rs. {Number(p.price).toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 sticky top-24">
            <div className="text-sm text-gray-500 font-semibold mb-2">Total Price:</div>
            <div className="text-3xl font-extrabold text-black mb-6 tracking-tight">
              Rs. {totalPrice.toLocaleString()}
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={selectedItems.size === 0}
              className="w-full bg-[#0073bc] text-white font-bold py-4 px-6 rounded-xl hover:bg-[#005a93] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#0073bc]/20 mb-3"
            >
              Add Selected to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequantlyBrout;
