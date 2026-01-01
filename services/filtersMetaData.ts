import { api } from '@/lib/api';
import { FiltersMetaData } from '@/types/filtersmetadata';
import { SiteSettings } from '@/types/siteSettings';

export const filtersMetaDataService = {
    getFiltersMetaData: async (params?: { category?: string }) => {
    const url = params?.category
      ? `/products/filters_metadata/?category=${params.category}`
      : `/products/filters_metadata/`;

    const { data } = await api.get<FiltersMetaData>(url);
    return data;
  },
};
