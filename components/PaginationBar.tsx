'use client';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type PaginationBarProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function PaginationBar({ currentPage, totalPages, onPageChange }: PaginationBarProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const pageLimit = 3;
    const showEllipsis = totalPages > 5;

    // Previous button
    pages.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(currentPage - 1);
          }}
          className={`border border-gray-300 rounded-md h-[44px] px-4 ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
          }`}
        />
      </PaginationItem>
    );

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => { e.preventDefault(); handlePageChange(i); }}
              isActive={currentPage === i}
              className={`border rounded-md min-w-[44px] h-[44px] flex items-center justify-center ${
                currentPage === i ? 'bg-green-600 text-white border-green-600' : 'border-gray-300'
              }`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            onClick={(e) => { e.preventDefault(); handlePageChange(1); }}
            isActive={currentPage === 1}
            className={`border rounded-md min-w-[44px] h-[44px] flex items-center justify-center ${
              currentPage === 1 ? 'bg-green-600 text-white border-green-600' : 'border-gray-300'
            }`}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      if (currentPage > pageLimit) {
        pages.push(<PaginationItem key="start-ellipsis"><PaginationEllipsis /></PaginationItem>);
      }

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= pageLimit) {
        start = 2;
        end = pageLimit;
      }
      
      if (currentPage > totalPages - pageLimit) {
        start = totalPages - pageLimit +1;
        end = totalPages -1;
      }


      for (let i = start; i <= end; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              onClick={(e) => { e.preventDefault(); handlePageChange(i); }}
              isActive={currentPage === i}
              className={`border rounded-md min-w-[44px] h-[44px] flex items-center justify-center ${
                currentPage === i ? 'bg-green-600 text-white border-green-600' : 'border-gray-300'
              }`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      
      if (currentPage < totalPages - pageLimit + 1) {
        pages.push(<PaginationItem key="end-ellipsis"><PaginationEllipsis /></PaginationItem>);
      }

      // Always show last page
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            onClick={(e) => { e.preventDefault(); handlePageChange(totalPages); }}
            isActive={currentPage === totalPages}
            className={`border rounded-md min-w-[44px] h-[44px] flex items-center justify-center ${
              currentPage === totalPages ? 'bg-green-600 text-white border-green-600' : 'border-gray-300'
            }`}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Next button
    pages.push(
      <PaginationItem key="next">
        <PaginationNext
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(currentPage + 1);
          }}
          className={`border border-gray-300 rounded-md h-[44px] px-4 ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
          }`}
        />
      </PaginationItem>
    );

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent className="gap-2">
        {renderPageNumbers()}
      </PaginationContent>
    </Pagination>
  )
}