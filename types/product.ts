export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  parent: number | null;
  is_featured: boolean;
  is_active: boolean;
  total_products?: number;
  children?: Category[];
}


export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  description: string;
  is_featured: boolean;

  is_active: boolean;
}

export interface ProductImage {
  id: number;
  image: string;
  alt_text: string;
  is_primary: boolean;
  order: number;
}

export interface VariantAttribute {
  attribute: string;
  value: string;
  color_code: string | null;
}

export interface ProductVariant {
  id: number;
  sku: string;
  price: string;
  compare_at_price: string | null;
  stock_quantity: number;
  is_in_stock: boolean;
  is_low_stock: boolean;
  is_default: boolean;
  attributes: VariantAttribute[];
  images: ProductImage[];
}

export interface AvailableAttribute {
  name: string;
  display_name: string;
  values: {
    id: number;
    value: string;
    color_code: string | null;
    image?: string;
  }[];
}
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  category: Category;
  brand: Brand;
  base_price?: string | null;
  specifications?: Record<string, string>;
  is_active: boolean;
  is_new: boolean;
  is_featured: boolean;
  free_shipping: boolean;
  free_gift: boolean;
  primary_image?: string | null;
  default_variant?: ProductVariant;
  price_range?: {
    min: number;
    max: number;
    same: boolean;
  };
  discount?: {
    amount: number;
    percentage: number;
  };
  available_attributes?: AvailableAttribute[];
}

export interface ProductDetail extends Product {
  images: ProductImage[];
  variants: ProductVariant[];
  available_attributes: AvailableAttribute[];
  meta_title: string;
  meta_description: string;
  created_at: string;
  updated_at: string;
  promotions: Promotions;
}

export interface FreeGiftPromotion {
  description: string;
  expires_at: string;
}

export interface Promotions {
  free_shipping: any; // You can define a more specific type if you have its structure
  free_gift: FreeGiftPromotion | null;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  page_size: number;
  total_pages: number;
  current_page: number;
  results: T[];
}


export type DealImage = {
  id: number;
  image: string;
  alt_text: string;
  is_primary: boolean;
  order: number;
};


export type Deal = {
  id: number;
  title: string;
  deal_type: string;
  product_name: string;
  primary_image: DealImage | null;
  specification: Record<string, string>;
  all_images: DealImage[];
  discounted_price: string;
  original_price: string;
  badge_text: string;
  badge_color: string;
  free_gift: boolean;
  free_shipping: boolean;
  discount_percentage: number;
  time_remaining: {
    expired: boolean;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  status: string;
};


export interface RecentlyViewedProduct {
  id: number;           // The unique ID of the view record
  product: Product;     // The product data using your interface above
  viewed_at: string;    // ISO timestamp (e.g., "2025-12-26T08:50:58Z")
}

export interface ProductFilters {
  category?: string | string[];
  brand?: string | string[];
  color?: string | string[];
  memory?: string | string[];
  storage?: string | string[];
  min_price?: number;
  max_price?: number;
  rating?: number | number[];
  screen_size?: string;
  condition?: string | string[];
  in_stock?: boolean;
  on_sale?: boolean;
  is_bestseller?: boolean;
  search?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
}
