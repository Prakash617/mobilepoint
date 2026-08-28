"use client";
import HomeCarousel from "@/components/HomeCarousel";
import HomeCarouselSectionSkeleton from "@/components/skeleton/HomeCarouselSkeleton";
import { useAdvertisements } from "@/hooks/useAds";
import { useCategories } from "@/hooks/useProducts";
import { getAdsWithFallback } from "@/lib/adFallback";
import { resolveImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const HomeCarouselSection = (props: Props) => {
  const { data: categories, isLoading, error, refetch: refetchCategories } = useCategories({ limit: 100, is_parent: true });

  const {
    data,
    isLoading: isAdsLoading,
    error: adsError,
    refetch: refetchAds,
  } = useAdvertisements({
    ad_type: "photo",
    position: "home_top",
    is_active: true,
  });

  const ads = getAdsWithFallback(data?.results || [], 4);
  const ad1 = ads[0];
  const ad2 = ads[1];
  const ad3 = ads[2];
  const ad4 = ads[3];

   if (isLoading || isAdsLoading) {
  return <HomeCarouselSectionSkeleton slides={3} categoriesCount={5} adsCount={4} />;
}


  return (
    <div className="w-full ">
      {/* Mobile Layout (< 768px) - Stacked vertically */}
      <div className="flex flex-col gap-4 md:hidden">
        {/* Carousel first on mobile */}
        <div className="rounded-lg overflow-hidden">
          <HomeCarousel />
        </div>

        {/* Categories */}
        <div className="rounded-xl bg-white text-left py-4 px-6 flex flex-col max-h-60">
  <p className="text-red-600 font-semibold text-sm mb-2 shrink-0">Sale 40% Off</p>
  <div className="flex-1 overflow-y-auto space-y-2 pr-2">
  {categories?.results?.map((category) => (
    <Link
      href={`/products/?category=${category.slug}`}
      key={category.id}
      className="text-sm hover:underline cursor-pointer block text-gray-700"
    >
      {category.name}
    </Link>
  ))}
  </div>
</div>


        {/* Ad banners in 2x2 grid on mobile */}
        <div className="grid grid-cols-2 gap-2">
          {ads.map((ad, index) => (
            <div
              key={ad.id || index}
              className="relative aspect-square rounded-lg overflow-hidden"
            >
              {ad.image?.trim() ? (
                <Image
                  src={resolveImageUrl(ad.image)}
                  alt={ad.title || `ad-banner-${index + 1}`}
                  fill
                  className="object-cover"
                />
              ) : (
                // optional fallback if image is missing
                <Image
                  src={`/ads1.png`}
                  alt={`fallback-ad-${index + 1}`}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout (> 1024px) - Original grid layout */}
      <div className="hidden lg:block">
        <div className="grid-layout gap-2">
          <div className="area-left-side rounded-xl bg-white text-left py-6 px-10 flex flex-col h-full">
            <p className="text-red-600 font-semibold pb-2 shrink-0">Sale 40% Off</p>
            <div className="flex-1 overflow-y-auto space-y-2 mt-2 pr-2 pb-4">
            {categories?.results?.map((category) => (
              <Link
                href={`/products/?category=${category.slug}`}
                key={category.id}
                className="text-sm hover:underline cursor-pointer block text-gray-700"
              >
                {category.name}
              </Link>
            ))}
            </div>
          </div>

          <div className="area-mid-main rounded-lg overflow-hidden">
            <HomeCarousel />
          </div>

          {ad3?.image && (
            <Link
              href={ad3.link_url || "#"}
              className="area-main-left relative block rounded-lg overflow-hidden h-full w-full"
            >
              <Image
                src={resolveImageUrl(ad3.image)}
                alt={ad3.title || "ad-banner"}
                fill
                className="object-cover"
              />
            </Link>
          )}

          {ad4?.image && (
            <Link
              href={ad4.link_url || "#"}
              className="area-main-right relative block rounded-lg overflow-hidden h-full w-full"
            >
              <Image
                src={resolveImageUrl(ad4.image)}
                alt={ad4.title || "ad-banner"}
                fill
                className="object-cover"
              />
            </Link>
          )}

          <div className="area-right-side grid grid-rows-2 gap-2 h-full">
            {ad1?.image && (
              <Link href={ad1.link_url || "#"} className="relative block rounded-lg overflow-hidden h-full w-full">
                <Image
                  src={resolveImageUrl(ad1.image)}
                  alt={ad1.title || "ad-banner"}
                  fill
                  className="object-cover"
                />
              </Link>
            )}

            {ad2?.image && (
              <Link href={ad2.link_url || "#"} className="relative block rounded-lg overflow-hidden h-full w-full">
                <Image
                  src={resolveImageUrl(ad2.image)}
                  alt={ad2.title || "ad-banner"}
                  fill
                  className="object-cover"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCarouselSection;
