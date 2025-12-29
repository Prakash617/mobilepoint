import { api } from "@/lib/api";
import { CuratedItem } from "@/types/curated";
import { PaginatedResponse } from "@/types/product";

export const curatedService = {
  getCurated: async () => {
    const { data } = await api.get<PaginatedResponse<CuratedItem>>("/curated/");
    return data;
  },
};
