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
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { NavigationMenuDemo } from "./NavMenu";

export default function Example() {
  const [open, setOpen] = useState(false);

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
      <div className="hidden md:flex justify-between text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <button className="bg-secondary-background px-4 py-1 rounded-lg">
            Hotline 24/7
          </button>
          <span className="font-semibold">+977 12345678</span>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex gap-6">
            <span>Sell on Mobile Point</span>
            <span>Track Order</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              NRP <IoIosArrowDown />
            </div>

            <div className="flex items-center gap-2 border-l pl-3">
              <Image src="/flag.png" width={15} height={15} alt="Flag" />
              Eng <IoIosArrowDown />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------ */}
      {/* MAIN NAVBAR */}
      {/* ------------------------------ */}
      <nav className="max-w-7xl mx-auto mt-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden bg-white p-2 rounded-md text-gray-500"
            onClick={() => setOpen(true)}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={160}
              height={80}
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex">
            <NavigationMenuDemo />
          </div>

          {/* Right Icons (User + Cart) */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3">
              <div className="h-10 w-10 bg-secondary-background rounded-full flex items-center justify-center">
                <GoPerson size={24} className="text-gray-500" />
              </div>
              <div className="text-sm">
                <p>Welcome</p>
                <p className="font-bold">Log In / Register</p>
              </div>
            </div>

            <div className="relative flex items-center gap-3">
              <div className="h-10 w-10 bg-secondary-background rounded-full flex items-center justify-center relative">
                <CiShoppingCart size={24} className="text-gray-500" />
                <span className="absolute top-6 right-[-5px] bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  5
                </span>
              </div>
              <div className="hidden md:block text-sm">
                <p>Cart</p>
                <p className="font-bold">Rs. 3000/-</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
