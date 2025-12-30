import { useQuery, useMutation } from '@tanstack/react-query';
import { productService, recentlyViewedService } from '@/services/productService';
type ProductParams = {
  page?: number;
  search?: string;
  category?: string;
  brand?: string;
  is_featured?: boolean;
  best_seller?: boolean;
  limit?: number;           // dynamic limit
  endpoint?: string;        // e.g. 'new', 'best-sellers', etc.
};

// Get all products
export function useProducts(params?: ProductParams) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productService.getProducts(params),
  });
}
export function useRelatedProducts(params?: {
  slug : string;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['related-products', params],
    queryFn: () => productService.getRelatedProducts(params),
  });
}


// Get single product
export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productService.getProduct(slug),
    enabled: !!slug,
  });
}
export function useTopMobileTabletProducts(params?: { limit?: number }) {
  return useQuery({
    queryKey: ['products', 'top_phones_tablets', params],
    queryFn: () => productService.getTopMobileTabletProducts(params),
  });
}

// Get featured products
export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: productService.getFeaturedProducts,
  });
}

// Get products by category
export function useProductsByCategory(categorySlug: string, page = 1) {
  return useQuery({
    queryKey: ['products', 'category', categorySlug, page],
    queryFn: () => productService.getProductsByCategory(categorySlug, page),
    enabled: !!categorySlug,
  });
}

// Get categories
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: productService.getCategories,
  });
}

export const useFeaturedCategories = () => {
  return useQuery({
    queryKey: ["categories", "featured"],
    queryFn: productService.getFeaturedCategories,
  });
};

export const useTopCategories = ({ limit = 6 }: { limit?: number } = { }) => {
  return useQuery({
    queryKey: ["categories", "top", limit],
    queryFn: () => productService.getTopCategories(limit),
  });
};



// Get brands
export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: productService.getBrands,
  });
}

export const useFeaturedBrands = () => {
  return useQuery({
    queryKey: ["brands", "featured"],
    queryFn: productService.getFeaturedBrands,
  });
};



// Find variant mutation
export function useFindVariant() {
  return useMutation({
    mutationFn: ({ slug, attributes }: { slug: string; attributes: Record<string, string> }) =>
      productService.findVariant(slug, attributes),
  });
}

export const useDeals = () => {
  return useQuery({
    queryKey: ['deals', 'all'],
    queryFn: productService.getDeals,
    staleTime: 5 * 60 * 1000, // optional: cache for 5 minutes
  });
};


export const useRecentlyViewed = ({ limit = 10 }: { limit?: number }) => {
  return useQuery({
    queryKey: ["recently-viewed", { limit }],
    queryFn: () => recentlyViewedService.getRecentlyViewed({ limit }),
    staleTime: 1000 * 60 * 5, // cache 5 minutes
  });
};
