"use client";
import {  useRelatedProducts } from "@/hooks/useProducts";
import ProductCard from "./ProductCard";



import ProductCardSkeleton from "./skeleton/ProductCardSkeleton";

const RelatedProduct = ({slug}: {slug: string}) => {
  const { data: related_products, isLoading, error } = useRelatedProducts({ limit: 5 , slug: slug});
  if (isLoading) {
    return (
      <div className="p-8 bg-white rounded-lg space-y-8 my-2">
        <div>
          <p className=" font-bold uppercase">related products</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 md:px-14 place-items-center w-full gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-8 bg-white rounded-lg space-y-8 my-2">
      <div>
        <p className=" font-bold uppercase">related products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 md:px-14 place-items-center">
        {related_products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
