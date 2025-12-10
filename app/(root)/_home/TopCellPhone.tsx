
import Image from "next/image";
import Button from "@/components/Button";
import HorizontalLine from "@/components/HorizontalLine";
import { CardCarousel } from "@/components/CardCarousel";

type Props = {};

const products = [
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
  {
    id: 6,
    name: "SROK Smart Phone 128GB, Oled Retina",
    slug: "srok-smart-phone-128gb-oled-retina",
    price: 60000,
    image: "/topcell2.png",
    tag: true,
    tag_text: "Save",
    tagPrice: "199.0",
    free_shipping: false,
    free_gift: false,
    new: false,
    in_stock: true,
    quantity: 5,
    sub_images: ["/topcell2.png"],
  },
];


const topCellPhone = [
  { id: 1, name: "iPhone (iOS)", image: "/topcell1.png", quantity: 74 },
  { id: 2, name: "Android", image: "/topcell2 copy.png", quantity: 12 },
  { id: 3, name: "Gaming", image: "/topcell3 copy.png", quantity: 9 },
  { id: 4, name: "Xiaomi", image: "/topcell4 copy.png", quantity: 9 },
  { id: 5, name: "Accessories", image: "/topcell5 copy.png", quantity: 9 },
  { id: 6, name: "5G Support", image: "/topcell6 copy.png", quantity: 9 },
];

const TopCellPhone = (props: Props) => {


  return (
    <div className="bg-white border border-solid space-y-4 rounded-xl p-8">
      {/* Top Section */}
     <div className="space-y-8">

  {/* HEADER */}
  <div className="flex flex-row justify-between sm:items-center gap-2">
    <p className="font-bold text-lg uppercase">Top CellPhones & Tablets</p>
    <button className="text-gray-400 font-light sm:mt-0 text-sm sm:text-base">
      View All
    </button>
  </div>

  {/* MAIN WRAPPER */}
  <div className="flex flex-col md:flex-row gap-6">

    {/* LEFT BANNER */}
    <div className="w-full md:w-1/2 h-[220px]  relative">
      <Image
        src="/topcellphone.png"
        alt="phone"
        fill
        className="object-cover rounded-lg"
      />

      <div className="absolute top-1/2 left-6 sm:left-10 -translate-y-1/2 w-44 sm:w-52 space-y-2 sm:space-y-3">
        <p className="text-xl sm:text-2xl font-semibold uppercase">
          Redmi Note 12 Pro + 5G
        </p>
        <p className="text-secondary text-xs sm:text-sm">Rise to the challenge</p>

        <Button
          text="Shop Now"
          bgColor="bg-black"
          textColor="text-white"
        />
      </div>
    </div>

    {/* RIGHT SIDE GRID */}
    <div className="w-full md:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-4 place-items-center">

      {topCellPhone.map((item) => (
        <div
          key={item.id}
          className="flex w-full items-center justify-between bg-white rounded-lg p-2 sm:p-3  hover:shadow-sm transition"
        >
          <div>
            <h3 className="font-bold text-sm">{item.name}</h3>
            {item.quantity && (
              <p className="text-secondary text-xs">{item.quantity} Items</p>
            )}
          </div>

          <div className="relative w-[45px] h-[45px] sm:w-[55px] sm:h-[55px]">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      ))}

    </div>
  </div>
</div>

      <HorizontalLine />

      {/* Product Carousel */}
      <CardCarousel products={products} />
    </div>
  );
};

export default TopCellPhone;
