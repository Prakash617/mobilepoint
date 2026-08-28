"use client";

import React, { useState } from "react";
import { api } from "@/lib/api";
import {
  Store,
  TrendingUp,
  Truck,
  ShieldCheck,
  Zap,
  Users,
  CheckCircle2,
  Send,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function BecomeSellerPage() {
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    category: "smartphones",
    city: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.phone || !formData.email) {
      toast.error("Please fill in required fields.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/contact-messages/", {
        name: `${formData.businessName} (Seller App: ${formData.contactPerson})`,
        email: formData.email,
        phone: formData.phone,
        subject: `Seller Application: ${formData.businessName} - ${formData.category}`,
        message: `City: ${formData.city}\nCategory: ${formData.category}\nDetails: ${formData.notes}`,
      });
      setSubmitted(true);
      toast.success("Seller application submitted! Our vendor team will contact you within 24 hours.");
    } catch {
      toast.error("Failed to submit application. Please contact our hotline directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-primary text-white rounded-3xl p-8 sm:p-14 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-5 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/20 border border-primary/30 px-3.5 py-1.5 rounded-full inline-block">
              Vendor Partnership
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Grow Your Tech & Electronics Business With Us
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Reach thousands of smartphone, computer, and audio buyers across Nepal. Zero setup fees, instant merchant dashboard, and reliable nationwide logistics.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="#apply-form"
                className="bg-primary text-white font-bold px-7 py-3 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-md shadow-primary/20"
              >
                Register as Seller
              </a>
              <Link
                href="/contact"
                className="bg-white/10 text-white font-bold px-7 py-3 rounded-xl text-sm hover:bg-white/20 transition-colors"
              >
                Talk to Vendor Support
              </Link>
            </div>
          </div>

          <div className="absolute right-6 -bottom-10 opacity-10 sm:opacity-20 pointer-events-none">
            <Store className="w-96 h-96 text-white" />
          </div>
        </div>

        {/* 4 Key Pillars */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Why Sell on Mobile Point?
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto">
              We empower authorized tech retailers, distributors, and indie makers with cutting-edge e-commerce tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0073bc] flex items-center justify-center font-bold">
                <Users size={24} />
              </div>
              <h3 className="text-base font-bold text-gray-900">500,000+ Gadget Buyers</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Direct exposure to highly engaged customers looking for smartphones, laptops, and authentic electronic accessories.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center font-bold">
                <Zap size={24} />
              </div>
              <h3 className="text-base font-bold text-gray-900">0% Registration Fee</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Free vendor account setup with competitive low commission rates and predictable bi-weekly automated payouts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
                <Truck size={24} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Nationwide Fulfillment</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Doorstep pickup from your warehouse with secured insured delivery to all 77 districts across Nepal.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Anti-Fraud & Warranty</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Integrated eSewa, Khalti, and COD fraud-screening with transparent customer return and warranty protocols.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Steps How it works */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm space-y-8">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center">
            How to Get Started in 4 Simple Steps
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2 border-l-2 border-primary pl-4">
              <span className="text-xs font-bold text-primary uppercase">Step 01</span>
              <h4 className="text-sm font-bold text-gray-900">Submit Application</h4>
              <p className="text-xs text-gray-500">Provide basic business registration and VAT/PAN details.</p>
            </div>
            <div className="space-y-2 border-l-2 border-primary pl-4">
              <span className="text-xs font-bold text-primary uppercase">Step 02</span>
              <h4 className="text-sm font-bold text-gray-900">List Your Catalog</h4>
              <p className="text-xs text-gray-500">Upload electronics, variations, and prices to your store.</p>
            </div>
            <div className="space-y-2 border-l-2 border-primary pl-4">
              <span className="text-xs font-bold text-primary uppercase">Step 03</span>
              <h4 className="text-sm font-bold text-gray-900">Receive & Dispatch</h4>
              <p className="text-xs text-gray-500">Pack verified orders and hand them over to our courier partner.</p>
            </div>
            <div className="space-y-2 border-l-2 border-primary pl-4">
              <span className="text-xs font-bold text-primary uppercase">Step 04</span>
              <h4 className="text-sm font-bold text-gray-900">Receive Payouts</h4>
              <p className="text-xs text-gray-500">Get direct bank transfers every 14 days without hidden deductions.</p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div id="apply-form" className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm max-w-3xl mx-auto">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Application Submitted!</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Thank you for applying. Our vendor onboarding manager will review your catalog and reach out to complete verification.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <h3 className="text-2xl font-extrabold text-gray-900">Seller Registration Form</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Complete this form to start selling tech products on Mobile Point.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Business / Store Name *</label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="e.g. Apex Electronics Nepal"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Contact Person Name *</label>
                  <input
                    type="text"
                    name="contactPerson"
                    required
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="e.g. Anil Shrestha"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Business Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="store@domain.com"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Phone Number *</label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+977 98XXXXXXXX"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Primary Product Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-primary outline-none"
                  >
                    <option value="smartphones">Smartphones & Tablets</option>
                    <option value="laptops">Laptops & PC Hardware</option>
                    <option value="audio">Audio, Speakers & Earphones</option>
                    <option value="accessories">Chargers, Cases & Accessories</option>
                    <option value="cctv">CCTV & Security Tech</option>
                    <option value="gaming">Gaming Gear & Consoles</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">City / District</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Kathmandu, Pokhara, Butwal"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-primary outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700">About Your Products & Brands</label>
                <textarea
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Tell us about the brands you distribute, average stock, or current store links..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-primary outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white font-bold py-3.5 rounded-xl text-sm hover:opacity-90 transition-all shadow-md shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={15} /> Submit Seller Application
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
