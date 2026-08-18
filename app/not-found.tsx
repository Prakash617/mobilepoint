import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center bg-white rounded-xl border border-gray-200 shadow-sm mx-4 md:mx-0 my-8">
      <div className="space-y-6 max-w-lg w-full py-16">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900">
          Page Not Found
        </h2>
        
        <p className="text-gray-500 max-w-sm mx-auto text-sm leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 bg-[#0073bc] text-white px-6 py-2.5 text-sm rounded-lg font-semibold hover:brightness-90 transition w-full sm:w-auto"
          >
            <Home className="w-4 h-4" />
            Go to Homepage
          </Link>
          
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 px-6 py-2.5 text-sm rounded-lg font-semibold hover:bg-gray-200 transition w-full sm:w-auto"
          >
            Shop Products
          </Link>
        </div>
      </div>
    </div>
  );
}
