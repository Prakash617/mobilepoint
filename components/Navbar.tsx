"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import Image from 'next/image';
import Link from 'next/link';
import { CiShoppingCart } from 'react-icons/ci';
import { GoPerson } from 'react-icons/go';
import { IoIosArrowDown } from 'react-icons/io'
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { NavigationMenuDemo } from "./NavMenu";
import { useCartStore, selectTotalItems, selectSubtotal } from "@/stores/cartStore";
import { useAuthStore, selectIsAuthenticated } from "@/stores/authStore";
import { authService } from "@/services/authService";
import { resolveImageUrl } from "@/lib/utils";
export default function Navbar() {
  const { data: siteSettings, isLoading } = useSiteSettings();
  const [open, setOpen] = useState(false);
  const totalItems = useCartStore(selectTotalItems);
  const subtotal = useCartStore(selectSubtotal);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const clearAuth = useAuthStore((s) => s.clearAuth);

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
    <div className="bg-[#f5f6f8] pt-4 pb-4 px-4 md:px-8 mt-2 rounded-xl">
      {/* ------------------------------ */}
      {/* MOBILE MENU */}
      {/* ------------------------------ */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/25" />
        <div className="fixed inset-0 z-50 flex">
          <DialogPanel className="w-full max-w-xs bg-white h-full overflow-y-auto p-4">
            <div className="flex justify-end">
              <button onClick={() => setOpen(false)}>
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Example mobile items */}
            <TabGroup className="mt-4">
              <TabList className="flex gap-4 border-b pb-2">
                <Tab className="data-selected:font-bold">Women</Tab>
                <Tab className="data-selected:font-bold">Men</Tab>
              </TabList>

              <TabPanels className="mt-4">
                <TabPanel>
                  <p className="text-gray-600">Women Categories</p>
                </TabPanel>

                <TabPanel>
                  <p className="text-gray-600">Men Categories</p>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </DialogPanel>
        </div>
      </Dialog>

      {/* ------------------------------ */}
      {/* TOP BAR - only for desktop */}
      {/* ------------------------------ */}
      <div className="hidden md:flex justify-between items-center text-[13px] text-gray-600 font-medium">
        <div className="flex items-center gap-2">
          <button className="bg-[#eef2f6] text-[#61738c] px-4 py-1.5 rounded-full">
            Hotline 24/7
          </button>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-black">Sell on Mobile Point</span>
            <span className="cursor-pointer hover:text-black">Track Order</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 cursor-pointer hover:text-black">
              <Image src="/nep.png" width={16} height={16} alt="Flag" className="rounded-sm" />
              NRP <IoIosArrowDown size={14} className="text-gray-400" />
            </div>

            <div className="flex items-center gap-3 border-l border-gray-300 pl-4 cursor-pointer hover:text-black">
              <Image src="/flag.png" width={16} height={16} alt="Flag" className="rounded-sm" />
              Eng <IoIosArrowDown size={14} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------ */}
      {/* MAIN NAVBAR */}
      {/* ------------------------------ */}
      <nav className="w-full mt-5">
        <div className="flex items-center justify-between h-12">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden bg-white p-2 rounded-md text-gray-500"
            onClick={() => setOpen(true)}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="flex items-center">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="h-5 w-5 bg-gray-300 animate-pulse rounded-full"></div>
                <div className="ml-2">
                  <div className="h-5 w-20 bg-gray-300 animate-pulse rounded-full"></div>
                </div>
              </div>
            ) : (
              <Image
                src={siteSettings?.logo || '/default-logo.png'}
                alt={siteSettings?.site_name || 'Logo'}
                width={300}
                height={100}
                className="h-10 w-auto object-contain"
              />
            )}
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex">
            <NavigationMenuDemo />
          </div>

          {/* Right Icons (User + Cart) */}
          <div className="flex items-center gap-8">
            {isAuthenticated && user ? (
              <div className="hidden md:flex items-center gap-3 group">
                <div className="h-11 w-11 bg-[#eef2f6] rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors overflow-hidden">
                  <Image
                    src={user.profile_image ? resolveImageUrl(user.profile_image) : "/placeholder-avatar.svg"}
                    alt="Profile"
                    width={44}
                    height={44}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] tracking-wide text-gray-500 uppercase font-medium">Welcome</span>
                  <Link
                    href="/dashboard"
                    className="text-[15px] font-bold uppercase text-black group-hover:text-primary transition-colors hover:text-primary"
                  >
                    {`${user.first_name || user.email} `}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-[11px] text-red-500 font-semibold uppercase self-start hover:underline"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="hidden md:flex items-center gap-3 cursor-pointer group">
                <div className="h-11 w-11 bg-[#eef2f6] rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <GoPerson size={22} className="text-gray-500 group-hover:text-primary transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] tracking-wide text-gray-500 uppercase font-medium">Welcome</span>
                  <span className="text-[15px] font-bold uppercase text-black group-hover:text-primary transition-colors">Log In / Register</span>
                </div>
              </Link>
            )}

            <Link href="/addtocart" className="relative flex items-center gap-3 cursor-pointer">
              <div className="h-11 w-11 bg-[#eef2f6] rounded-full flex items-center justify-center relative">
                <CiShoppingCart size={24} className="text-gray-500" />
                <span className="absolute -bottom-1 -right-1 bg-[#0073bc] text-white text-[11px] font-bold w-[22px] h-[22px] rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-[11px] tracking-wide text-gray-500 uppercase font-medium">Cart</span>
                <span className="text-[15px] font-bold uppercase text-black">NPR {subtotal.toLocaleString()}/-</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
