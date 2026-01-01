import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';
import ProductCardSkeleton from './skeleton/ProductCardSkeleton';

type Props = {
  products: Product[];
  isLoading?: boolean;
};

const ProductCardList = ({ products, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 place-items-center">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <div className="text-center py-10">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 place-items-center">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductCardList;
