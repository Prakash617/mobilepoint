"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { RxSlash } from "react-icons/rx";
import { resolveImageUrl, formatDate } from "@/lib/utils";
import { usePost, usePosts } from "@/hooks/useBlog";
import BlogPostCard from "@/components/BlogPostCard";

export default function BlogPostPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const { data: post, isLoading } = usePost(slug ?? "");

  const { data: related } = usePosts({
    category: post?.category?.slug,
    page_size: 3,
  });

  if (isLoading) {
    return (
      <div className="w-full mt-10 px-4 mb-20">
        <div className="h-4 w-40 bg-gray-200 animate-pulse rounded mb-6" />
        <div className="w-full aspect-[21/9] bg-gray-200 animate-pulse rounded-2xl" />
        <div className="mt-6 h-8 w-2/3 bg-gray-200 animate-pulse rounded" />
        <div className="mt-4 space-y-3">
          <div className="h-3 w-full bg-gray-100 animate-pulse rounded" />
          <div className="h-3 w-full bg-gray-100 animate-pulse rounded" />
          <div className="h-3 w-3/4 bg-gray-100 animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full mt-10 px-4 mb-20 text-center py-20">
        <h1 className="font-extrabold text-2xl text-gray-900">Post not found</h1>
        <Link
          href="/blog"
          className="mt-4 inline-block text-primary font-semibold hover:underline"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const relatedPosts = (related?.results ?? []).filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="w-full mt-10 px-4 mb-20">
      <Breadcrumb className="bg-white p-4 my-2 rounded-lg">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/" className="font-bold">
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <RxSlash className="text-xl stroke-1.5" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/blog" className="font-bold">
                Blog
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <RxSlash className="text-xl stroke-1.5" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">{post.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <article className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {post.featured_image && (
          <div className="relative w-full aspect-[21/9] bg-[#f8f9fc]">
            <Image
              src={resolveImageUrl(post.featured_image)}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="p-6 md:p-10 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide mb-3">
            {post.category && (
              <Link
                href={`/blog/category/${post.category.slug}`}
                className="text-primary"
              >
                {post.category.name}
              </Link>
            )}
            <span className="text-gray-300">|</span>
            <span className="text-gray-400">
              {formatDate(post.published_at ?? post.created_at)}
            </span>
          </div>

          <h1 className="font-extrabold text-3xl md:text-4xl text-gray-900 leading-tight">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-3 pb-6 border-b border-gray-100">
            {post.author && (
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  {post.author.name.charAt(0)}
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {post.author.name}
                </span>
              </div>
            )}
            <span className="text-xs text-gray-400">
              {post.views} views
            </span>
          </div>

          <div
            className="html-content mt-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="mt-12">
          <h2 className="font-bold text-2xl text-gray-900 mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((p) => (
              <BlogPostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
