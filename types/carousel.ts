import { Product } from "./product";

export interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string | null;
  description: string | null;
  image: string;
  mobile_image: string | null;
  link_url: string | null;
  link_text: string | null;
  open_in_new_tab: boolean;
  product: Product | null; // replace `any` with your Product type if available
  order: number;
  is_active: boolean;
}


export interface Carousel {
  id: number;
  title: string;
  position: string;
  is_active: boolean;
  auto_play: boolean;
  auto_play_speed: number;
  show_indicators: boolean;
  show_arrows: boolean;
  order: number;
  slides: CarouselSlide[];
  created_at: string;
}