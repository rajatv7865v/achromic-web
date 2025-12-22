"use client";

import { useState } from "react";
import Link from "next/link";
import RegisterCard from "@/components/card/Registeration";

// SVG Icons
const UserIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const BuildingIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

// Event data
const events = [
  {
    id: 1,
    title: "Financial Compliance & Risk Management Summit 2025",
    date: "March 15, 2025",
    location: "New Delhi",
    price: 12000,
    earlyBirdPrice: 9500,
    category: "Finance",
    duration: "2 Days",
    seats: "200",
    registered: 85,
    featured: true,
    description:
      "Comprehensive training on financial compliance, risk management frameworks, and regulatory updates.",
    benefits: [
      "Industry-recognized certification",
      "Networking with 200+ professionals",
      "Practical case studies",
      "Lunch and refreshments included",
      "Digital learning materials",
    ],
  },
  {
    id: 2,
    title: "Legal Framework & Corporate Governance Conference 2025",
    date: "April 20, 2025",
    location: "Mumbai",
    price: 9500,
    earlyBirdPrice: 7500,
    category: "Legal",
    duration: "2 Days",
    seats: "150",
    registered: 67,
    featured: true,
    description:
      "Deep dive into corporate governance, legal frameworks, and compliance best practices.",
    benefits: [
      "Expert-led sessions",
      "Interactive workshops",
      "Certificate of completion",
      "Networking dinner",
      "Resource materials",
    ],
  },
  {
    id: 3,
    title: "Taxation & GST Compliance Workshop 2025",
    date: "May 10, 2025",
    location: "Bangalore",
    price: 6500,
    earlyBirdPrice: 5000,
    category: "Tax",
    duration: "1 Day",
    seats: "100",
    registered: 45,
    featured: false,
    description:
      "Practical workshop on GST compliance, tax planning strategies, and recent amendments.",
    benefits: [
      "Hands-on training",
      "Latest updates on tax laws",
      "Workshop materials",
      "Expert consultation",
      "Completion certificate",
    ],
  },
];

export default function registerationPage({ eventId }: { eventId: string }) {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    designation: "",
    experience: "",
    eventId: "",
    dietaryRequirements: "",
    specialRequests: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("registeration submitted:", formData);
    alert("registeration submitted successfully! We'll contact you soon.");
  };

  return (
    <>
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Hero Section */}

        {/* Events Selection */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Choose Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae]">
                  Event
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select from our upcoming professional development events and
                secure your registeration
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {events.map((event) => (
                <RegisterCard event={event} />
              ))}
            </div>
          </div>
        </div>

        {/* registeration Form */}
        {selectedEvent && (
          <div className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Complete Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae]">
                    registeration
                  </span>
                </h2>
                <p className="text-lg text-gray-600">
                  Fill in your details to secure your spot at the event
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                      <UserIcon className="w-6 h-6 mr-3 text-[#2b8ffb]" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-transparent transition-all duration-200"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-transparent transition-all duration-200"
                          placeholder="Enter your last name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-transparent transition-all duration-200"
                          placeholder="Enter your email address"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-transparent transition-all duration-200"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                      <BuildingIcon className="w-6 h-6 mr-3 text-[#6c7cae]" />
                      Professional Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Company/Organization *
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-transparent transition-all duration-200"
                          placeholder="Enter your company name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="designation"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Designation *
                        </label>
                        <input
                          type="text"
                          id="designation"
                          name="designation"
                          required
                          value={formData.designation}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-transparent transition-all duration-200"
                          placeholder="Enter your job title"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label
                          htmlFor="experience"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Years of Experience *
                        </label>
                        <select
                          id="experience"
                          name="experience"
                          required
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select your experience level</option>
                          <option value="0-1">0-1 years</option>
                          <option value="2-5">2-5 years</option>
                          <option value="6-10">6-10 years</option>
                          <option value="11-15">11-15 years</option>
                          <option value="15+">15+ years</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                      <ShieldCheckIcon className="w-6 h-6 mr-3 text-[#9c408c]" />
                      Additional Information
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <label
                          htmlFor="dietaryRequirements"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Dietary Requirements
                        </label>
                        <input
                          type="text"
                          id="dietaryRequirements"
                          name="dietaryRequirements"
                          value={formData.dietaryRequirements}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-transparent transition-all duration-200"
                          placeholder="Any dietary restrictions or preferences"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="specialRequests"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Special Requests or Notes
                        </label>
                        <textarea
                          id="specialRequests"
                          name="specialRequests"
                          rows={4}
                          value={formData.specialRequests}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-transparent transition-all duration-200"
                          placeholder="Any special requests or additional information"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="mt-1 h-4 w-4 text-[#2b8ffb] border-gray-300 rounded focus:ring-[#2b8ffb]"
                      />
                      <label
                        htmlFor="terms"
                        className="ml-3 text-sm text-gray-700"
                      >
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="text-[#2b8ffb] hover:underline"
                        >
                          Terms and Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="text-[#2b8ffb] hover:underline"
                        >
                          Privacy Policy
                        </Link>
                        . I understand that my registeration is subject to
                        confirmation and payment.
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white py-4 px-8 rounded-lg font-semibold hover:from-[#2b8ffb]/90 hover:to-[#6c7cae]/90 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                    >
                      Complete registeration
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </button>
                    <Link
                      href="/upcoming-event"
                      className="flex-1 bg-gray-100 text-gray-700 py-4 px-8 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 text-center"
                    >
                      Browse More Events
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
