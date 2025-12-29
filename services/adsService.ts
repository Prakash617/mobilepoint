import { api } from "@/lib/api";
import { Ad } from "@/types/ads";
import { PaginatedResponse } from "@/types/product";

export const advertisementService = {
  getAdvertisements: async (params?: {
    ad_type?: "photo" | "video" | "html";
    position?: string;
    is_active?: boolean;
  }) => {
    const { data } = await api.get<PaginatedResponse<Ad>>(
      "/advertisements/",
      { params }
    );
    return data;
  },
};
