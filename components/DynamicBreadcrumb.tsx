"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxSlash } from "react-icons/rx";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function DynamicBreadcrumb() {
  const pathname = usePathname(); // e.g. /product/iphone-15
  const segments = pathname?.split("/").filter(Boolean) || [];

  // Build breadcrumb items
  const paths = segments.map((seg, index) => ({
    name: seg.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()), // Format text
    href: "/" + segments.slice(0, index + 1).join("/"), // Build link
  }));

  return (
    <Breadcrumb className="bg-white p-6 my-2 rounded-lg">
      <BreadcrumbList>
        {/* HOME */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="font-bold">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {paths.map((item, index) => (
          <div key={index} className="flex items-center justify-center">
            <BreadcrumbSeparator>
            <RxSlash className="text-xl stroke-1.5" />
            </BreadcrumbSeparator>

            <BreadcrumbItem>
              {index === paths.length - 1 ? (
                <BreadcrumbPage className=" font-bold">{item.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href} className=" font-bold">{item.name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
