export interface Ad {
  id: number;
  title: string;
  ad_type: "photo" | "video" | "html";
  position: string;
  image: string | null;
  mobile_image: string | null;
  video_url: string | null;
  html_content: string;
  link_url: string;
  open_in_new_tab: boolean;
  is_active: boolean;
  start_date: string;
  end_date: string | null;
  show_on_mobile: boolean;
  show_on_desktop: boolean;
  order: number;
}