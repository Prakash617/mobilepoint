"use client";

import FreeAdvertizemantCard from "@/components/FreeAdvertizemantCard";
import Navigation from "@/components/Navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useDeals } from "@/hooks/useProducts";
import { useAdvertisements } from "@/hooks/useAds";
import Link from "next/link";

/* ---------- helpers ---------- */
const hmsToSeconds = (hms: string) => {
  const [h, m, s] = hms.split(":").map(Number);
  return h * 3600 + m * 60 + s;
};

const secondsToHms = (total: number) => {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  return [
    String(h).padStart(2, "0"),
    String(m).padStart(2, "0"),
    String(s).padStart(2, "0"),
  ];
};
/* ----------------------------- */

const DealOfDay = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const { data, isLoading, error } = useDeals();
  const dealsData = data?.results || [];

  const {
      data: adsData,
      isLoading: isAdsLoading,
      error: adsError,
    } = useAdvertisements({
      ad_type: "photo",
      position: "home_top",
      is_active: true,
    });

  const ads = (adsData?.results || []).slice(4, 7);

  // 🔥 countdown state per deal
  const [timers, setTimers] = useState<Record<number, number>>({});

  /* init timers */
  useEffect(() => {
    if (!dealsData.length) return;

    const initialTimers: Record<number, number> = {};
    dealsData.forEach((deal: any) => {
      if (deal.time_remaining_hms) {
        initialTimers[deal.id] = hmsToSeconds(deal.time_remaining_hms);
      }
    });

    setTimers(initialTimers);
  }, [dealsData]);

  /* tick every second */
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const updated = { ...prev };
        Object.keys(updated).forEach((id) => {
          if (updated[Number(id)] > 0) {
            updated[Number(id)] -= 1;
          }
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isAdsLoading) {
    return <div>Loading...</div>;
  }
  if (adsError) {
    return <div>Error loading carousel</div>;
  }
  if (isLoading) return <div>Loading deals...</div>;
  if (error) return <div>Error loading deals</div>;

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
              {dealsData.map((deal: any) => {
                const mainImage =
                  deal.primary_image?.image ||
                  deal.all_images?.[0]?.image ||
                  "/placeholder.png";

                const time = timers[deal.id];
                const hms = time !== undefined ? secondsToHms(time) : null;

                return (
                  <CarouselItem key={deal.id} className="basis-full">
                    <div className="flex flex-col md:flex-row rounded-xl pt-8 pb-4 px-4 bg-white mt-3">
                      {/* IMAGE BLOCK */}
                      <div className="w-full md:w-1/2 flex">
                        <div className="w-16 flex flex-col gap-4 justify-center items-center">
                          {deal.all_images?.map((thumb: any, i: number) => (
                            <Image
                              key={i}
                              src={thumb.image}
                              alt={thumb.alt_text || "thumbnail"}
                              width={30}
                              height={30}
                            />
                          ))}
                        </div>

                        <div className="flex flex-1 justify-center items-center">
                          <Image
                            src={mainImage}
                            alt={deal.title}
                            width={200}
                            height={200}
                          />
                        </div>
                      </div>

                      {/* TEXT SECTION */}
                      <div className="w-full md:w-1/2 p-4">
                        <p className="font-bold text-lg">{deal.product_name}</p>

                        <div className="flex items-center font-bold mt-1">
                          <p className="text-[#F1352B] mr-6 text-xl">
                            Rs. {deal.discounted_price}
                          </p>
                          <span className="line-through font-semibold text-gray-500 text-sm">
                            Rs. {deal.original_price}
                          </span>
                        </div>

                        {/* Specs */}
                        {deal.specification &&
                          Object.keys(deal.specification).length > 0 && (
                            <ul className="list-disc list-inside mt-3 text-sm text-gray-500 space-y-1">
                              {Object.entries(deal.specification).map(
                                ([key, value]: any, i: number) => (
                                  <li key={i}>
                                    <strong className="capitalize">
                                      {key}:
                                    </strong>{" "}
                                    {value}
                                  </li>
                                )
                              )}
                            </ul>
                          )}

                        {/* Badges */}
                        <div className="flex mt-4 gap-2 flex-wrap">
                          {deal.free_shipping && (
                            <FreeAdvertizemantCard
                              text="Free Shipping"
                              color="primary"
                              bgColor="#fcf3fd"
                              
                            />
                          )}
                          {deal.free_gift && (
                            <FreeAdvertizemantCard
                              text="Free Gift"
                              color="danger"
                              bgColor="#fff5f5"
                            />
                          )}
                        </div>

                        {/* ⏳ COUNTDOWN (LIVE) */}
                        <div className="flex justify-between my-8 border-b border-gray-200 pb-6">
                          <p className="uppercase font-semibold text-sm leading-4">
                            hurry up!
                            <br /> Promotion will <br /> expires in
                          </p>

                          {hms && (
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
                          )}
                        </div>

                        {/* STOCK */}
                        <div className="text-sm">
                          <div className="h-1.5 bg-gray-300 rounded-full mb-1">
                            <div
                              className="h-full rounded-full bg-primary transition-all duration-300"
                              style={{
                                width: `${Math.min(
                                  deal.progress_percentage ?? 0,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                          <p>
                            <span className="text-gray-500">Remaining: </span>
                            <span className="font-bold">
                              {deal.remaining_quantity}
                            </span>
                            <span className="text-gray-400">
                              {" "}
                              / {deal.total_quantity}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
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
              <Image src={ad.image} alt={ad.title} fill className="object-cover" />
            </Link>
            )
          ))}
        </div>
      </div>

      {/* BOTTOM BANNER (UNCHANGED) */}
      <div className="flex flex-col sm:flex-row my-2 items-center justify-center gap-2 sm:gap-4 p-3 sm:p-4 bg-linear-to-br from-[#9c6500] to-[#fca301] rounded-xl w-full">
        <Image src="/start.png" alt="star" width={24} height={24} />
        <p className="text-white text-center sm:text-left text-sm sm:text-base font-light">
          Member get
          <span className="text-[#ffe400] font-extrabold uppercase ml-1">
            Free Shipping*
          </span>
          with no order minimum!. *Restrictions apply
          <span className="underline underline-offset-2 ml-1 decoration-[#ffe400]">
            Try free 30-days trails!
          </span>
        </p>
      </div>
    </>
  );
};

export default DealOfDay;
