"use client";

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { IoIosArrowDown } from 'react-icons/io'

const SearchBox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState('');

  // Update query when URL changes
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setQuery(searchParam);
    } else {
      setQuery('');
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push(`/products`);
    }
  };

  return (
    <div className="my-border bg-linear-to-r from-[#f0a181] to-primary my-2 p-3 flex flex-col lg:flex-row items-center justify-between gap-4 rounded-lg">

      {/* SEARCH SECTION */}
      <form onSubmit={handleSearch} className="bg-white flex items-center w-full lg:w-auto rounded-full px-3 py-2">
        <div className="flex items-center gap-2 px-2">
          <span className="font-bold whitespace-nowrap text-sm md:text-base">
            All Categories
          </span>
          <IoIosArrowDown className="text-gray-500" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search anything..."
          className="w-full md:w-60 lg:w-72 border-none text-gray-500 focus:ring-0 outline-none bg-white px-2"
        />
      </form>

      {/* OFFER TEXTS */}
      <div className="flex flex-col md:flex-row text-white gap-2 md:gap-6 text-sm md:text-base items-center text-center">
        <div>Free Shipping Over NRP. 2800/-</div>
        <div>30 DAYS MONEY BACK</div>
        <div>100% SECURE payment</div>
      </div>
    </div>
  )
}

export default SearchBox
