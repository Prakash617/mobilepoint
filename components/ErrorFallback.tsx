"use client";

import React from "react";
import { FiRefreshCw } from "react-icons/fi";

interface ErrorFallbackProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorFallback({
  message = "Something went wrong",
  onRetry,
  className = "",
}: ErrorFallbackProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-6 text-center bg-gray-50 rounded-lg ${className}`}
    >
      <div className="mb-3 text-gray-400">
        <svg
          className="w-10 h-10 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </div>
      <p className="text-sm text-gray-600 mb-3">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <FiRefreshCw className="w-3.5 h-3.5" />
          Try Again
        </button>
      )}
    </div>
  );
}
