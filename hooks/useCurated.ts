"use client";

import { useQuery } from "@tanstack/react-query";
import { curatedService } from "@/services/curatedService";

export const useCurated = () => {
  return useQuery({
    queryKey: ["curated"],
    queryFn: () => curatedService.getCurated(),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });
};
