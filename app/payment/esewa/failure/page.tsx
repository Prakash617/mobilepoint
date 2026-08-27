"use client";

import Link from "next/link";
import { FaTimesCircle } from "react-icons/fa";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { paymentService } from "@/services/paymentService";

export default function EsewaFailurePage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const dataParam = searchParams.get("data");
    if (dataParam) {
      paymentService.verifyEsewaFailure(dataParam).catch(console.error);
    }
  }, [searchParams]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaTimesCircle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-3">
            Payment Failed
          </h1>
          <p className="text-gray-500 mb-8">
            Your payment was not completed. No amount was charged. You can try
            again or choose a different payment method.
          </p>
          <div className="space-y-3">
            <Link
              href="/addtocart"
              className="block w-full bg-[#0073bc] hover:brightness-90 text-white font-bold py-3 rounded-xl transition"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="block w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
