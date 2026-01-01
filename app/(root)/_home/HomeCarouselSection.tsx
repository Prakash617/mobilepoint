"use client";
import HomeCarousel from "@/components/HomeCarousel";
import HomeCarouselSectionSkeleton from "@/components/skeleton/HomeCarouselSkeleton";
import { useAdvertisements } from "@/hooks/useAds";
import { useCategories } from "@/hooks/useProducts";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const HomeCarouselSection = (props: Props) => {
  const { data: categories, isLoading, error } = useCategories();

  const {
    data,
    isLoading: isAdsLoading,
    error: adsError,
  } = useAdvertisements({
    ad_type: "photo",
    position: "home_top",
    is_active: true,
  });

  const ads = data?.results || [];
  const ad1 = ads[0];
  const ad2 = ads[1];
  const ad3 = ads[2];
  const ad4 = ads[3];

  console.log("Advertisements1:", ads[0]);
  console.log("Advertisements2:", ads[1]);
  console.log("Advertisements3:", ads[2]);
  console.log("Advertisements4:", ads[3]);
   if (isLoading || isAdsLoading) {
  return <HomeCarouselSectionSkeleton slides={3} categoriesCount={5} adsCount={4} />;
}

  if (error) {
    return <div>Error loading carousel</div>;
  }

 
  if (adsError) {
    return <div>Error loading carousel</div>;
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
        <div className="rounded-xl bg-white text-left py-4 px-6 space-y-2">
  <p className="text-red-600 font-semibold text-sm">Sale 40% Off</p>
  {categories?.results?.map((category) => (
    <Link
      href={`/products/?category=${category.slug}`}
      key={category.id}
      className="text-sm hover:underline cursor-pointer"
    >
    
      {category.name} {/* Only show the category name as the link */}
    </Link>
  ))}
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
                  src={ad.image}
                  alt={ad.title || `ad-banner-${index + 1}`}
                  fill
                  className="object-cover"
                />
              ) : (
                // optional fallback if image is missing
                <Image
                  src={`/ads-fallback.png`}
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
          <div className="area-left-side rounded-xl bg-white text-left py-6 px-10 space-y-2">
            <p className="text-red-600 font-semibold">Sale 40% Off</p>
            {categories?.results?.map((category) => (
              <Link
                href={`/products/?category=${category.slug}`}
                key={category.id}
                className="text-sm hover:underline cursor-pointer block"
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="area-mid-main rounded-lg overflow-hidden">
            <HomeCarousel />
          </div>

          {ad3?.image && (
            <Link
              href={ad3.link_url}
              className="area-main-left my-border relative"
            >
              <Image
                src={ad3.image}
                alt={ad3.title || "ad-banner"}
                fill
                className="rounded-lg object-cover"
              />
            </Link>
          )}

          {ad4?.image && (
            <Link
              href={ad4.link_url}
              className="area-main-right my-border relative"
            >
              <Image
                src={ad4.image}
                alt={ad4.title || "ad-banner"}
                fill
                className="rounded-lg object-cover w-full"
              />
            </Link>
          )}

          <div className="area-right-side grid grid-rows-2 gap-2">
            {ad1?.image && (
              <Link href={ad1.link_url} className="my-border relative">
                <Image
                  src={ad1.image}
                  alt={ad1.title || "ad-banner"}
                  fill
                  className="rounded-lg object-cover w-full"
                />
              </Link>
            )}

            {ad2?.image && (
              <Link href={ad2.link_url} className="my-border relative">
                <Image
                  src={ad2.image}
                  alt={ad2.title || "ad-banner"}
                  fill
                  className="rounded-lg object-cover w-full"
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
