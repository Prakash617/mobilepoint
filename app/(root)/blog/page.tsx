"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
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

export default function BlogPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page") ?? "1");
  const category = searchParams.get("category") ?? "";

  const { data, isLoading } = usePosts({
    page,
    category: category || undefined,
    page_size: 9,
  });
  const { data: categories } = useBlogCategories();

  const totalPages = data?.total_pages ?? 1;

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="w-full mt-10 px-4 mb-20">
      <DynamicBreadcrumb />

      <header className="my-8 text-center max-w-3xl mx-auto">
        <h1 className="font-extrabold text-4xl text-gray-900">Blog</h1>
        <p className="mt-3 text-gray-500">
          News, guides and reviews to help you get the most out of your tech.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4">
          <BlogPostCardList posts={data?.results ?? []} isLoading={isLoading} />

          {totalPages > 1 && (
            <Pagination className="mt-10">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => goToPage(Math.max(1, page - 1))}
                    className={
                      page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="px-4 text-sm font-semibold text-gray-600">
                    Page {page} of {totalPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={() => goToPage(Math.min(totalPages, page + 1))}
                    className={
                      page >= totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>

        <aside className="lg:w-1/4 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-bold text-gray-900 mb-3">Categories</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/blog"
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !category
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  All Posts
                </Link>
              </li>
              {(categories ?? []).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/blog/category/${c.slug}`}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      category === c.slug
                        ? "bg-primary/10 text-primary"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
