"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { submitContactForm, ContactFormData } from "@/services/contact";
import GoogleReCaptcha, { GoogleReCaptchaHandle } from "@/components/common/GoogleReCaptcha";

// Simple SVG Icons
const PhoneIcon = ({ className }: { className?: string }) => (
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
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const EmailIcon = ({ className }: { className?: string }) => (
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
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const LocationIcon = ({ className }: { className?: string }) => (
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
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
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
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const SendIcon = ({ className }: { className?: string }) => (
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
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
    />
  </svg>
);

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

export default function ContactUsPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<GoogleReCaptchaHandle>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate reCAPTCHA
    if (!recaptchaToken) {
      setErrorMessage("Please complete the reCAPTCHA verification");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSubmitStatus("idle");

    // Prepare contact data
    const contactData: ContactFormData = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject || `Contact from ${formData.name}`,
      message: formData.message,
      phone: formData.phone || undefined,
      company: formData.company || undefined,
    };

    try {
      const response = await submitContactForm(contactData);
      
      if (response.status) {
        setSubmitStatus("success");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
        });
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
        // Show confirmation modal
        setShowConfirmModal(true);
      } else {
        setSubmitStatus("error");
        setErrorMessage(response.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus("error");
      setErrorMessage("Failed to send message. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: "Phone",
      details: ["+91 11 4601 1835", "+91-8447758768 - India", "+91 9999219228 – International"],
      color: "from-[#2b8ffb] to-[#2b8ffb]/80",
    },
    {
      icon: EmailIcon,
      title: "Email",
      details: ["contactus@achromicpoint.com", "nupur.verma@achromicpoint.com"],
      color: "from-[#6c7cae] to-[#6c7cae]/80",
    },
    {
      icon: LocationIcon,
      title: "Address",
      details: ["F-11, First Floor, Kalkaji, New Delhi-110019, India"],
      color: "from-[#9c408c] to-[#9c408c]/80",
    },
    {
      icon: ClockIcon,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:30 AM - 6:00 PM",
        "1st, 3rd & 5th Saturday: 09:30 AM - 6:00 PM",
      ],
      color: "from-[#2b8ffb] to-[#6c7cae]",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#6c7cae]/5">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Get in touch with our team. We're here to help you with your
              training, events, and consulting needs. Reach out to us today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <span className="text-white font-medium">📞 +91 11 4601 1835</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <span className="text-white font-medium">
                  📧 contactus@achromicpoint.com
                </span>
                <span className="text-white font-medium">
                  📧 nupur.verma@achromicpoint.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600">
                We'd love to hear from you. Send us a message and we'll respond
                as soon as possible.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600 mb-1">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-[#2b8ffb]/5 to-[#6c7cae]/5 rounded-xl p-6 border border-[#2b8ffb]/10">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Why Choose Achromic Point?
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center space-x-2">
                  <span className="text-[#2b8ffb]">✓</span>
                  <span>Expert-led training programs</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#2b8ffb]">✓</span>
                  <span>Industry-recognized certifications</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#2b8ffb]">✓</span>
                  <span>Flexible learning options</span>
                </li>
                {/* <li className="flex items-center space-x-2">
                  <span className="text-[#2b8ffb]">✓</span>
                  <span>Post-training support</span>
                </li> */}
                <li className="flex items-center space-x-2">
                  <span className="text-[#2b8ffb]">✓</span>
                  <span>Strong Event & Networking Capabilities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#2b8ffb]">✓</span>
                  <span>Brand Visibility & Lead Generation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-[#2b8ffb]">✓</span>
                  <span>Comprehensive Enterprise Solutions</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>

            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">
                  ✅ Thank you! Your message has been sent successfully. We'll
                  get back to you soon.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">
                  ❌ {errorMessage || "Sorry, there was an error sending your message. Please try again."}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 text-gray-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Your full name"
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
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number <span className="">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-transparent transition-colors duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              {/* reCAPTCHA */}
              <div>
                <GoogleReCaptcha
                  ref={recaptchaRef}
                  onChange={setRecaptchaToken}
                  onExpired={() => setRecaptchaToken(null)}
                  onError={() => setRecaptchaToken(null)}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] hover:from-[#2b8ffb]/90 hover:to-[#6c7cae]/90 shadow-lg hover:shadow-xl"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <SendIcon className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit our office in New Delhi</h2>
           
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-[#2b8ffb]/10 to-[#6c7cae]/10 flex items-center justify-center">
              <div className="text-center">
                <LocationIcon className="w-16 h-16 text-[#2b8ffb] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Achromic Point Office
                </h3>
                <p className="text-gray-600 mb-4">
                  F-11, First Floor, Kalkaji, New Delhi-110019, India
                </p>
                <a
                  href="https://www.google.com/maps/search/F-11,+First+Floor,+Kalkaji+New+Delhi-110019,+India/@28.5406586,77.2484486,15.76z?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  className="bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#2b8ffb]/90 hover:to-[#6c7cae]/90 transition-all duration-200"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            📞 Need immediate assistance? Call us at +91 11 4601 1835 or
            +91-8447758768
          </p>
          <p className="text-sm text-gray-400 mt-2">
            © 2026 Achromic Point. All rights reserved.
          </p>
        </div>
      </div>

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
              {/* Success Icon with Animation */}
              <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Success Message */}
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Message Sent Successfully!
              </h3>
              <p className="text-gray-600 mb-3 text-lg">
                Thank you for contacting us!
              </p>
              <p className="text-gray-500 text-sm mb-8">
                We've received your message and will get back to you within 1-2 business days.
                Our team is reviewing your inquiry.
              </p>

              {/* Contact Info */}
              <div className="bg-gradient-to-r from-[#2b8ffb]/5 to-[#6c7cae]/5 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Need urgent assistance?</span>
                  <br />
                  Call us at <span className="text-[#2b8ffb] font-semibold">+91 11 4601 1835</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] hover:opacity-95 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Close
                </button>
                <Link
                  href="/"
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 inline-flex items-center justify-center rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-all duration-200"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
