"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDeals } from "@/hooks/useProducts";
import { resolveImageUrl } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import {
  Flame,
  Zap,
  Tag,
  Clock,
  ShoppingCart,
  Percent,
  CheckCircle2,
  Gift,
  ArrowRight,
  TrendingDown,
} from "lucide-react";
import { toast } from "sonner";

const dealTabs = [
  { id: "all", label: "All Deals", icon: Flame, badge: "Best Value" },
  { id: "daily", label: "Deal of the Day", icon: Clock, badge: "24h Only" },
  { id: "flash", label: "Flash Sales", icon: Zap, badge: "Up to 50% Off" },
  { id: "clearance", label: "Clearance Offers", icon: Tag, badge: "Final Stock" },
];

function DealsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || "all";
  const [activeTab, setActiveTab] = useState(initialType);

  // Synchronize tab with query param
  useEffect(() => {
    const type = searchParams.get("type") || "all";
    setActiveTab(type);
  }, [searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === "all") {
      router.push("/deals", { scroll: false });
    } else {
      router.push(`/deals?type=${tabId}`, { scroll: false });
    }
  };

  const { data: dealsData, isLoading } = useDeals(
    activeTab !== "all" ? { deal_type: activeTab } : undefined
  );

  const deals = dealsData?.results || [];

  const addItem = useCartStore((s) => s.addItem);

  // Live countdown calculation
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 35, seconds: 20 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (e: React.MouseEvent, deal: any) => {
    e.preventDefault();
    e.stopPropagation();

    const price = deal.selling_price
      ? parseFloat(deal.selling_price)
      : deal.base_price
      ? parseFloat(deal.base_price) * (1 - deal.discount_percent / 100)
      : 0;

    addItem({
      productId: deal.product_id || deal.id,
      slug: deal.product_slug,
      name: deal.product_name || deal.title,
      image: resolveImageUrl(deal.primary_image?.image || null),
      price: price,
      quantity: 1,
      maxStock: deal.remaining_quantity || 10,
    });
    toast.success(`Added "${deal.product_name}" to cart at ${deal.discount_percent}% off!`);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Hero Promotion Banner with Live Countdown */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-primary text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left z-10">
            <span className="text-[11px] font-extrabold uppercase tracking-widest bg-white/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Flame size={14} className="text-yellow-300 fill-yellow-300" /> Exclusive Electronics Deals
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Huge Savings on Top Tech Brands
            </h1>
            <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
              Explore limited-time daily price drops, flash discounts, and certified clearance tech backed by official warranty.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center shrink-0 space-y-3 z-10 w-full sm:w-auto">
            <span className="text-xs font-bold text-red-200 uppercase tracking-wider block">
              Deal Ends In:
            </span>
            <div className="flex items-center justify-center gap-3 text-white font-mono">
              <div className="bg-black/40 px-3.5 py-2.5 rounded-xl text-center min-w-[54px]">
                <span className="text-2xl font-black block">{String(timeLeft.hours).padStart(2, "0")}</span>
                <span className="text-[10px] text-gray-300 uppercase block">Hours</span>
              </div>
              <span className="text-2xl font-bold text-red-300">:</span>
              <div className="bg-black/40 px-3.5 py-2.5 rounded-xl text-center min-w-[54px]">
                <span className="text-2xl font-black block">{String(timeLeft.minutes).padStart(2, "0")}</span>
                <span className="text-[10px] text-gray-300 uppercase block">Mins</span>
              </div>
              <span className="text-2xl font-bold text-red-300">:</span>
              <div className="bg-black/40 px-3.5 py-2.5 rounded-xl text-center min-w-[54px]">
                <span className="text-2xl font-black block text-yellow-300">{String(timeLeft.seconds).padStart(2, "0")}</span>
                <span className="text-[10px] text-gray-300 uppercase block">Secs</span>
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <Zap className="w-80 h-80 text-white" />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 border-b border-gray-200 pb-4">
          {dealTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-xs ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                <Icon size={16} className={isActive ? "text-yellow-300" : "text-primary"} />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase ${
                  isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Deals Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-5 border border-gray-100 space-y-4">
                <div className="h-44 bg-gray-100 rounded-2xl" />
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-6 bg-gray-100 rounded w-1/2" />
                <div className="h-10 bg-gray-100 rounded-xl" />
              </div>
            ))}
          </div>
        ) : deals.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
              <Flame size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No Active Deals In This Category</h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              New daily promotions and flash discounts are added regularly. Check out our full product catalog in the meantime!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:opacity-90 transition-opacity"
            >
              Browse All Products <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {deals.map((deal) => {
              const basePrice = deal.base_price ? parseFloat(String(deal.base_price)) : 0;
              const sellingPrice = deal.selling_price
                ? parseFloat(String(deal.selling_price))
                : basePrice * (1 - deal.discount_percent / 100);
              const soldQty = deal.sold_quantity || 0;
              const totalQty = deal.total_quantity || 20;
              const progressPct = Math.min(100, Math.round((soldQty / totalQty) * 100));

              return (
                <div
                  key={deal.id}
                  className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-red-500 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-lg shadow-xs flex items-center gap-1">
                        <TrendingDown size={13} /> -{deal.discount_percent}%
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        deal.deal_type === "flash"
                          ? "bg-amber-100 text-amber-800"
                          : deal.deal_type === "daily"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}>
                        {deal.deal_type.replace("_", " ")}
                      </span>
                    </div>

                    {/* Product Image */}
                    <Link
                      href={`/products/${deal.product_slug}`}
                      className="relative block w-full aspect-square bg-[#f8f9fc] rounded-2xl overflow-hidden p-4 group-hover:bg-primary/5 transition-colors"
                    >
                      <Image
                        src={resolveImageUrl(deal.primary_image?.image || null) || "/placeholder.png"}
                        alt={deal.product_name || deal.title}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
                      />
                    </Link>

                    {/* Brand & Title */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        {deal.brand_name || "Official Brand"}
                      </span>
                      <Link
                        href={`/products/${deal.product_slug}`}
                        className="font-bold text-sm text-gray-900 group-hover:text-primary transition-colors line-clamp-2 block leading-snug"
                      >
                        {deal.product_name || deal.title}
                      </Link>
                    </div>

                    {/* Price Breakdown */}
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-lg font-black text-primary">
                        Rs. {Math.round(sellingPrice).toLocaleString()}
                      </span>
                      {basePrice > sellingPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          Rs. {Math.round(basePrice).toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Free Gift / Free Shipping Badge */}
                    {deal.free_gift_text ? (
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                        <Gift size={13} className="shrink-0 text-emerald-600" />
                        <span className="truncate">{deal.free_gift_text}</span>
                      </div>
                    ) : deal.free_shipping ? (
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                        <CheckCircle2 size={13} className="shrink-0 text-[#0073bc]" />
                        <span>Free Shipping Included</span>
                      </div>
                    ) : null}

                    {/* Stock Progress Bar */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
                        <span>Sold: <strong>{soldQty}</strong>/{totalQty}</span>
                        <span className="text-red-500 font-bold">{progressPct}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                  </div>

                  {/* Add to Cart CTA */}
                  <div className="pt-4 border-t border-gray-100 mt-4">
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(e, deal)}
                      className="w-full bg-primary text-white font-bold py-2.5 px-4 rounded-xl text-xs hover:opacity-90 transition-opacity shadow-sm flex items-center justify-center gap-2 group-hover:shadow-primary/30"
                    >
                      <ShoppingCart size={14} /> Add Deal to Cart
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default function DealsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center p-8">Loading deals...</div>}>
      <DealsContent />
    </Suspense>
  );
}
