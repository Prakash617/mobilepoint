import { api } from "@/lib/api";
import {
  BlogCategoryListResponse,
  BlogPost,
  BlogPostListResponse,
} from "@/types/blog";

export const blogService = {
  getPosts: async (params?: Record<string, unknown>) => {
    const { data } = await api.get<BlogPostListResponse>("/posts/", { params });
    return data;
  },
  getPost: async (slug: string) => {
    const { data } = await api.get<BlogPost>(`/posts/${slug}/`);
    return data;
  },
  getCategories: async (params?: Record<string, unknown>) => {
    const { data } = await api.get<BlogCategoryListResponse>("/post-categories/", {
      params: { limit: 50, ...params },
    });
    return data;
  },
};
