import { api, guestApi } from "@/lib/api";
import { CartItem } from "@/stores/cartStore";

export type PaymentMethod =
  | "cod"
  | "khalti"
  | "esewa"
  | "bank_transfer";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded";

export interface OrderUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface ShippingInfo {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  notes?: string;
}

export interface OrderItemRequest {
  product?: number;
  product_variant?: number;
  deal?: number;
  combo?: number;
  quantity: number;
}

export interface OrderCreateRequest {
  items: OrderItemRequest[];
  payment_method: PaymentMethod;
  payment_transaction_id?: string;
  shipping_name?: string;
  shipping_email?: string;
  shipping_phone?: string;
  shipping_address?: string;
  shipping_city?: string;
  shipping_state?: string;
  shipping_zip?: string;
  shipping_country?: string;
  billing_name?: string;
  billing_address?: string;
  billing_city?: string;
  billing_state?: string;
  billing_zip?: string;
  billing_country?: string;
  notes?: string;
}

export interface OrderItemResult {
  id: number;
  product: number | null;
  product_variant: number | null;
  product_name: string;
  variant_name: string | null;
  quantity: number;
  original_price: string;
  price: string;
  discount_percent: number;
  deal: number | null;
  deal_title: string | null;
  deal_type: string | null;
  combo: number | null;
  combo_name: string | null;
  is_combo_parent: boolean;
  subtotal: string;
}

export interface OrderListResult {
  id: number;
  order_number: string;
  user: OrderUser;
  order_status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  payment_method_display: string;
  total: string;
  items_count: number;
  created_at: string;
  updated_at: string;
}

export interface OrderStatusHistoryResult {
  id: number;
  status: string;
  notes: string | null;
  created_by: number | null;
  created_by_name: string;
  created_at: string;
}

export interface OrderDetailResult extends OrderListResult {
  subtotal: string;
  tax: string;
  shipping_cost: string;
  discount: string;
  payment_transaction_id: string | null;
  shipping_name: string;
  shipping_email: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  shipping_country: string;
  billing_name: string;
  billing_address: string;
  billing_city: string;
  billing_state: string;
  billing_zip: string;
  billing_country: string;
  notes: string | null;
  tracking_number: string | null;
  items: OrderItemResult[];
  status_history: OrderStatusHistoryResult[];
}

export interface PaginatedOrders {
  count: number;
  next: string | null;
  previous: string | null;
  results: OrderListResult[];
}

export interface OrderQuery {
  page?: number;
  order_status?: OrderStatus;
  payment_status?: PaymentStatus;
  search?: string;
  ordering?: string;
}

export interface CheckoutQuoteItemRequest {
  product_id?: number;
  variant_id?: number;
  quantity: number;
}

export interface CheckoutQuoteRequest {
  items: CheckoutQuoteItemRequest[];
  shipping_address?: Record<string, string>;
}

export interface CheckoutQuoteShipmentItem {
  product_id: number;
  name: string;
  variant_name: string | null;
  quantity: number;
}

export interface CheckoutQuoteShipment {
  id: string;
  shipping_class: string;
  label: string;
  items: CheckoutQuoteShipmentItem[];
  shipping_cost: string;
  is_free: boolean;
  estimated_delivery: string;
}

export interface CheckoutQuote {
  currency: string;
  subtotal: string;
  discount: string;
  shipping: string;
  shipping_discount: string;
  tax: string;
  total: string;
  free_shipping_threshold: string | null;
  free_shipping_threshold_met: boolean;
  amount_to_free_shipping: string | null;
  shipments: CheckoutQuoteShipment[];
}

export const orderService = {
  createOrder: async (payload: OrderCreateRequest) => {
    const { data } = await api.post<OrderDetailResult>("/orders/", payload);
    return data;
  },

  createGuestOrder: async (payload: OrderCreateRequest) => {
    const { data } = await guestApi.post<OrderDetailResult>("/orders/guest/", payload);
    return data;
  },

  getOrders: async (params: OrderQuery = {}) => {
    const { data } = await api.get<PaginatedOrders>("/orders/", { params });
    return data;
  },

  getOrder: async (id: number) => {
    const { data } = await api.get<OrderDetailResult>(`/orders/${id}/`);
    return data;
  },

  updateOrder: async (
    id: number,
    payload: Partial<OrderCreateRequest>
  ) => {
    const { data } = await api.patch<OrderDetailResult>(
      `/orders/${id}/`,
      payload
    );
    return data;
  },

  buildItems: (items: CartItem[]): OrderItemRequest[] =>
    items.map((item) => ({
      ...(item.comboId
        ? { combo: item.comboId }
        : item.variantId
        ? { product_variant: item.variantId }
        : { product: item.productId }),
      quantity: item.quantity,
    })),

  getQuote: async (payload: CheckoutQuoteRequest): Promise<CheckoutQuote> => {
    const { data } = await guestApi.post<CheckoutQuote>(
      "/orders/checkout/quote/",
      payload
    );
    return data;
  },
};