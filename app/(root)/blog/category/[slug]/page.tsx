"use client";

import { useParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DynamicBreadcrumb } from "@/components/DynamicBreadcrumb";
import BlogPostCardList from "@/components/BlogPostCardList";
import { usePosts, useBlogCategories } from "@/hooks/useBlog";

export default function BlogCategoryPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const { data, isLoading } = usePosts({
    category: slug,
    page_size: 9,
  });
  const { data: categories } = useBlogCategories();

  const category = (categories ?? []).find((c) => c.slug === slug);
  const totalPages = data?.total_pages ?? 1;

  return (
    <div className="w-full mt-10 px-4 mb-20">
      <DynamicBreadcrumb />

      <header className="my-8 text-center max-w-3xl mx-auto">
        <h1 className="font-extrabold text-4xl text-gray-900">
          {category ? category.name : "Category"}
        </h1>
        {category?.description && (
          <p className="mt-3 text-gray-500">{category.description}</p>
        )}
      </header>

      <BlogPostCardList posts={data?.results ?? []} isLoading={isLoading} />

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent>
            <PaginationItem>
              <span className="px-4 text-sm font-semibold text-gray-600">
                Page 1 of {totalPages}
              </span>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
