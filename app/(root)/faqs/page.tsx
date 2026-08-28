"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  Search,
  ChevronDown,
  PhoneCall,
  Mail,
  ShieldCheck,
  Truck,
  CreditCard,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: "Orders & Delivery",
    question: "How long does delivery take inside and outside Kathmandu Valley?",
    answer: "Orders inside Kathmandu Valley are typically delivered within 24 to 48 hours. For deliveries outside the valley (Pokhara, Butwal, Biratnagar, Chitwan, etc.), standard shipping takes 2 to 4 business days.",
  },
  {
    category: "Orders & Delivery",
    question: "How do I qualify for FREE shipping?",
    answer: "Free shipping is automatically unlocked when your cart subtotal reaches NRP 2,800 or more on all eligible electronics and accessories.",
  },
  {
    category: "Orders & Delivery",
    question: "How can I track my package live?",
    answer: "You can track your order at any time on our Track Order page (/track-order) using your Order Reference Number (e.g., MP-XXXXX) sent to your phone/email.",
  },
  {
    category: "Warranty & Authenticity",
    question: "Are all smartphones and electronic accessories 100% genuine?",
    answer: "Yes, absolutely! Mobile Point only sells 100% original, brand-new gadgets sourced directly from authorized brand distributors with official VAT bills and IMEI registration in Nepal (NTA compliant).",
  },
  {
    category: "Warranty & Authenticity",
    question: "How does the product warranty work?",
    answer: "All smartphones and laptops come with an official 1-year brand warranty (and 6 months for battery/chargers). You can claim warranty directly at any authorized service center nationwide or through Mobile Point.",
  },
  {
    category: "Payments & Refunds",
    question: "What payment methods are supported on Mobile Point?",
    answer: "We support Cash on Delivery (COD), eSewa, Khalti, and direct bank mobile transfers. All digital payments are processed through secure 256-bit encrypted gateways.",
  },
  {
    category: "Payments & Refunds",
    question: "What is your return and refund policy?",
    answer: "If you receive a defective, damaged, or incorrect product, you can request a replacement or full refund within 7 days of delivery under our 30-Day Customer Protection program.",
  },
  {
    category: "Payments & Refunds",
    question: "How long does it take to process a refund?",
    answer: "Once the returned item is inspected at our warehouse (within 24 hours), refunds to eSewa/Khalti are processed within 1 business day, and bank transfers within 2 to 3 business days.",
  },
];

export default function FAQsPage() {
  const { data: siteSettings } = useSiteSettings();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const phone = siteSettings?.phone || siteSettings?.phone_number || "+977 980-1234567";

  const categories = ["All", "Orders & Delivery", "Warranty & Authenticity", "Payments & Refunds"];

  const filteredFaqs = faqData.filter((item) => {
    const matchesCat = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full inline-block">
            Frequently Asked Questions
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            How Can We Help You?
          </h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Find immediate answers regarding orders, delivery timelines, official warranties, and payment methods.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions (e.g. warranty, delivery, eSewa, returns)..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm text-gray-800 placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none shadow-sm transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-sm shadow-primary/20"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm divide-y divide-gray-100">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <HelpCircle className="w-10 h-10 text-gray-300 mx-auto" />
              <p className="text-sm text-gray-500 font-medium">
                No matching questions found for "{search}".
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="py-4 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 group"
                  >
                    <span className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-primary transition-colors">
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-primary/10 text-primary" : "text-gray-400"
                    }`}>
                      <ChevronDown size={16} />
                    </div>
                  </button>

                  {isOpen && (
                    <p className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed pr-8 animate-fadeIn">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Help Banner */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-gray-900">Still Have Questions?</h4>
            <p className="text-xs text-gray-500 mt-0.5">
              Our support team is happy to assist you 24 hours a day, 7 days a week.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-1.5 bg-primary text-white font-bold px-4 py-2 rounded-xl text-xs hover:opacity-90 transition-opacity shadow-xs"
            >
              <PhoneCall size={13} /> Call {phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 font-bold px-4 py-2 rounded-xl text-xs hover:bg-gray-200 transition-colors"
            >
              <Mail size={13} /> Contact Form
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
