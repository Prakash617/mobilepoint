"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  useCartStore,
  selectTotalItems,
  selectSubtotal,
} from "@/stores/cartStore";
import { resolveImageUrl } from "@/lib/utils";
import { FaTrashAlt, FaMinus, FaPlus, FaShoppingBag } from "react-icons/fa";
import { ArrowRight, ShoppingCart } from "lucide-react";

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeDrawer = useCartStore((s) => s.closeDrawer);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalItems = useCartStore(selectTotalItems);
  const subtotal = useCartStore(selectSubtotal);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0 bg-white">
        {/* Header */}
        <SheetHeader className="p-4 border-b border-gray-100 flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <SheetTitle className="text-lg font-bold text-gray-900">
              Shopping Cart ({totalItems})
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Content / Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                <FaShoppingBag className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-800">Your cart is empty</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Browse our catalog and discover exciting electronics & accessories!
                </p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="mt-2 bg-primary text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.key}
                className="flex items-center gap-3 p-3 bg-gray-50/60 rounded-xl border border-gray-100"
              >
                {/* Product Thumbnail */}
                <div className="relative w-16 h-16 bg-white rounded-lg border border-gray-100 overflow-hidden shrink-0">
                  <Image
                    src={resolveImageUrl(item.image) || "/placeholder.png"}
                    alt={item.name}
                    fill
                    className="object-contain p-1"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={closeDrawer}
                    className="text-xs font-bold text-gray-800 hover:text-primary line-clamp-1 block"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs font-bold text-primary mt-0.5">
                    Rs. {Number(item.price).toLocaleString()}
                  </p>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gray-200 rounded-md bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-1 px-2 text-gray-500 hover:text-black disabled:opacity-30"
                      >
                        <FaMinus size={9} />
                      </button>
                      <span className="px-2 text-xs font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        disabled={item.quantity >= item.maxStock}
                        className="p-1 px-2 text-gray-500 hover:text-black disabled:opacity-30"
                      >
                        <FaPlus size={9} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.key)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      title="Remove item"
                    >
                      <FaTrashAlt size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary Actions */}
        {items.length > 0 && (
          <SheetFooter className="p-4 border-t border-gray-100 bg-gray-50/50 flex-col space-y-3 sm:space-y-3">
            <div className="flex items-center justify-between text-sm w-full">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-base font-extrabold text-gray-900">
                Rs. {subtotal.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 w-full pt-1">
              <Link
                href="/addtocart"
                onClick={closeDrawer}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-gray-300 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 transition-colors text-center"
              >
                View Full Cart
              </Link>
              <Link
                href="/addtocart"
                onClick={closeDrawer}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-primary text-white text-xs font-bold hover:opacity-90 transition-opacity shadow-sm text-center"
              >
                Checkout <ArrowRight size={13} />
              </Link>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
