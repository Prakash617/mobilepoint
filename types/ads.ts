export interface Ad {
  id: number;
  title: string;
  ad_type: string;
  position: string;
  image: string | null;
  link_url: string | null;
  open_in_new_tab: boolean;
  is_active: boolean;
  start_date: string;
  end_date: string | null;
  max_impressions: number | null;
  current_impressions: number;
  click_count: number;
  ctr: number;
  is_valid: boolean;
  order: number;
}
