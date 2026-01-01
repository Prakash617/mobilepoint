import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import PriceRangeSlider from "./PriceRangeSlider";
import StarFilter from "./StartFilter";
import { CategoryFilter, FiltersMetaData } from "@/types/filtersmetadata";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

type Props = {
  slug: string;
  filterMetaData: FiltersMetaData | null;
  defaultslug: string;
};

const AttributeValues = ({ attr, searchParams, handleFilterChange }) => {
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

const CategoriesFilter = ({ slug: category_slug, filterMetaData, defaultslug }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  return (
    <>
      <div className="rounded-lg p-6 space-y-6 bg-gray ">
        <p className="uppercase font-bold">Categories</p>
        <div>
          <button className="bg-white cursor-pointer pl-6 pr-2 text-sm font-semibold text- py-2 mt-3 rounded-lg">
            All Categories
          </button>

          <p className="my-4 text-sm font-semibold uppercase">
            {category_slug}
          </p>

          <div className="flex flex-col items-start gap-3">
            {filterMetaData?.categories.map((item: CategoryFilter) => {
              const safeId = `cat-${item.slug}`;
              return (
                <div key={item.slug} className="flex items-center gap-2">
                  <Checkbox
                    onCheckedChange={() => handleFilterChange('category', item.slug)}
                    id={safeId}
                    className="bg-white"
                    checked={selectedCategories.includes(item.slug)}
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
          <p className="uppercase font-bold">Categories</p>
          <button onClick={handleResetAll} className="cursor-pointer">Reset All</button>
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
                  checked={selectedBrands.includes(item.slug)}
                  onCheckedChange={() => handleFilterChange('brand', item.slug)}
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
          <PriceRangeSlider
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={handlePriceChange}
            onGoClick={handlePriceGoClick}
          />
        </div>
        <hr className="h-px bg-gray-300 border-0" />
        {filterMetaData?.ratings && (
          <div>
            <p className="my-4 text-sm font-semibold">By Rating</p>
            <div className="flex flex-col space-y-4">
              <StarFilter
                ratings={filterMetaData?.ratings}
                onRatingChange={(rating) => handleFilterChange('rating', rating)}
                selectedRatings={selectedRatings}
              />
            </div>
          </div>
        )}

        <hr className="h-px bg-gray-300 border-0" />
        
        {filterMetaData?.attributes?.filter(attr => attr.values && attr.values.length > 0).map((attr, index) => (
          <div key={index} className="mb-6">
            <p className="my-4 text-sm font-semibold">{attr.name}</p>
            <AttributeValues attr={attr} searchParams={searchParams} handleFilterChange={handleFilterChange} />
          </div>
        ))}

        <hr className="h-px bg-gray-300 border-0" />
      </div>
    </>
  );
};

export default CategoriesFilter;
