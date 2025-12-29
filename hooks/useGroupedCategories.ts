import { categoriesService } from "@/services/categoriesService";
import { useQuery } from "@tanstack/react-query";

export const useGroupedCategories = () => {
  return useQuery({
    queryKey: ["grouped-categories"],
    queryFn: () => categoriesService.getGroupedSections(),
    staleTime: 1000 * 60 * 5, // cache 5 minutes
  });
};
