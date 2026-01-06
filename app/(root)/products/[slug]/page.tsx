import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";
import Adsrecentview from "@/components/Adsrecentview";
import RelatedProduct from "@/components/RelatedProduct";

import { serverProductService } from "@/lib/serverApi";
import MainProductDetail from "./MainProductDetail";
import { notFound } from "next/navigation";

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
    sub_images: [
      "/topcell2.png",
      "/topcell3.png",
      "/topcell4.png",
      "/topcell5.png",
    ],
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

export default async function ProductDetail({ params }: Props) {
  
  const { slug } = await params;
 const product = await serverProductService.getProduct(slug);
  
  if (!product) {
    notFound();
  }
 
  
  
  return (
    <>
      <DynamicBreadcrumb />

      
      <MainProductDetail slug={slug} product={product} />
      
      <RelatedProduct  slug={slug}/>
      <Adsrecentview />
    </>
  );
}
