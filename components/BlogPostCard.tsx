import Image from "next/image";
import Link from "next/link";
import { resolveImageUrl } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { BlogPost } from "@/types/blog";

export default function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-transparent transition-all duration-300 overflow-hidden flex flex-col"
    >
      <div className="relative w-full aspect-[16/10] bg-[#f8f9fc] overflow-hidden">
        <Image
          src={resolveImageUrl(post.featured_image)}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {post.category && (
          <span className="absolute top-3 left-3 bg-primary text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
            {post.category.name}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
          <span>{formatDate(post.published_at ?? post.created_at)}</span>
          {post.author && (
            <>
              <span>•</span>
              <span>{post.author.name}</span>
            </>
          )}
        </div>
        <h3 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
        )}
        <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
          Read more
          <svg
            className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
