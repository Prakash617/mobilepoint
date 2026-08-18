"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTrashAlt, FaMinus, FaPlus, FaCheckCircle } from "react-icons/fa";
import {
  useCartStore,
  selectTotalItems,
  selectSubtotal,
} from "@/stores/cartStore";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { resolveImageUrl } from "@/lib/utils";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import type { OrderDetailResult } from "@/services/orderService";

type View = "cart" | "checkout" | "success";

export default function AddToCartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalItems = useCartStore(selectTotalItems);
  const subtotal = useCartStore(selectSubtotal);

  const { data: siteSettings } = useSiteSettings();
  const shipping = parseFloat(siteSettings?.shipping_cost || "0");
  const taxRate = parseFloat(siteSettings?.tax || "0");
  const tax = (subtotal * taxRate) / 100;
  const total = subtotal + shipping + tax;

  const [view, setView] = useState<View>("cart");
  const [placedOrder, setPlacedOrder] = useState<OrderDetailResult | null>(
    null
  );

  const handleSuccess = (order: OrderDetailResult) => {
    setPlacedOrder(order);
    clearCart();
    setView("success");
  };

  const goShopping = () => {
    setPlacedOrder(null);
    setView("cart");
  };

  if (view === "success" && placedOrder) {
    return <OrderSuccess order={placedOrder} onContinue={goShopping} />;
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto my-16 px-4 lg:mb-32">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-16 md:p-24 text-center max-w-3xl mx-auto">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-10 text-lg">
            Looks like you haven&apos;t added anything to your cart yet. Discover our latest products and start shopping!
          </p>
          <Link
            href="/products"
            className="inline-block bg-primary text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-primary/20"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (view === "checkout") {
    return (
      <div className="container mx-auto mt-10 px-4 mb-20">
        <button
          type="button"
          onClick={() => setView("cart")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0073bc] hover:underline mb-6"
        >
          ← Back to cart
        </button>
        <CheckoutForm
          items={items}
          subtotal={subtotal}
          shippingCost={shipping}
          taxRate={taxRate}
          tax={tax}
          total={total}
          onSuccess={handleSuccess}
          onCancel={() => setView("cart")}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="sm:flex shadow-md rounded-xl overflow-hidden my-10">
        {/* Cart items */}
        <div className="w-full sm:w-3/4 bg-white px-4 sm:px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">
              {totalItems} Item{totalItems !== 1 ? "s" : ""}
            </h2>
          </div>

          {items.map((item) => {
            const lineTotal = item.price * item.quantity;
            return (
              <div
                key={item.key}
                className="md:flex items-center py-6 md:py-8 border-b border-gray-100"
              >
                {/* Image */}
                <div className="md:w-2/12 w-full">
                  <div className="relative w-24 h-24 mx-auto md:mx-0">
                    <Image
                      src={resolveImageUrl(item.image)}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="md:pl-4 md:w-10/12 flex flex-col justify-center mt-4 md:mt-0">
                  <div className="flex items-center justify-between w-full gap-2">
                    <Link
                      href={`/products/${item.slug}`}
                      className="text-base font-black text-gray-800 hover:text-[#0073bc]"
                    >
                      {item.name}
                    </Link>
                    <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                      Rs. {Number(item.price).toLocaleString()}
                    </span>
                  </div>

                  {item.variantId && (
                    <p className="text-xs text-gray-500 mt-1">
                      Variant #{item.variantId}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity stepper */}
                    <div className="flex items-center border rounded-lg">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.key, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="px-3 py-1.5 text-gray-600 disabled:opacity-30"
                        aria-label="Decrease quantity"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="px-4 text-sm font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.key, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.maxStock}
                        className="px-3 py-1.5 text-gray-600 disabled:opacity-30"
                        aria-label="Increase quantity"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-gray-900">
                        Rs. {lineTotal.toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        className="text-red-500 hover:text-red-700 flex items-center gap-1 text-xs"
                        aria-label="Remove item"
                      >
                        <FaTrashAlt /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <Link
            href="/products"
            className="flex font-semibold text-[#0073bc] text-sm mt-10 hover:underline"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* Order summary */}
        <div id="summary" className="w-full sm:w-1/4 md:w-1/3 bg-gray-50 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>

          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Items {totalItems}
            </span>
            <span className="font-semibold text-sm">
              Rs. {subtotal.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="font-semibold text-sm uppercase">Subtotal</span>
            <span className="text-sm">Rs. {subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="font-semibold text-sm uppercase">Shipping</span>
            <span className="text-sm">
              {shipping > 0 ? `Rs. ${shipping.toLocaleString()}` : "Free"}
            </span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="font-semibold text-sm uppercase">
              Tax ({taxRate}%)
            </span>
            <span className="text-sm">Rs. {tax.toLocaleString()}</span>
          </div>

          <div className="border-t mt-6 pt-6">
            <div className="flex font-semibold justify-between py-3 text-sm uppercase">
              <span>Total cost</span>
              <span>Rs. {total.toLocaleString()}</span>
            </div>

            <button
              onClick={() => setView("checkout")}
              className="bg-[#0073bc] font-semibold hover:brightness-90 py-3 text-sm text-white uppercase w-full rounded-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderSuccess({
  order,
  onContinue,
}: {
  order: OrderDetailResult;
  onContinue: () => void;
}) {
  const orderTotal = parseFloat(order.total).toLocaleString();

  return (
    <div className="container mx-auto my-12 px-4 lg:mb-32">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-500 mb-2">
            Thank you for your purchase. We&apos;ve received your order and will
            process it shortly.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            A confirmation has been sent to your email on file.
          </p>

          {/* Order details */}
          <div className="bg-gray-50 rounded-xl p-6 text-left space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Order Number</span>
              <span className="font-bold text-gray-900">
                {order.order_number}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Total Amount</span>
              <span className="font-bold text-gray-900">Rs. {orderTotal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Payment Method</span>
              <span className="font-semibold text-gray-800 capitalize">
                {order.payment_method.replace("_", " ")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Order Status</span>
              <span className="inline-flex items-center gap-1.5 text-green-700 font-semibold capitalize">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {order.order_status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Items</span>
              <span className="font-semibold text-gray-800">
                {order.items_count}
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Link
              href="/products"
              onClick={onContinue}
              className="block w-full bg-[#0073bc] hover:brightness-90 text-white font-bold px-8 py-4 rounded-xl transition"
            >
              Continue Shopping
            </Link>
            <Link
              href="/dashboard"
              className="block w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-xl transition"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
