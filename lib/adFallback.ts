import { Ad } from "@/types/ads";

const FALLBACK_IMAGES = [
  "/ads1.png",
  "/ads2.png",
  "/ads3.png",
  "/ads4.png",
  "/ads5.png",
];

const fallbackAd = (image: string, index: number): Ad => ({
  id: index + 1,
  title: `Advertisement ${index + 1}`,
  ad_type: "photo",
  position: "home_top",
  image,
  link_url: "#",
  open_in_new_tab: false,
  is_active: true,
  start_date: "",
  end_date: null,
  max_impressions: null,
  current_impressions: 0,
  click_count: 0,
  ctr: 0,
  is_valid: true,
  order: index,
});

// Returns the real ads when available; otherwise (or when short of `count`)
// pads the list with boilerplate template images.
export const getAdsWithFallback = (ads: Ad[] = [], count?: number): Ad[] => {
  const realAds = ads.length > 0 ? ads : [];
  const needed = count ?? realAds.length;

  const padded: Ad[] = [...realAds];
  for (let i = 0; padded.length < needed; i++) {
    padded.push(fallbackAd(FALLBACK_IMAGES[i % FALLBACK_IMAGES.length], i));
  }

  return padded;
};
