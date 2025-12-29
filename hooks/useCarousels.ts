import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { carouselService } from "@/services/carouselService";
import { Carousel } from "@/types/carousel";
import { PaginatedResponse } from "@/types/product";

interface UseCarouselsParams {
  position?: string;
  featured?: boolean;
}

export const useCarousels = (params?: UseCarouselsParams) => {
  return useQuery<PaginatedResponse<Carousel>>({
    queryKey: ["carousels", params],
    queryFn: () => carouselService.getCarousels(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    // keepPreviousData: true, // Fix to keep previous data when the query key changes
  });
};
