import { useEffect, useRef, useState } from "react";
import { orderService, CheckoutQuote } from "@/services/orderService";
import { CartItem } from "@/stores/cartStore";

interface UseCheckoutQuoteResult {
  quote: CheckoutQuote | null;
  loading: boolean;
  error: string | null;
}

/**
 * Fetch a checkout quote from the backend whenever the cart or shipping
 * address changes. All money/shipping values come from the server; the
 * frontend never calculates them.
 *
 * Requests are debounced so rapidly changing quantities or typing an address
 * do not trigger a storm of API calls. In-flight requests are cancelled.
 */
export function useCheckoutQuote(
  items: CartItem[],
  address?: Record<string, string>
): UseCheckoutQuoteResult {
  const [quote, setQuote] = useState<CheckoutQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stable serialization of the inputs for the dependency array.
  const itemsKey = items
    .map((i) => `${i.productId}:${i.variantId ?? 0}:${i.comboId ?? 0}:${i.quantity}`)
    .join("|");
  const addressKey = address ? JSON.stringify(address) : "";

  const latest = useRef(0);

  useEffect(() => {
    if (!items.length) {
      setQuote(null);
      setError(null);
      setLoading(false);
      return;
    }

    const callId = ++latest.current;
    setLoading(true);
    setError(null);

    const handle = setTimeout(async () => {
      try {
        const result = await orderService.getQuote({
          items: items.map((i) => ({
            ...(i.comboId 
                ? { combo_id: i.comboId }
                : i.variantId 
                ? { variant_id: i.variantId } 
                : { product_id: i.productId }),
            quantity: i.quantity,
          })),
          ...(address ? { shipping_address: address } : {}),
        });
        if (callId === latest.current) {
          setQuote(result);
        }
      } catch {
        if (callId === latest.current) {
          setError(
            "We couldn't update your delivery cost. Please try again."
          );
        }
      } finally {
        if (callId === latest.current) {
          setLoading(false);
        }
      }
    }, 300);

    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey, addressKey]);

  return { quote, loading, error };
}
