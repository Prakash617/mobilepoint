import { api } from '@/lib/api';
import { SiteSettings } from '@/types/siteSettings';

export const siteSettingsService = {
  getSiteSettings: async () => {
    const { data } = await api.get<SiteSettings>('/site-settings/');
    return data;
  },
};
