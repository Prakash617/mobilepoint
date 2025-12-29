import { ProductDetail, Product, PaginatedResponse } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Server-side fetch with error handling
async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: 'no-store', // or 'force-cache' for static generation
    // next: { revalidate: 60 } // Revalidate every 60 seconds
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }

  return res.json();
}

export const serverProductService = {
  // Get single product by slug (Server-side)
  getProduct: async (slug: string): Promise<ProductDetail> => {
    return fetchApi<ProductDetail>(`/products/${slug}/`);
  },

  // Get all products (Server-side)
  getProducts: async (params?: {
    page?: number;
    search?: string;
    category?: string;
    brand?: string;
  }): Promise<PaginatedResponse<Product>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.search) queryParams.set('search', params.search);
    if (params?.category) queryParams.set('category', params.category);
    if (params?.brand) queryParams.set('brand', params.brand);
    
    const endpoint = `/products/${queryParams.toString() ? `?${queryParams}` : ''}`;
    return fetchApi<PaginatedResponse<Product>>(endpoint);
  },

  // Get featured products (Server-side)
  getFeaturedProducts: async (): Promise<Product[]> => {
    return fetchApi<Product[]>('/products/featured/');
  },
};
