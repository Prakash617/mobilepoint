import { FaTruck } from "react-icons/fa";
import { CheckoutQuoteShipment } from "@/services/orderService";

interface ShipmentSummaryProps {
  shipments?: CheckoutQuoteShipment[] | null;
  loading?: boolean;
  error?: string | null;
  compact?: boolean;
}

function money(value: string | number): string {
  return `Rs. ${Number(value).toLocaleString()}`;
}

/**
 * Display the backend-computed shipments. Never shows internal shipping class
 * codes (e.g. "standard") to the customer - only friendly labels like
 * "Standard Delivery" / "Free Shipping" and "Free delivery".
 */
export default function ShipmentSummary({
  shipments,
  loading,
  error,
  compact,
}: ShipmentSummaryProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
        <FaTruck className="text-gray-400" />
        Calculating delivery...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (!shipments || shipments.length === 0) return null;

  return (
    <div className="space-y-3">
      {shipments.map((s) => (
        <div
          key={s.id}
          className="rounded-xl border border-gray-200 bg-white p-4"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <FaTruck
                className={s.is_free ? "text-emerald-500" : "text-[#0073bc]"}
              />
              <span className="text-sm font-semibold text-gray-800 truncate">
                {s.label}
              </span>
              {s.is_free && (
                <span className="text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded">
                  Free
                </span>
              )}
            </div>
            <span
              className={`text-sm font-bold shrink-0 ${
                s.is_free ? "text-emerald-600" : "text-gray-900"
              }`}
            >
              {s.is_free ? "Free delivery" : money(s.shipping_cost)}
            </span>
          </div>

          {!compact && (
            <ul className="mt-2 space-y-1">
              {s.items.map((item, idx) => (
                <li
                  key={`${item.product_id}-${idx}`}
                  className="text-sm text-gray-600 flex justify-between gap-2"
                >
                  <span className="truncate">
                    {item.name}
                    {item.variant_name ? ` (${item.variant_name})` : ""}
                  </span>
                  <span className="shrink-0 text-gray-400">
                    ×{item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-2 text-xs text-gray-400">
            Arrives in {s.estimated_delivery}
          </p>
        </div>
      ))}
    </div>
  );
}
