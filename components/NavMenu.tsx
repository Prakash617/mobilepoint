"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { useCategories, useMenu } from "@/hooks/useProducts";
import { Category } from "@/types/product";
import { MenuItem } from "@/services/menuService";

export function NavigationMenuDemo() {
  const { data: categoriesData, isLoading: isCategoriesLoading } = useCategories();
  const { data: menus, isLoading: isMenuLoading } = useMenu("header");

  const isLoading = isCategoriesLoading || isMenuLoading;

  // Group categories into parent/child relationships
  const categories: Category[] = categoriesData?.results || [];
  const rootCategories = categories.filter((c) => c.parent === null);

  const getChildren = (parentId: number) => {
    return categories.filter((c) => c.parent === parentId);
  };

  // Find the "Categories" menu item and replace its children with live DB categories
  const headerMenu = menus?.[0];
  const menuItems = headerMenu?.items || [];

  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;

    // Special handling for "Categories" — use live category data
    if (item.label_en === "Categories") {
      return (
        <NavigationMenuItem key={item.id}>
          <NavigationMenuTrigger>
            <div className="font-bold uppercase">{item.label_en}</div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {isCategoriesLoading ? (
              <div className="p-6 md:w-[600px] lg:w-[800px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                      <div className="h-5 w-24 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-3 w-32 bg-gray-200 animate-pulse rounded mt-2"></div>
                      <div className="h-3 w-28 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6 md:w-[600px] lg:w-[800px] max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                  {rootCategories.map((parent) => {
                    const children = getChildren(parent.id);
                    return (
                      <div key={parent.id} className="flex flex-col">
                        <Link
                          href={`/products?category=${parent.slug}`}
                          className="font-bold text-[15px] text-gray-900 mb-3 hover:text-primary transition-colors border-b border-gray-100 pb-2"
                        >
                          {parent.name}
                        </Link>
                        {children.length > 0 ? (
                          <ul className="flex flex-col space-y-2">
                            {children.map((child) => (
                              <li key={child.id}>
                                <Link
                                  href={`/products?category=${child.slug}`}
                                  className="text-[13px] text-gray-500 hover:text-primary transition-colors flex items-center group"
                                >
                                  <ChevronRight className="w-3 h-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0" />
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-xs text-gray-400 italic mt-1">
                            Explore products
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 pt-4 border-t border-gray-100 text-center">
                  <Link
                    href="/products"
                    className="inline-block text-sm font-bold text-primary hover:underline"
                  >
                    View All Products &rarr;
                  </Link>
                </div>
              </div>
            )}
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    // Special handling for "Brand" — use live category data
    if (item.label_en === "Brand") {
      return (
        <NavigationMenuItem key={item.id}>
          <NavigationMenuTrigger>
            <div className="font-bold uppercase">{item.label_en}</div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-4 sm:w-[300px] md:w-[400px] md:grid-cols-2 lg:w-[500px]">
              {item.children.map((child) => (
                <ListItem key={child.id} title={child.label_en} href={child.url || "#"}>
                  Browse {child.label_en} products
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    // Deals with children
    if (hasChildren) {
      return (
        <NavigationMenuItem key={item.id}>
          <NavigationMenuTrigger>
            <div className="font-bold uppercase">{item.label_en}</div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-4 sm:w-[300px] md:w-[400px] md:grid-cols-2 lg:w-[500px]">
              {item.children.map((child) => (
                <ListItem key={child.id} title={child.label_en} href={child.url || "#"}>
                  {child.sub_title || child.title || `View ${child.label_en}`}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    // Simple link
    return (
      <NavigationMenuItem key={item.id}>
        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
          <Link href={item.url || "#"}>
            <div className="font-bold uppercase">{item.label_en}</div>
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  };

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 w-20 bg-gray-200 animate-pulse rounded-lg mx-1"></div>
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
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-50 hover:text-slate-900 focus:bg-slate-50 focus:text-slate-900"
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-slate-500">
          {children}
        </p>
      </Link>
    </li>
  );
}
