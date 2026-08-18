import { api } from "@/lib/api";

export interface WishlistVariant {
  id: number;
  name: string;
  sku: string | null;
  price: string;
  stock: number;
  product_name: string;
  product_id: number;
  product_slug: string;
  image: string | null;
}

export interface WishlistProduct {
  id: number;
  name: string;
  sku: string | null;
  price: string;
  stock: number;
  product_name: string;
  product_id: number;
  product_slug: string;
  image: string | null;
}

export interface WishlistItem {
  id: number;
  product: WishlistProduct | null;
  product_variant: WishlistVariant | null;
  added_at: string;
  notes: string | null;
  price_when_added: string;
  current_price: string | number;
  price_difference: number;
  is_price_dropped: boolean;
  is_in_stock: boolean;
  notify_on_price_drop: boolean;
  notify_on_stock: boolean;
}

export interface Wishlist {
  id: number;
  user: string;
  items: WishlistItem[];
  items_count: number;
  created_at: string;
  updated_at: string;
}

export interface PaginatedWishlistItems {
  count: number;
  next: string | null;
  previous: string | null;
  results: WishlistItem[];
}

export const wishlistService = {
  getWishlist: async () => {
    const { data } = await api.get<Wishlist>("/wishlist/");
    return data;
  },

  getWishlistItems: async () => {
    const { data } = await api.get<PaginatedWishlistItems>("/wishlist-items/");
    return data;
  },

  addItem: async (productVariantId?: number, productId?: number) => {
    const { data } = await api.post<WishlistItem>("/wishlist-items/", {
      ...(productVariantId ? { product_variant: productVariantId } : {}),
      ...(productId ? { product: productId } : {}),
    });
    return data;
  },

  removeItem: async (id: number) => {
    const { data } = await api.delete<{ message: string }>(
      `/wishlist-items/${id}/`
    );
    return data;
  },

  clearWishlist: async () => {
    const { data } = await api.delete<{
      message: string;
      items_deleted: number;
    }>("/wishlist/clear/");
    return data;
  },

  moveToCart: async (id: number) => {
    const { data } = await api.post<{
      message: string;
      product_variant_id?: number;
      product_id?: number;
    }>(`/wishlist-items/${id}/move_to_cart/`);
    return data;
  },
};