"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import { paymentService } from "@/services/paymentService";
import { toast } from "sonner";

function KhaltiSuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const pidx = searchParams.get("pidx");
    const khaltiStatus = searchParams.get("status");

    if (!pidx) {
      setStatus("error");
      setMessage("No transaction data received from Khalti.");
      return;
    }

    if (khaltiStatus && khaltiStatus.toLowerCase() !== "completed") {
      setStatus("error");
      setMessage(`Payment was not completed. Status: ${khaltiStatus}`);
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await paymentService.verifyKhalti(pidx) as { status?: string };
        if (response.status === "complete") {
          setStatus("success");
          setMessage("Your payment was successful!");
          toast.success("Payment successful!");
        } else {
          setStatus("error");
          setMessage(`Payment status: ${response.status}`);
        }
      } catch {
        setStatus("error");
        setMessage("Failed to verify payment with our server.");
        toast.error("Payment verification failed");
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (status === "loading") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <FaSpinner className="w-12 h-12 text-[#0073bc] animate-spin mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Verifying Payment...
          </h1>
          <p className="text-gray-500">Please wait while we verify your payment.</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-3">
              Payment Successful!
            </h1>
            <p className="text-gray-500 mb-8">{message}</p>
            <div className="space-y-3">
              <Link
                href="/"
                className="block w-full bg-[#0073bc] hover:brightness-90 text-white font-bold py-3 rounded-xl transition"
              >
                Continue Shopping
              </Link>
              <Link
                href="/dashboard"
                className="block w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition"
              >
                View My Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-3">
            Payment Failed
          </h1>
          <p className="text-gray-500 mb-8">{message}</p>
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

export default function KhaltiSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center px-4">Loading...</div>}>
      <KhaltiSuccessContent />
    </Suspense>
  );
}
