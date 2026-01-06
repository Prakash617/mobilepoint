import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import PriceRangeSliderSkeleton from './PriceRangeSliderSkeleton'
import StarFilterSkeleton from './RatingSkeleton'

const FilterMetaDataSkeleton = () => {
  return (
    <div className="md:w-1/4 w-full space-y-4">
          {/* Categories */}
          <div className="rounded-lg p-6 space-y-6 bg-gray h-auto">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-40 rounded-lg" />
            <Skeleton className="h-4 w-48" />

            <div className="space-y-3">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                  
                  
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="rounded-lg p-6 space-y-6 bg-gray">
            <div className="flex justify-between ">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-16" />
            </div>

            {/* Active filters */}
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-7 w-25 rounded-lg" />
              ))}
            </div>

            {/* Brand */}
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-full rounded-sm" />

            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-4 w-8" />
                </div>
              ))}
            </div>

            <hr className="h-px bg-gray-300 border-0" />

            {/* Price */}
            <PriceRangeSliderSkeleton />

            <hr className="h-px bg-gray-300 border-0" />

            {/* Rating */}
            <Skeleton className="h-4 w-24 " />
           <StarFilterSkeleton />

            <hr className="h-px bg-gray-300 border-0" />

            {/* Screen Size */}
            <Skeleton className="h-4 w-28 " />
            <div className="flex flex-wrap gap-2  ">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-7 w-20 rounded-lg" />
              ))}
            </div>

            <hr className="h-px bg-gray-300 border-0" />

            {/* Color */}
            <Skeleton className="h-4 w-20" />
            <div className="flex flex-wrap gap-2 pr-10 ">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="w-8 h-8 rounded-md" />
              ))}
            </div>

            <hr className="h-px bg-gray-300 border-0" />

            {/* Memory */}
            <Skeleton className="h-4 w-24" />
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-6 w-30 rounded-lg" />
                  <Skeleton className="h-4 w-5" />
                </div>
              ))}
            </div>

            <hr className="h-px bg-gray-300 border-0" />

            {/* Conditions */}
            <Skeleton className="h-4 w-28" />
            <div className="space-y-3 ">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-6 w-24 rounded-lg" />
                  <Skeleton className="h-4 w-8" />
                </div>
              ))}
            </div>

            <hr className="h-px bg-gray-300 border-0 " />
          </div>

          {/* Sidebar ad */}
          <Skeleton className="my-2 w-full h-[300px] rounded-lg bg-gray-300 " />
        </div>
  )
}

export default FilterMetaDataSkeleton