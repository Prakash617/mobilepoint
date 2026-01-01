"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useState, useMemo } from "react";
import FreeAdvertizemantCard from "@/components/FreeAdvertizemantCard";
import Longtextmore from "@/app/(root)/products/[slug]/Longtextmore";
import Image from "next/image";
import FrequantlyBrout from "./FrequantlyBrout";
import Button from "@/components/Button";
import {
  FaCheckCircle,
  FaFacebookF,
  FaHeart,
  FaInstagram,
  FaPinterest,
  FaShippingFast,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import {
  AvailableAttribute,
  ProductDetail,
  ProductImage,
  ProductVariant,
  VariantAttribute,
} from "@/types/product";
import Review from "@/components/Review";

type Props = {
  product: ProductDetail;
};

const MainProductDetail = ({ product }: Props) => {
  // State for selected variant attributes
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >(() => {
    const defaults: Record<string, string> = {};
    product.available_attributes.forEach((attr: AvailableAttribute) => {
      const defaultVariant = product.variants.find(
        (v: ProductVariant) => v.is_default
      );
      if (defaultVariant) {
        const attrValue = defaultVariant.attributes.find(
          (a: VariantAttribute) => a.attribute === attr.name
        );
        if (attrValue) {
          defaults[attr.name] = attrValue.value;
        }
      }
    });
    return defaults;
  });

  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Find the currently selected variant based on selected attributes
  const selectedVariant: ProductVariant = useMemo(() => {
    return (
      product.variants.find((variant: ProductVariant) => {
        return Object.entries(selectedAttributes).every(
          ([attrName, attrValue]) => {
            return variant.attributes.some(
              (a: VariantAttribute) =>
                a.attribute === attrName && a.value === attrValue
            );
          }
        );
      }) || product.variants[0]
    );
  }, [selectedAttributes, product.variants]);

  // Get images for display (variant images if available, otherwise product images)
  const displayImages: ProductImage[] =
    selectedVariant.images.length > 0 ? selectedVariant.images : product.images;

  const currentImage = displayImages[currentImageIndex] || displayImages[0];

  // Handle attribute selection
  const handleAttributeChange = (attrName: string, value: string) => {
    setSelectedAttributes((prev) => {
      const newAttrs = { ...prev, [attrName]: value };

      // Check if this new combination is valid
      const isValidCombination = product.variants.some(
        (variant: ProductVariant) => {
          return Object.entries(newAttrs).every(([key, val]) =>
            variant.attributes.some(
              (a: VariantAttribute) => a.attribute === key && a.value === val
            )
          );
        }
      );

      // If it's not valid, we need to find the best alternative.
      if (!isValidCombination) {
        // Find the first variant that matches the attribute we just changed.
        const newVariant = product.variants.find((variant: ProductVariant) =>
          variant.attributes.some(
            (a: VariantAttribute) =>
              a.attribute === attrName && a.value === value
          )
        );
        if (newVariant) {
          // And update the whole attributes state based on this new variant
          const newVariantAttributes: Record<string, string> = {};
          newVariant.attributes.forEach((attr: VariantAttribute) => {
            newVariantAttributes[attr.attribute] = attr.value;
          });
          return newVariantAttributes;
        }
      }

      return newAttrs; // It was a valid combination, so just update it.
    });
  };

  // Handle quantity change
  const incrementQuantity = () => {
    if (quantity < selectedVariant.stock_quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const totalPrice = (parseFloat(selectedVariant.price) * quantity).toFixed(2);

  return (
    <>
      <div className="sm:w-full w-full my-2 mx-auto p-4 bg-white rounded-xl">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT SIDE – PRODUCT IMAGES */}
          <div className="lg:col-span-4 rounded-xl p-4">
            <div className="w-full md:h-[600px] h-[400px] p-4 flex justify-center items-center">
              <Image
                src={currentImage?.image || "/placeholder.jpg"}
                alt={currentImage?.alt_text || product.name}
                width={500}
                height={500}
                className="object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mt-2 justify-left overflow-x-auto">
              {displayImages.map((img: ProductImage, index: number) => (
                <div
                  key={img.id}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20  relative cursor-pointer  border-2 ${
                    index === currentImageIndex
                      ? "border-success"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={img.image}
                    alt={img.alt_text || `Thumbnail ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* MIDDLE COLUMN - PRODUCT INFO */}
          <div className="lg:col-span-5 bg-white">
            <p className="text-center text-sm text-gray-400">
              ({selectedVariant.stock_quantity})
            </p>
            <h2 className="text-xl font-bold capitalize">{product.name}</h2>
            <div className="mt-2">
              <p className="text-lg font-semibold">
                Rs. {selectedVariant.price} /-
              </p>
              {/* {selectedVariant.compare_at_price && parseFloat(selectedVariant.compare_at_price) > parseFloat(selectedVariant.price) && (
                <p className="text-lg text-gray-400 line-through">
                  Rs. {selectedVariant.compare_at_price}
                </p>
              )} */}
            </div>

            <div className="mt-4 space-y-2 text-gray-600 text-sm">
              <div
                className="html-content"
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            </div>

            <div className="flex gap-2 mt-2">
              {product.free_shipping && (
                <FreeAdvertizemantCard
                  text="Free shipping"
                  bgColor="#f4fcf4"
                  color="success"
                />
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
            {product.available_attributes.map((attribute: AvailableAttribute) => (
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
                        const hasValue = variant.attributes.some(
                          (a: VariantAttribute) =>
                            a.attribute === attribute.name &&
                            a.value === val.value
                        );
                        if (!hasValue) return false;

                        const matchesOthers = Object.entries(
                          otherSelectedAttrs
                        ).every(([key, value]) =>
                          variant.attributes.some(
                            (a: VariantAttribute) =>
                              a.attribute === key && a.value === value
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
                            variant.attributes.some(
                              (a: VariantAttribute) =>
                                a.attribute === attrName &&
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
                                src={val.image}
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
                <span className="text-black font-bold">SKU:</span>{" "}
                {selectedVariant.sku}
              </p>
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
                {selectedVariant.is_in_stock ? (
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
                  disabled={quantity >= selectedVariant.stock_quantity}
                >
                  +
                </button>
              </div>

              {/* Buttons */}
              <Button
                bgColor="bg-success"
                text="ADD TO CART"
                textColor="text-white"
                fullWidth={true}
                disabled={!selectedVariant.is_in_stock}
              />

              <button
                className="w-full bg-yellow-500 font-semibold text-black py-3 rounded-lg"
                disabled={!selectedVariant.is_in_stock}
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
                <p className="text-sm w-1/2 border-r-2 font-semibold pr-1 border-slate-300 text-secondary">
                  <FaHeart className="inline-block mr-1 text-green-600" />{" "}
                  Wishlist
                </p>
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
            <div className="mt-2 p-6 bg-background text-left space-y-2 rounded-lg">
              <div>
                <button className="bg-black py-2 text-white rounded-lg px-6">
                  Quick Order 24/7
                </button>
              </div>
              <div>
                <p className="text-lg font-bold">9764578611</p>
              </div>
            </div>
            <div className="flex space-x-2 my-2 items-center">
              <FaShippingFast className="inline-block" />
              <span>
                Shipment in <span className="font-bold">Kathmandu</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <FrequantlyBrout />

      <div className="bg-white my-2  rounded-lg">
   

<Tabs defaultValue="description" className="w-full">
  {/* Header */}
  <div className="flex flex-wrap gap-4 sm:gap-5 lg:gap-8 px-3 pt-8 pb-5">
    <TabsList className="flex flex-wrap gap-4 sm:gap-5 lg:gap-8 bg-transparent p-0 shadow-none rounded-none ">
      <TabsTrigger
        value="description"
        className="
    cursor-pointer
    font-semibold text-sm sm:font-bold lg:text-xl
    p-0
    bg-transparent
    hover:bg-transparent
    focus:bg-transparent
    focus-visible:bg-transparent
    active:bg-transparent
    ring-0
    focus:ring-0
    focus-visible:ring-0
    shadow-none
    text-[#666666]
    data-[state=active]:text-black
    data-[state=active]:bg-transparent
data-[state=active]:shadow-none
data-[state=active]:after:bg-transparent
  "
      >
        DESCRIPTION
      </TabsTrigger>

      <TabsTrigger
        value="reviews"
        className="
    cursor-pointer
    font-semibold text-sm sm:font-bold lg:text-xl
    p-0
    bg-transparent
    hover:bg-transparent
    focus:bg-transparent
    focus-visible:bg-transparent
    active:bg-transparent
    ring-0
    focus:ring-0
    focus-visible:ring-0
    shadow-none
    text-[#666666]
    data-[state=active]:text-black
  data-[state=active]:bg-transparent
data-[state=active]:shadow-none
data-[state=active]:after:bg-transparent
  "
        
      >
        REVIEWS (5)
      </TabsTrigger>

      <TabsTrigger
        value="additional"
        className="
    cursor-pointer
    font-semibold text-sm sm:font-bold lg:text-xl
    p-0
    bg-transparent
    hover:bg-transparent
    focus:bg-transparent
    focus-visible:bg-transparent
    active:bg-transparent
    ring-0
    focus:ring-0
    focus-visible:ring-0
    shadow-none
    text-[#666666]
    data-[state=active]:text-black
    data-[state=active]:bg-transparent
data-[state=active]:shadow-none
data-[state=active]:after:bg-transparent
  "
      >
        ADDITIONAL INFORMATION
      </TabsTrigger>
    </TabsList>
  </div>

  {/* Content */}
  <TabsContent value="description" className="px-5 pt-6 text-base text-justify">
    <Longtextmore text={product.description} />
  </TabsContent>

          <TabsContent value="reviews" className="px-5 pt-6" >  
            <Review />
            </TabsContent>

  <TabsContent value="additional" className="px-5 pt-6" />
</Tabs>

      </div>
    </>
  );
};

export default MainProductDetail;