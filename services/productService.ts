import { api } from '@/lib/api';
import { 
  Product, 
  ProductDetail, 
  PaginatedResponse, 
  Category, 
  Brand,
  ProductVariant, 
  Deal,
  RecentlyViewedProduct,
  ProductFilters
} from '@/types/product';
import { FiltersMetadata } from '@/types/filters';
import { getFilteredProducts } from '@/hooks/useProducts';



// Helper to build query params
const buildQueryParams = (filters: ProductFilters): string => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        // Handle arrays (e.g., category, brand, color)
        params.append(key, value.join(','));
      } else {
        params.append(key, String(value));
      }
    }
  });

  return params.toString();
};

export const productService = {
  // Get all products with pagination and filters
 getProducts: async (params?: {
  page?: number;
  search?: string;
  category?: string;
  brand?: string;
  is_featured?: boolean;
  is_popular?: boolean;
  best_seller?: boolean;
  limit?: number;           // dynamic limit
  endpoint?: string;        // e.g., 'new', 'best-sellers'
}) => {
  

  if (!params) params = {};
  const { endpoint, ...queryParams } = params;

  const url = endpoint ? `/products/${endpoint}/` : '/products/';

  const { data } = await api.get<PaginatedResponse<Product>>(url, { params: queryParams });
  return data;
},
  getRelatedProducts: async (params?: { slug: string; limit?: number }) => {
    const { data } = await api.get<Product[]>(`/products/${params?.slug}/related/`, { params: { limit: params?.limit } });
    return data;
  },
  getTopMobileTabletProducts: async (params?: { limit?: number }) => {
    const { data } = await api.get<Product[]>(`/products/top_phones_tablets/`, { params });
    return data;
  },

  // Get single product by slug
  getProduct: async (slug: string) => {
    const { data } = await api.get<ProductDetail>(`/products/${slug}/`);
    return data;
  },

getBestProduct: async (params?: { category?: string, limit?: number }) => {
  const url = params?.category 
    ? `/products/best_seller/?category=${params.category}&limit=${params.limit || 10}` 
    : `/products/best_seller/`;
  const { data } = await api.get<PaginatedResponse<Product>>(url);
  return data;
},


  // Get featured products
  getFeaturedProducts: async () => {
    const { data } = await api.get<Product[]>(`/products/featured/`);
    return data;
  },

  // Get products by category
  getProductsByCategory: async (categorySlug: string, page = 1) => {
    const { data } = await api.get<PaginatedResponse<Product>>(
      `/products/category/${categorySlug}/`,
      { params: { page } }
    );
    return data;
  },

  // Get products by brand
  getProductsByBrand: async (brandSlug: string, page = 1) => {
    const { data } = await api.get<PaginatedResponse<Product>>(
      `/products/brand/${brandSlug}/`,
      { params: { page } }
    );
    return data;
  },

  // Find specific variant
  findVariant: async (slug: string, attributes: Record<string, string>) => {
    const { data } = await api.post<ProductVariant>(
      `/products/${slug}/find_variant/`,
      { attributes }
    );
    return data;
  },

  // Get all categories
  getCategories: async () => {
    const { data } = await api.get<PaginatedResponse<Category>>('/categories/');
    return data;
  },

  getFilteredProducts: async (filters: ProductFilters = {}) => {
    const queryString = buildQueryParams(filters);
    const { data } = await api.get<PaginatedResponse<Product>>(
      `/products/?${queryString}`
    );
    return data;
  },

getFeaturedCategories: async (): Promise<PaginatedResponse<Category>> => {
    const { data } = await api.get<PaginatedResponse<Category>>("/categories/?is_featured=true");
    return data;
  },
getPopularCategories: async ({limit = 10}): Promise<PaginatedResponse<Category>> => {
    const { data } = await api.get<PaginatedResponse<Category>>("/categories/?is_popular=true", { params: { limit } });
    return data;
  },
getTopCategories : async (limit = 8): Promise<PaginatedResponse<Category>> => {
  const { data } = await api.get<PaginatedResponse<Category>>(`/categories/?top=true&limit=${limit}`);
  return data;
},
  // Get all brands
  getBrands: async () => {
    const { data } = await api.get<PaginatedResponse<Brand>>('/brands/');
    return data;
  },

  getFiltersMetadata: async (category?: string) => {
    const params = category ? { category } : {};
    const { data } = await api.get<FiltersMetadata>('/products/filters_metadata/', { params });
    return data;
  },

  // Get featured categories
// Get featured brands only
getFeaturedBrands: async (): Promise<PaginatedResponse<Brand>> => {
  const { data } = await api.get<PaginatedResponse<Brand>>(
    "/brands/?is_featured=true"
  );
  return data;
},

getDeals : async (): Promise<PaginatedResponse<Deal>> => {
  const { data } = await api.get<PaginatedResponse<Deal>>("/deals/");
  return data;
},

  // Check variant stock
  checkStock: async (variantId: number) => {
    const { data } = await api.get(`/variants/${variantId}/check_stock/`);
    return data;
  },
};



export const recentlyViewedService = {
  getRecentlyViewed: async (params?: { limit?: number }) => {
    const { data } = await api.get<RecentlyViewedProduct[]>(
      `/recently-viewed/list_recent/?limit=${params?.limit}`
    );
    return data;
  },
};
