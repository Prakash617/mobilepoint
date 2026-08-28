"use client";

import React from "react";
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Store,
  ShieldCheck,
  Smartphone,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface Branch {
  name: string;
  badge: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  services: string[];
}

const branches: Branch[] = [
  {
    name: "New Road Flagship Experience Center",
    badge: "Main Flagship Store",
    address: "Pako New Road (Near Ranjana Mall), Kathmandu",
    city: "Kathmandu",
    phone: "+977 01-4223344",
    hours: "Sun – Fri: 9:30 AM – 7:30 PM",
    services: [
      "Official Apple & Samsung Live Demos",
      "Instant Screen Replacement & Repairs",
      "Online Order Pickup Point",
      "Warranty Verification",
    ],
  },
  {
    name: "Putalisadak Tech Hub",
    badge: "Laptops & Hardware Outlet",
    address: "Opposite Star Mall, Putalisadak, Kathmandu",
    city: "Kathmandu",
    phone: "+977 01-4433221",
    hours: "Sun – Fri: 10:00 AM – 7:00 PM",
    services: [
      "Laptops & PC Hardware Experience",
      "Gaming Accessories & Consoles",
      "Express Delivery Depot",
      "B2B & Corporate Sales",
    ],
  },
  {
    name: "Kumaripati Store (Lalitpur)",
    badge: "Authorized Experience Store",
    address: "Kumaripati Main Road (Near Mahayan Complex), Lalitpur",
    city: "Lalitpur",
    phone: "+977 01-5534112",
    hours: "Sun – Fri: 10:00 AM – 7:00 PM",
    services: [
      "Smartphones & Wearables Showcase",
      "Audio & Bluetooth Testing Zone",
      "Fast In-Store Pickup",
    ],
  },
  {
    name: "Pokhara Lakeside Branch",
    badge: "Western Nepal Hub",
    address: "Lakeside Center, Street No. 6, Pokhara",
    city: "Pokhara",
    phone: "+977 061-523311",
    hours: "Sun – Sat: 9:30 AM – 8:00 PM",
    services: [
      "Regional Fulfillment Hub",
      "Traveler & Tourist Tech Support",
      "Audio, Action Cams & Drones",
    ],
  },
];

export default function StoreLocationsPage() {
  const { data: siteSettings } = useSiteSettings();
  const mainPhone = siteSettings?.phone || siteSettings?.phone_number || "+977 980-1234567";

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full inline-block">
            Visit In Person
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Our Store Locations & Pickup Outlets
          </h1>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Experience the latest flagship smartphones, laptops, and audio gear hands-on at any of our official experience centers across Nepal.
          </p>
        </div>

        {/* Branch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {branches.map((branch, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                      {branch.badge}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2">
                      {branch.name}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gray-50 text-gray-700 flex items-center justify-center shrink-0">
                    <Store size={20} />
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-gray-600">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <a href={`tel:${branch.phone.replace(/[^0-9+]/g, "")}`} className="font-bold text-gray-900 hover:text-primary transition-colors">
                      {branch.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <span>{branch.hours}</span>
                  </div>
                </div>

                {/* Available Services */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    In-Store Services:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                    {branch.services.map((srv, sIdx) => (
                      <span key={sIdx} className="flex items-center gap-1.5 text-gray-700">
                        <CheckCircle2 size={13} className="text-green-500 shrink-0" />
                        <span className="truncate">{srv}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                <a
                  href={`tel:${branch.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex-1 text-center bg-primary text-white font-bold py-2.5 px-4 rounded-xl text-xs hover:opacity-90 transition-opacity shadow-xs"
                >
                  Call Branch
                </a>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-50 transition-colors"
                >
                  <Navigation size={13} /> Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Central Support Callout */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-gray-900">Need Direction or In-Store Booking?</h4>
            <p className="text-xs text-gray-500">
              Call our centralized hotline at <strong className="text-gray-800">{mainPhone}</strong> to hold stock or schedule device pickup.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-primary text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:opacity-90 transition-opacity shrink-0 shadow-xs"
          >
            Contact Central Support
          </Link>
        </div>

      </div>
    </div>
  );
}
