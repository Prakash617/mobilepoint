"use client";

import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useCategories } from "@/hooks/useProducts";
import Image from "next/image";
import Link from "next/link";
import {
  FaAngleDown,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const {
    data: siteSettings,
    isLoading: isSiteSettingsLoading,
    isError,
    error,
  } = useSiteSettings();

  const { data: categoriesData, isLoading: isCategoriesLoading } = useCategories();

  const footerCategories =
    categoriesData?.results?.slice(0, 8).map((category) => ({
      title: category.name,
      href: `/products?category=${category.slug}`,
    })) ?? [];

  const companyLinks = [
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Store Locations", href: "/store-locations" },
    { title: "Blog", href: "/blog" },
    { title: "Sitemap", href: "/sitemap" },
  ];

  const helpLinks = [
    { title: "Customer Service", href: "/customer-service" },
    { title: "Policy", href: "/policy" },
    { title: "Terms & Conditions", href: "/terms-and-conditions" },
    { title: "Track Order", href: "/track-order" },
    { title: "FAQs", href: "/faqs" },
    { title: "My Account", href: "/account" },
  ];

  const partnerLinks = [
    { title: "Become Seller", href: "/become-seller" },
    { title: "Affiliate", href: "/affiliate" },
    { title: "Advertise", href: "/advertise" },
    { title: "Partnership", href: "/partnership" },
  ];

  const isLoading = isSiteSettingsLoading || isCategoriesLoading;

  if (isLoading) return <div className="bg-gray-100 min-h-[400px] animate-pulse"></div>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="bg-white py-14 space-y-10">
      <div className="container flex flex-col lg:flex-row lg:space-x-10 space-y-10 lg:space-y-0">
        <div className="w-full lg:w-1/4 p-1 text-left space-y-8">
          <p className="uppercase font-bold">{siteSettings?.site_name || "Mobile Point"}</p>

          <div className="uppercase mt-4">
            <p>hotline 24/7</p>
            <p className="text-primary text-xl font-bold">
              {siteSettings?.phone || "+977-9800000000"}
            </p>
          </div>

          <div className="text-sm">
            <p
              className="html-content"
              dangerouslySetInnerHTML={{
                __html:
                  siteSettings?.address ||
                  "<p>123 Market Road, Kathmandu, Nepal</p>",
              }}
            />
            <p>{siteSettings?.email || "support@mobilepoint.com"}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {siteSettings?.facebook_url && siteSettings.facebook_url !== "xxx" && (
              <Link
                href={siteSettings.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary-background w-7 h-7 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-200 transition"
              >
                <FaFacebookF className="text-sm" />
              </Link>
            )}

            {siteSettings?.twitter_url && siteSettings.twitter_url !== "xxx" && (
              <Link
                href={siteSettings.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary-background w-7 h-7 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-200 transition"
              >
                <FaTwitter className="text-sm" />
              </Link>
            )}

            {siteSettings?.instagram_url && siteSettings.instagram_url !== "xxx" && (
              <Link
                href={siteSettings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary-background w-7 h-7 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-200 transition"
              >
                <FaInstagram className="text-sm" />
              </Link>
            )}

            {siteSettings?.linkedin_url && siteSettings.linkedin_url !== "xxx" && (
              <Link
                href={siteSettings.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary-background w-7 h-7 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-200 transition"
              >
                <FaLinkedin className="text-sm" />
              </Link>
            )}

            {siteSettings?.youtube_url && siteSettings.youtube_url !== "xxx" && (
              <Link
                href={siteSettings.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary-background w-7 h-7 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-200 transition"
              >
                <FaYoutube className="text-sm" />
              </Link>
            )}
          </div>
        </div>

        <div className="w-full lg:w-3/4 p-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="text-left space-y-4">
            <p className="uppercase font-bold">top categories</p>
            <div className="text-secondary text-sm space-y-2">
              {footerCategories.length > 0 ? (
                footerCategories.map(({ title, href }) => (
                  <p key={title}>
                    <Link href={href} className="text-secondary hover:text-black cursor-pointer">
                      {title}
                    </Link>
                  </p>
                ))
              ) : (
                <p className="text-secondary">No categories available</p>
              )}
            </div>
          </div>

          <div className="text-left space-y-4">
            <p className="uppercase font-bold">Company</p>
            <div className="text-secondary text-sm space-y-2">
              {companyLinks.map(({ title, href }) => (
                <p key={title}>
                  <Link href={href} className="text-secondary hover:text-black cursor-pointer">
                    {title}
                  </Link>
                </p>
              ))}
            </div>
          </div>

          <div className="text-left space-y-4">
            <p className="uppercase font-bold">help center</p>
            <div className="text-secondary text-sm space-y-2">
              {helpLinks.map(({ title, href }) => (
                <p key={title}>
                  <Link href={href} className="text-secondary hover:text-black cursor-pointer">
                    {title}
                  </Link>
                </p>
              ))}
            </div>
          </div>

          <div className="text-left space-y-4">
            <p className="uppercase font-bold">partner</p>
            <div className="text-secondary text-sm space-y-2">
              {partnerLinks.map(({ title, href }) => (
                <p key={title}>
                  <Link href={href} className="text-secondary hover:text-black cursor-pointer">
                    {title}
                  </Link>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container flex flex-col lg:flex-row gap-10 lg:gap-0 lg:space-x-40">
        <div className="flex gap-4">
          <div>
            <button className="flex items-center gap-1 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition active:scale-[0.97]">
              <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center">
                <Image src="/nep.png" alt="Nepali Flag" width={20} height={20} className="object-cover" />
              </div>
              NRP
              <FaAngleDown className="text-xs mt-px" />
            </button>
          </div>
          <div>
            <button className="flex items-center gap-1 border border-gray-300 rounded-md px-2 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition active:scale-[0.97]">
              <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center">
                <Image src="/usa.png" alt="USA Flag" width={15} height={15} className="object-cover" />
              </div>
              ENG
              <FaAngleDown className="text-xs mt-px" />
            </button>
          </div>
        </div>

        <div className="w-full lg:w-3/4 space-y-4 font-bold">
          <p className="uppercase text-center lg:text-left">
            subscribe & get <span className="text-danger">10% off</span> for your first order
          </p>

          <div className="border-b pb-1 border-background flex justify-between">
            <input
              type="text"
              placeholder="Enter your email address"
              className="text-sm w-full text-secondary outline-none font-light ml-4"
            />
            <button className="text-success uppercase font-medium text-sm cursor-pointer">
              Subscribe
            </button>
          </div>

          <p className="text-secondary text-sm font-light italic">
            By subscribing, you’re accepted the our{" "}
            <span className="underline underline-offset-2 text-black cursor-pointer">Policy</span>
          </p>
        </div>
      </div>

      <div className="container border-t-2 pt-8 flex flex-col lg:flex-row items-center text-secondary text-sm font-light gap-5 lg:gap-0">
        <p>© {new Date().getFullYear()} {siteSettings?.site_name || "Mobile Point"}. All Rights Reserved.</p>

        <div className="flex gap-6 mx-auto lg:mx-auto">
          {["paypal", "bank", "visa", "stripe", "kalti"].map((img) => (
            <div key={img} className="w-8 h-8 relative">
              <Image src={`/${img}.png`} alt={img} fill className="object-contain" />
            </div>
          ))}
        </div>

        <Link href="/" className="text-blue-600 lg:ml-auto">
          Mobile App
        </Link>
      </div>
    </div>
  );
};

export default Footer;
