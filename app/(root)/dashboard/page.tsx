"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaBox,
  FaShoppingBag,
  FaSignOutAlt,
  FaTruck,
  FaCheckCircle,
  FaHeart,
  FaRegHeart,
  FaTrash,
  FaCartPlus,
  FaCamera,
} from "react-icons/fa";
import { useAuthStore, selectIsAuthenticated } from "@/stores/authStore";
import {
  orderService,
  OrderDetailResult,
  OrderListResult,
  OrderQuery,
  OrderStatus,
  PaymentStatus,
} from "@/services/orderService";
import { authService } from "@/services/authService";
import { useRecentlyViewed, useWishlist, useWishlistMutations } from "@/hooks/useProducts";
import type { RecentlyViewedProduct } from "@/types/product";
import { WishlistItem } from "@/services/wishlistService";
import { resolveImageUrl } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";

type Tab = "overview" | "orders" | "wishlist" | "account";

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-indigo-100 text-indigo-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  refunded: "bg-gray-200 text-gray-700",
};

const PAYMENT_STYLES: Record<PaymentStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  refunded: "bg-gray-200 text-gray-700",
};

const fmtMoney = (v: string | number) =>
  "Rs. " + parseFloat(String(v)).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function DashboardPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const [tab, setTab] = useState<Tab>("overview");
  const [orders, setOrders] = useState<OrderListResult[]>([]);
  const [allOrders, setAllOrders] = useState<OrderListResult[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState("");

  // Order history filtering + pagination
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [page, setPage] = useState(1);
  const [orderCount, setOrderCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const { data: recentlyViewed } = useRecentlyViewed({ limit: 8 });
  const { data: wishlist } = useWishlist(isAuthenticated);
  const {
    removeWishlistItem,
    clearWishlist,
  } = useWishlistMutations();
  const addToCart = useCartStore((s) => s.addItem);

  const [selectedOrder, setSelectedOrder] = useState<OrderDetailResult | null>(
    null
  );
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Account form state
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [saveMsg, setSaveMsg] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);

  // Profile image upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [ready, setReady] = useState(false);

  const loadOrders = useCallback(async () => {
    setLoadingOrders(true);
    setOrdersError("");
    try {
      const params: OrderQuery = { ordering: "-created_at", page };
      if (statusFilter !== "all") params.order_status = statusFilter;
      const data = await orderService.getOrders(params);
      setOrders(data.results ?? []);
      setOrderCount(data.count ?? 0);
      setHasNext(!!data.next);
      setHasPrev(!!data.previous);
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response
        ?.status;
      if (status === 401) {
        clearAuth();
        router.replace("/login");
      } else {
        setOrdersError("Could not load your orders. Please try again.");
      }
    } finally {
      setLoadingOrders(false);
    }
  }, [clearAuth, router, page, statusFilter]);

  const loadAllOrders = useCallback(async () => {
    try {
      const data = await orderService.getOrders({ ordering: "-created_at" });
      setAllOrders(data.results ?? []);
    } catch {
      // overview stats are best-effort
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    setReady(true);
    if (user) {
      setProfile({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
      });
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    if (isAuthenticated) {
      setTab("overview");
      loadOrders();
      loadAllOrders();
    }
  }, [isAuthenticated, loadOrders, loadAllOrders]);

  const openOrder = async (id: number) => {
    setLoadingDetail(true);
    setSelectedOrder(null);
    try {
      const detail = await orderService.getOrder(id);
      setSelectedOrder(detail);
    } catch {
      setSelectedOrder({
        id,
        order_number: String(id),
        user: {
          id: user?.id ?? 0,
          username: "",
          email: user?.email ?? "",
          first_name: user?.first_name ?? "",
          last_name: user?.last_name ?? "",
        },
        order_status: "pending",
        payment_status: "pending",
        payment_method: "cod",
        payment_method_display: "Cash on Delivery",
        total: "0",
        items_count: 0,
        created_at: "",
        updated_at: "",
        subtotal: "0",
        tax: "0",
        shipping_cost: "0",
        discount: "0",
        payment_transaction_id: null,
        shipping_name: "",
        shipping_email: "",
        shipping_phone: "",
        shipping_address: "",
        shipping_city: "",
        shipping_state: "",
        shipping_zip: "",
        shipping_country: "",
        billing_name: "",
        billing_address: "",
        billing_city: "",
        billing_state: "",
        billing_zip: "",
        billing_country: "",
        notes: null,
        tracking_number: null,
        items: [],
        status_history: [],
      });
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch {
      // ignore
    }
    clearAuth();
    router.replace("/login");
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMsg("");
    setSaveError("");
    try {
      const me = await authService.getMe();
      setUser(me);
      setProfile({
        first_name: me.first_name || "",
        last_name: me.last_name || "",
        email: me.email || "",
      });
      setSaveMsg("Profile loaded from your account.");
    } catch {
      setSaveError("Could not load your profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const updated = await authService.uploadProfileImage(file);
      setUser(updated);
    } catch {
      // ignore upload errors silently
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (!ready || !isAuthenticated) {
    return (
      <div className="w-full mx-auto my-10 px-4 flex flex-col md:flex-row gap-6">
        <div className="md:w-64 shrink-0 h-[300px] bg-gray-100 animate-pulse rounded-2xl"></div>
        <div className="flex-1 min-w-0 h-[500px] bg-gray-100 animate-pulse rounded-2xl"></div>
      </div>
    );
  }

  const deliveredCount = allOrders.filter(
    (o) => o.order_status === "delivered"
  ).length;
  const inTransitCount = allOrders.filter(
    (o) =>
      ["confirmed", "processing", "shipped"].includes(o.order_status)
  ).length;

  const ordersCount = allOrders.length;

  return (
    <div className="w-full mx-auto my-10 px-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="md:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <div className="relative mx-auto w-20 h-20">
              <Image
                src={user?.profile_image ? resolveImageUrl(user.profile_image) : "/placeholder-avatar.svg"}
                alt="Profile"
                fill
                className="rounded-full object-cover"
                unoptimized
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="absolute bottom-0 right-0 bg-[#0073bc] text-white p-1.5 rounded-full shadow-md hover:brightness-90 transition-colors disabled:opacity-50"
              >
                <FaCamera className="text-xs" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            {uploadingImage && (
              <p className="text-xs text-[#0073bc] mt-2 font-semibold">Uploading...</p>
            )}
            <h2 className="mt-3 font-bold text-gray-900 capitalize">
              {user?.first_name || "User"} {user?.last_name || ""}
            </h2>
            <p className="text-sm text-gray-500 break-all">{user?.email}</p>
          </div>

          <nav className="mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-3 space-y-1">
            {(
              [
                { key: "overview", label: "Dashboard", icon: FaShoppingBag },
                { key: "orders", label: "My Orders", icon: FaBox },
                { key: "wishlist", label: "Wishlist", icon: FaHeart },
                { key: "account", label: "Account Details", icon: FaBox },
              ] as { key: Tab; label: string; icon: typeof FaBox }[]
            ).map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-left transition-colors ${
                  tab === item.key
                    ? "bg-[#0073bc]/10 text-[#0073bc]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="text-lg" />
                {item.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-left text-red-500 hover:bg-red-50"
            >
              <FaSignOutAlt className="text-lg" />
              Logout
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {tab === "overview" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.first_name || "there"}!
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <FaShoppingBag className="text-3xl text-[#0073bc] mb-3" />
                  <p className="text-2xl font-extrabold">{ordersCount}</p>
                  <p className="text-sm text-gray-500">Total Orders</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <FaTruck className="text-3xl text-purple-500 mb-3" />
                  <p className="text-2xl font-extrabold">{inTransitCount}</p>
                  <p className="text-sm text-gray-500">In Transit</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <FaCheckCircle className="text-3xl text-green-500 mb-3" />
                  <p className="text-2xl font-extrabold">{deliveredCount}</p>
                  <p className="text-sm text-gray-500">Delivered</p>
                </div>
                <button
                  onClick={() => setTab("wishlist")}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-left hover:border-[#0073bc]/40 transition-colors"
                >
                  <FaHeart className="text-3xl text-[#F1352B] mb-3" />
                  <p className="text-2xl font-extrabold">
                    {wishlist?.items_count ?? 0}
                  </p>
                  <p className="text-sm text-gray-500">Wishlist</p>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900">Recent Orders</h2>
                  <button
                    onClick={() => setTab("orders")}
                    className="text-sm text-[#0073bc] font-semibold hover:underline"
                  >
                    View all
                  </button>
                </div>
                {loadingOrders ? (
                  <div className="p-6 space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="h-12 w-full bg-gray-100 animate-pulse rounded-lg"></div>
                    ))}
                  </div>
                ) : allOrders.length === 0 ? (
                  <div className="p-10 text-center">
                    <p className="text-gray-500 mb-4">You have no orders yet.</p>
                    <Link
                      href="/products"
                      className="inline-block bg-[#0073bc] text-white font-semibold px-6 py-2.5 rounded-lg hover:brightness-90"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <OrderTable
                    orders={allOrders.slice(0, 5)}
                    onOpen={openOrder}
                  />
                )}
              </div>

              {/* Recently viewed */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-gray-900">Recently Viewed</h2>
                  <Link
                    href="/products"
                    className="text-sm text-[#0073bc] font-semibold hover:underline"
                  >
                    Browse products
                  </Link>
                </div>
                {!recentlyViewed || recentlyViewed.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Products you view will appear here.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {recentlyViewed.map((rv: RecentlyViewedProduct) => (
                      <Link
                        key={rv.id}
                        href={`/products/${rv.product.slug}`}
                        className="group"
                      >
                        <div className="aspect-square bg-[#f8f9fc] rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center p-2 group-hover:border-primary transition-colors">
                          <Image
                            src={resolveImageUrl(rv.product.primary_image)}
                            alt={rv.product.name}
                            width={120}
                            height={120}
                            className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <p className="mt-2 text-xs font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-primary">
                          {rv.product.name}
                        </p>
                        <p className="text-sm font-bold text-[#0073bc] mt-0.5">
                          Rs.{" "}
                          {parseFloat(
                            rv.product.base_price || "0"
                          ).toLocaleString()}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === "orders" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h1 className="text-xl font-bold text-gray-900">My Orders</h1>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value as OrderStatus | "all");
                    setPage(1);
                  }}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0073bc]/30"
                >
                  <option value="all">All statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
              {loadingOrders ? (
                <div className="p-8 space-y-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-12 w-full bg-gray-100 animate-pulse rounded-lg"></div>
                  ))}
                </div>
              ) : ordersError ? (
                <p className="p-8 text-center text-red-600">{ordersError}</p>
              ) : orders.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-gray-500 mb-4">
                    {statusFilter === "all"
                      ? "You haven't placed any orders yet."
                      : "No orders match this status."}
                  </p>
                  <Link
                    href="/products"
                    className="inline-block bg-[#0073bc] text-white font-semibold px-6 py-2.5 rounded-lg hover:brightness-90"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <>
                  <OrderTable orders={orders} onOpen={openOrder} />
                  {(hasNext || hasPrev) && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        {orderCount} order{orderCount !== 1 ? "s" : ""}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={!hasPrev}
                          className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                        >
                          Prev
                        </button>
                        <button
                          onClick={() => setPage((p) => p + 1)}
                          disabled={!hasNext}
                          className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {tab === "wishlist" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h1 className="text-xl font-bold text-gray-900">My Wishlist</h1>
                {wishlist && wishlist.items_count > 0 && (
                  <button
                    onClick={() => clearWishlist.mutate()}
                    disabled={clearWishlist.isPending}
                    className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    <FaTrash className="text-xs" />
                    Clear all
                  </button>
                )}
              </div>

              {!wishlist ? (
                <div className="p-8 space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-24 w-full bg-gray-100 animate-pulse rounded-xl"
                    ></div>
                  ))}
                </div>
              ) : wishlist.items.length === 0 ? (
                <div className="p-12 text-center">
                  <FaRegHeart className="mx-auto text-5xl text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-4">
                    You haven&apos;t added anything to your wishlist yet.
                  </p>
                  <Link
                    href="/products"
                    className="inline-block bg-[#0073bc] text-white font-semibold px-6 py-2.5 rounded-lg hover:brightness-90"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {wishlist.items.map((item) => (
                    <WishlistRow
                      key={item.id}
                      item={item}
                      onRemove={() => removeWishlistItem.mutate(item.id)}
                      onMoveToCart={() => {
                        const target = wishlistTarget(item);
                        addToCart({
                          productId: target.product_id,
                          variantId: item.product_variant?.id,
                          slug: target.product_slug,
                          name: target.product_name,
                          image: target.image || "",
                          price: parseFloat(target.price),
                          maxStock: Math.max(1, target.stock || 1),
                        });
                        removeWishlistItem.mutate(item.id);
                      }}
                    />
                  ))}
                </ul>
              )}
            </div>
          )}

          {tab === "account" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 max-w-2xl">
              <h1 className="text-xl font-bold text-gray-900 mb-6">
                Account Details
              </h1>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                      First Name
                    </label>
                    <input
                      value={profile.first_name}
                      onChange={(e) =>
                        setProfile((p) => ({
                          ...p,
                          first_name: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0073bc]/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                      Last Name
                    </label>
                    <input
                      value={profile.last_name}
                      onChange={(e) =>
                        setProfile((p) => ({
                          ...p,
                          last_name: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0073bc]/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, email: e.target.value }))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0073bc]/30"
                  />
                </div>

                {saveMsg && (
                  <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
                    {saveMsg}
                  </p>
                )}
                {saveError && (
                  <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
                    {saveError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#0073bc] hover:brightness-90 text-white font-semibold px-6 py-2.5 rounded-lg disabled:opacity-50"
                >
                  {saving ? "Loading..." : "Update Details"}
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Order detail modal */}
      {(selectedOrder || loadingDetail) && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {loadingDetail ? (
              <div className="space-y-4 p-4">
                <div className="h-8 w-1/3 bg-gray-100 animate-pulse rounded"></div>
                <div className="h-4 w-1/4 bg-gray-100 animate-pulse rounded mb-8"></div>
                <div className="h-24 w-full bg-gray-100 animate-pulse rounded-xl"></div>
                <div className="h-24 w-full bg-gray-100 animate-pulse rounded-xl"></div>
              </div>
            ) : selectedOrder ? (
              <OrderDetailView
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

const wishlistTarget = (item: WishlistItem) =>
  item.product_variant ?? item.product!;

function WishlistRow({
  item,
  onRemove,
  onMoveToCart,
}: {
  item: WishlistItem;
  onRemove: () => void;
  onMoveToCart: () => void;
}) {
  const target = wishlistTarget(item);
  const isPriceDropped = item.is_price_dropped;
  const dropAmount = Math.abs(item.price_difference);

  return (
    <li className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-4">
      <Link
        href={`/products/${target.product_slug}`}
        className="w-16 h-16 shrink-0 bg-[#f8f9fc] rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center p-1.5"
      >
        <Image
          src={resolveImageUrl(target.image)}
          alt={target.product_name}
          width={56}
          height={56}
          className="object-contain mix-blend-multiply"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${target.product_slug}`}
          className="text-sm font-semibold text-gray-800 line-clamp-1 hover:text-[#0073bc] transition-colors"
        >
          {target.name}
        </Link>
        <p className="text-xs text-gray-500 mt-0.5">
          Added {item.added_at ? fmtDate(item.added_at) : "—"}
        </p>
        {isPriceDropped && dropAmount > 0 && (
          <p className="text-xs font-semibold text-green-600 mt-0.5">
            Price dropped by {fmtMoney(dropAmount)}!
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-base font-bold text-[#0073bc]">
            {fmtMoney(target.price)}
          </p>
          <span
            className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
              target.stock > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {target.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <button
          onClick={onMoveToCart}
          disabled={target.stock <= 0}
          className="flex items-center gap-2 bg-[#0073bc] hover:brightness-90 text-white text-sm font-semibold px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaCartPlus className="text-xs" />
          <span className="hidden sm:inline">Add to Cart</span>
        </button>

        <button
          onClick={onRemove}
          aria-label="Remove from wishlist"
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
}

function OrderTable({
  orders,
  onOpen,
}: {
  orders: OrderListResult[];
  onOpen: (id: number) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-gray-500 bg-gray-50">
            <th className="px-6 py-3 font-semibold">Order</th>
            <th className="px-6 py-3 font-semibold">Date</th>
            <th className="px-6 py-3 font-semibold">Status</th>
            <th className="px-6 py-3 font-semibold">Payment</th>
            <th className="px-6 py-3 font-semibold text-right">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((o) => (
            <tr
              key={o.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onOpen(o.id)}
            >
              <td className="px-6 py-3.5 font-semibold text-[#0073bc]">
                {o.order_number}
              </td>
              <td className="px-6 py-3.5 text-gray-600">
                {o.created_at ? fmtDate(o.created_at) : "—"}
              </td>
              <td className="px-6 py-3.5">
                <span
                  className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                    STATUS_STYLES[o.order_status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {o.order_status}
                </span>
              </td>
              <td className="px-6 py-3.5">
                <span
                  className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                    PAYMENT_STYLES[o.payment_status] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {o.payment_status}
                </span>
              </td>
              <td className="px-6 py-3.5 text-right font-semibold">
                {fmtMoney(o.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OrderDetailView({
  order,
  onClose,
}: {
  order: OrderDetailResult;
  onClose: () => void;
}) {
  const [showAddress, setShowAddress] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">
          Order {order.order_number}
        </h2>
        <span
          className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
            STATUS_STYLES[order.order_status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {order.order_status}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Placed on {order.created_at ? fmtDate(order.created_at) : "—"} ·{" "}
        {order.payment_method_display}
      </p>

      {order.items.length > 0 ? (
        <ul className="divide-y divide-gray-100 border rounded-xl mb-4">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center gap-4 p-3">
              <div className="w-14 h-14 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src={resolveImageUrl("")}
                  alt=""
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {item.product_name}
                </p>
                <p className="text-xs text-gray-500">
                  Qty {item.quantity}
                  {item.variant_name ? ` · ${item.variant_name}` : ""}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">
                  {fmtMoney(item.subtotal)}
                </p>
                {item.discount_percent > 0 && (
                  <p className="text-xs text-[#F1352B]">
                    {item.discount_percent}% off
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 mb-4">No items.</p>
      )}

      <div className="space-y-1.5 text-sm mb-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{fmtMoney(order.subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Discount</span>
          <span>-{fmtMoney(order.discount)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{fmtMoney(order.shipping_cost)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>{fmtMoney(order.tax)}</span>
        </div>
        <div className="flex justify-between font-bold text-gray-900 pt-2 border-t">
          <span>Total</span>
          <span>{fmtMoney(order.total)}</span>
        </div>
      </div>

      {order.tracking_number && (
        <p className="text-sm text-gray-600 mb-2">
          Tracking: <span className="font-semibold">{order.tracking_number}</span>
        </p>
      )}

      <button
        onClick={() => setShowAddress((s) => !s)}
        className="text-sm text-[#0073bc] font-semibold hover:underline"
      >
        {showAddress ? "Hide" : "Show"} shipping & billing address
      </button>

      {showAddress && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="font-semibold text-gray-800 mb-1">Shipping</p>
            <p className="text-gray-600">
              {order.shipping_name}
              <br />
              {order.shipping_address}
              <br />
              {[order.shipping_city, order.shipping_state, order.shipping_zip]
                .filter(Boolean)
                .join(", ")}
              <br />
              {order.shipping_country}
              {order.shipping_phone && (
                <>
                  <br />
                  {order.shipping_phone}
                </>
              )}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="font-semibold text-gray-800 mb-1">Billing</p>
            <p className="text-gray-600">
              {order.billing_name}
              <br />
              {order.billing_address}
              <br />
              {[order.billing_city, order.billing_state, order.billing_zip]
                .filter(Boolean)
                .join(", ")}
              <br />
              {order.billing_country}
            </p>
          </div>
        </div>
      )}

      <div className="mt-5 flex justify-end">
        <button
          onClick={onClose}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}