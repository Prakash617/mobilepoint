import Button from "@/components/Button";
import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";
import FreeAdvertizemantCard from "@/components/FreeAdvertizemantCard";
import Longtextmore from "@/app/(root)/product/[slug]/Longtextmore";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

import {
  FaCheckCircle,
  FaFacebookF,
  FaHeart,
  FaInstagram,
  FaPinterest,
  FaPlus,
  FaShippingFast,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import Adsrecentview from "@/components/Adsrecentview";
import RelatedProduct from "@/components/RelatedProduct";

type Props = { params: Promise<{ slug: string }> };

const related_products = [
  {
    id: 1,
    name: "SROK Smart Phone 128GB, Oled Retina",
    slug: "srok-smart-phone-128gb-oled-retina",
    price: 60000,
    image: "/topcell2.png",
    tag: true,
    tag_text: "Save",
    tagPrice: "199.0",
    free_shipping: true,
    free_gift: true,
    new: true,
    in_stock: true,
    quantity: 25,
    sub_images: ["/topcell2.png","/topcell3.png","/topcell4.png","/topcell5.png"],
  },
  {
    id: 2,
    name: "aPod Pro Tablet 2023 LTE+ Wifi, GPS Cellular 12.9 Inch, 512GB",
    slug: "apod-pro-tablet-2023-lte-wifi-gps-cellular-12-9-inch-512gb",
    price: 98000,
    image: "/topcell1.png",
    tag: true,
    tag_text: "New",
    tagPrice: null,
    free_shipping: false,
    free_gift: false,
    new: true,
    in_stock: true,
    quantity: 12,
    sub_images: ["/topcell1.png"],
  },
  {
    id: 3,
    name: "OPod Pro 12.9 Inch M1 2023, 64GB + Wifi, GPS",
    slug: "opod-pro-12-9-inch-m1-2023-64gb-wifi-gps",
    price: 70000,
    image: "/topcell3.png",
    tag: true,
    tag_text: "New",
    tagPrice: null,
    free_shipping: false,
    free_gift: false,
    new: true,
    in_stock: false,
    quantity: 0,
    sub_images: ["/topcell3.png"],
  },
  {
    id: 4,
    name: "aPod Pro Tablet 2023 LTE+ Wifi, GPS Cellular 12.9 Inch, 512GB",
    slug: "apod-pro-tablet-2023-lte-wifi-gps-cellular-12-9-inch-512gb",
    price: 98000,
    image: "/topcell1.png",
    tag: true,
    tag_text: "New",
    tagPrice: null,
    free_shipping: false,
    free_gift: false,
    new: true,
    in_stock: true,
    quantity: 8,
    sub_images: ["/topcell1.png"],
  },
  {
    id: 5,
    name: "aPod Pro Tablet 2023 LTE+ Wifi, GPS Cellular 12.9 Inch, 512GB",
    slug: "apod-pro-tablet-2023-lte-wifi-gps-cellular-12-9-inch-512gb",
    price: 98000,
    image: "/topcell1.png",
    tag: true,
    tag_text: "New",
    tagPrice: null,
    free_shipping: false,
    free_gift: false,
    new: true,
    in_stock: false,
    quantity: 0,
    sub_images: ["/topcell1.png"],
  },

];
const frequentitem = [
  {
    name: "Somseng Galatero X6 Ultra LTE 4G/128 Gb, Black Smartphone",
    price: "Rs. 35000/-",
    textColor: "text-[#333333]",
  },
  {
    name: "BOSO 2 Wireless On Ear Headphone",
    price: "Rs. 25000/-",
    textColor: "text-red-600",
  },
  {
    name: "Opplo Watch Series 8 GPS + Cellular Stainless Stell Case with Milanese Loop",
    price: "Rs. 15000/-",
    textColor: "text-red-600",
  },
];

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params;
  console.log("slug", slug);
  return (
    <>
      <DynamicBreadcrumb />

      <div className="sm:w-full w-full my-2 md:container mx-auto p-4 bg-white rounded-xl">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT SIDE – PRODUCT IMAGES */}
          <div className="lg:col-span-4  rounded-xl p-4 ">
            <div className="w-full md:h-[600px] h-[400px]  p-4 flex justify-center items-center">
              <Image
                src="/productDetail.jpg"
                alt="product"
                width={500}
                height={500}
                className="object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mt-2 justify-left">
              {["/productDetail.jpg", "/phone2.jpg", "/phone3.jpg"].map(
                (img) => (
                  <div
                    key={img}
                    className="w-16 h-16 relative cursor-pointer  rounded-lg"
                  >
                    <Image
                      src={img}
                      alt="thumb"
                      fill
                      className="object-contain"
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* MIDDLE COLUMN - PRODUCT INFO */}
          <div className="lg:col-span-5 bg-white">
            <p className="text-center text-sm text-gray-400">(5)</p>
            <h2 className="text-2xl font-bold">
              Samsung Galaxy X6 Ultra LTE 4G/128GB, Black Smartphone
            </h2>

            <p className="text-3xl font-semibold mt-2">Rs. 35,000/-</p>

            <ul className="mt-4 space-y-2 text-gray-600 text-sm">
              <li>
                • Intel LGA 1700 Socket: Supports 13th & 12th Gen Intel Core
              </li>
              <li>• DDR5 Compatible: 4*SIM DIMMs with XMP 3.0</li>
              <li>• Commanding Power Design: Twin 16+1+2 Phases</li>
            </ul>
            <div className="flex gap-2 mt-2">
              <FreeAdvertizemantCard text="Free shipping" color="success" />
              <FreeAdvertizemantCard text="Free gift" color="danger" />
            </div>
            <hr className="bg-background h-[3px] my-8 rounded-full" />

            {/* Color Selection */}
            <div className="mt-6">
              <p className="font-bold">
                COLOR:{" "}
                <span className="text-secondary font-semibold">
                  {" "}
                  Midnight Blue{" "}
                </span>
              </p>

              <div className="grid grid-cols-3 gap-2 mt-3">
                {["Midnight Blue", "Deep Purple", "Space Black"].map((c) => (
                  <div
                    key={c}
                    className="border-2 rounded-lg px-2 py-1 cursor-pointer hover:border-success flex items-center justify-center "
                  >
                    <div>
                      <Image
                        src="/phone3.jpg"
                        alt="color"
                        width={70}
                        height={70}
                      />
                    </div>
                    <div>
                      <p className="text-sm">{c}</p>
                      <p className="text-xs font-bold">Rs. 35,000/-</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Memory Select */}
            <div className="mt-6">
              <p className="font-semibold mb-2">MEMORY SIZE: 128GB</p>
              <div className="flex gap-2 flex-wrap">
                {["64GB", "128GB", "256GB", "512GB"].map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-lg text-black hover:border-success ${
                      size === "128GB" ? " border-success " : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <hr className="bg-background h-[3px] my-8 rounded-full" />

            {/* Offers */}
            <div className=" border rounded-xl p-4 bg-[#ecf6ec] flex justify-around items-center">
              <div>
                <Image src="/gift.png" alt="offer" width={100} height={100} />
              </div>
              <div className="font-medium">
                <p className="text-sm">
                  • Buy <span className="text-danger font-bold">02</span> boxes
                  get a <b>Snack Tray</b>
                </p>
                <p className="text-sm">
                  • Buy <span className="text-danger font-bold">04</span> boxes
                  get a free <b>Block Toys</b>
                </p>
                <p className="text-xs text-gray-500 italic mt-4">
                  Promotion will expires: 9:00 PM, 25/5/2024
                </p>
              </div>
            </div>

            {/* Meta */}
            <div className="mt-6 text-sm text-secondary">
              <p className="">
                {" "}
                <span className="text-black font-bold">SKU:</span> ABC025168
              </p>
              <p>
                <span className="text-black font-bold">CATEGORY: </span>{" "}
                <span className="text-succborder-success">
                  Cell Phones & Tablets
                </span>
              </p>
              <p>
                <span className="text-black font-bold">BRAND: </span>
                <span className="text-success">Samsung</span>
              </p>

              <div className="flex flex-wrap space-x-4 my-4 ">
                {[
                  FaTwitter,
                  FaFacebookF,
                  FaInstagram,
                  FaYoutube,
                  FaPinterest,
                ].map((Icon, i) => (
                  <div
                    key={i}
                    className="bg-secondary-background w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                  >
                    <Icon className="text-black" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE – CART BOX */}
          <div className="lg:col-span-3  rounded-xl  ">
            <div className="bg-background space-y-4 py-8 px-4 rounded-lg">
              <p className="font-semibold text-sm text-secondary">
                TOTAL PRICE:
              </p>
              <p className="text-2xl font-bold">Rs. 35,000/-</p>
              <p className="text-xs  ">
                {" "}
                <span className="text-danger  font-bold">
                  Rs. 3000/- Month{" "}
                </span>{" "}
                in 12 months.{" "}
                <Link href="#" className="text-blue-500 underline">
                  See more
                </Link>
              </p>
              <hr className="border-slate-300 h-2 mt-2 " />

              <div className="flex items-center gap-2 text-sm ">
                <FaCheckCircle className="text-success" /> <span>In Stock</span>
              </div>
              {/* Quantity */}
              <div className="flex bg-white justify-between px-4 items-center gap-4 border p-2 rounded-lg ">
                <div>
                  <button className="text-2xl font-bold">-</button>
                </div>
                <div className="font-bold">1</div>
                <div>
                  <button className="text-2xl font-bold">+</button>
                </div>
              </div>

              {/* Buttons */}
              <Button
                bgColor="bg-success"
                text=" ADD TO CART"
                textColor="text-white"
              />

              <button className="w-full bg-yellow-500 font-semibold text-black  py-3 rounded-lg">
                BUY WITH{" "}
                <Image
                  src="/paypal1.png"
                  alt="PayPal"
                  width={80}
                  height={20}
                  className="inline-block ml-2"
                />
              </button>

              <div className="mt-4 flex">
                <p className="text-sm w-1/2 border-r-2 font-semibold pr-1 border-slate-300  text-secondary">
                  <FaHeart className="inline-block mr-1 text-green-600" />{" "}
                  Wishlist added
                </p>
                <p className="text-sm w-1/2 text-center font-semibold text-secondary">
                  <IoMdRefresh className="inline-block font-bold text-lg mr-1" />{" "}
                  Compare
                </p>
              </div>
              <hr className="border-slate-300 h-2 my-4 " />
              <div>
                <p className="text-sm">Guaranteed Safe Checkout</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Image
                  src="/garantee.png"
                  alt="Verified by Visa"
                  width={300}
                  height={200}
                  className="inline-block"
                />
              </div>
            </div>

            {/* Support */}
            <div className="mt-2 p-6 bg-background text-left space-y-2 rounded-lg ">
              <div>
                <button className="bg-black py-2 text-white rounded-lg px-6">
                  Quick Order 24/7
                </button>
              </div>
              <div>
                <p className="text-lg font-bold">9764578611</p>
              </div>
            </div>
            <div className="flex space-x-2  my-2 items-center">
              <FaShippingFast className="inline-block" />
              <span>
                Shipment in <span className="font-bold">Kathmandu</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className=" rounded-lg  mb-2">
        <div className="grid grid-rows-[3fr_2fr_2fr_2fr] rounded-lg   sm:grid-cols-[3fr_2fr_2fr_2fr] sm:grid-rows-1 ">
          <div className="row-span-2 sm:col-span-2  bg-white rounded-t-lg sm:rounded-tl-lg sm:rounded-bl-lg">
            <h1 className="ml-20 mt-3 sm:mt-4 font-bold  sm:ml-5 ">
              FREQUENTLY BOUGHT TOGETHER
            </h1>
            <div className="grid grid-cols-8 mt-3 ">
              <div className="col-span-2">
                <img
                  src="/productDetail.jpg"
                  alt="My Image"
                  className="object-cover w-full h-full rounded-lg "
                />
              </div>
              <div className="col-span-1">
                <div className="w-8 h-8 ml-3 mt-9 sm:mt-15 sm:ml-5 bg-[#e2e4eb] rounded-full flex justify-center items-center">
                  <FaPlus />
                </div>{" "}
              </div>
              <div className="col-span-2">
                <img
                  src="/topcell25.jpg"
                  alt="My Image"
                  className="object-cover w-full h-full rounded-lg "
                />
              </div>
              <div className="col-span-1">
                <div className="w-8 h-8 ml-3 mt-9  sm:mt-15 sm:ml-5 bg-[#e2e4eb] rounded-full flex justify-center items-center">
                  <FaPlus />
                </div>
              </div>
              <div className="col-span-2">
                <img
                  src="/topcell26.jpg"
                  alt="My Image"
                  className="object-cover w-full h-full rounded-lg opacity-30 "
                />
              </div>
            </div>
            <div className="mt-2">
              {frequentitem.map((item, index) => {
                // Create safe ID using item.name
                const safeId = item.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "");

                return (
                  <div key={index} className="mt-2 mb-2">
                    <div className="flex items-center gap-3 pl-7">
                      <Checkbox id={safeId} className="bg-white mb-2" />
                      <Label
                        htmlFor={safeId}
                        className="flex text-left gap-2 text-secondary"
                      >
                        <span className="opacity-75">
                          {item.name}{" "}
                          <span className={`${item.textColor} font-bold`}>
                            {item.price}
                          </span>
                        </span>
                      </Label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="row-span-2   bg-white rounded-b-lg sm:rounded-tr-lg sm:rounded-br-lg   sm:mr-2">
            <div className="mt-10 ml-7">
              <h1 className="text-sm text-[#999999] ml-5 mt-7">Total Price:</h1>
              <h1 className="text-3xl ml-5 mt-2 mb-5 font-bold">
                Rs. 65,000/-{" "}
              </h1>
              <div className="ml-5">
                <div className="pr-25">
                  <Button
                    bgColor="bg-[#1ABA1A] "
                    text="ADD TO CART"
                    textColor="text-white text-sm "
                  />
                </div>
                <div className="flex mt-5">
                  <FaHeart className="text-[#999999] text-sm mt-1 mr-2" />
                  <p className="text-sm text-[#999999]"> Ad all to Wishlist</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-1.5 mt-2 sm:mt-0">
            <div>
              <img
                src="/topcell27.png"
                alt="My Image"
                className="object-cover w-full h-full rounded-lg "
              />
            </div>

            <div>
              <img
                src="/topcell28.png"
                alt="My Image"
                className="object-cover w-full h-full rounded-lg "
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white mb-1 rounded-lg">
        <div>
          <div className="flex flex-wrap gap-4 sm:gap-5 lg:gap-8 px-3 pt-8 pb-5">
            <button className="hover:underline font-semibold text-sm sm:font-bold lg:text-xl sm:pl-2">
              DESCRIPTION
            </button>
            <button className="hover:underline font-semibold text-sm sm:text-base sm:ml-6 text-[#666666] lg:text-lg">
              REVIEWS (5)
            </button>
            <button className="hover:underline font-semibold text-sm sm: sm:text-base sm:ml-6 lg:text-lg text-[#666666] ">
              ADDITIONAL INFORMATION
            </button>
          </div>

          <div className=" ">
            <p className="px-5  pt-6 text-base text-justify">
              Built for ultra-fast performance, the thin and lightweight Samsung
              Galaxy Tab S2 goes anywhere you go. Photos, movies and documents
              pop on a crisp, clear Super AMOLED display. Expandable memory lets
              you enjoy more of your favorite content. And connecting and
              sharing between all your Samsung devices is easier than ever.
              Welcome to life with the reimagined Samsung Galaxy Tab S2. Watch
              thev world come to life on your tablet's{" "}
              <b>Super AMOLED display * </b>. With deep contrast, rich colors
              and crisp details, you won't miss a thing
            </p>
            <div className="w-full h-[400px] flex items-center relative justify-center px-5 pt-7 ">
              <Image
                src="/topcell22.jpg"
                alt="My Image"
                fill
                className="object-cover w-full h-full rounded-lg  "
              />
            </div>

            <p className="mt-2 text-center text-sm font-semibold text-gray-300 px-3 ">
              * The Galaxy Tab S2’s 4 : 3 ratio display provides you with an
              ideal environment for performing office tasks.
            </p>
            <div className="">
              <h1 className="px-5 pt-3 font-bold text-lg">
                From the manufacturer
              </h1>
              <p className="px-5  pt-6 text-sm text-justify">
                Dive into the blockbuster movies you can't wait to see. Switch
                between your favorite apps quickly and easily. The new and
                improved octa-core processor gives you the power and speed you
                need to see more and do more. Expand your tablet's memory from
                32GB to up to an additional 128GB and enjoy more of your
                favorite music, photos, movies and games on the go with a
                microSD card. With Quick Connect, start a show on your Smart TV
                and, with the touch of a button, take it with you by moving it
                to your Galaxy Tab S2.
                <br />
                <br />
                Or send videos and photos from your tablet screen to your TV
                screen to share with everyone in the room. Work effortlessly
                between your Samsung tablet and Samsung smartphone with
                SideSync. Quickly drag and drop photos between devices. And even
                respond to a call from your smartphone right on your tablet
                screen.
              </p>
            </div>
            <div className="grid grid-cols-1 grid-rows-2 gap-2 px-5 pt-4 mt-2 sm:grid-cols-2 sm:grid-rows-1">
              <div className="h-[250px] sm:h-[450px]">
                <img
                  src="/topcell23.png"
                  alt="Image 1"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="h-[250px] sm:h-[450px]">
                <img
                  src="/topcell24.png"
                  alt="Image 2"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            <div className=" ">
              <h1 className="px-5 pt-4 font-bold">
                Samsung Galaxy Tab S2, 8-Inch, White
              </h1>
              <Longtextmore
                text="Dive into the blockbuster movies you can't wait to see. Switch between your favorite apps quickly and easily. The new and improved octa-core processor gives you the power and speed you need
                to see more and do more. Expand your tablet's memory from 32GB to up to an additional 128GB and enjoy more of your favorite music, photos, movies and games on the go with a microSD card.
                With Quick Connect, start a show on your Smart TV and, with the touch of a button, take it with you by moving it to your Galaxy Tab S2.<br /><br />
                Or send videos and photos from your tablet screen to your TV screen to share with everyone in the room. Work effortlessly between your Samsung tablet and Samsung smartphone with SideSync.
                Quickly drag and drop photos between devices. And even respond to a call from your smartphone right on your tablet screen."
              />
            </div>
          </div>
        </div>
      </div>
      <RelatedProduct products={related_products}  />
      <Adsrecentview />
    </>
  );
}
