"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCombos } from "@/hooks/useProducts";
import { resolveImageUrl } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import {
  Gift,
  Plus,
  ShoppingCart,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Truck,
  ArrowRight,
  TrendingDown,
  Layers,
  Package,
} from "lucide-react";
import { toast } from "sonner";

export default function CombosPage() {
  const { data: combosData, isLoading } = useCombos({ is_active: true });
  const combos = combosData?.results || [];

  const addItem = useCartStore((s) => s.addItem);

  const handleAddComboToCart = (e: React.MouseEvent, combo: any) => {
    e.preventDefault();
    e.stopPropagation();

    const regPrice = parseFloat(String(combo.combo_regular_price || "0"));
    const sellPrice = parseFloat(String(combo.combo_selling_price || "0"));

    addItem({
      productId: combo.main_product?.id || combo.id,
      comboId: combo.id,
      slug: combo.slug,
      name: `[Combo] ${combo.name}`,
      image: resolveImageUrl(combo.main_product?.primary_image || combo.image || null),
      price: sellPrice || regPrice,
      quantity: 1,
      maxStock: 10,
    });

    const savings = regPrice > sellPrice ? regPrice - sellPrice : 0;
    toast.success(
      `Added "${combo.name}" bundle to cart! ${savings > 0 ? `(Saved Rs. ${savings.toLocaleString()})` : ""}`
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-10 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-primary text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left z-10">
            <span className="text-[11px] font-extrabold uppercase tracking-widest bg-white/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Gift size={14} className="text-yellow-300" /> Curated Package Deals
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Electronics Combos & Value Bundles
            </h1>
            <p className="text-xs sm:text-sm text-orange-100 leading-relaxed">
              Buy complete tech setups together and save big. Perfectly matched accessories, cables, chargers, and gadgets packed into a single discounted box.
            </p>
          </div>

          <div className="bg-black/30 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center shrink-0 space-y-2 z-10 w-full sm:w-auto">
            <span className="text-xs font-bold text-orange-200 uppercase tracking-wider block">
              Bundle Perk
            </span>
            <p className="text-2xl font-black text-white">Save Up to 35%</p>
            <p className="text-[11px] text-orange-100">+ Free Shipping on all Bundles</p>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <Layers className="w-80 h-80 text-white" />
          </div>
        </div>

        {/* 3 Core Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 font-bold">
              <Sparkles size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">100% Guaranteed Compatibility</h3>
              <p className="text-xs text-gray-500 mt-1">
                Every bundled cable, case, charger, and peripheral is tested to work seamlessly together.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 font-bold">
              <TrendingDown size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Massive Savings Over Individual Items</h3>
              <p className="text-xs text-gray-500 mt-1">
                Enjoy special package pricing that saves hundreds or thousands compared to buying separately.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0073bc] flex items-center justify-center shrink-0 font-bold">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Full Brand Warranty on Every Piece</h3>
              <p className="text-xs text-gray-500 mt-1">
                All individual items in the combo come with their complete manufacturer warranty.
              </p>
            </div>
          </div>
        </div>

        {/* Combo Bundles List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                Featured Electronics Bundles
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Showing all active combo packages available for instant delivery.
              </p>
            </div>
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
              {combos.length} Combos Available
            </span>
          </div>

          {isLoading ? (
            <div className="space-y-6 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 h-64" />
              ))}
            </div>
          ) : combos.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-4">
              <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mx-auto">
                <Gift size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">No Combo Packages Currently Live</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Check back soon or browse our full electronics catalog for individual deals!
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:opacity-90 transition-opacity"
              >
                Browse All Products <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {combos.map((combo) => {
                const regPrice = parseFloat(String(combo.combo_regular_price || "0"));
                const sellPrice = parseFloat(String(combo.combo_selling_price || "0"));
                const savings = regPrice > sellPrice ? regPrice - sellPrice : 0;
                const savingsPct = regPrice > 0 ? Math.round((savings / regPrice) * 100) : 0;

                return (
                  <div
                    key={combo.id}
                    className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col lg:flex-row items-center justify-between gap-8 group"
                  >
                    {/* Left: Bundle Items Visualizer */}
                    <div className="w-full lg:w-3/5 space-y-5">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="bg-orange-500 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                            <Gift size={12} /> Bundle Deal
                          </span>
                          {savingsPct > 0 && (
                            <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                              Save {savingsPct}% (Rs. {Math.round(savings).toLocaleString()})
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                          {combo.name}
                        </h3>
                        {combo.description && (
                          <div
                            className="text-xs text-gray-500 line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: combo.description }}
                          />
                        )}
                      </div>

                      {/* Items in this Combo with "+" signs */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                          Included In This Package ({combo.items?.length || 0} Items):
                        </span>
                        
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
                          {/* Main Anchor Product */}
                          {combo.main_product && (
                            <Link
                              href={`/products/${combo.main_product.slug}`}
                              className="flex items-center gap-2 p-2.5 rounded-2xl bg-gray-50 border border-gray-200 hover:border-primary/40 hover:bg-white transition-all max-w-[200px]"
                            >
                              <div className="relative w-12 h-12 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-100">
                                <Image
                                  src={resolveImageUrl(combo.main_product.primary_image || null) || "/placeholder.png"}
                                  alt={combo.main_product.name}
                                  fill
                                  className="object-contain p-1 mix-blend-multiply"
                                />
                              </div>
                              <div className="truncate">
                                <span className="text-[11px] font-bold text-gray-800 truncate block">
                                  {combo.main_product.name}
                                </span>
                                <span className="text-[10px] text-gray-400 block">Main Item</span>
                              </div>
                            </Link>
                          )}

                          {/* Secondary Items */}
                          {combo.items?.map((item: any, idx: number) => {
                            if (item.product?.id === combo.main_product?.id) return null;
                            return (
                              <React.Fragment key={item.id || idx}>
                                <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 font-bold text-xs">
                                  <Plus size={14} />
                                </div>
                                <Link
                                  href={`/products/${item.product?.slug}`}
                                  className="flex items-center gap-2 p-2.5 rounded-2xl bg-gray-50 border border-gray-200 hover:border-primary/40 hover:bg-white transition-all max-w-[200px]"
                                >
                                  <div className="relative w-12 h-12 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-100">
                                    <Image
                                      src={resolveImageUrl(item.product?.primary_image || null) || "/placeholder.png"}
                                      alt={item.product?.name || "Product"}
                                      fill
                                      className="object-contain p-1 mix-blend-multiply"
                                    />
                                  </div>
                                  <div className="truncate">
                                    <span className="text-[11px] font-bold text-gray-800 truncate block">
                                      {item.product?.name}
                                    </span>
                                    <span className="text-[10px] text-emerald-600 font-semibold block">
                                      Qty: ×{item.quantity}
                                    </span>
                                  </div>
                                </Link>
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Right: Pricing Box & CTA */}
                    <div className="w-full lg:w-2/5 bg-gray-50/80 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between space-y-4 text-center sm:text-left">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 font-medium">Individual Total:</span>
                          <span className="text-xs text-gray-400 line-through">
                            Rs. {Math.round(regPrice).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-baseline justify-between">
                          <span className="text-xs font-bold text-gray-700">Bundle Price:</span>
                          <span className="text-2xl font-black text-primary">
                            Rs. {Math.round(sellPrice).toLocaleString()}
                          </span>
                        </div>

                        {savings > 0 && (
                          <div className="flex items-center justify-between text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                            <span>You Save:</span>
                            <span>Rs. {Math.round(savings).toLocaleString()} ({savingsPct}% Off)</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 space-y-2">
                        <button
                          type="button"
                          onClick={(e) => handleAddComboToCart(e, combo)}
                          className="w-full bg-primary text-white font-bold py-3 px-6 rounded-xl text-xs hover:opacity-90 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={15} /> Add Complete Combo to Cart
                        </button>
                        
                        <p className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1">
                          <CheckCircle2 size={12} className="text-green-500" /> Free delivery & 100% genuine warranty
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
