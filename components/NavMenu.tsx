"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Sparkles, Tag, Flame } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { useCategories, useMenu, useBrands } from "@/hooks/useProducts";
import { Category, Brand } from "@/types/product";
import { MenuItem } from "@/services/menuService";

export function NavigationMenuDemo() {
  const { data: categoriesData, isLoading: isCategoriesLoading } = useCategories({ limit: 100 });
  const { data: brandsData, isLoading: isBrandsLoading } = useBrands();
  const { data: menus, isLoading: isMenuLoading } = useMenu("header");

  const isLoading = isCategoriesLoading || isMenuLoading;

  const categories: Category[] = categoriesData?.results || [];
  const rootCategories = categories.filter((c) => c.parent === null);
  const brands: Brand[] = brandsData?.results || (Array.isArray(brandsData) ? brandsData : []);

  const getChildren = (parentId: number) => {
    return categories.filter((c) => c.parent === parentId);
  };

  const headerMenu = menus?.[0];
  const menuItems = headerMenu?.items || [];

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;

    // 1. Categories Mega Menu
    if (item.label_en.toLowerCase() === "categories") {
      return (
        <NavigationMenuItem key={item.id}>
          <NavigationMenuTrigger className="font-bold uppercase text-xs tracking-tight text-gray-800 hover:text-primary whitespace-nowrap px-2.5 py-1.5">
            {item.label_en}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {isCategoriesLoading ? (
              <div className="p-6 w-[700px] lg:w-[850px]">
                <div className="grid grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col space-y-2">
                      <div className="h-5 w-28 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-3 w-36 bg-gray-100 animate-pulse rounded"></div>
                      <div className="h-3 w-32 bg-gray-100 animate-pulse rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6 w-[750px] lg:w-[900px] max-h-[75vh] overflow-y-auto bg-white">
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-gray-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-900 block">
                      Explore Electronics by Category
                    </span>
                    <span className="text-[11px] text-gray-400">
                      Genuine tech products with official brand warranty
                    </span>
                  </div>
                  <Link
                    href="/products"
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1 bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10"
                  >
                    View All Catalog <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                  {rootCategories.map((parent) => {
                    const children = getChildren(parent.id);
                    return (
                      <div key={parent.id} className="flex flex-col bg-gray-50/50 p-3.5 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-xs transition-all">
                        <Link
                          href={`/products?category=${parent.slug}`}
                          className="font-bold text-sm text-gray-900 mb-2 hover:text-primary transition-colors border-b border-gray-100 pb-1.5 flex items-center justify-between group"
                        >
                          <span className="truncate">{parent.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 transition-transform shrink-0" />
                        </Link>
                        {children.length > 0 ? (
                          <ul className="flex flex-col space-y-1">
                            {children.slice(0, 5).map((child) => (
                              <li key={child.id}>
                                <Link
                                  href={`/products?category=${child.slug}`}
                                  className="text-xs text-gray-600 hover:text-primary transition-colors flex items-center justify-between group py-0.5"
                                >
                                  <span className="truncate">{child.name}</span>
                                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary shrink-0" />
                                </Link>
                              </li>
                            ))}
                            {children.length > 5 && (
                              <li className="pt-1">
                                <Link
                                  href={`/products?category=${parent.slug}`}
                                  className="text-[11px] font-bold text-primary hover:underline"
                                >
                                  +{children.length - 5} more items &rarr;
                                </Link>
                              </li>
                            )}
                          </ul>
                        ) : (
                          <p className="text-[11px] text-gray-400">Direct Category</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    // 2. Brand Dropdown
    if (item.label_en.toLowerCase() === "brand" || item.label_en.toLowerCase() === "brands") {
      return (
        <NavigationMenuItem key={item.id}>
          <NavigationMenuTrigger className="font-bold uppercase text-xs tracking-tight text-gray-800 hover:text-primary whitespace-nowrap px-2.5 py-1.5">
            {item.label_en}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="p-4 w-[380px] sm:w-[480px] bg-white">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Popular Tech Brands
                </span>
                <Link
                  href="/products"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  All Brands
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {isBrandsLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-10 bg-gray-100 animate-pulse rounded-lg"></div>
                  ))
                ) : brands.length > 0 ? (
                  brands.slice(0, 10).map((brand) => (
                    <Link
                      key={brand.id}
                      href={`/products?brand=${brand.slug}`}
                      className="flex items-center justify-between p-2.5 rounded-lg border border-gray-100 hover:border-primary/30 hover:bg-gray-50/80 transition-all text-xs font-bold text-gray-700 hover:text-primary group"
                    >
                      <span>{brand.name}</span>
                      <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))
                ) : item.children && item.children.length > 0 ? (
                  item.children.map((child) => (
                    <Link
                      key={child.id}
                      href={child.url || `/products?brand=${child.label_en.toLowerCase()}`}
                      className="flex items-center justify-between p-2.5 rounded-lg border border-gray-100 hover:border-primary/30 hover:bg-gray-50/80 transition-all text-xs font-bold text-gray-700 hover:text-primary"
                    >
                      <span>{child.label_en}</span>
                      <ChevronRight className="w-3 h-3 text-gray-300" />
                    </Link>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 col-span-2">No brands found.</p>
                )}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    // 3. Deals / Dropdown Items with children
    if (hasChildren) {
      const isDeals = item.label_en.toLowerCase().includes("deal");
      return (
        <NavigationMenuItem key={item.id}>
          <NavigationMenuTrigger className="font-bold uppercase text-xs tracking-tight text-gray-800 hover:text-primary flex items-center gap-1 whitespace-nowrap px-2.5 py-1.5">
            {isDeals && <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500 mr-0.5" />}
            {item.label_en}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-4 w-[320px] sm:w-[420px] bg-white">
              {item.children.map((child) => (
                <ListItem
                  key={child.id}
                  title={child.label_en}
                  href={child.url || "/deals"}
                >
                  {child.sub_title || child.title || `Explore ${child.label_en}`}
                </ListItem>
              ))}
              {isDeals && (
                <li className="pt-2 border-t border-gray-100">
                  <Link
                    href="/deals"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-red-50 text-red-700 text-xs font-bold hover:bg-red-100 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 fill-red-600 text-red-600" /> View All Flash Deals Hub
                    </span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </li>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    // 4. Direct Flat Links
    return (
      <NavigationMenuItem key={item.id}>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link
            href={item.url || "#"}
            className="font-bold uppercase text-xs tracking-tight text-gray-800 hover:text-primary transition-colors px-2.5 py-1.5 whitespace-nowrap block"
          >
            {item.label_en}
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-nowrap whitespace-nowrap gap-0.5 sm:gap-1">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-8 w-16 bg-gray-200 animate-pulse rounded-lg mx-1"></div>
            ))
          : menuItems.map(renderMenuItem)}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <Link
        href={href}
        className="block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 hover:text-primary focus:bg-gray-50"
      >
        <div className="text-sm font-bold text-gray-800 group-hover:text-primary flex items-center justify-between">
          <span>{title}</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        </div>
        <p className="line-clamp-2 text-xs leading-snug text-gray-500 mt-1">
          {children}
        </p>
      </Link>
    </li>
  );
}
