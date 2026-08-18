import { api } from "@/lib/api";

export interface CmsPage {
  id: number;
  title: string;
  slug: string;
  meta_description: string;
  content: string;
  excerpt: string;
  featured_image: string | null;
  seo_title: string;
  keywords: string;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export const pageService = {
  getPage: async (slug: string): Promise<CmsPage> => {
    const { data } = await api.get<CmsPage>(`/pages/${slug}/`);
    return data;
  },
};
