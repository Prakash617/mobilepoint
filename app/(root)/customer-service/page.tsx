"use client";

import React from "react";
import Link from "next/link";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  Truck,
  ShieldCheck,
  RefreshCw,
  CreditCard,
  PhoneCall,
  Mail,
  HelpCircle,
  Package,
  Store,
  ChevronRight,
  Clock,
  Award,
} from "lucide-react";

export default function CustomerServicePage() {
  const { data: siteSettings } = useSiteSettings();
  const phone = siteSettings?.phone || siteSettings?.phone_number || "+977 980-1234567";
  const email = siteSettings?.email || "support@mobilepoint.com.np";
  const freeThreshold = siteSettings?.free_shipping_threshold ? `NRP ${parseFloat(siteSettings.free_shipping_threshold).toLocaleString()}` : "NRP 2,800";

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full inline-block">
            Support Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Customer Service & Help Desk
          </h1>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Everything you need to know regarding product authenticity, nationwide shipping, return requests, and official brand warranties.
          </p>
        </div>

        {/* 4 Core Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0073bc] flex items-center justify-center font-bold">
              <Truck size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Fast & Free Shipping</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Enjoy <strong>FREE delivery</strong> on all electronics orders above <strong>{freeThreshold}</strong>. Same-day / 24h delivery within Kathmandu Valley, and 2-4 business days for all other regions.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">100% Genuine Tech Warranty</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              All smartphones, laptops, smartwatches, and accessories sold on Mobile Point are 100% authentic with manufacturer warranty coverage through authorized service centers in Nepal.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              <RefreshCw size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">30-Day Money Back & Replacement</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Received a damaged or malfunctioning item? Report within 7 days for an instant replacement or a full refund under our customer protection guarantee.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <CreditCard size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">100% Secure Payments</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Pay conveniently and securely with <strong>eSewa, Khalti, Cash on Delivery (COD)</strong>, or mobile banking without hidden transaction fees.
            </p>
          </div>
        </div>

        {/* Quick Action Navigation */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-gray-900">
            Frequently Used Services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <Link
              href="/track-order"
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0073bc] flex items-center justify-center shrink-0">
                  <Package size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm group-hover:text-primary transition-colors">
                    Track My Order
                  </h4>
                  <p className="text-gray-400 mt-0.5">Check live shipment status</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/faqs"
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm group-hover:text-primary transition-colors">
                    Read FAQs
                  </h4>
                  <p className="text-gray-400 mt-0.5">Common questions answered</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/contact"
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm group-hover:text-primary transition-colors">
                    Contact Specialist
                  </h4>
                  <p className="text-gray-400 mt-0.5">Send a direct message</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>

        {/* 24/7 Helpline Banner */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-primary text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-bold">Need Immediate Help?</h3>
            <p className="text-xs text-gray-300 max-w-md">
              Our tech support team is available 24/7 to help you with order confirmation, product recommendations, or warranty claims.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
              className="bg-white text-gray-900 font-bold px-6 py-3 rounded-xl text-xs hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-sm"
            >
              <PhoneCall size={14} className="text-primary" /> Call {phone}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
