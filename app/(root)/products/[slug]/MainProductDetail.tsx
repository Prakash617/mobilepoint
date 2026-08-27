"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useState, useMemo, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import FreeAdvertizemantCard from "@/components/FreeAdvertizemantCard";
import Longtextmore from "@/app/(root)/products/[slug]/Longtextmore";
import ComboSection from "./ComboSection";
import FrequantlyBrout from "./FrequantlyBrout";
import Image from "next/image";
import { resolveImageUrl } from "@/lib/utils";
import Button from "@/components/Button";
import {
  FaCheckCircle,
  FaFacebookF,
  FaHeart,
  FaInstagram,
  FaPinterest,
  FaRegHeart,
  FaShippingFast,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import {
  AvailableAttribute,
  Deal,
  ProductDetail,
  ProductImage,
  ProductVariant,
  VariantAttributeValue,
} from "@/types/product";
import Review from "@/components/Review";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "next/navigation";
import { useDeals, useWishlist, useWishlistMutations } from "@/hooks/useProducts";
import { useAuthStore, selectIsAuthenticated } from "@/stores/authStore";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { recentlyViewedService } from "@/services/productService";
import { toast } from "sonner";

type Props = {
  product: ProductDetail;
};

const MainProductDetail = ({ product }: Props) => {
  const { data: siteSettings } = useSiteSettings();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  // State for selected variant attributes
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >(() => {
    const defaults: Record<string, string> = {};
    product.available_attributes?.forEach((attr: AvailableAttribute) => {
      const defaultVariant = product.variants.find(
        (v: ProductVariant) => v.is_default
      );
      if (defaultVariant) {
        const attrValue = defaultVariant.variant_attributes.find(
          (a: VariantAttributeValue) => a.attribute_name === attr.name
        );
        if (attrValue) {
          defaults[attr.name] = attrValue.value ?? "";
        }
      }
    });
    return defaults;
  });

  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [zoomState, setZoomState] = useState({ x: 50, y: 50, isHovering: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomState({ x, y, isHovering: true });
  };

  const handleMouseLeave = () => {
    setZoomState((prev) => ({ ...prev, isHovering: false }));
  };

  // Track recently viewed
  const queryClient = useQueryClient();
  useEffect(() => {
    if (isAuthenticated) {
      recentlyViewedService.track(product.slug).then(() => {
        queryClient.invalidateQueries({ queryKey: ["recently-viewed"] });
      }).catch(() => {});
    }
  }, [product.slug, queryClient, isAuthenticated]);

  // Find the currently selected variant based on selected attributes
  const selectedVariant: ProductVariant | undefined = useMemo(() => {
    return (
      product.variants.find((variant: ProductVariant) => {
        return Object.entries(selectedAttributes).every(
          ([attrName, attrValue]) => {
            return variant.variant_attributes.some(
              (a: VariantAttributeValue) =>
                a.attribute_name === attrName && a.value === attrValue
            );
          }
        );
      }) || product.variants[0]
    );
  }, [selectedAttributes, product.variants]);

  // Get images for display (variant images if available, otherwise product images)
  const displayImages: ProductImage[] =
    selectedVariant && selectedVariant.images.length > 0
      ? selectedVariant.images
      : product.images;

  const currentImage = displayImages[currentImageIndex] || displayImages[0];

  // Handle attribute selection
  const handleAttributeChange = (attrName: string, value: string) => {
    setSelectedAttributes((prev) => {
      const newAttrs = { ...prev, [attrName]: value };

      // Check if this new combination is valid
      const isValidCombination = product.variants.some(
        (variant: ProductVariant) => {
          return Object.entries(newAttrs).every(([key, val]) =>
            variant.variant_attributes.some(
              (a: VariantAttributeValue) => a.attribute_name === key && a.value === val
            )
          );
        }
      );

      // If it's not valid, we need to find the best alternative.
      if (!isValidCombination) {
        // Find the first variant that matches the attribute we just changed.
        const newVariant = product.variants.find((variant: ProductVariant) =>
          variant.variant_attributes.some(
            (a: VariantAttributeValue) =>
              a.attribute_name === attrName && a.value === value
          )
        );
        if (newVariant) {
          // And update the whole attributes state based on this new variant
          const newVariantAttributes: Record<string, string> = {};
          newVariant.variant_attributes.forEach((attr: VariantAttributeValue) => {
            newVariantAttributes[attr.attribute_name] = attr.value ?? "";
          });
          return newVariantAttributes;
        }
      }

      return newAttrs; // It was a valid combination, so just update it.
    });
  };

  // Handle quantity change
  const incrementQuantity = () => {
    const stock = product.stock_quantity;
    if (quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const price =
    selectedVariant?.price ?? product.base_price ?? "0";

  // Find an active deal for this product (by slug)
  const { data: dealsData } = useDeals();
  const productDeal = useMemo(
    () =>
      (dealsData?.results ?? []).find(
        (d: Deal) =>
          d.product_slug === product.slug && (d.discount_percent ?? 0) > 0
      ),
    [dealsData, product.slug]
  );
  const discountPercent = productDeal?.discount_percent ?? 0;
  const dealPrice =
    discountPercent > 0 && parseFloat(price) > 0
      ? parseFloat(price) * (1 - discountPercent / 100)
      : null;

  const totalPrice = (
    (dealPrice ?? parseFloat(price)) * quantity
  ).toFixed(2);

  // Live countdown for the deal of the day
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const dealEndTime = useMemo(() => {
    if (!productDeal?.end_at) return 0;
    const end = new Date(productDeal.end_at).getTime();
    if (end > now) return end;
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay.getTime();
  }, [productDeal, now]);

  const dealRemaining = Math.max(0, Math.floor((dealEndTime - now) / 1000));
  const dealClock = `${String(Math.floor(dealRemaining / 3600)).padStart(2, "0")}:${String(
    Math.floor((dealRemaining % 3600) / 60)
  ).padStart(2, "0")}:${String(dealRemaining % 60).padStart(2, "0")}`;

  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const { data: wishlist } = useWishlist(isAuthenticated);
  const { addWishlistItem, removeWishlistItem } = useWishlistMutations();

  const wishlistItem = useMemo(
    () =>
      selectedVariant?.id
        ? (wishlist?.items ?? []).find(
            (wi) => wi.product_variant?.id === selectedVariant.id
          )
        : (wishlist?.items ?? []).find(
            (wi) => !wi.product_variant && wi.product?.product_id === product.id
          ),
    [wishlist, selectedVariant, product.id]
  );

  const handleToggleWishlist = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    if (wishlistItem) {
      removeWishlistItem.mutate(wishlistItem.id, {
        onSuccess: () => toast.success("Removed from wishlist"),
      });
    } else if (selectedVariant?.id) {
      addWishlistItem.mutate({ productVariantId: selectedVariant.id }, {
        onSuccess: () => toast.success("Added to wishlist"),
      });
    } else {
      addWishlistItem.mutate({ productId: product.id }, {
        onSuccess: () => toast.success("Added to wishlist"),
      });
    }
  };

  const currentStock = product.stock_quantity;
  const isAvailable = currentStock > 0 && product.is_in_stock;

  // Ensure quantity does not exceed the stock of the newly selected variant
  useEffect(() => {
    if (quantity > currentStock && currentStock > 0) {
      setQuantity(currentStock);
    }
  }, [currentStock, quantity]);

  const handleAddToCart = () => {
    if (!isAvailable) return;
    addItem({
      productId: product.id,
      variantId: selectedVariant?.id,
      slug: product.slug,
      name: product.name,
      image: currentImage?.image ?? product.primary_image ?? "",
      price: dealPrice ?? (parseFloat(price) || 0),
      quantity,
      maxStock: currentStock,
    });
    toast.success("Added to cart", {
      description: `${product.name} × ${quantity}`,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/addtocart");
  };

  return (
    <>
      <div className="sm:w-full w-full my-2 mx-auto p-4 bg-white rounded-xl">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT SIDE – PRODUCT IMAGES */}
          <div className="lg:col-span-4 rounded-xl p-4">
            <div 
              className="w-full md:h-[500px] h-[350px] p-6 flex justify-center items-center overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm relative group cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative w-full h-full">
                <Image
                  src={resolveImageUrl(currentImage?.image)}
                  alt={currentImage?.alt_text || product.name}
                  fill
                  className="object-contain transition-transform duration-200"
                  style={{
                    transformOrigin: zoomState.isHovering ? `${zoomState.x}% ${zoomState.y}%` : 'center',
                    transform: zoomState.isHovering ? 'scale(2)' : 'scale(1)',
                  }}
                />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
              {displayImages.map((img: ProductImage, index: number) => (
                <div
                  key={img.id}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`min-w-[80px] h-20 relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 border-2 ${
                    index === currentImageIndex
                      ? "border-black shadow-md opacity-100 ring-1 ring-black"
                      : "border-transparent bg-gray-50 opacity-60 hover:opacity-100 hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={resolveImageUrl(img.image)}
                    alt={img.alt_text || `Thumbnail ${index + 1}`}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* MIDDLE COLUMN - PRODUCT INFO */}
          <div className="lg:col-span-5 bg-white">
            <p className="text-center text-sm text-gray-400">
              ({product.stock_quantity})
            </p>
            <h2 className="text-xl font-bold capitalize">{product.name}</h2>
            <div className="mt-2">
              {dealPrice !== null ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xl font-bold text-[#F1352B]">
                    Rs. {dealPrice.toFixed(2)}
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    Rs. {parseFloat(price).toFixed(2)}
                  </span>
                  <span className="bg-[#F1352B] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    Deal of the day · {discountPercent}% OFF
                  </span>
                </div>
              ) : (
                <p className="text-lg font-semibold">
                  Rs. {price} /-
                </p>
              )}
              {/* {selectedVariant.compare_at_price && parseFloat(selectedVariant.compare_at_price) > parseFloat(selectedVariant.price) && (
                <p className="text-lg text-gray-400 line-through">
                  Rs. {selectedVariant.compare_at_price}
                </p>
              )} */}
            </div>

            {productDeal && (
              <p className="mt-2 text-xs font-semibold text-[#F1352B]">
                Deal ends in {dealClock}
              </p>
            )}

            <div className="mt-4 space-y-2 text-gray-600 text-sm">
              <div
                className="html-content"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              {(product.shipping_class_info?.is_free ?? product.free_shipping) && (
                <FreeAdvertizemantCard
                  text="Free Shipping"
                  bgColor="#f4fcf4"
                  color="success"
                />
              )}
              {!(product.shipping_class_info?.is_free ??
                product.free_shipping) &&
                product.shipping_class_info && (
                  <FreeAdvertizemantCard
                    text={`${product.shipping_class_info.label} · Rs. ${product.shipping_class_info.cost}`}
                    bgColor="#eef4fd"
                    color="primary"
                  />
                )}
              {product.shipping_class_info?.estimated_delivery && (
                <span className="text-xs text-gray-500">
                  Delivery: {product.shipping_class_info.estimated_delivery}
                </span>
              )}
              {siteSettings?.free_shipping_threshold &&
                Number(siteSettings.free_shipping_threshold) > 0 && (
                  <span className="text-xs text-emerald-600 font-medium">
                    Free shipping on orders over Rs.{" "}
                    {Number(siteSettings.free_shipping_threshold).toLocaleString()}
                  </span>
                )}
              {product.free_gift && (
                <FreeAdvertizemantCard
                  text="Free gift"
                  bgColor="#fcf4f4"
                  color="danger"
                />
              )}
            </div>
            <hr className="bg-background h-[3px] my-8 rounded-full" />

            {/* Dynamic Attribute Selection */}
            {product.available_attributes?.map((attribute: AvailableAttribute) => (
              <div key={attribute.name} className="mt-6">
                <p className="font-bold mb-2">
                  {attribute.display_name.toUpperCase()}:{" "}
                  <span className="text-secondary font-semibold">
                    {selectedAttributes[attribute.name]}
                  </span>
                </p>

                <div className="flex gap-2 mt-3">
                  {attribute.values
                    .filter((val) => {
                      const otherSelectedAttrs = Object.fromEntries(
                        Object.entries(selectedAttributes).filter(
                          ([key]) => key !== attribute.name
                        )
                      );

                      return product.variants.some((variant: ProductVariant) => {
                        const hasValue = variant.variant_attributes.some(
                          (a: VariantAttributeValue) =>
                            a.attribute_name === attribute.name &&
                            a.value === val.value
                        );
                        if (!hasValue) return false;

                        const matchesOthers = Object.entries(
                          otherSelectedAttrs
                        ).every(([key, value]) =>
                          variant.variant_attributes.some(
                            (a: VariantAttributeValue) =>
                              a.attribute_name === key && a.value === value
                          )
                        );
                        return matchesOthers;
                      });
                    })
                    .map((val) => {
                      const isSelected =
                        selectedAttributes[attribute.name] === val.value;

                      // Compute the price for this specific attribute value
                      const priceForValue = product.variants.find(
                        (variant: ProductVariant) => {
                          return Object.entries({
                            ...selectedAttributes,
                            [attribute.name]: val.value, // pretend this value is selected
                          }).every(([attrName, attrValue]) =>
                            variant.variant_attributes.some(
                              (a: VariantAttributeValue) =>
                                a.attribute_name === attrName &&
                                a.value === attrValue
                            )
                          );
                        }
                      )?.price;

                      return (
                        <div
                          key={val.id}
                          onClick={() =>
                            handleAttributeChange(attribute.name, val.value)
                          }
                          className={`border-2 rounded-lg px-2 py-1 cursor-pointer hover:border-success flex items-center justify-center ${
                            isSelected ? "border-success" : "border-gray-200"
                          }`}
                        >
                          {val.image && (
                            <div>
                              <Image
                                src={resolveImageUrl(val.image)}
                                alt={val.value}
                                width={70}
                                height={70}
                              />
                            </div>
                          )}
                          {val.color_code && (
                            <div
                              className="w-6 h-6 rounded-full mr-2"
                              style={{ backgroundColor: val.color_code }}
                            />
                          )}
                          <div>
                            <p className="text-sm">{val.value}</p>

                            {/* Show price only if image exists */}
                            {val.image && priceForValue && (
                              <p className="text-xs font-bold">
                                Rs.{priceForValue}-
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}

            <hr className="bg-background h-[3px] my-8 rounded-full" />

            {/* Specifications */}
            {/* {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="border rounded-xl p-4 bg-[#ecf6ec]">
                <h3 className="font-bold mb-2">Specifications:</h3>
                <ul className="text-sm space-y-1">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <li key={key}>
                      <span className="font-semibold capitalize">{key}:</span> {value as string}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}

            {/* Offers */}
            {product.promotions.free_gift && (
              <div className=" border rounded-xl p-4 bg-[#ecf6ec] flex justify-around items-center">
                <div>
                  <Image
                    src="/gift.png"
                    alt="offer"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="font-medium ">
                  <div
                    className="html-content"
                    dangerouslySetInnerHTML={{
                      __html: product.promotions.free_gift.description,
                    }}
                  />

                  <p className="text-xs text-gray-500 italic mt-4">
                    Promotion will expires:{" "}
                    {product.promotions.free_gift.expires_at}
                  </p>
                </div>
              </div>
            )}

            {/* Meta */}
            <div className="mt-6 text-sm text-secondary">
              <p>
                <span className="text-black font-bold">CATEGORY: </span>
                <span className="text-success">{product.category.name}</span>
              </p>
              <p>
                <span className="text-black font-bold">BRAND: </span>
                <span className="text-success">{product.brand.name}</span>
              </p>

              <div className="flex flex-wrap space-x-4 my-4">
                {[
                  FaTwitter,
                  FaFacebookF,
                  FaInstagram,
                  FaYoutube,
                  FaPinterest,
                ].map((Icon, i) => (
                  <div
                    key={i}
                    className="bg-secondary-background w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                  >
                    <Icon className="text-black" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE – CART BOX */}
          <div className="lg:col-span-3 rounded-xl">
            <div className="bg-background space-y-4 py-8 px-4 rounded-lg">
              <p className="font-semibold text-sm text-secondary">
                TOTAL PRICE:
              </p>
              <p className="text-2xl font-bold">Rs. {totalPrice}</p>

              <hr className="border-slate-300 h-2 mt-2" />

              <div className="flex items-center gap-2 text-sm">
                {isAvailable ? (
                  <>
                    <FaCheckCircle className="text-success" />
                    <span>In Stock</span>
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="text-red-500" />
                    <span className="text-red-500">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Quantity */}
              <div className="flex bg-white justify-between px-4 items-center gap-4 border p-2 rounded-lg">
                <button
                  onClick={decrementQuantity}
                  className="text-2xl font-bold"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <div className="font-bold">{quantity}</div>
                <button
                  onClick={incrementQuantity}
                  className="text-2xl font-bold"
                  disabled={quantity >= currentStock}
                >
                  +
                </button>
              </div>

              {/* Buttons */}
              <Button
                bgColor={isAvailable ? "bg-success" : "bg-gray-400"}
                text={isAvailable ? "ADD TO CART" : "OUT OF STOCK"}
                textColor="text-white"
                fullWidth={true}
                onClick={handleAddToCart}
                disabled={!isAvailable}
              />

              <button
                className="w-full bg-yellow-500 font-semibold text-black py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleBuyNow}
                disabled={!isAvailable}
              >
                BUY WITH{" "}
                <Image
                  src="/paypal1.png"
                  alt="PayPal"
                  width={80}
                  height={20}
                  className="inline-block ml-2"
                />
              </button>

              <div className="mt-4 flex">
                <button
                  onClick={handleToggleWishlist}
                  className={`text-sm w-1/2 border-r-2 font-semibold pr-1 border-slate-300 text-left transition-colors ${
                    wishlistItem ? "text-[#F1352B]" : "text-secondary hover:text-[#F1352B]"
                  }`}
                >
                  {wishlistItem ? (
                    <FaHeart className="inline-block mr-1 text-[#F1352B]" />
                  ) : (
                    <FaRegHeart className="inline-block mr-1 text-green-600" />
                  )}{" "}
                  {wishlistItem ? "In Wishlist" : "Wishlist"}
                </button>
                <p className="text-sm w-1/2 text-center font-semibold text-secondary">
                  <IoMdRefresh className="inline-block font-bold text-lg mr-1" />{" "}
                  Compare
                </p>
              </div>
              <hr className="border-slate-300 h-2 my-4" />
              <div>
                <p className="text-sm">Guaranteed Safe Checkout</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Image
                  src="/garantee.png"
                  alt="Verified by Visa"
                  width={300}
                  height={200}
                  className="inline-block"
                />
              </div>
            </div>

            {/* Support */}
            <div className="mt-2 p-6 bg-background text-left space-y-3 rounded-lg">
              <button className="bg-black py-2.5 text-white rounded-lg px-6 font-semibold text-sm hover:opacity-90 transition-opacity">
                Quick Order 24/7
              </button>
              <p className="text-lg font-bold">9764578611</p>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <FaShippingFast className="text-base" />
                <span>
                  Shipment in <span className="font-bold text-dark">Kathmandu</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ComboSection product={product} />

      <FrequantlyBrout product={product} />

      {/* Product Info Tabs */}
      <div className="bg-white my-2 rounded-lg">
        <Tabs defaultValue="description" className="w-full">
          <div className="flex flex-wrap gap-4 sm:gap-5 lg:gap-8 px-3 pt-8 pb-5">
            <TabsList className="flex flex-wrap gap-4 sm:gap-5 lg:gap-8 bg-transparent p-0 shadow-none rounded-none">
              <TabsTrigger
                value="description"
                className="cursor-pointer font-semibold text-sm sm:font-bold lg:text-xl p-0 bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent ring-0 focus:ring-0 focus-visible:ring-0 outline-none focus:outline-none focus-visible:outline-none shadow-none text-secondary data-[state=active]:text-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                DESCRIPTION
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="cursor-pointer font-semibold text-sm sm:font-bold lg:text-xl p-0 bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent ring-0 focus:ring-0 focus-visible:ring-0 outline-none focus:outline-none focus-visible:outline-none shadow-none text-secondary data-[state=active]:text-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                REVIEWS
              </TabsTrigger>
              <TabsTrigger
                value="additional"
                className="cursor-pointer font-semibold text-sm sm:font-bold lg:text-xl p-0 bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent ring-0 focus:ring-0 focus-visible:ring-0 outline-none focus:outline-none focus-visible:outline-none shadow-none text-secondary data-[state=active]:text-black data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                ADDITIONAL INFORMATION
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="description" className="px-5 pt-6 text-base text-justify">
            <Longtextmore text={product.description} />
          </TabsContent>

          <TabsContent value="reviews" className="px-5 pt-6">
            <Review productSlug={product.slug} />
          </TabsContent>

          <TabsContent value="additional" className="px-5 pt-6 space-y-6">
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-800">
                    <th className="px-4 py-3 font-semibold uppercase tracking-wide text-xs w-[38%]">
                      Attribute
                    </th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wide text-xs">
                      Detail
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 font-semibold text-gray-700">
                      Brand
                    </td>
                    <td className="px-4 py-2.5 text-gray-600 capitalize">
                      {product.brand?.name ?? "—"}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 font-semibold text-gray-700">
                      Category
                    </td>
                    <td className="px-4 py-2.5 text-gray-600 capitalize">
                      {product.category?.name ?? "—"}
                    </td>
                  </tr>
                  {product.available_attributes.map((attr) => (
                    <tr key={attr.name} className="hover:bg-gray-50">
                      <td className="px-4 py-2.5 font-semibold text-gray-700">
                        {attr.display_name ?? attr.name}
                      </td>
                      <td className="px-4 py-2.5 text-gray-600 capitalize">
                        {attr.values.map((v) => v.value).filter(Boolean).join(", ") || "—"}
                      </td>
                    </tr>
                  ))}
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 font-semibold text-gray-700">
                      Product ID
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">{product.id}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {product.specifications && (
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-semibold uppercase tracking-wide text-xs text-gray-800">
                    Specifications
                  </h3>
                </div>
                <div
                  className="html-content p-4 text-sm text-gray-600 text-justify"
                  dangerouslySetInnerHTML={{ __html: product.specifications }}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default MainProductDetail;