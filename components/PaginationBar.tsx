'use client';
import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function PaginationBar() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const showPages = 3; // Number of pages to show before ellipsis

    for (let i = 1; i <= Math.min(showPages, totalPages); i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
            isActive={currentPage === i}
            className={`border rounded-md min-w-[44px] h-[44px] flex items-center justify-center ${
              currentPage === i
                ? 'bg-green-600 text-white border-green-600 hover:bg-green-700 hover:text-white'
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (totalPages > showPages + 1) {
      pages.push(
        <PaginationItem key="ellipsis">
          <div className="border border-gray-300 rounded-md min-w-[44px] h-[44px] flex items-center justify-center">
            <PaginationEllipsis />
          </div>
        </PaginationItem>
      );

      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(totalPages);
            }}
            isActive={currentPage === totalPages}
            className={`border rounded-md min-w-[44px] h-[44px] flex items-center justify-center ${
              currentPage === totalPages
                ? 'bg-green-600 text-white border-green-600 hover:bg-green-700 hover:text-white'
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent className="gap-2">
        {/* <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
            className={`border border-gray-300 rounded-md h-[44px] px-4 ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
          />
        </PaginationItem> */}
        
        {renderPageNumbers()}
        
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) handlePageChange(currentPage + 1);
            }}
            className={`border border-gray-300 rounded-md h-[44px] px-4 ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}