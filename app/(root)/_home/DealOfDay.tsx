"use client";

import Navigation from "@/components/Navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useDeals, useProduct } from "@/hooks/useProducts";
import { useAdvertisements } from "@/hooks/useAds";
import { getAdsWithFallback } from "@/lib/adFallback";
import { resolveImageUrl } from "@/lib/utils";
import Link from "next/link";
import DealsOfDaySkeleton from "@/components/skeleton/DealsOfDaySkeleton";
import TrialBanner from "@/components/TrialBanner";
import type { Deal } from "@/types/product";

/* ---------- helpers ---------- */
const secondsToHms = (total: number) => {
  const safe = Math.max(0, total);
  const h = Math.floor(safe / 3600);
  const m = Math.floor((safe % 3600) / 60);
  const s = safe % 60;

  return [
    String(h).padStart(2, "0"),
    String(m).padStart(2, "0"),
    String(s).padStart(2, "0"),
  ];
};

// Live countdown target for a deal: end_at when still in the future,
// otherwise the end of today so the "deal of the day" timer keeps ticking.
const getCountdownTarget = (endAt: string | null, now: number) => {
  const endTime = endAt ? new Date(endAt).getTime() : 0;
  if (endTime && endTime > now) return endTime;
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay.getTime();
};

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
/* ----------------------------- */

const DealSlide = ({ deal, now }: { deal: Deal; now: number }) => {
  const { data: product } = useProduct(deal.product_slug);

  const basePrice = product?.base_price ? parseFloat(product.base_price) : 0;
  const discount = deal.discount_percent ?? 0;
  const dealPrice =
    basePrice > 0 ? basePrice * (1 - discount / 100) : null;

  const remainingSeconds = Math.max(
    0,
    Math.floor((getCountdownTarget(deal.end_at, now) - now) / 1000)
  );
  const hms = secondsToHms(remainingSeconds);

  return (
    <CarouselItem className="basis-full">
      <div className="flex flex-col md:flex-row rounded-xl pt-8 pb-4 px-4 bg-white mt-3">
        {/* IMAGE BLOCK */}
        <div className="w-full md:w-1/2 flex">
          <div className="flex flex-1 justify-center items-center">
            <Image
              src={resolveImageUrl(deal.primary_image?.image)}
              alt={deal.title}
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
        </div>

        {/* TEXT SECTION */}
        <div className="w-full md:w-1/2 p-4">
          <Link href={`/products/${deal.product_slug}`}>
            <p className="font-bold text-lg">{deal.product_name}</p>
          </Link>

          <div className="flex items-center gap-2 font-bold mt-1">
            <span className="bg-[#F1352B] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              Deal of the day
            </span>
            <p className="text-[#F1352B] text-xl">{discount}% OFF</p>
            <span className="font-semibold text-gray-500 text-sm">
              {deal.brand_name}
            </span>
          </div>

          {/* PRICES */}
          <div className="mt-3 flex items-baseline gap-3 flex-wrap">
            {dealPrice !== null ? (
              <>
                <span className="text-2xl font-bold text-gray-900">
                  Rs.{" "}
                  {dealPrice.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </span>
                {basePrice > dealPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    Rs. {basePrice.toLocaleString()}
                  </span>
                )}
              </>
            ) : (
              <span className="text-2xl font-bold text-gray-900">
                Rs. {basePrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* DESCRIPTION */}
          {product?.short_description && (
            <p className="text-xs text-gray-500 mt-2 line-clamp-2">
              {stripHtml(product.short_description)}
            </p>
          )}

          {/* ⏳ COUNTDOWN (LIVE) */}
          <div className="flex justify-between my-8 border-b border-gray-200 pb-6">
            <p className="uppercase font-semibold text-sm leading-4">
              hurry up!
              <br /> Promotion will <br /> expires in
            </p>

            <div className="flex items-center gap-2">
              {hms.map((value, i) => (
                <div
                  key={i}
                  className="bg-secondary-background text-center rounded-md px-2 py-1 min-w-[45px]"
                >
                  <p className="font-bold">{value}</p>
                  <p className="text-xs font-bold text-gray-700">
                    {i === 0 ? "H" : i === 1 ? "M" : "S"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* STOCK */}
          <div className="text-sm">
            <div className="h-1.5 bg-gray-300 rounded-full mb-1">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{
                  width: `${Math.min(deal.progress_percentage ?? 0, 100)}%`,
                }}
              />
            </div>
            <div className="flex justify-between">
              <p>
                <span className="text-gray-500">Remaining: </span>
                <span className="font-bold">{deal.remaining_quantity}</span>
                <span className="text-gray-400"> / {deal.total_quantity}</span>
              </p>
              {product && (
                <p className="text-gray-500">
                  Stock:{" "}
                  <span className="font-bold">{product.stock_quantity}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
};

const DealOfDay = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const { data, isLoading, error } = useDeals();
  const dealsData = data?.results || [];

  const {
      data: adsData,
      error: adsError,
    } = useAdvertisements({
      ad_type: "photo",
      position: "home_top",
      is_active: true,
    });

  const ads = getAdsWithFallback(adsData?.results || [], 7).slice(4, 7);

  // 🔥 tick every second so countdowns stay live
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (adsError) {
    return <div>Error loading carousel</div>;
  }
  if (isLoading) return <DealsOfDaySkeleton/>;
  if (error) return <div>Error loading deals</div>;
  if (dealsData.length === 0) return null;

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-2 my-2">
        {/* LEFT SECTION */}
        <div className="w-full md:w-3/4 flex flex-col">
          {/* Header */}
          <div className="bg-primary rounded-xl flex p-4 justify-between items-center">
            <div className="uppercase text-white font-bold">
              Deal of the day
            </div>

            <Navigation
              variant="filled"
              onNext={() => api?.scrollNext()}
              onPrevious={() => api?.scrollPrev()}
            />
          </div>

          {/* CAROUSEL */}
          <Carousel opts={{ align: "start" }} setApi={setApi} className="w-full">
            <CarouselContent>
              {dealsData.map((deal) => (
                <DealSlide key={deal.id} deal={deal} now={now} />
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* RIGHT SIDE BANNERS (UNCHANGED) */}
        <div className="w-full md:w-1/4 flex gap-2 flex-row md:flex-col">
          
          {ads.map((ad, i) => (
            ad.image && (
        <Link href= {ad.link_url || "#"}
              key={i}
              className="relative h-32 md:h-1/3 w-1/3 md:w-full rounded-lg overflow-hidden"
            >
              <Image src={resolveImageUrl(ad.image)} alt={ad.title} fill className="object-cover" />
            </Link>
            )
          ))}
        </div>
      </div>

      {/* BOTTOM BANNER (UNCHANGED) */}
     <TrialBanner />
    </>
  );
};

export default DealOfDay;
