import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import PriceRangeSlider from "./PriceRangeSlider";
import StarFilter from "./StartFilter";
import { AttributeFilter, CategoryFilter, FiltersMetaData } from "@/types/filtersmetadata";
import { usePathname, useRouter, useSearchParams, ReadonlyURLSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { resolveImageUrl } from "@/lib/utils";

type Props = {
  slug: string;
  filterMetaData: FiltersMetaData | null | undefined;
  defaultslug: string;
};

type AttributeValuesProps = {
  attr: AttributeFilter;
  searchParams: ReadonlyURLSearchParams;
  handleFilterChange: (paramName: string, value: string | number) => void;
};

const AttributeValues = ({ attr, searchParams, handleFilterChange }: AttributeValuesProps) => {
  const selectedValues = searchParams.get(attr.slug)?.split(',') || [];

  if (attr.slug === "color") {
    return (
      <div className="flex flex-wrap gap-2">
        {attr.values.map((value) => (
          <button
            key={value.id}
            className={`w-8 h-8 rounded-md border-2 cursor-pointer ${selectedValues.includes(String(value.value)) ? 'border-blue-500' : 'border-gray-200'}`}
            style={{ backgroundColor: value.color_code || "#FFFFFF" }}
            title={value.value}
            onClick={() => handleFilterChange(attr.slug, value.value)}
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
              checked={selectedValues.includes(String(value.value))}
              onCheckedChange={() => handleFilterChange(attr.slug, value.value)}
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

import { useCategories, useBrands } from "@/hooks/useProducts";

const CategoriesFilter = ({ slug: category_slug, filterMetaData, defaultslug }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: categoriesData } = useCategories();
  const { data: brandsData } = useBrands();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000); // Assuming 10000 is the max for the slider

  useEffect(() => {
    const urlMinPrice = searchParams.get("min_price");
    const urlMaxPrice = searchParams.get("max_price");

    setMinPrice(urlMinPrice ? Number(urlMinPrice) : 0);
    setMaxPrice(urlMaxPrice ? Number(urlMaxPrice) : 10000);
  }, [searchParams]);
  
  const handleFilterChange = (paramName: string, value: string | number) => {
    const currentValues = searchParams.get(paramName)?.split(',') || [];
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (currentValues.includes(String(value))) {
      const updatedValues = currentValues.filter((v) => v !== String(value));
      if (updatedValues.length > 0) {
        newSearchParams.set(paramName, updatedValues.join(','));
      } else {
        newSearchParams.delete(paramName);
      }
    } else {
      newSearchParams.set(paramName, [...currentValues, String(value)].join(','));
    }

    // Reset page to 1 when filters change
    newSearchParams.set("page", "1");
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  const handlePriceChange = (values: { min: number; max: number }) => {
    setMinPrice(values.min);
    setMaxPrice(values.max);
  };

  const handlePriceGoClick = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("min_price", minPrice.toString());
    newSearchParams.set("max_price", maxPrice.toString());
    newSearchParams.set("page", "1"); // Reset page on price filter
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  const handleResetAll = () => {
    console.log("Resetting all filters to default category",defaultslug);
    router.push(`${pathname}?category=${defaultslug}`, { scroll: false });
  };

  const selectedCategories = searchParams.get("category")?.split(',') || [];
  const selectedBrands = searchParams.get("brand")?.split(',') || [];
  const selectedRatings = searchParams.get("rating")?.split(',') || [];

  const categoriesToRender = filterMetaData?.categories || categoriesData?.results || [];
  const brandsToRender = filterMetaData?.brands || brandsData?.results || [];

  return (
    <>
      <div className="rounded-xl p-5 mb-4 bg-[#f8f9fc] border border-gray-100 shadow-sm">
        <p className="uppercase font-bold text-gray-800 tracking-wide mb-5">Categories</p>
        
        <div className="space-y-4">
          <button 
            onClick={handleResetAll} 
            className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 transition-colors w-full text-left px-4 text-[13px] font-semibold text-gray-700 py-2.5 rounded-lg"
          >
            <span className="text-lg">‹</span> All Categories
          </button>

          {category_slug && (
            <p className="text-[13px] font-bold text-primary uppercase pl-2">
              {category_slug.replace('-', ' ')}
            </p>
          )}

          <div className="flex flex-col items-start gap-3 mt-2 pl-2">
            {categoriesToRender.map((item: any) => {
              const safeId = `cat-${item.slug}`;
              return (
                <div key={item.slug} className="flex items-center gap-3">
                  <Checkbox
                    onCheckedChange={() => handleFilterChange('category', item.slug)}
                    id={safeId}
                    className="bg-white rounded-full w-4 h-4 border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    checked={selectedCategories.includes(item.slug)}
                  />
                  <Label htmlFor={safeId} className="text-[13px] font-medium text-gray-600 hover:text-black cursor-pointer transition-colors">
                    {item.name}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-xl p-5 space-y-6 bg-[#f8f9fc] border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <p className="uppercase font-bold text-gray-800 tracking-wide">Filters</p>
          <button 
            onClick={handleResetAll} 
            className="cursor-pointer text-primary hover:text-primary/80 text-[13px] font-semibold transition-colors"
          >
            Reset All
          </button>
        </div>
        
        <div>
          <p className="mb-4 text-[13px] uppercase font-bold text-gray-700">By Brands</p>
          <div className="flex flex-col items-start gap-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {brandsToRender.map((item: any) => {
              const safeId = `brand-${item.slug}`;
              return (
                <div key={item.slug} className="flex items-center gap-3">
                  <Checkbox
                    id={safeId}
                    className="bg-white rounded-md w-4 h-4 border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    checked={selectedBrands.includes(item.slug)}
                    onCheckedChange={() => handleFilterChange('brand', item.slug)}
                  />
                  <Label
                    htmlFor={safeId}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    {item.logo && (
                      <div className="bg-white border border-gray-100 p-0.5 rounded shadow-sm flex items-center justify-center w-10 h-6">
                        <Image
                          src={resolveImageUrl(item.logo)}
                          width={32}
                          height={16}
                          alt={item.name}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <span className="text-[13px] font-medium text-gray-600 hover:text-black transition-colors">{item.name}</span>
                    <span className="text-[11px] text-gray-400">({item.product_count || item.total_products || 0})</span>
                  </Label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full h-px bg-gray-200" />

        <div className="space-y-4">
          <p className="mb-4 text-[13px] uppercase font-bold text-gray-700">By Price</p>
          <PriceRangeSlider
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={handlePriceChange}
            onGoClick={handlePriceGoClick}
          />
        </div>

        <div className="w-full h-px bg-gray-200" />
        
        <div>
          <p className="mb-4 text-[13px] uppercase font-bold text-gray-700">By Rating</p>
          <div className="flex flex-col space-y-4">
            <StarFilter
              ratings={filterMetaData?.ratings || [
                { value: '5', count: 0 },
                { value: '4', count: 0 },
                { value: '3', count: 0 },
                { value: '2', count: 0 },
                { value: '1', count: 0 },
              ]}
              onRatingChange={(rating) => handleFilterChange('rating', rating)}
              selectedRatings={selectedRatings}
            />
          </div>
        </div>

        {filterMetaData?.attributes?.filter(attr => attr.values && attr.values.length > 0).map((attr, index) => (
          <div key={`attr-wrapper-${index}`}>
            <div className="w-full h-px bg-gray-200 mb-6" />
            <div className="mb-6">
              <p className="mb-4 text-[13px] uppercase font-bold text-gray-700">{attr.name}</p>
              <AttributeValues attr={attr} searchParams={searchParams} handleFilterChange={handleFilterChange} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoriesFilter;
