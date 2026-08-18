export interface CuratedProductDetail {
  id: number;
  slug: string;
  name: string;
  image: string | null;
  base_price: string;
  price_range: Record<string, unknown> | null;
  brand: {
    id: number;
    name: string;
    slug: string;
  };
  short_description: string;
  average_rating: number;
  review_count: number;
  is_featured: boolean;
  is_in_stock: boolean;
}

export interface CuratedItem {
  id: number;
  title: string;
  subtitle?: string;
  image?: string | null;
  button_text?: string;
  link_url?: string;
  linked_type?: string;
  product_detail?: CuratedProductDetail | null;
  position?: number;
}
