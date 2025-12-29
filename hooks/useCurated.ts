"use client";

import { useQuery } from "@tanstack/react-query";
import { curatedService } from "@/services/curatedService";

export const useCurated = () => {
  return useQuery({
    queryKey: ["curated"],
    queryFn: () => curatedService.getCurated(),
    staleTime: 1000 * 60 * 5, // cache 5 minutes
  });
};
