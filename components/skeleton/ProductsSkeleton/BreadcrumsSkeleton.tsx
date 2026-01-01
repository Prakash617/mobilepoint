"use client";

import { Skeleton } from "@/components/ui/skeleton";

const DynamicBreadcrumbSkeleton = () => {
  return (
    <div className="bg-white p-6 my-2 rounded-lg">
      <div className="flex items-center gap-3">
        {/* Home */}
        <Skeleton className="h-4 w-16" />

        {/* Slash */}
        <Skeleton className="h-4 w-4 rounded-full" />

        {/* Middle breadcrumb */}
        <Skeleton className="h-4 w-24" />

        {/* Slash */}
        <Skeleton className="h-4 w-4 rounded-full" />

        {/* Current page */}
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  );
};

export default DynamicBreadcrumbSkeleton;
