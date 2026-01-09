"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, Clock, ArrowLeft } from "lucide-react";

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error") || "Payment could not be processed";

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
              {errorMessage}
            </p>
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
            <Link
              href="/cart"
              className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-red-600 hover:to-rose-700 transition-all shadow-lg hover:shadow-xl text-center"
            >
              Retry Payment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}