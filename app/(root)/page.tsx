'"use client";'
import BrandFeature from "./_home/BrandFeature";
import TopCellPhone from "./_home/TopCellPhone";
import AudioCamera from "./_home/AudioCamera";
import Adsrecentview from "../../components/Adsrecentview";
import HomeCarouselSection from "./_home/HomeCarouselSection";
import DealOfDay from "./_home/DealOfDay";
import ProductCardTab from "@/components/ProductCardTab";
import AdsCards from "./_home/AdsCards";
import CuratedProducts from "./_home/CuratedProducts";
import { useCarousels } from "@/hooks/useCarousels";

export default function Home() {
 
  return (
    <>
      
     <HomeCarouselSection/>
      <BrandFeature/>
      <DealOfDay/>
      <ProductCardTab/>
      <CuratedProducts/>
      <TopCellPhone/>
      <AudioCamera />
      <AdsCards/>
      <Adsrecentview/>
    </>
  );
}
