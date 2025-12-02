import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaAngleDown,
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

type Props = {};

const Footer = (props: Props) => {
  return (
    <>
      <div className="bg-white py-14  space-y-8">
        <div className="container space-x-10 flex">
          <div className="w-1/4  p-1  text-left space-y-8">
            <div>
              <p className="uppercase font-bold">mobile point shop</p>
            </div>
            <div className="uppercase mt-4">
              <p>hotline 24/7</p>
              <p className="text-primary text-xl font-bold">+977 1 5357875</p>
            </div>
            <div className="text-sm">
              <p>
                New Road
                <br />
                Kathmandu, Nepal
              </p>
              <p>contact@mobilepoint.shop</p>
            </div>
            <div className="flex space-x-4">
              <div className="bg-secondary-background w-7 h-7  cursor-pointer   rounded-full flex justify-center items-center">
                <FaTwitter />
              </div>
              <div className="bg-secondary-background w-7 h-7  cursor-pointer  rounded-full flex justify-center items-center">
                <FaFacebookF />
              </div>
              <div className="bg-secondary-background w-7 h-7  cursor-pointer  rounded-full flex justify-center items-center">
                <FaInstagram />
              </div>
              <div className="bg-secondary-background w-7 h-7  cursor-pointer  rounded-full flex justify-center items-center">
                <FaYoutube />
              </div>
              <div className="bg-secondary-background w-7 h-7  cursor-pointer  rounded-full flex justify-center items-center">
                <FaPinterest />
              </div>
            </div>
          </div>
          <div className="w-3/4 p-1 grid grid-cols-4 ">
            <div className="text-left space-y-4">
              <p className="uppercase font-bold">top Categories</p>
              <div className="text-secondary text-sm space-y-2">
                {[
                  "Laptops",
                  "PC & Computers",
                  "Cell Phones",
                  "Tablets",
                  "Gaming & VR",
                  "Networks",
                  "Cameras",
                  "Sounds",
                  "Office",
                ].map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
            <div className="text-left space-y-4">
              <p className="uppercase font-bold">Company</p>
              <div className="text-secondary text-sm space-y-2">
                {[
                  { title: "About", href: "/about" },
                  { title: "Swoo", href: "/swoo" },
                  { title: "Contact", href: "/contact" },
                  { title: "Career", href: "/career" },
                  { title: "Blog", href: "/blog" },
                  { title: "Sitemap", href: "/sitemap" },
                  { title: "Store Locations", href: "/store-locations" },
                ].map(({ title, href }) => (
                  <p key={title}>
                    <Link
                      className="text-secondary hover:text-accent"
                      href={href}
                    >
                      {title}
                    </Link>
                  </p>
                ))}
              </div>
            </div>
            <div className="text-left space-y-4">
              <p className="uppercase font-bold">help center</p>
              <div className="text-secondary text-sm space-y-2">
                {[
                  "Customer Service",
                  "Policy",
                  "Terms & Conditions",
                  "Trach Order",
                  "FAQs",
                  "My Account",
                  "Product Support",
                ].map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
            <div className="text-left space-y-4">
              <p className="uppercase font-bold">partner</p>
              <div className="text-secondary text-sm space-y-2">
                {["Become Seller", "Affiliate", "Advertise", "Partnership"].map(
                  (item) => (
                    <p key={item}>{item}</p>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="container space-x-10 flex">
          <div className="w-1/4">
            <div className="flex items-center space-x-1 border  rounded-lg px-6 py-2 w-max cursor-pointer">
              <button>NRP</button>
              <FaAngleDown />
            </div>
            <div className="flex items-center space-x-1 border  rounded-lg px-6 py-2 w-max cursor-pointer">
              <button>NRP</button>
              <FaAngleDown />
            </div>
          </div>
          <div className="w-3/4  space-y-4 font-bold">
            <p className="uppercase">
              subscribe & get <span className="text-danger">10% off</span> for
              your first order
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
              <span className="underline underline-offset-2 text-black  cursor-pointer">
                Policy
              </span>
            </p>
          </div>
        </div>
        <div className="container border-t-2  pt-8 flex  items-center text-secondary text-sm font-light">
          <div>
            <p>© 2024 Mobile Point Shop. All Rights Reserved.</p>
          </div>

          <div className="flex gap-6 mx-auto">
            <div className="w-8 h-8 relative">
              <Image
                src="/paypal.png"
                alt="paypal"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-8 h-8 relative">
              <Image
                src="/bank.png"
                alt="bank"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-8 h-8 relative">
              <Image
                src="/visa.png"
                alt="visa"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-8 h-8 relative">
              <Image
                src="/stripe.png"
                alt="stripe"
                fill
                className="object-contain"
              />
            </div>
            <div className="w-8 h-8 relative">
              <Image
                src="/kalti.png"
                alt="khalti"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="ml-auto">
            <Link href="/" className="text-blue-600">
              Mobile App
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
