"use client";
import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import StarFilter from "@/components/StartFilter";
import { ListCardCarousel } from "@/components/ListCartCarousel";
import HorizontalLine from "@/components/HorizontalLine";
import Adsrecentview from "@/components/Adsrecentview";
import { DropDown } from "@/components/DropDown";
import ProductCardList from "@/components/ProductCardList";
import PaginationBar from "@/components/PaginationBar";
import PriceRangeSlider from "@/components/PriceRangeSlider";
import HomeCarousel from "@/components/HomeCarousel";
import { useBestProducts, useFilteredProducts, usePopularCategories } from "@/hooks/useProducts";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useFiltersMetadata } from "@/hooks/useFiltersMetadata";
import { ProductFilters } from "@/types/product";
import { useState, useEffect } from "react";

const AttributeValues = ({ attr, filters, onCheckboxChange }) => {
  const handleCheckboxChange = (value: string) => {
    onCheckboxChange(attr.slug, value);
  };

  if (attr.slug === "color") {
    return (
      <div className="flex flex-wrap gap-2">
        {attr.values.map((value) => (
          <button
            key={value.id}
            className={`w-8 h-8 rounded-md border-2 cursor-pointer ${
              filters.color?.includes(value.value) ? 'border-blue-500' : 'border-gray-200'
            }`}
            style={{ backgroundColor: value.color_code || "#FFFFFF" }}
            title={value.value}
            onClick={() => handleCheckboxChange(value.value)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-y-3 gap-x-6">
      {attr.values.map((value, index) => {
        const safeId = `${attr.slug}-${value.value}-${index}`;
        return (
          <div key={safeId} className="flex items-center ">
            <Checkbox 
              id={safeId} 
              className="bg-white" 
              checked={(filters[attr.slug] as string[] | undefined)?.includes(value.value) || false}
              onCheckedChange={() => handleCheckboxChange(value.value)}
            />
            <Label
              htmlFor={safeId}
              className="flex items-center gap-0 cursor-pointer"
            >
              <span className="px-1 py-1 rounded-lg text-xs font-medium">
                {value.value}
              </span>
              <span className="opacity-75">({value.count})</span>
            </Label>
          </div>
        );
      })}
    </div>
  );
};


const ProductList = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categorySlug = params.slug as string;

  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    page_size: 10,
  });

  useEffect(() => {
    const newFilters: ProductFilters = {
      page: parseInt(searchParams.get('page') || '1', 10),
      page_size: parseInt(searchParams.get('page_size') || '10', 10),
    };
    
    const categories = searchParams.get('category')?.split(',');
    if (categories) {
      newFilters.category = categories;
    } else if (categorySlug) {
      newFilters.category = [categorySlug];
    }

    const brands = searchParams.get('brand')?.split(',');
    if (brands) newFilters.brand = brands;

    const ratings = searchParams.get('rating')?.split(',');
    if (ratings) newFilters.rating = ratings;
    
    const minPrice = searchParams.get('min_price');
    if (minPrice) newFilters.min_price = Number(minPrice);
    
    const maxPrice = searchParams.get('max_price');
    if (maxPrice) newFilters.max_price = Number(maxPrice);

    searchParams.forEach((value, key) => {
      if (!['page', 'page_size', 'category', 'brand', 'rating', 'min_price', 'max_price'].includes(key)) {
        newFilters[key] = value.split(',');
      }
    });

    setFilters(newFilters);
  }, [searchParams, categorySlug]);

  const updateUrl = (updatedFilters: ProductFilters) => {
    const queryParams = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && (Array.isArray(value) ? value.length > 0 : value !== '')) {
            if (Array.isArray(value)) {
                queryParams.set(key, value.join(','));
            } else {
                queryParams.set(key, String(value));
            }
        }
    });
    router.push(`${window.location.pathname}?${queryParams.toString()}`);
  };
  
  const handleCheckboxChange = (filterKey: keyof ProductFilters, value: string) => {
    const currentValues = filters[filterKey] as string[] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    const newFilters = { ...filters, [filterKey]: newValues, page: 1 };
    setFilters(newFilters);
    updateUrl(newFilters);
  };
  
  const handleRatingChange = (rating: number) => {
    const currentRatings = filters.rating as string[] || [];
    const ratingStr = String(rating);
    const newRatings = currentRatings.includes(ratingStr)
      ? currentRatings.filter((r) => r !== ratingStr)
      : [...currentRatings, ratingStr];
    const newFilters = { ...filters, rating: newRatings, page: 1 };
    setFilters(newFilters);
    updateUrl(newFilters);
  };

  const handlePriceChange = (values: [number, number]) => {
    const newFilters = { ...filters, min_price: values[0], max_price: values[1], page: 1 };
    setFilters(newFilters);
    updateUrl(newFilters);
  };

  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    updateUrl(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: ProductFilters = {
      page: 1,
      page_size: 10,
      category: categorySlug ? [categorySlug] : [],
    };
    setFilters(defaultFilters);
    router.push(`${window.location.pathname}?category=${categorySlug}`);
  };


  const { data: popularCategories, isLoading: isPopularLoading, error: popularError } = usePopularCategories({limit: 10});
  const { data: filteredProducts, isLoading: isFilteredLoading, error: filteredError } = useFilteredProducts(filters);

  const {
    data: bestProducts,
    isLoading: isBestLoading,
    error: bestError,
  } = useBestProducts({ limit: 10, category: categorySlug });

  const {
    data: filterMetaData,
    isLoading: isFilterLoading,
    error: filterError,
  } = useFiltersMetadata({ category: categorySlug });

  if (isBestLoading || isPopularLoading || isFilterLoading) {
    return <div>Loading...</div>;
  }
  if (bestError || popularError || filterError) {
    return <div>Error: {bestError?.message || popularError?.message || filterError?.message}</div>;
  }

  return (
    <>
      <DynamicBreadcrumb />
      <div className="p-4 bg-white rounded-lg space-y-8">
        <div>
          <p className=" font-bold uppercase">top cell phones & tablets</p>
          <p className="font-bold uppercase">{categorySlug}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 rounded-lg bg-white ">
          <div className="w-2/3">
            <HomeCarousel />
          </div>
          <div className="w-1/3 rounded-lg relative bg-amber-200">
            <Image
              src="/photo1.png"
              alt="topcell1"
              fill
              className="bg-cover h-full w-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className="p-4 bg-white rounded-lg space-y-8 my-2">
        <div>
          <p className=" font-bold uppercase">popular categories</p>
        </div>

        <div className="w-full  grid md:grid-cols-5 grid-cols-2 sm:grid-cols-3 gap-4 place-items-center">
          {popularCategories?.results.map((item) => (
            <div
              key={item.id}
              className="flex w-full items-center justify-between bg-white rounded-lg p-2 sm:p-3  hover:shadow transition"
            >
              <div>
                <h3 className="font-bold text-sm">{item.name}</h3>
                {item.total_products && (
                  <p className="text-secondary text-xs">
                    {item.total_products} Items
                  </p>
                )}
              </div>

              <div className="relative w-[45px] h-[45px] sm:w-[55px] sm:h-[55px]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white my-2  flex flex-col md:flex-row gap-4 p-4  rounded-lg">
        <div className="md:w-1/4 w-full space-y-4 ">
          <div className="rounded-lg p-6 space-y-6 bg-gray ">
            <p className="uppercase font-bold">Categories</p>
            <div>
              <button onClick={() => handleCheckboxChange('category', 'All')} className="bg-white cursor-pointer pl-6 pr-2 text-sm font-semibold text- py-2 mt-3 rounded-lg">
                All Categories
              </button>

              <p className="my-4 text-sm font-semibold">
                Cell Phones & Tablets
              </p>

              <div className="flex flex-col items-start gap-3">
                {filterMetaData?.categories.map((item) => {
                  const safeId = `cat-${item.slug}`;
                  return (
                    <div key={item.slug} className="flex items-center gap-2">
                      <Checkbox
                        id={safeId}
                        className="bg-white"
                        checked={filters.category?.includes(item.slug)}
                        onCheckedChange={() => handleCheckboxChange('category', item.slug)}
                      />
                      <Label htmlFor={safeId}>{item.name}</Label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="rounded-lg p-6 space-y-6 bg-gray ">
            <div className="flex justify-between">
              <p className="uppercase font-bold">Filters</p>
              <button onClick={resetFilters} className="text-sm hover:underline">Reset All</button>
            </div>
            
            <p className="my-4 text-sm font-semibold">By Brands</p>
            <div className="flex flex-col items-start gap-3">
              {filterMetaData?.brands.map((item) => {
                const safeId = `brand-${item.slug}`;

                return (
                  <div key={item.slug} className="flex items-center gap-2">
                    <Checkbox
                      id={safeId}
                      className="bg-white"
                      checked={filters.brand?.includes(item.slug)}
                      onCheckedChange={() => handleCheckboxChange('brand', item.slug)}
                    />
                    <Label
                      htmlFor={safeId}
                      className="flex items-center gap-2 text-secondary"
                    >
                      {item.logo && (
                        <Image
                          src={item.logo}
                          width={80}
                          height={25}
                          alt={item.name}
                        />
                      )}
                      <span>{item.name}</span>
                      <span className="opacity-75">({item.product_count})</span>
                    </Label>
                  </div>
                );
              })}
            </div>

            <hr className="h-px bg-gray-300 border-0" />

            <div className="space-y-4">
              <p className="my-4 text-sm font-semibold">By Price</p>
              <PriceRangeSlider onValueCommit={handlePriceChange} min={filterMetaData?.min_price} max={filterMetaData?.max_price} />
            </div>
            <hr className="h-px bg-gray-300 border-0" />
            {filterMetaData?.ratings && (
              <div>
                <p className="my-4 text-sm font-semibold">By Rating</p>
                <div className="flex flex-col space-y-4">
                  <StarFilter ratings={filterMetaData?.ratings} selectedRatings={filters.rating as string[]} onRatingChange={handleRatingChange} />
                </div>
              </div>
            )}

            <hr className="h-px bg-gray-300 border-0" />
            {filterMetaData?.attributes?.map((attr,index) => (
              <div key={index} className="mb-6">
                <p className="my-4 text-sm font-semibold">{attr.name}</p>
                <AttributeValues attr={attr} filters={filters} onCheckboxChange={handleCheckboxChange} />
                 <hr className="h-px bg-gray-300 border-0 mt-4" />
              </div>
            ))}
          </div>
          <div className="my-2 w-full h-[300px] rounded-lg relative">
            <Image
              src="/ads5.png"
              alt="ad-banner"
              fill
              className="object-cover  rounded-lg w-full"
            />
          </div>
        </div>
        <div className="rounded-lg w-full border-2 border-gray p-4 md:w-3/4">
          <div>
            <p className="text-lg font-bold uppercase">
              Best seller in this category
            </p>
            <ListCardCarousel products={bestProducts?.results || []} />
          </div>
          <HorizontalLine />
          <div className="flex flex-1 flex-col gap-2 ">
            <div className="flex items-center flex-wrap gap-2 font-normal text-xs text-secondary">
              <div className="flex-1  ">
                <span className="text-black font-semibold text-[14px]">
                  {filteredProducts?.results.length > 0 ? `1 - ${filteredProducts.results.length}` : 0}
                </span>{" "}
                of {filteredProducts?.count || 0} results
              </div>
              <div className="flex-1 flex  items-center gap-2">
                <div>
                  <p>Show item</p>
                </div>
                <div className="flex flex-row rounded-sm w-30 h-10 bg-gray  justify-around items-center ">
                  <div className="text-black font-semibold text-[14px] ">
                    {filters.page_size}
                  </div>
                </div>
              </div>
              <div className="flex-1 flex items-center gap-2">
                <div>Sort by</div>
                <div>
                  <DropDown />
                </div>
              </div>
              <div className="px-2 flex-1 text-center">View As</div>
            </div>
            <div className=" ">
              <ProductCardList products={filteredProducts?.results ?? []} isLoading={isFilteredLoading} />

              <div>
              {filteredProducts && filteredProducts.total_pages > 1 && (
                  <PaginationBar
                    currentPage={filteredProducts.current_page}
                    totalPages={filteredProducts.total_pages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Adsrecentview />
    </>
  );
};

export default ProductList;
