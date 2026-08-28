"use client";

import { useQuery } from "@tanstack/react-query";
import { pageService, CmsPage } from "@/services/pageService";
import Link from "next/link";
import { Home, ChevronRight, PhoneCall, Mail, HelpCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

interface CmsPageViewProps {
  slug: string;
  fallbackTitle: string;
}

export default function CmsPageView({ slug, fallbackTitle }: CmsPageViewProps) {
  const { data: siteSettings } = useSiteSettings();
  const {
    data: page,
    isLoading,
  } = useQuery<CmsPage>({
    queryKey: ["page", slug],
    queryFn: () => pageService.getPage(slug),
    staleTime: 1000 * 60 * 10,
  });

  const phone = siteSettings?.phone || siteSettings?.phone_number || "+977 980-1234567";
  const email = siteSettings?.email || "support@mobilepoint.com.np";

  if (isLoading) {
    return (
      <div className="min-h-[60vh] bg-[#f8f9fc] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 space-y-6 animate-pulse">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-9 w-64 bg-gray-200 rounded-xl"></div>
          <div className="h-1 w-16 bg-gray-200 rounded-full"></div>
          <div className="space-y-4 pt-6">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
            <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
            <div className="h-32 w-full bg-gray-100 rounded-2xl mt-4"></div>
          </div>
        </div>
      </div>
    );
  }

  const title = page?.title || fallbackTitle;
  const content = page?.content;
  const excerpt = page?.excerpt;

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home size={13} /> Home
          </Link>
          <ChevronRight size={12} className="text-gray-400" />
          <span className="text-gray-900 font-bold">{title}</span>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 space-y-8">
          
          <div className="space-y-3 border-b border-gray-100 pb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
              Mobile Point Info
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              {title}
            </h1>
            
            {excerpt && (
              <div
                className="text-sm text-gray-500 leading-relaxed italic pt-1"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
            )}
          </div>

          {/* HTML Prose Content (Manageable directly from Django Admin) */}
          {content ? (
            <div
              className="text-gray-700 leading-relaxed space-y-4 text-sm sm:text-base prose prose-blue max-w-none [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-gray-900 [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-5 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_a]:text-primary [&_a]:font-semibold [&_a]:underline [&_strong]:text-gray-900"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div className="text-gray-600 leading-relaxed py-6 space-y-3 text-sm">
              <p>
                Welcome to the <strong>{title}</strong> page. We are currently updating this section with the latest details to serve you better.
              </p>
              <p>
                For immediate questions or assistance, please contact our support desk directly.
              </p>
            </div>
          )}

          {/* Help & Return Footer */}
          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <HelpCircle size={16} className="text-primary" />
              <span>Need more help? Call our hotline <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="font-bold text-gray-900 hover:text-primary">{phone}</a></span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 text-xs rounded-xl font-bold transition-colors"
              >
                <Mail size={13} /> Support Desk
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 bg-primary text-white px-4 py-2 text-xs rounded-xl font-bold hover:opacity-90 transition-opacity shadow-xs"
              >
                <Home size={13} /> Return Home
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
