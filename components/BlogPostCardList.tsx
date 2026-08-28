import BlogPostCard from "./BlogPostCard";
import BlogPostCardSkeleton from "./skeleton/BlogPostCardSkeleton";
import { BlogPost } from "@/types/blog";

export default function BlogPostCardList({
  posts,
  isLoading,
}: {
  posts: BlogPost[];
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <BlogPostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No posts found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((p) => (
        <BlogPostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
