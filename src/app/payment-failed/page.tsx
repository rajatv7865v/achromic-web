"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, Clock, ArrowLeft } from "lucide-react";

export default function PaymentFailedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorDetails, setErrorDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get error details from query params or session storage
    const error = searchParams.get("error");
    const orderId = searchParams.get("orderId");
    
    // Simulate fetching error details
    setTimeout(() => {
      setErrorDetails({
        orderNumber: "ORD-MJR8RC0O-XZ5251",
        totalAmount: 118,
        currency: "USD",
        paymentMethod: "PayPal",
        errorReason: error || "Payment was cancelled",
        retryAvailable: true,
      });
      setLoading(false);
    }, 1000);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 font-medium">Processing payment status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-rose-600 p-8 text-white text-center">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Payment Failed</h1>
          <p className="text-xl opacity-90">Your transaction could not be completed</p>
        </div>

        <div className="p-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="w-6 h-6 text-red-600" />
              <h2 className="text-lg font-semibold text-red-800">Transaction Failed</h2>
            </div>
            <p className="text-red-700">
              {errorDetails?.errorReason || "We were unable to process your payment. Please try again."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-700 mb-3">Order Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Order Number:</span>
                  <span className="font-medium">#{errorDetails?.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Method:</span>
                  <span className="font-medium">{errorDetails?.paymentMethod}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-700 mb-3">Amount</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total:</span>
                  <span className="font-bold text-lg text-red-600">
                    {errorDetails?.currency} {errorDetails?.totalAmount?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="font-medium text-red-600">Failed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-8">
            <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Need to try again?
            </h3>
            <p className="text-yellow-700 text-sm">
              Don't worry, your order is still in your cart. You can try the payment again with a different method.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            {errorDetails?.retryAvailable && (
              <Link
                href="/cart"
                className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-red-600 hover:to-rose-700 transition-all shadow-lg hover:shadow-xl text-center"
              >
                Retry Payment
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}