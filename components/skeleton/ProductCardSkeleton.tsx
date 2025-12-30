'use client';

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
 // Or use lucide-react icons
import Link from "next/link";

const ProductCardSkeleton = () => {
  return (
    <Link href="#" className="block">
      <Card className="h-[450px] w-[220px] hover:border hover:border-gray-300 rounded-lg p-2 flex flex-col space-y-4 transition-all">
        <CardContent className="p-0 flex flex-col space-y-4 h-full">
          {/* Product Image Skeleton */}
          <div className="relative w-[150px] h-[150px] mx-auto">
            <Skeleton className="w-full h-full rounded-md" />

            {/* Tag Badge Skeleton */}
            <div className="absolute top-2 -left-4">
              <Skeleton className="h-8 w-12 rounded-lg" />
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Title + Price Skeleton */}
          <div className="space-y-2 text-center">
            {/* Stock quantity placeholder */}
            <Skeleton className="h-4 w-20 mx-auto" />

            {/* Product name */}
            <Skeleton className="h-5 w-32 " />

            {/* Prices */}
            <div className="flex items-end justify-start gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>

          {/* Free Shipping / Gift Badges Skeleton */}
          <div className="flex gap-2 justify-start">
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>

          {/* Stock Status Skeleton */}
          <div className="flex items-center gap-2 justify-start mb-auto">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Variant Images Skeleton */}
          <div className="flex gap-2 justify-center">
            <Skeleton className="h-12 w-12 rounded-md" />
            <Skeleton className="h-12 w-12 rounded-md" />
            <Skeleton className="h-12 w-12 rounded-md" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCardSkeleton;