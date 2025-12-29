import { api } from "@/lib/api";
import { GroupedCategory } from "@/types/category";

export const categoriesService = {
  getGroupedSections: async () => {
    const { data } = await api.get<GroupedCategory[]>(
      "/categories/grouped-sections/"
    );
    return data;
  },
};
