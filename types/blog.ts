import { PaginatedResponse } from "@/types/product";

export interface BlogAuthor {
  id: number;
  name: string;
  avatar: string | null;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  author: BlogAuthor | null;
  category: BlogCategory | null;
  tags: string[];
  published_at: string | null;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  views: number;
}

export type BlogPostListResponse = PaginatedResponse<BlogPost>;
export type BlogCategoryListResponse = PaginatedResponse<BlogCategory>;
