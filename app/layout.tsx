import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import "./html-content.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SearchBox from "@/components/SearchBox";
import CartDrawer from "@/components/CartDrawer";
import { Providers } from "./providers";
import { Suspense } from 'react';


// Inter regular font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Optional: If you want a monospaced version, Inter_Tight or use something like Roboto Mono
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mobile Point Nepal - Genuine Smartphones, Laptops & Tech Accessories",
    template: "%s | Mobile Point Nepal",
  },
  description:
    "Nepal's premier electronics and gadget marketplace. Shop genuine smartphones, laptops, fast chargers, earbuds, and PC accessories with official brand warranties.",
  keywords: [
    "smartphones nepal",
    "electronics store kathmandu",
    "laptops nepal",
    "mobile accessories",
    "buy gadgets nepal",
    "genuine warranty",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mobilespoint.shop"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mobilespoint.shop",
    siteName: "Mobile Point Nepal",
    title: "Mobile Point Nepal - Genuine Tech Marketplace",
    description:
      "Shop authentic electronics, smartphones, and gadgets with nationwide doorstep delivery and official warranty across Nepal.",
    images: [
      {
        url: "/default-logo.png",
        width: 1200,
        height: 630,
        alt: "Mobile Point Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobile Point Nepal - Electronics & Smartphones",
    description:
      "Authentic electronics, smartphones & accessories with official brand warranty across Nepal.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${interTight.variable} min-h-screen antialiased`}>
        <Providers>
        <div className="w-full md:w-5/6 md:mx-auto">
        {/* <div className="p-2 md:mx-auto"> */}
        <Navbar/>
        <Suspense fallback={<div className="h-16 w-full bg-gray-100 animate-pulse rounded-lg my-2"></div>}>
          <SearchBox />
        </Suspense>
        <Suspense fallback={
          <div className="flex flex-col space-y-4 p-4 min-h-screen">
            <div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg"></div>
            <div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg"></div>
            <div className="w-full h-64 bg-gray-100 animate-pulse rounded-lg"></div>
          </div>
        }>
          {children}
        </Suspense>
        </div>
          <Footer/>
          <CartDrawer />
      </Providers>
      </body>
    </html>
  );
}
