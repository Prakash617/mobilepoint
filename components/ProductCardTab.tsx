'use client'

import { CardCarousel } from "./CardCarousel";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";
import CardCarouselSectionSkeleton from "./skeleton/ProductCardTabSkeleton";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ProductTabs } from "@/components/ProductTabs";

type Props = {};

const ProductCardTab = (props: Props) => {
  // Best sellers
  const { data: bestSellerData, isLoading: bestLoading, error: bestError } = useProducts({
    endpoint: "best_seller",
    limit: 10,
  });

  // if (isLoading) return <CardCarouselSectionSkeleton slides={5} tabsCount={3} />;
  // if (error) return <div>Error loading products</div>;
  // New products
  const { data: newData, isLoading: newLoading, error: newError } = useProducts({
    endpoint: "new",
    limit: 10,
  });

  // Featured products (Popular)
  const { data: featuredData, isLoading: featuredLoading, error: featuredError } = useProducts({
    is_featured: true,
    limit: 8,
  });

  const bestSellers = bestSellerData?.results || [];
  const newIn = newData?.results || [];
  const popular = featuredData?.results || [];

  if (bestLoading || newLoading || featuredLoading) return <CardCarouselSectionSkeleton slides={5} tabsCount={3} />;
  if (bestError || newError || featuredError) return <div>Error loading products</div>;

  const tabs = [
    { value: "best-seller", label: "Best Seller" },
    { value: "new-in", label: "New in" },
    { value: "popular", label: "Popular" },
  ];

  return (
    <div className="bg-white my-2 p-8 space-y-4 rounded-lg">
      <Tabs defaultValue="best-seller" className="w-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <ProductTabs tabs={tabs} />
          <Link href="/" className="text-gray-400 text-sm">
            View All
          </Link>
        </div>

        {/* Tab Contents */}
        <TabsContent value="best-seller">
          <CardCarousel products={bestSellers} />
        </TabsContent>

        <TabsContent value="new-in">
          <CardCarousel products={newIn} />
        </TabsContent>

        <TabsContent value="popular">
          <CardCarousel products={popular} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductCardTab;
