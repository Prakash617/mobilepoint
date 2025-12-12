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

export default function Home() {
  return (
    <>
      
     <HomeCarouselSection/>
      <BrandFeature/>
      <DealOfDay/>
      <ProductCardTab/>
      <TopCellPhone/>
      <AudioCamera />
      {/* <Adsrecentview/> */}
    </>
  );
}
