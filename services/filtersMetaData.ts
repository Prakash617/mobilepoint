import { api } from '@/lib/api';
import { FiltersMetaData } from '@/types/filtersmetadata';
import { SiteSettings } from '@/types/siteSettings';

export const filtersMetaDataService = {
    getFiltersMetaData: async (params?: { category?: string; brand?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set("category", params.category);
    if (params?.brand) searchParams.set("brand", params.brand);
    const qs = searchParams.toString();
    const url = qs ? `/products/filters_metadata/?${qs}` : `/products/filters_metadata/`;

    const { data } = await api.get<FiltersMetaData>(url);
    return data;
  },
};
