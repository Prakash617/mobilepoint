'use client'

import { CardCarousel } from "./CardCarousel";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";

type Props = {};

const ProductCardTab = (props: Props) => {
  // Fetch all products (assuming useProducts fetches your API)
  const { data, isLoading ,error } = useProducts({ best_seller: true });
  // Filter best seller products dynamically
  const bestSellers = data?.results?.filter((product: any) => {
    // Using sold_quantity from default_variant
    return product.default_variant?.sold_quantity > 0;
  }) || [];

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="bg-white my-2 p-8 space-y-4 rounded-lg">
      {/* Header & Tabs */}
      <div className="flex justify-between">
        <div className="flex flex-wrap gap-4 sm:gap-5 mb-8 lg:gap-8 text-thin lg:text-lg text-secondary">
          <button className="text-black font-semibold uppercase cursor-pointer">
            Best Seller
          </button>
          <button className="uppercase cursor-pointer">New in</button>
          <button className="uppercase cursor-pointer">Popular</button>
        </div>
        <div>
          <Link href={'/'} className="text-gray-400 text-sm">View All</Link>
        </div>
      </div>
      
      {/* Product Carousel */}
      <div>
        <CardCarousel products={bestSellers} />
      </div>
    </div>
  );
};

export default ProductCardTab;
