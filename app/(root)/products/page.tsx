"use client";
import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import StarFilter from "@/components/StartFilter";
import HorizontalLine from "@/components/HorizontalLine";
import Adsrecentview from "@/components/Adsrecentview";
import { FaMinus } from "react-icons/fa";
import { DropDown } from "@/components/DropDown";
import ProductCardList from "@/components/ProductCardList"; // Updated import
import PaginationBar from "@/components/PaginationBar";
import PriceRangeSlider from "@/components/PriceRangeSlider";
import HomeCarousel from "@/components/HomeCarousel";
import {
  useBestProducts,
  useFilteredProducts,
  usePopularCategories,
  useProducts,
} from "@/hooks/useProducts";
import { useFiltersMetadata } from "@/hooks/useFiltersMetadata";
import Link from "next/link";
import CategoriesFilter from "@/components/CategoriesFilter";
import { useState } from "react";
import { FiltersMetaData } from "@/types/filtersmetadata";
import { FiltersMetadata } from "@/types/filters";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import FilterMetaDataSkeleton from "@/components/skeleton/ProductsSkeleton/FilterMetaDataSkeleton";
import ProductListSkeleton from "@/components/skeleton/ProductsSkeleton/ProductsSkeleton";

type Props = {};

const pageSizes = [16, 32, 48]; // Define fixed page size options

const ProductList = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get values from URL and filter out "empty" ones
  const categories = searchParams.get("category")?.split(",").filter(Boolean);
  const brands = searchParams.get("brand")?.split(",").filter(Boolean);
  const colors = searchParams.get("color")?.split(",").filter(Boolean);
  const minPrice = searchParams.get("min_price")
    ? Number(searchParams.get("min_price"))
    : undefined;
  const maxPrice = searchParams.get("max_price")
    ? Number(searchParams.get("max_price"))
    : undefined;
  const ratings = searchParams
    .get("rating")
    ?.split(",")
    .map(Number)
    .filter((n) => !isNaN(n));
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const pageSize = searchParams.get("page_size")
    ? Number(searchParams.get("page_size"))
    : 16;
  const ordering = searchParams.get("ordering") || "-created_at"; // Default sort order

  // Get values from URL
  const filterQuery: any = {};
  if (categories?.length) filterQuery.category = categories;
  if (brands?.length) filterQuery.brand = brands;
  if (colors?.length) filterQuery.color = colors;
  if (minPrice !== undefined) filterQuery.min_price = minPrice;
  if (maxPrice !== undefined) filterQuery.max_price = maxPrice;
  if (ratings?.length) filterQuery.rating = ratings;
  filterQuery.page = page;
  filterQuery.page_size = pageSize;
  filterQuery.ordering = ordering; // Add ordering to filter query

  const category_slug = searchParams.get("category") || "";
  const [defaultSlug] = useState(category_slug);
  const {
    data: popularCategories,
    isLoading: isPopularLoading,
    error: popularError,
  } = usePopularCategories({ limit: 10 });
  const {
    data: filteredProducts,
    isLoading: isFilteredProductLoading,
    error: filteredError,
  } = useFilteredProducts(filterQuery);

  const {
    data: bestProducts,
    isLoading: isBestLoading,
    error: bestError,
  } = useBestProducts({ limit: 10, category: `${category_slug}` });

  const {
    data: filterMetaData,
    isLoading: isfilterMetaDataLoading,
    error: filterError,
  } = useFiltersMetadata({ category: `${category_slug}` });

  // Handle loading states
  if (isBestLoading || isPopularLoading|| isFilteredProductLoading||isfilterMetaDataLoading) {
    return <ProductListSkeleton />;
  }
  // Handle error states
  if (bestError) {
    return <div>Error: {bestError.message}</div>;
  }
  if (filteredError) {
    return <div>Error: {filteredError.message}</div>;
  }
  if (filterError) {
    return <div>Error: {filterError.message}</div>;
  }

  // Ensure filteredProducts is not undefined before accessing its properties
  // if (isFilteredLoading) {
  //   return <div>isFilteredLoading</div>;
  // }
  //  if (isBestLoading) {
  //   return <div>isbestLoading</div>;
  // }

  // Ensure category_slug is a string before rendering CategoriesFilter
  if (typeof category_slug !== "string") {
    return <div>Invalid Category Slug</div>; // Or handle this case as appropriate
  }

  const handlePageSize = (size: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page_size", size.toString());
    newSearchParams.set("page", "1"); // Reset to page 1 when page size changes
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", page.toString());
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  const handleSortChange = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("ordering", value);
    newSearchParams.set("page", "1"); // Reset to page 1 on sort change
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  const startRange =
    (filteredProducts.current_page - 1) * filteredProducts.page_size + 1;
  const endRange =
    (filteredProducts.current_page - 1) * filteredProducts.page_size +
    filteredProducts.results.length;

  return (
    <>
      <DynamicBreadcrumb />

      <div className="p-4 bg-white rounded-lg space-y-8">
        <div>
          <p className=" font-bold uppercase">top {category_slug}</p>
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
              className="object-cover h-full w-full  rounded-lg"
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
            <Link
              href={`/products/?category=${item.slug}`}
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
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white my-2  flex flex-col md:flex-row gap-4 p-4  rounded-lg">
        {isfilterMetaDataLoading ? <FilterMetaDataSkeleton /> :
       
        <div className="md:w-1/4 w-full space-y-4 ">
          <CategoriesFilter
            slug={category_slug}
            defaultslug={defaultSlug}
            filterMetaData={filterMetaData}
          />
          <div className="my-2 w-full h-[300px] rounded-lg relative">
            <Image
              src="/ads5.png"
              alt="ad-banner"
              fill
              className="object-cover  rounded-lg w-full"
            />
          </div>
        </div>
           }

        <div className="rounded-lg w-full border-2 border-gray p-4 md:w-3/4">
          <div>
            <p className="text-lg font-bold uppercase">
              Best seller in this category
            </p>
            <ProductCardList products={bestProducts?.results || []} isLoading={isBestLoading} />
          </div>

          <HorizontalLine />

          <div className="flex flex-1 flex-col gap-2 ">
            <div className="flex items-center flex-wrap gap-2 font-normal text-xs text-secondary">
              <div className="flex-1">
                <span className="text-black font-semibold text-[14px]">
                  {startRange} - {endRange}
                </span>{" "}
                of {filteredProducts?.count} results
              </div>

              <div className="flex-1 flex  items-center gap-2">
                <div>
                  <p>Show item</p>
                </div>
                <div className="flex flex-row rounded-sm w-30 h-10 bg-gray justify-around items-center ">
                  {pageSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handlePageSize(size)}
                      className={`font-semibold text-[14px] px-2 ${
                        pageSize === size
                          ? "text-black"
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex items-center gap-2">
                <div>Sort By</div>
                <div>
                  <DropDown value={ordering} onValueChange={handleSortChange} />
                </div>
              </div>

              <div className="px-2 flex-1 text-center">View As</div>
            </div>

            <div className=" ">
              <ProductCardList isLoading={isFilteredProductLoading} products={filteredProducts?.results ?? []} />

              <div className="my-4">
                {filteredProducts && filteredProducts.results.length > 0 && (
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
