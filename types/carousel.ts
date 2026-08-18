export interface CarouselImage {
  id: number;
  url: string;
  name: string;
  size: number;
  width: number;
  height: number;
  display_name: string;
}

export interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string | null;
  description: string | null;
  image: CarouselImage | null;
  link_url: string | null;
  link_text: string | null;
  product: number | null;
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
