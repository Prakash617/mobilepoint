"use client";

import { useState, useEffect } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";
import {
  Heart,
  ChevronDown,
  User as UserIcon,
  Package,
  LogOut,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useWishlist } from "@/hooks/useProducts";
import MobileMenuDrawer from "./MobileMenuDrawer";
import { NavigationMenuDemo } from "./NavMenu";
import { useCartStore, selectTotalItems, selectSubtotal } from "@/stores/cartStore";
import { useAuthStore, selectIsAuthenticated } from "@/stores/authStore";
import { authService } from "@/services/authService";
import { resolveImageUrl } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { data: siteSettings, isLoading } = useSiteSettings();
  const [open, setOpen] = useState(false);
  const totalItems = useCartStore(selectTotalItems);
  const subtotal = useCartStore(selectSubtotal);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const { data: wishlistData } = useWishlist(isAuthenticated);

  const wishlistCount = wishlistData?.items?.length || 0;
  const phone = siteSettings?.phone || siteSettings?.phone_number || "+977 980-1234567";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      // ignore logout API errors
    }
    clearAuth();
    window.location.href = "/";
  };

  return (
    <div className="bg-[#f5f6f8] pt-3 pb-3 px-4 md:px-8 mt-2 rounded-xl shadow-2xs">
      {/* ------------------------------ */}
      {/* MOBILE MENU DRAWER */}
      {/* ------------------------------ */}
      <MobileMenuDrawer open={open} onOpenChange={setOpen} />

      {/* ------------------------------ */}
      {/* TOP BAR - Desktop only */}
      {/* ------------------------------ */}
      <div className="hidden lg:flex justify-between items-center text-xs text-secondary border-b border-gray-200/80 pb-2.5">
        <div className="flex items-center gap-4">
          <a
            href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
            className="inline-flex items-center gap-1.5 bg-white border border-gray-200/80 text-gray-700 hover:text-primary px-3 py-1 rounded-full text-xs font-semibold hover:border-primary/30 transition-all shadow-2xs"
          >
            <FiPhoneCall className="text-primary text-xs" />
            <span>
              Hotline 24/7: <strong className="text-gray-900">{phone}</strong>
            </span>
          </a>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex gap-5">
            <Link
              href="/become-seller"
              className="cursor-pointer hover:text-primary transition-colors text-gray-600 font-semibold"
            >
              Sell on Mobile Point
            </Link>
            <Link
              href="/track-order"
              className="cursor-pointer hover:text-primary transition-colors text-gray-600 font-semibold"
            >
              Track Order
            </Link>
            <Link
              href="/customer-service"
              className="cursor-pointer hover:text-primary transition-colors text-gray-600"
            >
              Customer Care
            </Link>
          </div>

          <div className="flex items-center gap-3 border-l border-gray-300 pl-4">
            <div className="flex items-center gap-1 cursor-pointer hover:text-black font-semibold text-gray-700">
              <Image src="/nep.png" width={16} height={16} alt="Nepal Flag" className="rounded-2xs object-cover" />
              NRP <IoIosArrowDown size={12} className="text-gray-400" />
            </div>

            <div className="flex items-center gap-1 border-l border-gray-200 pl-3 cursor-pointer hover:text-black font-semibold text-gray-700">
              <Image src="/flag.png" width={16} height={16} alt="English" className="rounded-2xs object-cover" />
              Eng <IoIosArrowDown size={12} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------ */}
      {/* MAIN NAVBAR */}
      {/* ------------------------------ */}
      <nav className="w-full pt-3">
        <div className="flex items-center justify-between h-12">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden bg-white p-2 rounded-lg text-gray-600 hover:text-primary border border-gray-200/80 shadow-2xs"
            onClick={() => setOpen(true)}
            aria-label="Open mobile menu"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            {isLoading ? (
              <div className="flex items-center">
                <div className="h-7 w-7 bg-gray-300 animate-pulse rounded-full"></div>
                <div className="ml-2 h-6 w-24 bg-gray-300 animate-pulse rounded-md"></div>
              </div>
            ) : (
              <Image
                src={siteSettings?.logo || "/default-logo.png"}
                alt={siteSettings?.site_name || "Mobile Point"}
                width={200}
                height={60}
                className="h-9 md:h-10 w-auto object-contain"
                priority
              />
            )}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-4">
            <NavigationMenuDemo />
          </div>

          {/* Right Action Icons (Wishlist + User Profile Dropdown + Cart) */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Wishlist Shortcut */}
            <Link
              href="/dashboard"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 hover:border-primary/40 hover:text-primary transition-colors relative shadow-2xs"
              title="My Wishlist"
            >
              <Heart className="w-5 h-5 text-gray-600 hover:text-primary transition-colors" />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Authenticated User Dropdown Menu */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="hidden md:flex items-center gap-2.5 p-1.5 pr-2.5 rounded-full bg-white border border-gray-200 hover:border-primary/40 hover:bg-gray-50/80 transition-all text-left shadow-2xs group focus:outline-none"
                  >
                    <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-200 shrink-0 bg-primary/10 flex items-center justify-center">
                      <Image
                        src={user.profile_image ? resolveImageUrl(user.profile_image) : "/placeholder-avatar.svg"}
                        alt="Avatar"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                        My Account
                      </span>
                      <span className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors truncate max-w-[90px]">
                        {user.first_name || user.username || user.email.split("@")[0]}
                      </span>
                    </div>
                    <ChevronDown size={14} className="text-gray-400 group-hover:text-primary transition-colors shrink-0" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl shadow-xl border-gray-100 bg-white">
                  <DropdownMenuLabel className="p-2 pb-1.5">
                    <p className="text-xs font-bold text-gray-900">
                      {user.first_name ? `${user.first_name} ${user.last_name || ""}` : user.username}
                    </p>
                    <p className="text-[11px] text-gray-500 font-normal truncate mt-0.5">
                      {user.email}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2.5 py-2 px-2.5 cursor-pointer rounded-lg text-xs font-semibold text-gray-700 hover:text-primary hover:bg-gray-50">
                      <Package size={15} className="text-primary" />
                      <span>My Orders & History</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2.5 py-2 px-2.5 cursor-pointer rounded-lg text-xs font-semibold text-gray-700 hover:text-primary hover:bg-gray-50">
                      <Heart size={15} className="text-rose-500" />
                      <span>Saved Wishlist ({wishlistCount})</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/track-order" className="flex items-center gap-2.5 py-2 px-2.5 cursor-pointer rounded-lg text-xs font-semibold text-gray-700 hover:text-primary hover:bg-gray-50">
                      <ShieldCheck size={15} className="text-emerald-600" />
                      <span>Track Active Delivery</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 py-2 px-2.5 cursor-pointer rounded-lg text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="hidden md:flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-white border border-gray-200 hover:border-primary/40 hover:bg-gray-50/80 transition-all text-left shadow-2xs group"
              >
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 group-hover:text-primary transition-colors">
                  <GoPerson size={18} />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Account</span>
                  <span className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors">
                    Sign In / Join
                  </span>
                </div>
              </Link>
            )}

            {/* Slide-over Cart Trigger */}
            <button
              type="button"
              onClick={openDrawer}
              className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-white border border-gray-200 hover:border-primary/40 hover:bg-gray-50/80 transition-all cursor-pointer text-left focus:outline-none shadow-2xs group"
              aria-label="Open cart drawer"
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center relative group-hover:bg-primary/20 transition-colors">
                <CiShoppingCart size={20} className="text-primary" />
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-extrabold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {mounted ? totalItems : 0}
                </span>
              </div>
              <div className="hidden md:flex flex-col leading-tight">
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Cart</span>
                <span className="text-xs font-extrabold text-gray-900 group-hover:text-primary transition-colors">
                  Rs. {mounted ? Math.round(subtotal).toLocaleString() : "0"}
                </span>
              </div>
            </button>

          </div>
        </div>
      </nav>
    </div>
  );
}
