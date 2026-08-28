"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";
import { resolveImageUrl } from "@/lib/utils";
import {
  Package,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  AlertCircle,
  PhoneCall,
  Calendar,
  CreditCard,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

interface TrackedOrder {
  id: number;
  order_number: string;
  order_status: string;
  payment_status: string;
  payment_method: string;
  total: string;
  shipping_cost?: string;
  tax?: string;
  created_at: string;
  tracking_number?: string;
  shipping_name?: string;
  shipping_address?: string;
  shipping_city?: string;
  shipping_phone?: string;
  items: Array<{
    id: number;
    product_name: string;
    variant_name?: string;
    quantity: number;
    unit_price: string;
    subtotal: string;
    image?: string;
  }>;
  status_history?: Array<{
    id: number;
    status: string;
    notes?: string;
    created_at: string;
  }>;
}

const statusSteps = [
  { key: "pending", label: "Order Placed", desc: "We have received your order" },
  { key: "confirmed", label: "Confirmed", desc: "Order details verified" },
  { key: "processing", label: "Packaging", desc: "Preparing electronics & test" },
  { key: "shipped", label: "Dispatched", desc: "On the way to your address" },
  { key: "delivered", label: "Delivered", desc: "Package received successfully" },
];

export default function TrackOrderPage() {
  const [orderQuery, setOrderQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) {
      toast.error("Please enter an order number");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await api.get<TrackedOrder>(`/orders/track/`, {
        params: { order_number: orderQuery.trim() },
      });
      setOrder(data);
      toast.success("Order details retrieved");
    } catch (err: any) {
      const msg = err.response?.data?.error || "Order not found. Please verify your order number.";
      setError(msg);
      setOrder(null);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const orderIndex = statusSteps.findIndex((s) => s.key === currentStatus.toLowerCase());
    const stepIndex = statusSteps.findIndex((s) => s.key === stepKey);

    if (currentStatus.toLowerCase() === "cancelled") return "cancelled";
    if (orderIndex === -1) {
      return stepIndex === 0 ? "active" : "upcoming";
    }
    if (stepIndex < orderIndex) return "completed";
    if (stepIndex === orderIndex) return "active";
    return "upcoming";
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-2 shadow-xs">
            <Package className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Track Your Order
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Enter your order reference number (e.g. <strong>MP-2026-XXXX</strong> or order ID) to view live delivery milestones.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="Enter Order Number (e.g. MP-12345)"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white font-bold px-7 py-3 rounded-xl text-sm hover:opacity-90 transition-all shadow-md shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Track Status"
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{error}</p>
                <p className="text-xs text-red-500 mt-0.5">
                  Need help? Contact our 24/7 support team at <a href="tel:+9779801234567" className="underline font-bold">+977 980-1234567</a>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Order Results */}
        {order && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-8 animate-fadeIn">
            
            {/* Top Bar Summary */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Order Details
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-0.5">
                  {order.order_number}
                </h3>
                <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                  <Calendar size={13} /> Placed on {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                    Total Amount
                  </span>
                  <span className="text-lg font-extrabold text-primary">
                    Rs. {parseFloat(order.total).toLocaleString()}
                  </span>
                </div>
                <div className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize ${
                  order.order_status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : order.order_status === "cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-[#0073bc]"
                }`}>
                  {order.order_status}
                </div>
              </div>
            </div>

            {/* Delivery Progress Bar */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                Live Delivery Milestones
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
                {statusSteps.map((step, idx) => {
                  const state = getStepStatus(step.key, order.order_status);
                  return (
                    <div
                      key={step.key}
                      className={`relative flex sm:flex-col items-center sm:text-center p-3 rounded-xl border transition-all ${
                        state === "completed"
                          ? "bg-green-50/70 border-green-200 text-green-800"
                          : state === "active"
                          ? "bg-primary/5 border-primary text-primary font-bold shadow-xs"
                          : "bg-gray-50/50 border-gray-100 text-gray-400"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-0 sm:mb-2 mr-3 sm:mr-0 shrink-0 font-bold text-xs ${
                        state === "completed"
                          ? "bg-green-500 text-white"
                          : state === "active"
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}>
                        {state === "completed" ? <CheckCircle2 size={16} /> : idx + 1}
                      </div>
                      <div className="text-left sm:text-center">
                        <span className="text-xs font-bold block">{step.label}</span>
                        <span className="text-[10px] text-gray-500 block leading-tight mt-0.5">
                          {step.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipping & Delivery Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50/60 p-5 rounded-2xl border border-gray-100 text-xs">
              <div className="space-y-2">
                <p className="font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin size={14} className="text-primary" /> Delivery Address
                </p>
                <p className="text-gray-800 font-semibold">{order.shipping_name || "Customer"}</p>
                <p className="text-gray-600 leading-relaxed">
                  {order.shipping_address || "Standard Delivery Address"}{" "}
                  {order.shipping_city && `• ${order.shipping_city}`}
                </p>
                {order.shipping_phone && (
                  <p className="text-gray-600">Contact: {order.shipping_phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <p className="font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard size={14} className="text-primary" /> Payment & Logistics
                </p>
                <p className="text-gray-600">
                  Method: <strong className="text-gray-800 capitalize">{order.payment_method.replace("_", " ")}</strong>
                </p>
                <p className="text-gray-600">
                  Payment Status: <span className="font-bold capitalize text-gray-800">{order.payment_status}</span>
                </p>
                {order.tracking_number && (
                  <p className="text-gray-600">
                    Courier Tracking Code: <strong className="text-primary">{order.tracking_number}</strong>
                  </p>
                )}
              </div>
            </div>

            {/* Item List */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                Purchased Electronics ({order.items.length})
              </h4>
              <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
                {order.items.map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-gray-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center text-primary font-bold shrink-0">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{item.product_name}</p>
                        {item.variant_name && (
                          <p className="text-xs text-gray-400">Variant: {item.variant_name}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-0.5">Quantity: ×{item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900">
                        Rs. {parseFloat(item.subtotal || item.unit_price).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Need Help CTA */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <PhoneCall size={14} className="text-primary" /> Questions about this package? Contact customer care.
              </div>
              <Link
                href="/contact"
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                Open Support Ticket <ChevronRight size={13} />
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
