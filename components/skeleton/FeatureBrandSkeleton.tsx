import { Skeleton } from "@/components/ui/skeleton";


export function FeatureBrandsSkeleton() {
  return (
    
       <div className="flex flex-col md:flex-row w-full mt-2 gap-2 justify-between ">
            {/* Feature Brands */}
            <div className="rounded-xl p-6 w-full md:w-1/2 bg-white">
      {/* Header */}
      <div className="flex justify-between mt-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Brand Logos Grid */}
      <div className="grid grid-cols-5 place-content-center gap-8 mt-8">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-8 w-20 rounded-md justify-self-center"
          />
        ))}
      </div>
      </div>
      
          {/* Top Categories */}
          <div className="rounded-xl p-6 w-full md:w-1/2 bg-white">
      {/* Header */}
      <div className="flex justify-between mt-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Categories Row */}
      <div className="flex flex-row h-full justify-around items-center gap-8 mt-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
    </div>
           
          </div>
  );
}
