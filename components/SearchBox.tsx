"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCategories, useProducts } from '@/hooks/useProducts';
import { resolveImageUrl } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SearchBox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Custom hook to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync with URL params
  useEffect(() => {
    const searchParam = searchParams.get('search');
    const catParam = searchParams.get('category');
    if (searchParam) setQuery(searchParam);
    if (catParam) setSelectedCategory(catParam);
  }, [searchParams]);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
      if (query.trim()) setShowDropdown(true);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch Categories
  const { data: categoriesData } = useCategories({ limit: 100, is_parent: true });
  const categories = categoriesData?.results || [];

  // Fetch Live Products
  const { data: searchResults, isLoading: isSearching } = useProducts({
    search: debouncedQuery,
    category: selectedCategory || undefined,
    limit: 5,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDropdown(false);
    
    const params = new URLSearchParams();
    if (query.trim()) params.set('search', query.trim());
    if (selectedCategory) params.set('category', selectedCategory);
    
    router.push(`/products?${params.toString()}`);
  };

  const handleProductClick = () => {
    setShowDropdown(false);
    setQuery('');
  };

  return (
    <div className="my-border bg-linear-to-r from-[#f0a181] to-primary my-2 p-3 flex flex-col lg:flex-row items-center justify-between gap-4 rounded-lg">

      {/* SEARCH SECTION */}
      <div ref={containerRef} className="relative w-full lg:w-auto">
        <form onSubmit={handleSearch} className="bg-white flex items-center w-full rounded-full px-3 py-2 shadow-sm border border-transparent focus-within:border-gray-200 transition-colors">
          <Select
            value={selectedCategory || "all"}
            onValueChange={(val) => setSelectedCategory(val === "all" ? "" : val)}
          >
            <SelectTrigger className="border-none shadow-none focus:ring-0 bg-transparent md:w-44 shrink-0 font-bold text-gray-700 rounded-lg px-2 h-auto py-1">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="z-[60] max-h-[320px]">
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat: any) => (
                <SelectItem key={cat.id} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="h-6 w-px bg-gray-300 mx-2"></div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => { if (debouncedQuery) setShowDropdown(true); }}
            placeholder="search anything..."
            className="w-full md:w-60 lg:w-72 border-none text-gray-700 placeholder:text-gray-400 focus:ring-0 outline-none bg-white px-2 py-1 text-sm md:text-base"
          />
          
          <button type="submit" className="ml-2 text-primary hover:text-[#f0a181] transition-colors p-1">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </form>

        {/* LIVE SEARCH DROPDOWN */}
        {showDropdown && debouncedQuery && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 flex flex-col max-h-[400px]">
            {isSearching ? (
              <div className="p-4 text-center text-sm text-gray-500">Searching...</div>
            ) : searchResults?.results && searchResults.results.length > 0 ? (
              <div className="overflow-y-auto">
                {searchResults.results.map((prod: any) => (
                  <Link 
                    key={prod.id} 
                    href={`/products/${prod.slug}`}
                    onClick={handleProductClick}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors"
                  >
                    <div className="relative w-12 h-12 bg-white rounded border border-gray-100 flex-shrink-0">
                      <Image 
                        src={resolveImageUrl(prod.primary_image)} 
                        alt={prod.name} 
                        fill 
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-semibold text-gray-800 line-clamp-1">{prod.name}</span>
                      <span className="text-xs font-bold text-primary">Rs. {parseFloat(prod.base_price).toLocaleString()}</span>
                    </div>
                  </Link>
                ))}
                <button 
                  onClick={handleSearch}
                  className="w-full p-3 text-sm text-center text-primary font-semibold hover:bg-gray-50 bg-gray-50/50 transition-colors"
                >
                  View all results for "{debouncedQuery}"
                </button>
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-gray-500">
                No products found for "{debouncedQuery}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* OFFER TEXTS */}
      <div className="flex flex-col md:flex-row text-white gap-2 md:gap-6 text-sm md:text-base items-center text-center">
        <div>Free Shipping Over NRP. 2800/-</div>
        <div>30 DAYS MONEY BACK</div>
        <div>100% SECURE payment</div>
      </div>
    </div>
  );
};

export default SearchBox;
