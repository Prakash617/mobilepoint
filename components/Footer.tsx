import { useSiteSettings } from "@/hooks/useSiteSettings";
import Image from "next/image";
import Link from "next/link";
import {
  FaAngleDown,
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
// const { data, isLoading, isError, error } = useSiteSettings();

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="bg-white py-14 space-y-10">
      {/* Top Sections */}
      <div className="container flex flex-col lg:flex-row lg:space-x-10 space-y-10 lg:space-y-0">
        
        {/* Left Column */}
        <div className="w-full lg:w-1/4 p-1 text-left space-y-8">
          <p className="uppercase font-bold">mobile point shop</p>

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

          <div className="flex flex-wrap space-x-4">
            {[FaTwitter, FaFacebookF, FaInstagram, FaYoutube, FaPinterest].map(
              (Icon, i) => (
                <div
                  key={i}
                  className="bg-secondary-background w-7 h-7 rounded-full flex justify-center items-center cursor-pointer"
                >
                  <Icon />
                </div>
              )
            )}
          </div>
        </div>

        {/* Right Grid */}
        <div className="w-full lg:w-3/4 p-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          
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
                  <Link href={href} className="text-secondary hover:text-accent">
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
              {[
                "Become Seller",
                "Affiliate",
                "Advertise",
                "Partnership",
              ].map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="container flex flex-col lg:flex-row gap-10 lg:gap-0 lg:space-x-10">
        
        {/* Currency Select */}
        <div className="w-full lg:w-1/4 flex flex-col gap-3">
          <div className="flex items-center space-x-1 border rounded-lg px-6 py-2 w-max cursor-pointer">
            <button>NRP</button>
            <FaAngleDown />
          </div>
          <div className="flex items-center space-x-1 border rounded-lg px-6 py-2 w-max cursor-pointer">
            <button>NRP</button>
            <FaAngleDown />
          </div>
        </div>

        {/* Subscribe Section */}
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
            <span className="underline underline-offset-2 text-black cursor-pointer">
              Policy
            </span>
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container border-t-2 pt-8 flex flex-col lg:flex-row items-center text-secondary text-sm font-light gap-5 lg:gap-0">
        
        <p>© 2024 Mobile Point Shop. All Rights Reserved.</p>

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
