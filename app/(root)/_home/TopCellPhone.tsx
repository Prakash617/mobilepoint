"use client";

import Image from "next/image";
import Button from "@/components/Button";
import HorizontalLine from "@/components/HorizontalLine";
import { CardCarousel } from "@/components/CardCarousel";
import {
  useTopCategories,
  useTopMobileTabletProducts,
} from "@/hooks/useProducts";
import { Category } from "@/types/product";
import { useAdvertisements } from "@/hooks/useAds";
import Link from "next/link";
import CardCarouselSkeleton from "@/components/skeleton/TopCellCarouselSkeleton";
import TopCellPhoneSkeleton from "@/components/skeleton/TopcellPhoneSkeleton";

const TopCellPhone = () => {
  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useTopMobileTabletProducts();
  const {
    data: topCategories,
    isLoading: topCategoriesLoading,
    error: topCategoriesError,
  } = useTopCategories({
    limit: 6,
  });
  const {
    data: ads,
    isLoading: isAdsLoading,
    error: isAdsError,
  } = useAdvertisements();

  const advertisements = ads?.results || [];
  const ad6 = advertisements[5];

  if (isAdsLoading) return <TopCellPhoneSkeleton />;
  if (isAdsError) return <div>Failed to load ads</div>;
  if (productsLoading || topCategoriesLoading) {
    return <TopCellPhoneSkeleton />;
  }

  if (productsError || topCategoriesError) {
    return <div>Error loading data</div>;
  }

  const topCellPhone = (topCategories?.results ?? []).map((category) => ({
    id: category.id,
    name: category.name,
    image: category.image,
    quantity: category.total_products,
  }));

  return (
    <div className="bg-white border mt-2 border-solid space-y-4 rounded-xl p-8">
      {/* Top Section */}
      <div className="space-y-8">
        {/* HEADER */}
        <div className="flex flex-row justify-between sm:items-center gap-2">
          <p className="font-bold text-lg uppercase">
            Top CellPhones & Tablets
          </p>
          <button className="text-gray-400 font-light sm:mt-0 text-sm sm:text-base">
            View All
          </button>
        </div>

        {/* MAIN WRAPPER */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* LEFT BANNER */}
          {ad6?.image && (
            <div className="w-full md:w-1/2 h-[220px] relative">
              <Image
                src={ad6.image}
                alt={ad6.title || "Advertisement6"}
                fill
                className="object-cover rounded-lg"
              />

              <div className="absolute top-1/2 left-6 sm:left-10 -translate-y-1/2 w-44 sm:w-52 space-y-2 sm:space-y-3">
                <p className="text-xl sm:text-2xl font-semibold uppercase">
                  {ad6.title}
                </p>
                <div
                  className="text-secondary text-xs sm:text-sm"
                  dangerouslySetInnerHTML={{ __html: ad6?.html_content }}
                />
                <Link href={ad6?.link_url || "#"}>
                  <Button
                    text="Shop Now"
                    bgColor="bg-black"
                    textColor="text-white"
                  />
                </Link>
              </div>
            </div>
          )}

          {/* RIGHT SIDE GRID */}
          <div className="w-full md:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-4 place-items-center">
            {topCellPhone.map((item) => (
              <div
                key={item.id}
                className="flex w-full items-center justify-between bg-white rounded-lg p-2 sm:p-3 hover:shadow-sm transition"
              >
                <div>
                  <h3 className="font-bold text-sm">{item.name}</h3>
                  {item.quantity !== undefined && (
                    <p className="text-secondary text-xs">
                      {item.quantity} Items
                    </p>
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
      <CardCarousel products={products ?? []} />
    </div>
  );
};

export default TopCellPhone;
