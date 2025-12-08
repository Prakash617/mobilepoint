"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SlashIcon } from "lucide-react";

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
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {paths.map((item, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>

            <BreadcrumbItem>
              {index === paths.length - 1 ? (
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
