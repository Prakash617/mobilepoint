"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCategories, useBrands, useMenu, useWishlist } from "@/hooks/useProducts";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useAuthStore, selectIsAuthenticated } from "@/stores/authStore";
import { authService } from "@/services/authService";
import { resolveImageUrl } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  User,
  LogOut,
  LogIn,
  Package,
  Heart,
  Flame,
  Gift,
  PhoneCall,
  Store,
  Layers,
  Sparkles,
  ShieldCheck,
  Tag,
  Grid,
} from "lucide-react";

interface MobileMenuDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MobileMenuDrawer({
  open,
  onOpenChange,
}: MobileMenuDrawerProps) {
  const { data: siteSettings } = useSiteSettings();
  const { data: categoriesData, isLoading: isCategoriesLoading } = useCategories({ limit: 100 });
  const { data: brandsData, isLoading: isBrandsLoading } = useBrands();
  const { data: menus } = useMenu("header");
  const { data: wishlistData } = useWishlist();

  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({});

  const categories = categoriesData?.results || [];
  const rootCategories = categories.filter((c: any) => c.parent === null);
  const brands = brandsData?.results || (Array.isArray(brandsData) ? brandsData : []);
  const headerMenu = menus?.[0];
  const menuItems = headerMenu?.items || [];

  const getChildren = (parentId: number) => {
    return categories.filter((c: any) => c.parent === parentId);
  };

  const toggleCategory = (id: number) => {
    setExpandedCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      // ignore errors
    }
    clearAuth();
    onOpenChange(false);
    window.location.href = "/";
  };

  const closeDrawer = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[320px] sm:w-[380px] p-0 flex flex-col bg-white overflow-hidden z-[100]">
        
        {/* ==================================================== */}
        {/* 1. USER ACCOUNT HEADER BANNER */}
        {/* ==================================================== */}
        <SheetHeader className="p-4 bg-gradient-to-r from-primary to-[#f0a181] text-white text-left space-y-0">
          <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full border-2 border-white/80 overflow-hidden bg-white/20 shrink-0 relative flex items-center justify-center">
                {user.profile_image ? (
                  <Image
                    src={resolveImageUrl(user.profile_image)}
                    alt="Profile"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] uppercase tracking-wider text-white/80 font-semibold">
                  Hello, Welcome
                </p>
                <h4 className="text-base font-bold text-white truncate">
                  {user.first_name ? `${user.first_name} ${user.last_name || ""}` : user.email}
                </h4>
                <div className="flex items-center gap-3 mt-1 text-xs">
                  <Link
                    href="/dashboard"
                    onClick={closeDrawer}
                    className="underline text-white font-medium hover:text-white/90"
                  >
                    My Account
                  </Link>
                  <span>•</span>
                  <button
                    onClick={handleLogout}
                    className="text-white/80 hover:text-white flex items-center gap-1 font-medium"
                  >
                    <LogOut size={12} /> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Welcome Guest</h4>
                  <p className="text-[11px] text-white/80">Sign in for the best experience</p>
                </div>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <Link
                  href="/login"
                  onClick={closeDrawer}
                  className="bg-white text-primary text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs hover:bg-gray-50 transition-colors"
                >
                  Log In
                </Link>
              </div>
            </div>
          )}
        </SheetHeader>

        {/* ==================================================== */}
        {/* 2. QUICK ACTION SHORTCUTS (Highlights) */}
        {/* ==================================================== */}
        <div className="grid grid-cols-4 gap-1 p-2 bg-gray-50 border-b border-gray-100 text-center">
          <Link
            href="/deals"
            onClick={closeDrawer}
            className="flex flex-col items-center p-2 rounded-lg hover:bg-white hover:shadow-xs transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <Flame size={16} />
            </div>
            <span className="text-[10px] font-bold text-gray-700">Deals</span>
          </Link>

          <Link
            href="/combos"
            onClick={closeDrawer}
            className="flex flex-col items-center p-2 rounded-lg hover:bg-white hover:shadow-xs transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <Gift size={16} />
            </div>
            <span className="text-[10px] font-bold text-gray-700">Combos</span>
          </Link>

          <Link
            href="/track-order"
            onClick={closeDrawer}
            className="flex flex-col items-center p-2 rounded-lg hover:bg-white hover:shadow-xs transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0073bc] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <Package size={16} />
            </div>
            <span className="text-[10px] font-bold text-gray-700">Track Order</span>
          </Link>

          <Link
            href="/dashboard"
            onClick={closeDrawer}
            className="flex flex-col items-center p-2 rounded-lg hover:bg-white hover:shadow-xs transition-all group relative"
          >
            <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              <Heart size={16} />
            </div>
            <span className="text-[10px] font-bold text-gray-700">Wishlist</span>
            {wishlistData?.items_count && wishlistData.items_count > 0 ? (
              <span className="absolute top-1.5 right-4 w-4 h-4 rounded-full bg-pink-500 text-white text-[9px] font-bold flex items-center justify-center">
                {wishlistData.items_count}
              </span>
            ) : null}
          </Link>
        </div>

        {/* ==================================================== */}
        {/* 3. TABS: CATEGORIES vs BRANDS & MENU */}
        {/* ==================================================== */}
        <Tabs defaultValue="categories" className="flex-1 flex flex-col overflow-hidden">
          <div className="px-3 pt-2">
            <TabsList className="grid grid-cols-2 w-full bg-gray-100 p-1 rounded-xl">
              <TabsTrigger
                value="categories"
                className="text-xs font-bold py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-xs transition-all"
              >
                <Layers size={13} className="mr-1.5" /> All Categories
              </TabsTrigger>
              <TabsTrigger
                value="menu"
                className="text-xs font-bold py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-xs transition-all"
              >
                <Grid size={13} className="mr-1.5" /> Brands & Menu
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: ELECTRONICS CATEGORIES (ACCORDION) */}
          <TabsContent value="categories" className="flex-1 overflow-y-auto p-4 space-y-1.5 focus-visible:outline-none">
            {isCategoriesLoading ? (
              <div className="space-y-3 py-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : rootCategories.length === 0 ? (
              <div className="text-center py-8 text-gray-400 text-sm">
                No categories available.
              </div>
            ) : (
              rootCategories.map((parent: any) => {
                const children = getChildren(parent.id);
                const hasChildren = children.length > 0;
                const isExpanded = !!expandedCategories[parent.id];

                return (
                  <div
                    key={parent.id}
                    className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-2xs transition-all"
                  >
                    <div className="flex items-center justify-between p-3 hover:bg-gray-50">
                      <Link
                        href={`/products?category=${parent.slug}`}
                        onClick={closeDrawer}
                        className="flex-1 text-sm font-bold text-gray-800 hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {parent.name}
                      </Link>

                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => toggleCategory(parent.id)}
                          className="p-1 text-gray-400 hover:text-primary transition-colors ml-2"
                          aria-label="Toggle subcategories"
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-primary" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Subcategories Accordion Content */}
                    {hasChildren && isExpanded && (
                      <div className="bg-gray-50/70 px-4 py-2 space-y-2 border-t border-gray-100">
                        {children.map((child: any) => (
                          <Link
                            key={child.id}
                            href={`/products?category=${child.slug}`}
                            onClick={closeDrawer}
                            className="flex items-center justify-between text-xs font-medium text-gray-600 hover:text-primary py-1 transition-colors"
                          >
                            <span>{child.name}</span>
                            <ChevronRight size={12} className="text-gray-300" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}

            <div className="pt-3">
              <Link
                href="/products"
                onClick={closeDrawer}
                className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-primary/20 text-primary font-bold text-xs bg-primary/5 hover:bg-primary/10 transition-colors text-center"
              >
                Browse All Products &rarr;
              </Link>
            </div>
          </TabsContent>

          {/* TAB 2: BRANDS & NAVIGATION MENUS */}
          <TabsContent value="menu" className="flex-1 overflow-y-auto p-4 space-y-5 focus-visible:outline-none">
            
            {/* Dynamic Menu Items */}
            {menuItems.length > 0 && (
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Navigation
                </p>
                {menuItems.map((item: any) => (
                  <Link
                    key={item.id}
                    href={item.url || `/products?category=${item.label_en.toLowerCase()}`}
                    onClick={closeDrawer}
                    className="flex items-center justify-between p-2.5 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-50 last:border-0"
                  >
                    <span>{item.label_en}</span>
                    <ChevronRight size={13} className="text-gray-300" />
                  </Link>
                ))}
              </div>
            )}

            {/* Popular Electronics Brands */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                Popular Brands
              </p>
              {isBrandsLoading ? (
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-9 bg-gray-100 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : brands.length === 0 ? (
                <p className="text-xs text-gray-400">No brands found.</p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {brands.slice(0, 10).map((brand: any) => (
                    <Link
                      key={brand.id}
                      href={`/products?brand=${brand.slug}`}
                      onClick={closeDrawer}
                      className="flex items-center justify-center p-2 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-primary/30 text-xs font-bold text-gray-700 hover:text-primary transition-all text-center"
                    >
                      {brand.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* General Site Pages */}
            <div className="space-y-1 border-t border-gray-100 pt-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                More Services
              </p>
              <Link
                href="/contact"
                onClick={closeDrawer}
                className="flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-gray-600 hover:text-primary transition-colors"
              >
                <PhoneCall size={14} className="text-gray-400" /> Contact Us
              </Link>
              <Link
                href="/blog"
                onClick={closeDrawer}
                className="flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-gray-600 hover:text-primary transition-colors"
              >
                <Sparkles size={14} className="text-gray-400" /> News & Tech Blog
              </Link>
            </div>
          </TabsContent>
        </Tabs>

        {/* ==================================================== */}
        {/* 4. FOOTER STORE UTILITIES & 24/7 SUPPORT */}
        {/* ==================================================== */}
        <div className="p-3.5 bg-gray-50 border-t border-gray-100 flex flex-col gap-2">
          {siteSettings?.phone_number || siteSettings?.email ? (
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium flex items-center gap-1.5">
                <PhoneCall size={13} className="text-primary" /> 24/7 Support:
              </span>
              <a
                href={`tel:${siteSettings.phone_number || "9800000000"}`}
                className="font-bold text-gray-800 hover:text-primary transition-colors"
              >
                {siteSettings.phone_number || "Hotline 24/7"}
              </a>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-green-600" /> 100% Genuine Tech
              </span>
              <span className="font-bold text-gray-700">Mobile Point</span>
            </div>
          )}

          <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-200/60 pt-2">
            <span className="flex items-center gap-1">
              🇳🇵 NRP | English
            </span>
            <Link
              href="/contact"
              onClick={closeDrawer}
              className="text-primary font-semibold hover:underline"
            >
              Sell on Mobile Point
            </Link>
          </div>
        </div>

      </SheetContent>
    </Sheet>
  );
}
