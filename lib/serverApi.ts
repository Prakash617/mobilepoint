import { ProductDetail, Product, PaginatedResponse } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

async function fetchWithRetry<T>(url: string, retries = MAX_RETRIES): Promise<T> {
  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (res.status === 429 && retries > 0) {
    const retryAfter = res.headers.get('Retry-After');
    const delay = retryAfter
      ? parseInt(retryAfter, 10) * 1000
      : BASE_DELAY_MS * 2 ** (MAX_RETRIES - retries);
    await new Promise((r) => setTimeout(r, delay));
    return fetchWithRetry<T>(url, retries - 1);
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }

  return res.json();
}

function buildUrl(endpoint: string): string {
  return `${API_BASE_URL}${endpoint}`;
}

export const serverProductService = {
  getProduct: async (slug: string): Promise<ProductDetail> => {
    return fetchWithRetry<ProductDetail>(buildUrl(`/products/${slug}/`));
  },

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

    const qs = queryParams.toString();
    const endpoint = `/products/${qs ? `?${qs}` : ''}`;
    return fetchWithRetry<PaginatedResponse<Product>>(buildUrl(endpoint));
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    return fetchWithRetry<Product[]>(buildUrl('/products/featured/'));
  },
};
