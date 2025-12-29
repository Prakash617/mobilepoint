"use client";

import { advertisementService } from "@/services/adsService";
import { useQuery } from "@tanstack/react-query";

export const useAdvertisements = (params?: {
  ad_type?: "photo" | "video" | "html";
  position?: string;
  is_active?: boolean;
}) => {
  return useQuery({
    queryKey: ["advertisements", params],
    queryFn: () => advertisementService.getAdvertisements(params),
    staleTime: 1000 * 60 * 5,
  });
};
