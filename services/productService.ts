import { api } from '@/lib/api';
import { 
  Product, 
  ProductDetail, 
  PaginatedResponse, 
  Category, 
  Brand,
  ProductVariant, 
  Deal,
  RecentlyViewedProduct
} from '@/types/product';

export const productService = {
  // Get all products with pagination and filters
  getProducts: async (params?: {
    page?: number;
    search?: string;
    category?: string;
    brand?: string;
    is_featured?: boolean;
    best_seller?: boolean;
  }) => {
    const { data } = await api.get<PaginatedResponse<Product>>('/products/', { params });
    return data;
  },
  getRelatedProducts: async (params?: { slug: string; limit?: number }) => {
    const { data } = await api.get<Product[]>(`/products/${params?.slug}/related/`, { params: { limit: params?.limit } });
    return data;
  },
  getTopMobileTabletProducts: async (params?: { limit?: number }) => {
    const { data } = await api.get<Product[]>('/products/top_phones_tablets/', { params });
    return data;
  },

  // Get single product by slug
  getProduct: async (slug: string) => {
    const { data } = await api.get<ProductDetail>(`/products/${slug}/`);
    return data;
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const { data } = await api.get<Product[]>('/products/featured/');
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

getFeaturedCategories: async (): Promise<PaginatedResponse<Category>> => {
    const { data } = await api.get<PaginatedResponse<Category>>("/categories/?is_featured=true");
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
