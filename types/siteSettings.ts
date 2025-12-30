export interface SiteSettings {
  id: number;
  site_name: string;
  site_tagline: string | null;
  site_description: string | null;
  logo: string | null;
  favicon: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  facebook_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  youtube_url: string | null;
  maintenance_mode: boolean;
  allow_guest_checkout: boolean;
  show_stock_quantity: boolean;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  updated_at: string;
}
