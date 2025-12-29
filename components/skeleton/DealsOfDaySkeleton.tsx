import React from 'react'
import { Skeleton } from '../ui/skeleton'

type Props = {}

const DealsOfDaySkeleton = (props: Props) => {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-2 my-2">
  {/* LEFT SECTION */}
  <div className="w-full md:w-3/4 flex flex-col">
    {/* Header Skeleton */}
    <div className="bg-primary rounded-xl flex p-4 justify-between items-center">
      <Skeleton className="h-5 w-40 bg-white/60" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-8 rounded-full bg-white/60" />
        <Skeleton className="h-8 w-8 rounded-full bg-white/60" />
      </div>
    </div>

    {/* Carousel Skeleton */}
    <div className="w-full">
      <div className="flex flex-col md:flex-row rounded-xl pt-8 pb-4 px-4 bg-white mt-3">
        {/* IMAGE BLOCK */}
        <div className="w-full md:w-1/2 flex">
          {/* Thumbnails */}
          <div className="w-16 flex flex-col gap-4 justify-center items-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 rounded-md" />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex flex-1 justify-center items-center">
            <Skeleton className="h-[200px] w-[200px] rounded-xl" />
          </div>
        </div>

        {/* TEXT SECTION */}
        <div className="w-full md:w-1/2 p-4 space-y-4">
          {/* Title */}
          <Skeleton className="h-6 w-3/4" />

          {/* Price */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Specs */}
          <div className="space-y-2 mt-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>

          {/* Badges */}
          <div className="flex gap-2 mt-4">
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>

          {/* Countdown */}
          <div className="flex justify-between my-8 border-b border-gray-200 pb-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>

            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-12 rounded-md" />
              ))}
            </div>
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <Skeleton className="h-2 w-full rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* RIGHT SIDE BANNERS */}
  <div className="w-full md:w-1/4 flex gap-2 flex-row md:flex-col">
    {Array.from({ length: 3 }).map((_, i) => (
      <Skeleton
        key={i}
        className="relative h-32 md:h-1/3 w-1/3 md:w-full rounded-lg"
      />
    ))}
  </div>
</div>

  )
}

export default DealsOfDaySkeleton