"use client";

import { useState } from "react";
import {
  FaCheckCircle,
  FaTruck,
  FaCreditCard,
  FaClipboardCheck,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { CartItem } from "@/stores/cartStore";
import {
  orderService,
  OrderDetailResult,
  PaymentMethod,
  CheckoutQuote,
} from "@/services/orderService";
import { paymentService } from "@/services/paymentService";
import { toast } from "sonner";
import ShipmentSummary from "@/components/checkout/ShipmentSummary";
import { useAuthStore, selectIsAuthenticated } from "@/stores/authStore";

interface CheckoutFormProps {
  items: CartItem[];
  quote: CheckoutQuote | null;
  loadingQuote: boolean;
  quoteError: string | null;
  shipping: ShippingFields;
  setShipping: (key: keyof ShippingFields, value: string) => void;
  billing: BillingFields;
  setBilling: (key: keyof BillingFields, value: string) => void;
  sameAsShipping: boolean;
  setSameAsShipping: (v: boolean) => void;
  onSuccess: (order: OrderDetailResult) => void;
  onCancel: () => void;
}

export interface ShippingFields {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface BillingFields {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const PAYMENT_METHODS: { value: PaymentMethod; label: string; hint: string }[] =
  [
    { value: "cod", label: "Cash on Delivery", hint: "Pay when your order arrives" },
    { value: "khalti", label: "Khalti", hint: "Pay via Khalti wallet" },
    { value: "esewa", label: "eSewa", hint: "Pay via eSewa wallet" },
    { value: "bank_transfer", label: "Bank Transfer", hint: "Manual bank deposit" },
  ];

const inputCls =
  "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0073bc]/30 focus:border-[#0073bc] transition";
const labelCls = "block text-xs font-semibold text-gray-600 mb-1.5 uppercase";

const STEPS = [
  { id: 1, label: "Shipping" },
  { id: 2, label: "Payment" },
  { id: 3, label: "Review" },
];

const fmt = (v: string | number | undefined | null) =>
  v == null ? "0" : Number(v).toLocaleString();

export default function CheckoutForm({
  items,
  quote,
  loadingQuote,
  quoteError,
  shipping,
  setShipping,
  billing,
  setBilling,
  sameAsShipping,
  setSameAsShipping,
  onSuccess,
  onCancel,
}: CheckoutFormProps) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("cod");
  const [paymentTransactionId, setPaymentTransactionId] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  const billingData = sameAsShipping
    ? {
        name: shipping.name,
        address: shipping.address,
        city: shipping.city,
        state: shipping.state,
        zip: shipping.zip,
        country: shipping.country,
      }
    : billing;

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    setLoading(true);
    try {
      const orderPayload = {
        items: orderService.buildItems(items),
        payment_method: paymentMethod,
        payment_transaction_id:
          paymentMethod !== "cod" && paymentTransactionId
            ? paymentTransactionId
            : undefined,
        shipping_name: shipping.name,
        shipping_email: shipping.email,
        shipping_phone: shipping.phone,
        shipping_address: shipping.address,
        shipping_city: shipping.city,
        shipping_state: shipping.state,
        shipping_zip: shipping.zip,
        shipping_country: shipping.country,
        billing_name: billingData.name,
        billing_address: billingData.address,
        billing_city: billingData.city,
        billing_state: billingData.state,
        billing_zip: billingData.zip,
        billing_country: billingData.country,
        notes: notes || undefined,
      };

      const order = isAuthenticated
        ? await orderService.createOrder(orderPayload)
        : await orderService.createGuestOrder(orderPayload);

      if (paymentMethod === "esewa") {
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const esewaPayload = {
          order_id: order.id,
          amount: parseFloat(order.subtotal),
          tax_amount: parseFloat(order.tax),
          service_charge: 0,
          delivery_charge: parseFloat(order.shipping_cost),
          success_url: `${origin}/payment/esewa/success`,
          failure_url: `${origin}/payment/esewa/failure`,
        };

        const esewaResponse = await paymentService.initiateEsewa(esewaPayload);
        paymentService.redirectToFesewa(
          esewaResponse.form_url,
          esewaResponse.form_data
        );
        return;
      }

      if (paymentMethod === "khalti") {
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        const khaltiPayload = {
          order_id: order.id,
          amount: parseFloat(order.total),
          purchase_order_id: order.order_number,
          purchase_order_name: `Order ${order.order_number}`,
          return_url: `${origin}/payment/khalti/success`,
          website_url: origin,
        };
        const khaltiResponse = await paymentService.initiateKhalti(khaltiPayload);
        window.location.href = khaltiResponse.payment_url;
        return;
      }

      onSuccess(order);
    } catch (err: unknown) {
      const data = (err as { response?: { data?: unknown } })?.response
        ?.data;
      const message =
        typeof data === "object" && data !== null
          ? Object.values(data as Record<string, unknown>)
              .flat()
              .filter((v) => typeof v === "string")
              .join(", ") || "Something went wrong. Please try again."
          : "Something went wrong. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      goNext();
    } else {
      handlePlaceOrder(e);
    }
  };

  // Money values always come from the backend quote.
  const subtotal = quote?.subtotal ?? "0";
  const shippingCost = quote?.shipping ?? "0";
  const tax = quote?.tax ?? "0";
  const total = quote?.total ?? "0";
  const showCalculating = loadingQuote || !quote;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 md:px-8 py-5 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Checkout</h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>

      {/* Stepper */}
      <div className="px-6 md:px-8 pt-6">
        <ol className="flex items-center w-full">
          {STEPS.map((s, i) => {
            const active = step === s.id;
            const complete = step > s.id;
            return (
              <li
                key={s.id}
                className={`flex items-center ${
                  i !== STEPS.length - 1 ? "w-full" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => complete && setStep(s.id)}
                  className={`flex items-center gap-2 ${
                    complete ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition ${
                      complete
                        ? "bg-green-500 text-white"
                        : active
                        ? "bg-[#0073bc] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {complete ? <FaCheckCircle /> : s.id}
                  </span>
                  <span
                    className={`hidden sm:block text-sm font-semibold ${
                      active || complete ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
                {i !== STEPS.length - 1 && (
                  <div
                    className={`flex-1 mx-2 sm:mx-3 h-0.5 rounded ${
                      complete ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <form onSubmit={handleStepSubmit} className="p-6 md:p-8 space-y-6">
        {/* STEP 1: Shipping */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[#0073bc]">
              <FaTruck />
              <p className="font-bold text-sm uppercase">Shipping Information</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                required
                value={shipping.name}
                onChange={(e) => setShipping("name", e.target.value)}
                placeholder="Full name *"
                className={inputCls}
              />
              <input
                type="tel"
                required
                value={shipping.phone}
                onChange={(e) => setShipping("phone", e.target.value)}
                placeholder="Phone *"
                className={inputCls}
              />
              <input
                type="email"
                value={shipping.email}
                onChange={(e) => setShipping("email", e.target.value)}
                placeholder="Email"
                className={inputCls}
              />
              <input
                required
                value={shipping.country}
                onChange={(e) => setShipping("country", e.target.value)}
                placeholder="Country *"
                className={inputCls}
              />
              <input
                required
                value={shipping.address}
                onChange={(e) => setShipping("address", e.target.value)}
                placeholder="Address *"
                className={`${inputCls} md:col-span-2`}
              />
              <input
                required
                value={shipping.city}
                onChange={(e) => setShipping("city", e.target.value)}
                placeholder="City *"
                className={inputCls}
              />
              <input
                value={shipping.state}
                onChange={(e) => setShipping("state", e.target.value)}
                placeholder="State / Province"
                className={inputCls}
              />
              <input
                value={shipping.zip}
                onChange={(e) => setShipping("zip", e.target.value)}
                placeholder="ZIP / Postal code"
                className={inputCls}
              />
            </div>

            <div className="space-y-2">
              <p className={labelCls}>Order Notes</p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Special instructions (optional)"
                rows={2}
                className={inputCls}
              />
            </div>

            {/* Billing same as shipping */}
            <div className="rounded-lg border border-gray-200 p-4">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sameAsShipping}
                  onChange={(e) => setSameAsShipping(e.target.checked)}
                  className="accent-[#0073bc]"
                />
                Billing same as shipping
              </label>
              {!sameAsShipping && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  <input
                    required
                    value={billing.name}
                    onChange={(e) => setBilling("name", e.target.value)}
                    placeholder="Full name *"
                    className={inputCls}
                  />
                  <input
                    required
                    value={billing.country}
                    onChange={(e) => setBilling("country", e.target.value)}
                    placeholder="Country *"
                    className={inputCls}
                  />
                  <input
                    required
                    value={billing.address}
                    onChange={(e) => setBilling("address", e.target.value)}
                    placeholder="Address *"
                    className={`${inputCls} md:col-span-2`}
                  />
                  <input
                    required
                    value={billing.city}
                    onChange={(e) => setBilling("city", e.target.value)}
                    placeholder="City *"
                    className={inputCls}
                  />
                  <input
                    value={billing.state}
                    onChange={(e) => setBilling("state", e.target.value)}
                    placeholder="State / Province"
                    className={inputCls}
                  />
                  <input
                    value={billing.zip}
                    onChange={(e) => setBilling("zip", e.target.value)}
                    placeholder="ZIP / Postal code"
                    className={inputCls}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: Payment */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#0073bc]">
              <FaCreditCard />
              <p className="font-bold text-sm uppercase">Payment Method</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PAYMENT_METHODS.map((m) => (
                <label
                  key={m.value}
                  className={`flex items-start gap-3 border rounded-xl px-4 py-3 cursor-pointer transition ${
                    paymentMethod === m.value
                      ? "border-[#0073bc] bg-[#0073bc]/5 ring-1 ring-[#0073bc]/30"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value={m.value}
                    checked={paymentMethod === m.value}
                    onChange={() => setPaymentMethod(m.value)}
                    className="accent-[#0073bc] mt-0.5"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-gray-800">
                      {m.label}
                    </span>
                    <span className="block text-xs text-gray-500">
                      {m.hint}
                    </span>
                  </span>
                </label>
              ))}
            </div>

            {paymentMethod !== "cod" && paymentMethod !== "esewa" && paymentMethod !== "khalti" && (
              <div className="space-y-1.5">
                <p className={labelCls}>Transaction ID</p>
                <input
                  value={paymentTransactionId}
                  onChange={(e) => setPaymentTransactionId(e.target.value)}
                  placeholder="Enter your payment transaction ID"
                  className={inputCls}
                />
                <p className="text-xs text-gray-400">
                  Complete the payment through {paymentMethod} and enter the
                  transaction ID above.
                </p>
              </div>
            )}

            {paymentMethod === "esewa" && (
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-sm text-blue-700">
                <p className="font-semibold mb-1">eSewa Payment</p>
                <p>
                  You will be redirected to eSewa to complete your payment securely.
                  After successful payment, you will be redirected back to our site.
                </p>
              </div>
            )}

            {paymentMethod === "khalti" && (
              <div className="rounded-lg bg-purple-50 border border-purple-200 p-4 text-sm text-purple-700">
                <p className="font-semibold mb-1">Khalti Payment</p>
                <p>
                  You will be redirected to Khalti to complete your payment securely.
                  After successful payment, you will be redirected back to our site.
                </p>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Review */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-[#0073bc]">
              <FaClipboardCheck />
              <p className="font-bold text-sm uppercase">
                Review Your Order
              </p>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-bold text-gray-500 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      {item.quantity}
                    </span>
                    <span className="text-sm text-gray-800 truncate">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 shrink-0">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Delivery (shipments) */}
            <div className="space-y-2">
              <p className={labelCls}>Delivery</p>
              <ShipmentSummary
                shipments={quote?.shipments}
                loading={loadingQuote}
                error={quoteError}
              />
            </div>

            {/* Money summary */}
            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-800">
                  {showCalculating ? "Calculating..." : `Rs. ${fmt(subtotal)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="text-gray-800">
                  {showCalculating
                    ? "Calculating..."
                    : shippingCost && Number(shippingCost) > 0
                    ? `Rs. ${fmt(shippingCost)}`
                    : "Free"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax</span>
                <span className="text-gray-800">
                  {showCalculating ? "Calculating..." : `Rs. ${fmt(tax)}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100 text-base">
                <span>Total</span>
                <span>
                  {showCalculating ? "Calculating..." : `Rs. ${fmt(total)}`}
                </span>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-700 space-y-1">
              <p className="font-semibold text-gray-800">Delivery to</p>
              <p>
                {shipping.name}
                {shipping.phone ? ` · ${shipping.phone}` : ""}
              </p>
              <p>
                {shipping.address}, {shipping.city}
                {shipping.state ? `, ${shipping.state}` : ""}{" "}
                {shipping.country}
              </p>
              <p className="pt-1">
                Payment:{" "}
                <span className="font-semibold capitalize">
                  {paymentMethod.replace("_", " ")}
                </span>
                {paymentMethod !== "cod" && paymentTransactionId
                  ? ` (ID: ${paymentTransactionId})`
                  : ""}
              </p>
            </div>
          </div>
        )}

        {error && (
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
            {error}
          </p>
        )}

        {/* Step nav buttons */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <FaArrowLeft /> Back
            </button>
          ) : (
            <span />
          )}

          {step < 3 ? (
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#0073bc] hover:brightness-90 text-white font-bold uppercase py-3 px-8 rounded-lg"
            >
              Continue <FaArrowRight />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading || showCalculating}
              className="inline-flex items-center gap-2 bg-[#0073bc] hover:brightness-90 text-white font-bold uppercase py-3 px-8 rounded-lg disabled:opacity-50"
            >
              {loading ? "Placing order..." : "Place Order"}
              {!loading && <FaCheckCircle />}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
