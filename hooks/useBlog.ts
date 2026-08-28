import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/services/blogService";
import { sampleBlogCategories, sampleBlogPosts } from "@/data/blog";
import {
  BlogCategory,
  BlogPost,
  BlogPostListResponse,
} from "@/types/blog";

export const blogKeys = {
  all: ["blog"] as const,
  posts: (filters: Record<string, unknown>) =>
    [...blogKeys.all, "posts", filters] as const,
  post: (slug: string) => [...blogKeys.all, "post", slug] as const,
  categories: () => [...blogKeys.all, "categories"] as const,
};

function wrapPosts(results: BlogPost[]): BlogPostListResponse {
  return {
    count: results.length,
    next: null,
    previous: null,
    page_size: results.length,
    total_pages: 1,
    current_page: 1,
    results,
  };
}

export function usePosts(filters: Record<string, unknown> = {}) {
  return useQuery({
    queryKey: blogKeys.posts(filters),
    queryFn: async () => {
      try {
        return await blogService.getPosts(filters);
      } catch {
        const category = filters.category as string | undefined;
        const results = category
          ? sampleBlogPosts.filter((p) => p.category?.slug === category)
          : sampleBlogPosts;
        return wrapPosts(results);
      }
    },
    retry: false,
  });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: blogKeys.post(slug),
    queryFn: async () => {
      try {
        return await blogService.getPost(slug);
      } catch {
        return sampleBlogPosts.find((p) => p.slug === slug) ?? null;
      }
    },
    retry: false,
    enabled: !!slug,
  });
}

export function useBlogCategories() {
  return useQuery({
    queryKey: blogKeys.categories(),
    queryFn: async () => {
      try {
        const data = await blogService.getCategories();
        return data.results;
      } catch {
        return sampleBlogCategories as BlogCategory[];
      }
    },
    retry: false,
  });
}
