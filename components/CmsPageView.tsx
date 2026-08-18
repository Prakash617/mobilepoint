"use client";

import { useQuery } from "@tanstack/react-query";
import { pageService, CmsPage } from "@/services/pageService";
import Link from "next/link";
import { Home } from "lucide-react";

interface CmsPageViewProps {
  slug: string;
  fallbackTitle: string;
}

export default function CmsPageView({ slug, fallbackTitle }: CmsPageViewProps) {
  const {
    data: page,
    isLoading,
  } = useQuery<CmsPage>({
    queryKey: ["page", slug],
    queryFn: () => pageService.getPage(slug),
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) {
    return (
      <div className="min-h-[50vh] bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 my-8 mx-4 md:mx-0">
        <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
          <div className="h-1 w-16 bg-gray-200 rounded-full"></div>
          <div className="space-y-3 pt-4">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const title = page?.title || fallbackTitle;
  const content = page?.content;
  const excerpt = page?.excerpt;

  return (
    <div className="min-h-[50vh] bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 my-8 mx-4 md:mx-0">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          {title}
        </h1>
        <div className="h-1 w-16 bg-[#0073bc] rounded-full"></div>

        {excerpt && (
          <div
            className="text-gray-500 leading-relaxed italic"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        )}

        {content ? (
          <div
            className="text-gray-600 leading-relaxed pt-4 html-content prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <div className="text-gray-600 leading-relaxed pt-4 space-y-4">
            <p>
              Welcome to the <strong>{title}</strong> page. We are currently
              updating this section with the latest information to serve you
              better.
            </p>
            <p>
              If you need immediate assistance or have specific questions, please
              feel free to reach out to our support team or check back here
              shortly.
            </p>
          </div>
        )}

        <div className="pt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-800 px-6 py-2.5 text-sm rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            <Home className="w-4 h-4" />
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
