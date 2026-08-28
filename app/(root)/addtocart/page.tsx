"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTrashAlt, FaMinus, FaPlus, FaCheckCircle, FaPrint } from "react-icons/fa";
import {
  useCartStore,
  selectTotalItems,
} from "@/stores/cartStore";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { resolveImageUrl } from "@/lib/utils";
import CheckoutForm, {
  ShippingFields,
  BillingFields,
} from "@/components/checkout/CheckoutForm";
import ShipmentSummary from "@/components/checkout/ShipmentSummary";
import { useCheckoutQuote } from "@/hooks/useCheckoutQuote";
import type { OrderDetailResult } from "@/services/orderService";
import { useAuthStore, selectIsAuthenticated } from "@/stores/authStore";
import { toast } from "sonner";

type View = "cart" | "checkout" | "success";

const fmt = (v: string | number | undefined | null) =>
  v == null ? "0" : Number(v).toLocaleString();

export default function AddToCartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalItems = useCartStore(selectTotalItems);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  const { data: siteSettings } = useSiteSettings();
  const taxRate = parseFloat(siteSettings?.tax || "0");

  // Lifted shipping/billing state so the quote can react to address changes.
  const [shipping, setShipping] = useState<ShippingFields>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [billing, setBilling] = useState<BillingFields>({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const { quote, loading: loadingQuote, error: quoteError } = useCheckoutQuote(
    items,
    shipping as unknown as Record<string, string>
  );

  const subtotal = quote?.subtotal ?? "0";
  const shippingCost = quote?.shipping ?? "0";
  const tax = quote?.tax ?? "0";
  const total = quote?.total ?? "0";
  const showCalculating = loadingQuote || !quote;

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

  const setShippingField = (key: keyof ShippingFields, value: string) =>
    setShipping((s) => ({ ...s, [key]: value }));
  const setBillingField = (key: keyof BillingFields, value: string) =>
    setBilling((b) => ({ ...b, [key]: value }));

  if (view === "success" && placedOrder) {
    return (
      <OrderSuccess
        order={placedOrder}
        onContinue={goShopping}
        isAuthenticated={isAuthenticated}
      />
    );
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
          quote={quote}
          loadingQuote={loadingQuote}
          quoteError={quoteError}
          shipping={shipping}
          setShipping={setShippingField}
          billing={billing}
          setBilling={setBillingField}
          sameAsShipping={sameAsShipping}
          setSameAsShipping={setSameAsShipping}
          onSuccess={handleSuccess}
          onCancel={() => setView("cart")}
        />
      </div>
    );
  }

  return (
    <div className="w-full mt-10">
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
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between w-full gap-2">
                    <div className="flex flex-col">
                      {item.comboId && (
                        <span className="w-fit bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm mb-1.5">
                          Special Combo
                        </span>
                      )}
                      <Link
                        href={`/products/${item.slug}`}
                        className="text-base font-black text-gray-800 hover:text-[#0073bc] line-clamp-2"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <span className="text-sm font-semibold text-gray-800 whitespace-nowrap mt-1 sm:mt-0">
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
                        onClick={() => {
                          removeItem(item.key);
                          toast.success("Removed from cart");
                        }}
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
        <div id="summary" className="w-full sm:w-1/4 bg-gray-50 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>

          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Items {totalItems}
            </span>
            <span className="font-semibold text-sm">
              {showCalculating ? "..." : `Rs. ${fmt(subtotal)}`}
            </span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="font-semibold text-sm uppercase">Subtotal</span>
            <span className="text-sm">
              {showCalculating ? "..." : `Rs. ${fmt(subtotal)}`}
            </span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="font-semibold text-sm uppercase">Shipping</span>
            <span className="text-sm">
              {showCalculating
                ? "Calculating..."
                : shippingCost && Number(shippingCost) > 0
                ? `Rs. ${fmt(shippingCost)}`
                : "Free"}
            </span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="font-semibold text-sm uppercase">
              Tax ({taxRate}%)
            </span>
            <span className="text-sm">
              {showCalculating ? "..." : `Rs. ${fmt(tax)}`}
            </span>
          </div>

          {/* Free shipping threshold progress */}
          {quote?.free_shipping_threshold && !quote.free_shipping_threshold_met && (
            <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-3">
              <p className="text-xs text-green-700">
                Add{" "}
                <span className="font-bold">
                  Rs. {fmt(Number(quote.amount_to_free_shipping))}
                </span>{" "}
                more to get <span className="font-bold">FREE shipping</span>!
              </p>
              <div className="mt-2 h-2 w-full rounded-full bg-green-100">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{
                    width: `${Math.min(
                      100,
                      (Number(quote.subtotal) /
                        Number(quote.free_shipping_threshold)) *
                        100
                    )}%`,
                  }}
                />
              </div>
            </div>
          )}
          {quote?.free_shipping_threshold_met &&
            quote.free_shipping_threshold && (
              <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-3">
                <p className="text-xs font-semibold text-green-700">
                  You&apos;ve unlocked FREE shipping!
                </p>
              </div>
            )}

          {/* Delivery / shipments */}
          <div className="mt-4 mb-2">
            <p className="font-semibold text-sm uppercase mb-2">Delivery</p>
            <ShipmentSummary
              shipments={quote?.shipments}
              loading={loadingQuote}
              error={quoteError}
              compact
            />
          </div>

          <div className="border-t mt-6 pt-6">
            <div className="flex font-semibold justify-between py-3 text-sm uppercase">
              <span>Total cost</span>
              <span>
                {showCalculating ? "Calculating..." : `Rs. ${fmt(total)}`}
              </span>
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
  isAuthenticated,
}: {
  order: OrderDetailResult;
  onContinue: () => void;
  isAuthenticated: boolean;
}) {
  const orderTotal = parseFloat(order.total).toLocaleString();

  const handlePrint = () => window.print();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-500 text-sm">
              Thank you for your purchase. We&apos;ve received your order and will
              process it shortly.
            </p>
          </div>

          {/* Guest warning */}
          {!isAuthenticated && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-center">
              <p className="text-sm text-amber-700">
                Please save your order number <strong className="font-bold">{order.order_number}</strong> to track your order.
              </p>
            </div>
          )}

          <p className="text-xs text-gray-400 text-center mb-6">
            A confirmation has been sent to your email on file.
          </p>

          {/* Receipt */}
          <div id="printable-order" className="bg-gray-50 rounded-xl p-5 space-y-3">
            <div className="text-center border-b border-gray-200 pb-3 mb-3">
              <p className="text-base font-bold text-gray-900">Mobile Point</p>
              <p className="text-[11px] text-gray-400">Order Receipt</p>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Order Number</span>
              <span className="font-bold text-gray-900">{order.order_number}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Date</span>
              <span className="text-gray-800">{new Date(order.created_at).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Total Amount</span>
              <span className="font-bold text-gray-900">Rs. {orderTotal}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-semibold text-gray-800 capitalize">{order.payment_method.replace("_", " ")}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Order Status</span>
              <span className="inline-flex items-center gap-1.5 text-green-700 font-semibold capitalize">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {order.order_status}
              </span>
            </div>

            {/* Items */}
            <div className="border-t border-gray-200 pt-3">
              <p className="text-sm font-semibold text-gray-700 mb-2">Items</p>
              <ul className="space-y-1.5">
                {order.items.map((it) => (
                  <li key={it.id} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-gray-800 truncate">
                      {it.product_name}
                      {it.variant_name ? ` (${it.variant_name})` : ""}
                      <span className="text-gray-400 ml-1">x{it.quantity}</span>
                    </span>
                    <span className="font-medium text-gray-900 shrink-0">
                      Rs. {Number(it.subtotal).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-xl transition text-sm print:hidden"
            >
              <FaPrint /> Print Order
            </button>
            <Link
              href="/products"
              onClick={onContinue}
              className="flex-1 flex items-center justify-center bg-[#0073bc] hover:brightness-90 text-white font-semibold py-3 rounded-xl transition text-sm print:hidden"
            >
              Continue Shopping
            </Link>
          </div>

          {isAuthenticated && (
            <Link
              href="/dashboard"
              className="mt-3 block w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition print:hidden text-center text-sm"
            >
              View My Orders
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
