"use client";
import { useEffect, useRef } from "react";

interface PayURedirectProps {
  gatewayUrl: string;
  params: Record<string, string>;
}

export default function PayURedirect({ gatewayUrl, params }: PayURedirectProps) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      formRef.current?.submit();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center w-[360px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>

        <h2 className="text-lg font-semibold mb-1">
          Redirecting to PayU
        </h2>
        <p className="text-sm text-gray-500">
          Please do not refresh or close this window
        </p>

        <form
          ref={formRef}
          method="POST"
          action={gatewayUrl}
          className="hidden"
        >
          {Object.entries(params).map(([key, value]) => (
            <input
              key={key}
              type="hidden"
              name={key}
              value={value}
            />
          ))}
        </form>
      </div>
    </div>
  );
}
