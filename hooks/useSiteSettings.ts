import { useQuery } from '@tanstack/react-query';
import { siteSettingsService } from '@/services/siteSettingsService';

export function useSiteSettings() {
  return useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => siteSettingsService.getSiteSettings(),
  });
}
