export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
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
  image: string | null;
  alt_text: string;
  is_primary: boolean;
  order: number;
}

export interface VariantAttributeValue {
  id: number;
  attribute_name: string;
  attribute_display_name: string;
  value: string | null;
  color_code: string | null;
  image?: string | null;
}

export interface ProductVariant {
  id: number;
  price: string;
  stock_quantity: number;
  sold_quantity: number;
  is_in_stock: boolean;
  is_low_stock: boolean;
  is_default: boolean;
  variant_attributes: VariantAttributeValue[];
  images: ProductImage[];
}

export interface AvailableAttributeValue {
  id: number;
  value: string;
  color_code: string | null;
  image?: string | null;
}

export interface AvailableAttribute {
  name: string;
  display_name: string;
  values: AvailableAttributeValue[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  short_description: string | null;
  description: string;
  category: Category;
  brand: Brand;
  base_price?: string | null;
  stock_quantity: number;
  sold_quantity: number;
  low_stock_threshold: number;
  is_in_stock: boolean;
  is_low_stock: boolean;
  is_active: boolean;
  is_featured: boolean;
  free_shipping: boolean;
  free_gift: boolean;
  is_new: boolean;
  shipping_class?: string;
  shipping_class_info?: {
    code: string;
    label: string;
    cost: string;
    is_free: boolean;
    estimated_delivery: string;
  } | null;
  primary_image?: string | null;
  default_variant?: ProductVariant | null;
  variants?: ProductVariant[];
  price_range?: {
    min: number;
    max: number;
    same: boolean;
  } | null;
  discount?: {
    amount: number;
    percentage: number;
  } | null;
  has_combo?: boolean;
  has_deal?: boolean;
}

export interface FreeGiftPromotion {
  title?: string;
  description: string;
  expires_at: string;
}

export interface Promotions {
  free_gift: FreeGiftPromotion | null;
}

export interface ProductDetail extends Product {
  short_description: string;
  images: ProductImage[];
  variants: ProductVariant[];
  available_attributes: AvailableAttribute[];
  specifications: string | null;
  meta_title: string;
  meta_description: string;
  promotions: Promotions;
  deals?: Record<string, unknown>[];
  combos?: Record<string, unknown>[];
  created_at: string;
  updated_at: string;
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
  image: string | null;
  alt_text: string;
  is_primary: boolean;
  order: number;
};

export type Deal = {
  id: number;
  title: string;
  deal_type: string;
  product_id?: number;
  product_name: string;
  product_slug: string;
  brand_name: string;
  base_price?: string | number;
  selling_price?: string | number;
  discount_percent: number;
  start_at: string;
  end_at: string;
  is_active: boolean;
  is_featured: boolean;
  display_order: number;
  primary_image: DealImage | null;
  total_quantity: number;
  sold_quantity: number;
  remaining_quantity: number;
  progress_percentage: number;
  free_shipping?: boolean;
  free_gift_text?: string;
};

export interface ProductComboItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface ProductCombo {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string | null;
  main_product?: Product;
  combo_regular_price: string | number;
  combo_selling_price: string | number;
  is_active: boolean;
  is_featured: boolean;
  items: ProductComboItem[];
  created_at: string;
  updated_at: string;
}

export interface RecentlyViewedProduct {
  id: number;
  product: Product;
  viewed_at: string;
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
  is_combo?: boolean;
  is_deal?: boolean;
  is_featured?: boolean;
  search?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
}
