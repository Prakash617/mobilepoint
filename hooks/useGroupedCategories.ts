import { categoriesService } from "@/services/categoriesService";
import { useQuery } from "@tanstack/react-query";

export const useGroupedCategories = () => {
  return useQuery({
    queryKey: ["grouped-categories"],
    queryFn: () => categoriesService.getGroupedSections(),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
};
