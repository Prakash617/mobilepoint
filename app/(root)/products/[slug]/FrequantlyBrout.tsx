'use client';

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { resolveImageUrl } from "@/lib/utils";
import { Product, ProductDetail } from "@/types/product";
import { IoAdd, IoHeartOutline } from "react-icons/io5";
import { useCartStore } from "@/stores/cartStore";

type ComboItem = {
  id: number;
  product: Product;
  quantity: number;
};

type Combo = {
  id: number;
  name: string;
  slug: string;
  combo_regular_price: string;
  combo_selling_price: string;
  items: ComboItem[];
};

type Props = {
  product: ProductDetail;
};

const FrequantlyBrout = ({ product: mainProduct }: Props) => {
  const addItem = useCartStore((state) => state.addItem);

  const combos = mainProduct.combos as Combo[] | undefined;

  if (!combos || combos.length === 0) return null;

  const combo = combos[0];
  
  if (!combo.items || combo.items.length === 0) return null;

  const comboItemsProducts = combo.items.map((item) => item.product).filter(p => p.id !== mainProduct.id);
  const allProducts = [mainProduct as unknown as Product, ...comboItemsProducts];

  const [selectedItems, setSelectedItems] = useState<Set<number>>(
    new Set(allProducts.filter(p => (p.stock_quantity ?? 0) > 0).map((p) => p.id))
  );

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
    const itemsToAdd = allProducts.filter((product) => selectedItems.has(product.id));
    
    itemsToAdd.forEach((p) => {
      const comboItem = combo.items.find(i => i.product.id === p.id);
      const quantity = comboItem ? comboItem.quantity : 1;
      
      const price = p.base_price || "0";
      addItem({
        productId: p.id,
        name: p.name,
        slug: p.slug,
        price: parseFloat(price),
        quantity: quantity,
        image: p.primary_image || "",
        maxStock: p.stock_quantity || 10,
      });
    });
  };

  const totalPrice = useMemo(() => {
    let sum = 0;
    allProducts.forEach((p) => {
      if (selectedItems.has(p.id)) {
        sum += parseFloat(p.base_price || "0");
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
            {allProducts.map((product, index) => {
              const outOfStock = (product.stock_quantity ?? 0) <= 0;
              return (
              <React.Fragment key={product.id}>
                <Link href={`/products/${product.slug}`} className="block">
                  <div className={`w-28 h-28 relative bg-white rounded-xl overflow-hidden border ${selectedItems.has(product.id) ? 'border-gray-200 shadow-sm' : 'border-transparent opacity-50'} ${outOfStock ? 'grayscale opacity-40' : ''} p-2 hover:border-gray-300 transition-colors`}>
                    <Image
                      src={resolveImageUrl(product.primary_image) || '/placeholder.png'}
                      alt={product.name}
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

          <div className="h-px bg-gray-200 w-full mb-6"></div>

          <div className="space-y-3">
            {allProducts.map((product, index) => {
              const outOfStock = (product.stock_quantity ?? 0) <= 0;
              return (
              <label key={product.id} className={`flex items-center gap-3 ${outOfStock ? 'cursor-not-allowed opacity-50' : 'cursor-pointer group'}`}>
                <input 
                  type="checkbox" 
                  checked={selectedItems.has(product.id)}
                  onChange={() => { if (!outOfStock) handleCheckboxChange(product.id); }}
                  disabled={outOfStock}
                  className="w-4 h-4 text-[#0066cc] bg-gray-100 border-gray-300 rounded focus:ring-[#0066cc] cursor-pointer disabled:cursor-not-allowed"
                />
                <span className="text-[15px] text-gray-800 font-medium">
                  {index === 0 && <span className="text-gray-500 font-normal">This Item: </span>}
                  <span className={outOfStock ? '' : 'group-hover:text-black transition-colors'}>{product.name}</span>
                  <span className="text-[#F1352B] font-bold ml-1">
                    ( Rs. {Number(product.base_price || 0).toLocaleString()}/- )
                  </span>
                  {outOfStock && <span className="text-xs font-bold text-red-500 ml-2 uppercase">Out of Stock</span>}
                </span>
              </label>
            )})}
          </div>
        </div>

        <div className="lg:w-[280px] flex flex-col justify-center lg:items-center">
          <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-1">Total Price:</p>
          <div className="text-3xl font-extrabold text-black mb-6">
            Rs. {totalPrice > 0 ? totalPrice.toLocaleString() : "0"}/-
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={selectedItems.size === 0}
            className="w-full bg-[#1ABA1A] disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-md hover:opacity-90 transition-opacity shadow-sm text-base mb-4"
          >
            ADD TO CART
          </button>
          
          <button className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
            <IoHeartOutline size={18} /> Add all to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrequantlyBrout;
