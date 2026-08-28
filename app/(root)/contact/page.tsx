"use client";

import React, { useState } from "react";
import { api } from "@/lib/api";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  HelpCircle,
  Package,
  Store,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function ContactPage() {
  const { data: siteSettings } = useSiteSettings();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const phone = siteSettings?.phone || siteSettings?.phone_number || "+977 980-1234567";
  const email = siteSettings?.email || "support@mobilepoint.com.np";
  const address = siteSettings?.address || "New Road, Kathmandu, Nepal";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/contact-messages/", formData);
      setSubmitted(true);
      toast.success("Message sent successfully! Our support team will reply shortly.");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send message. Please try calling our hotline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full inline-block">
            We're Here For You
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Contact Mobile Point
          </h1>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Have questions about smartphone models, order warranties, bulk pricing, or repairs? Send us a message or call our 24/7 hotline.
          </p>
        </div>

        {/* Main Grid: Form + Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Information & Channels */}
          <div className="space-y-6">
            
            {/* Quick Contact Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                Store & Support Details
              </h3>

              <div className="space-y-4 text-xs">
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold uppercase tracking-wider text-[10px] block">
                      24/7 Hotline
                    </span>
                    <strong className="text-gray-900 text-sm group-hover:text-primary transition-colors">
                      {phone}
                    </strong>
                  </div>
                </a>

                <a
                  href={`mailto:${email}`}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0073bc] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold uppercase tracking-wider text-[10px] block">
                      Support Email
                    </span>
                    <strong className="text-gray-900 text-sm group-hover:text-[#0073bc] transition-colors truncate block">
                      {email}
                    </strong>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/50">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold uppercase tracking-wider text-[10px] block">
                      Physical Store
                    </span>
                    <span className="text-gray-800 font-bold block text-sm">
                      {address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/50">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 font-semibold uppercase tracking-wider text-[10px] block">
                      Business Hours
                    </span>
                    <span className="text-gray-700 font-medium block">
                      Sunday - Friday: 9:00 AM – 7:30 PM
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle size={16} className="text-primary" /> Self-Service Shortcuts
              </h4>
              <p className="text-xs text-gray-300">
                Looking for your package or have quick questions regarding returns?
              </p>
              <div className="space-y-2 pt-1 text-xs">
                <Link
                  href="/track-order"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Package size={14} /> Track Delivery
                  </span>
                  <span>&rarr;</span>
                </Link>
                <Link
                  href="/faqs"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle size={14} /> FAQs & Returns
                  </span>
                  <span>&rarr;</span>
                </Link>
                <Link
                  href="/store-locations"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Store size={14} /> Store Outlets
                  </span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Message Received!</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  Thank you for contacting Mobile Point. One of our tech specialists will get back to you within 2-4 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                  }}
                  className="mt-4 bg-primary text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:opacity-90 transition-opacity"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-xl font-bold text-gray-900">Send an Inquiry</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Fill out the form below and we will respond as soon as possible.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Sharma"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. ramesh@example.com"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">
                      Phone / Mobile Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+977 98XXXXXXXX"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Product Inquiry / Warranty Check"
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your inquiry, order question or feedback in detail..."
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-primary text-white font-bold px-8 py-3 rounded-xl text-xs hover:opacity-90 transition-all shadow-md shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={14} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
