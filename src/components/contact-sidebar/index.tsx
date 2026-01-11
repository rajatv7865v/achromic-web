"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { submitContactForm, ContactFormData } from "@/services/contact";
import GoogleReCaptcha, { GoogleReCaptchaHandle } from "@/components/common/GoogleReCaptcha";

export default function ContactSidebar() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<GoogleReCaptchaHandle>(null);

  return (
    <>
      {/* Message Icon with Hover Animation */}
      <button
        aria-label="Open Contact Modal"
        onClick={() => setOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 group"
      >
        <div className="relative overflow-hidden">
          <div className="flex items-center bg-[#2b8ffb] text-white shadow-2xl border-y border-l border-white/20 rounded-l-2xl transition-all duration-300 ease-in-out group-hover:w-40 w-12">
            <div className="flex items-center justify-center min-w-[48px] h-12">
              <span className="text-xl">💬</span>
            </div>
            <div className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pr-4">
              <span className="font-semibold text-sm">Get In Touch</span>
            </div>
          </div>
        </div>
      </button>

      {/* Modal Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setOpen(false);
              setRecaptchaToken(null);
              recaptchaRef.current?.reset();
            }}
          />

          {/* Modal Card */}
          <div className="relative z-10 mx-4 w-full max-w-lg rounded-2xl bg-white border border-gray-200 shadow-2xl">
            <div className="p-6 sm:p-7">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Contact Us
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    We usually respond within a business day.
                  </p>
                </div>
                <button
                  aria-label="Close Contact Modal"
                  className="text-gray-400 hover:text-gray-600 transition"
                  onClick={() => {
                    setOpen(false);
                    setRecaptchaToken(null);
                    recaptchaRef.current?.reset();
                  }}
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <a
                  href="tel:+91 11 4601 1835"
                  className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 hover:bg-gray-50 transition"
                >
                  <span>📞</span>
                  <div>
                    <p className="text-sm text-gray-500">Call us</p>
                    <p className="font-semibold text-gray-900">
                      +91 11 4601 1835
                    </p>
                  </div>
                </a>
                <a
                  href="mailto:contactus@achromicpoint.com"
                  className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 hover:bg-gray-50 transition"
                >
                  <span>📧</span>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-900 w-full break-all">
                      contactus@achromicpoint.com
                    </p>
                  </div>
                </a>
              </div>

              {/* Quick Message */}
              <form
                className="mt-6 space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  
                  // Validate reCAPTCHA
                  if (!recaptchaToken) {
                    setError("Please complete the reCAPTCHA verification");
                    return;
                  }

                  const form = e.currentTarget as HTMLFormElement;
                  const formData = new FormData(form);
                  const name = String(formData.get("name") || "");
                  const phone = String(formData.get("phone") || "");
                  const email = String(formData.get("email") || "");
                  const message = String(formData.get("message") || "");
                  const company = String(formData.get("company") || "");

                  // Prepare contact data
                  const contactData: ContactFormData = {
                    name,
                    email,
                    subject: `Website Contact: ${name}`,
                    message,
                    phone: phone || undefined,
                    company: company || undefined,
                  };

                  try {
                    setLoading(true);
                    setError(null);
                    setSuccess(false);

                    const response = await submitContactForm(contactData);
                    
                    if (response.status) {
                      setSuccess(true);
                      form.reset();
                      setRecaptchaToken(null);
                      recaptchaRef.current?.reset();
                      
                      // Show confirmation modal
                      setShowConfirmModal(true);
                      
                      // Close the contact form modal
                      setTimeout(() => {
                        setOpen(false);
                        setSuccess(false);
                      }, 500);
                    } else {
                      setError(response.message || "Failed to send message");
                    }
                  } catch (err) {
                    console.error("Error submitting contact form:", err);
                    setError("Failed to send message. Please try again or email us directly.");
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    name="name"
                    required
                    placeholder="Your Name"
                    disabled={loading}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2b8ffb]/30 focus:border-[#2b8ffb] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <input
                    name="phone"
                    placeholder="Phone (optional)"
                    disabled={loading}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2b8ffb]/30 focus:border-[#2b8ffb] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  disabled={loading}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2b8ffb]/30 focus:border-[#2b8ffb] disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <input
                  name="company"
                  placeholder="Company (optional)"
                  disabled={loading}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2b8ffb]/30 focus:border-[#2b8ffb] disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <textarea
                  name="message"
                  rows={4}
                  placeholder="How can we help you?"
                  disabled={loading}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2b8ffb]/30 focus:border-[#2b8ffb] disabled:opacity-50 disabled:cursor-not-allowed"
                />
                
                {/* Success Message */}
                {success && (
                  <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <p className="text-sm text-green-700 font-medium">
                        Message sent successfully! We'll get back to you soon.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-red-600">✕</span>
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                {/* reCAPTCHA */}
                <div>
                  <GoogleReCaptcha
                    ref={recaptchaRef}
                    onChange={setRecaptchaToken}
                    onExpired={() => setRecaptchaToken(null)}
                    onError={() => setRecaptchaToken(null)}
                  />
                </div>
                
                <div className="flex items-center justify-between gap-3">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
                    onClick={() => setOpen(false)}
                  >
                    Visit Contact Page
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-semibold text-white bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] hover:opacity-95 shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowConfirmModal(false)}
          />

          {/* Confirmation Card */}
          <div className="relative z-10 mx-4 w-full max-w-md rounded-2xl bg-white border border-gray-200 shadow-2xl">
            <div className="p-8 text-center">
              {/* Success Icon */}
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Success Message */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Thank You!
              </h3>
              <p className="text-gray-600 mb-2">
                Your message has been sent successfully.
              </p>
              <p className="text-gray-500 text-sm mb-6">
                We'll get back to you within 1-2 business days.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] hover:opacity-95 shadow transition"
                >
                  Close
                </button>
                <Link
                  href="/"
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
