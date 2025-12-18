import Image from "next/image";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

import BrandFeature from "./_home/BrandFeature";
import TopCellPhone from "./_home/TopCellPhone";
import AudioCamera from "./_home/AudioCamera";
import Adsrecentview from "../../components/Adsrecentview";
import FreeAdvertizemantCard from "@/components/FreeAdvertizemantCard";
import HomeCarouselSection from "./_home/HomeCarouselSection";
import DealOfDay from "./_home/DealOfDay";
import ProductCardTab from "@/components/ProductCardTab";
import AdsCards from "./_home/AdsCards";
import CuratedProducts from "./_home/CuratedProducts";

export default function Home() {
  return (
    <>
      
     <HomeCarouselSection/>
      <BrandFeature/>
      <DealOfDay/>
      <CuratedProducts/>
      <ProductCardTab/>
      <TopCellPhone/>
      <AudioCamera />
      <AdsCards/>
      <Adsrecentview/>
    </>
  );
}
