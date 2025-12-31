import { useQuery } from '@tanstack/react-query';
import { filtersMetaDataService } from '@/services/filtersMetaData';

export function useFiltersMetadata(params?: { category?: string }) {
  return useQuery({
    queryKey: ['filters-metadata', params?.category ?? 'all'],
    queryFn: () => filtersMetaDataService.getFiltersMetaData(params),
  });
}
