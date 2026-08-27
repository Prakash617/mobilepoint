import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  key: string;
  productId: number;
  variantId?: number;
  comboId?: number;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  maxStock: number;
}

export type AddCartItem = Omit<CartItem, "key" | "quantity"> & {
  quantity?: number;
};

interface CartState {
  items: CartItem[];
  addItem: (item: AddCartItem) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
}

const makeKey = (item: AddCartItem) => {
  if (item.comboId) return `combo-${item.comboId}`;
  return item.variantId ? `${item.productId}-${item.variantId}` : `${item.productId}`;
};

const clamp = (value: number, max: number) =>
  Math.min(Math.max(1, value), Math.max(1, max || 1));

export const selectTotalItems = (s: CartState) =>
  s.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectSubtotal = (s: CartState) =>
  s.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const key = makeKey(item);
          const qty = Math.max(1, Math.min(item.quantity ?? 1, item.maxStock));
          const existing = state.items.find((i) => i.key === key);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key
                  ? { ...i, quantity: Math.min(i.quantity + qty, i.maxStock) }
                  : i
              ),
            };
          }

          return {
            items: [...state.items, { ...item, key, quantity: qty }],
          };
        }),

      removeItem: (key) =>
        set((state) => ({
          items: state.items.filter((i) => i.key !== key),
        })),

      updateQuantity: (key, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: clamp(quantity, i.maxStock) } : i
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "mobilepoint_cart",
    }
  )
);
