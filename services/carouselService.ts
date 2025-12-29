import { api } from "@/lib/api";
import { Carousel, CarouselSlide } from "@/types/carousel";
import { PaginatedResponse } from "@/types/product";

export const carouselService = {
  getCarousels: async (params?: {
    featured?: boolean;
    position?: string;
  }) => {
    const { data } = await api.get<PaginatedResponse<Carousel>>(
      "/carousels/",
      { params }
    );
    return data;
  },
};
