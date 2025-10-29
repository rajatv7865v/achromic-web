"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/footer";
import Partners from "../components/partners";
import { usePartners } from "../hooks/usePartners";
import { mockPartners } from "../data/mockPartners";

// Simple SVG Icons
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
    />
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
    />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M13 7l5 5m0 0l-5 5m5-5H6'
    />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M19 9l-7 7-7-7'
    />
  </svg>
);

const AwardIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
    />
  </svg>
);

const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
    />
  </svg>
);

const ChartBarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    />
  </svg>
);

// Sample data
const upcomingEvents = [
  {
    id: 1,
    title: "Financial Compliance & Risk Management Summit 2025",
    date: "March 15, 2025",
    location: "New Delhi",
    price: 12000,
    category: "Finance",
    attendees: "85/200",
    featured: true,
  },
  {
    id: 2,
    title: "Legal Framework & Corporate Governance Conference 2025",
    date: "April 20, 2025",
    location: "Mumbai",
    price: 9500,
    category: "Legal",
    attendees: "67/150",
    featured: true,
  },
  {
    id: 3,
    title: "Taxation & GST Compliance Workshop 2025",
    date: "May 10, 2025",
    location: "Bangalore",
    price: 6500,
    category: "Tax",
    attendees: "45/100",
    featured: false,
  },
];

const pastEvents = [
  {
    id: 1,
    title: "Financial Compliance & Risk Management Summit 2024",
    date: "March 15, 2024",
    location: "New Delhi",
    attendees: 150,
    rating: 4.8,
    featured: true,
  },
  {
    id: 2,
    title: "Legal Framework & Corporate Governance Conference 2024",
    date: "February 28, 2024",
    location: "Mumbai",
    attendees: 120,
    rating: 4.7,
    featured: true,
  },
  {
    id: 3,
    title: "Taxation & GST Compliance Workshop 2024",
    date: "January 20, 2024",
    location: "Bangalore",
    attendees: 80,
    rating: 4.9,
    featured: false,
  },
];

const services = [
  {
    id: 1,
    title: "Enterprise Solutions",
    description:
      "Comprehensive training and consulting solutions for large organizations.",
    icon: ChartBarIcon,
    features: [
      "Custom Training Programs",
      "Consulting Services",
      "Implementation Support",
    ],
  },
  {
    id: 2,
    title: "Professional Development",
    description:
      "Skill enhancement programs for professionals across various domains.",
    icon: AwardIcon,
    features: [
      "Certification Programs",
      "Skill Assessments",
      "Career Guidance",
    ],
  },
  {
    id: 3,
    title: "eMagazine",
    description:
      "Monthly insights and industry updates through our digital publication.",
    icon: BookOpenIcon,
    features: ["Industry Insights", "Expert Articles", "Case Studies"],
  },
];

const stats = [
  { label: "Years of Experience", value: "15+", icon: AwardIcon },
  { label: "Participants Trained", value: "25,000+", icon: UsersIcon },
  { label: "Corporate Partnerships", value: "4,500+", icon: StarIcon },
  { label: "Global Events Delivered", value: "2,000+", icon: CalendarIcon },
];

const faqs = [
  {
    question: "What types of events does Achromic Point organize?",
    answer:
      "We organize conferences, workshops, training programs, and seminars across various domains including finance, legal, taxation, compliance, and professional development.",
  },
  {
    question: "How can I register for an upcoming event?",
    answer:
      "You can register for our events through our website by clicking on the 'Register Now' button on the event page, or contact us directly for bulk registrations.",
  },
  {
    question: "Do you provide certificates for event participation?",
    answer:
      "Yes, we provide certificates of participation for all our events. For certain training programs, we also offer industry-recognized certifications.",
  },
  {
    question: "Can organizations request custom training programs?",
    answer:
      "Absolutely! We offer customized training solutions tailored to your organization's specific needs. Contact our enterprise solutions team for more details.",
  },
  {
    question: "What is included in the event fee?",
    answer:
      "Event fees typically include access to all sessions, networking opportunities, lunch and refreshments, event materials, and a certificate of participation.",
  },
  {
    question: "Do you offer early bird discounts?",
    answer:
      "Yes, we offer early bird discounts for most of our events. Early bird pricing is usually available until 30 days before the event date.",
  },
];

// Partners Section Component
function PartnersSection() {
  const { featuredPartners, loading, error } = usePartners();
  
  // Use mock data if API fails or is loading
  const partners = featuredPartners.length > 0 ? featuredPartners : mockPartners.filter(p => p.featured);

  if (loading) {
    return (
      <div className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Trusted by Leading Organizations
            </h2>
            <p className='text-lg text-gray-600'>
              We're proud to partner with industry leaders across various sectors
            </p>
          </div>
          <div className='flex justify-center items-center py-12'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#be3437]'></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Trusted by Leading Organizations
            </h2>
            <p className='text-lg text-gray-600 mb-8'>
              We're proud to partner with industry leaders across various sectors
            </p>
            <p className='text-red-600'>Failed to load partners. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Partners 
      partners={partners}
      title="Trusted by Leading Organizations"
      subtitle="We're proud to partner with industry leaders across various sectors"
      maxItems={12}
    />
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <>
      {/* Custom CSS for Advanced Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
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
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes text-glow {
          0%,
          100% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
          }
          50% {
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.8),
              0 0 40px rgba(255, 255, 255, 0.6);
          }
        }
        @keyframes card-float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-5px) rotate(1deg);
          }
          66% {
            transform: translateY(5px) rotate(-1deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
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
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient-shift 8s ease infinite;
        }
        .animate-text-glow {
          animation: text-glow 3s ease-in-out infinite;
        }
        .animate-card-float {
          animation: card-float 4s ease-in-out infinite;
        }
        .animate-card-float:nth-child(2) {
          animation-delay: 0.5s;
        }
        .animate-card-float:nth-child(3) {
          animation-delay: 1s;
        }
        .animate-card-float:nth-child(4) {
          animation-delay: 1.5s;
        }
        .animate-card-float:nth-child(5) {
          animation-delay: 2s;
        }
        .animate-card-float:nth-child(6) {
          animation-delay: 2.5s;
        }

        /* Glassmorphism Effects */
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Neumorphism Effects */
        .neu-card {
          background: #f0f0f0;
          box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
        }

        /* Hover Effects */
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        /* Gradient Text */
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Morphing Shapes */
        .morph-shape {
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          animation: morph 8s ease-in-out infinite;
        }
        @keyframes morph {
          0%,
          100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% {
            border-radius: 40% 60% 70% 30% / 60% 40% 60% 30%;
          }
          75% {
            border-radius: 70% 30% 40% 60% / 30% 60% 40% 60%;
          }
        }
      `}</style>

      <div className='min-h-screen bg-white'>
        {/* Hero Section */}
        <div className='relative py-20 overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-r from-[#be3437]/90 to-[#6c7cae]/90'>
            <div
              className='absolute inset-0 bg-cover bg-center bg-no-repeat'
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80")',
              }}
            ></div>
            <div className='absolute inset-0 bg-gradient-to-r from-[#be3437]/80 to-[#6c7cae]/80'></div>

            {/* Advanced Animated Elements */}
            <div className='absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse'></div>
            <div className='absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000'></div>
            <div className='absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse delay-500'></div>

            {/* Floating Geometric Shapes */}
            <div className='absolute top-20 right-20 w-8 h-8 border-2 border-white/20 rotate-45 animate-spin-slow'></div>
            <div className='absolute bottom-32 left-32 w-12 h-12 border-2 border-white/15 rounded-full animate-bounce-slow'></div>
            <div className='absolute top-1/3 right-1/3 w-6 h-6 bg-white/10 transform rotate-12 animate-pulse'></div>

            {/* Gradient Orbs */}
            <div className='absolute top-1/4 left-1/3 w-24 h-24 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full blur-2xl animate-float'></div>
            <div className='absolute bottom-1/4 right-1/4 w-20 h-20 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-xl animate-float-delayed'></div>
          </div>

          <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center'>
              <div className='mb-6'>
                <div className='inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 border border-white/20 mb-4'>
                  <span className='text-white/90 font-medium'>
                    🏆 Achromic Point
                  </span>
                </div>
              </div>
              <h1 className='text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg animate-text-glow'>
                Empowering Professionals Through
                <span className='block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 animate-gradient'>
                  Excellence in Training
                </span>
              </h1>
              <p className='text-xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow-md'>
                Join India's premier platform for professional development,
                compliance training, and industry expertise. Connect with
                leaders, enhance your skills, and advance your career.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Link
                  href='/upcoming-event'
                  className='bg-white text-[#be3437] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg text-lg'
                >
                  View Upcoming Events
                </Link>
                <Link
                  href='/contact-us'
                  className='border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#be3437] transition-all duration-200 text-lg'
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Creative Features Showcase */}
        <div className='relative py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                Why Choose{" "}
                <span className='gradient-text'>Achromic Point?</span>
              </h2>
              <p className='text-lg text-gray-600'>
                Experience the future of professional development
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {/* Feature 1 - Expert-led Training Programs */}
              <div className='group relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-[#be3437]/10 to-[#6c7cae]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300'></div>
                <div className='relative glass-card rounded-2xl p-6 text-center hover-lift'>
                  <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#be3437] to-[#6c7cae] rounded-full flex items-center justify-center animate-float'>
                    <AwardIcon className='w-8 h-8 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                    Expert-led Training Programs
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Industry professionals with extensive experience leading comprehensive training sessions
                  </p>
                </div>
              </div>

              {/* Feature 2 - Industry-recognized Certifications */}
              <div className='group relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-[#6c7cae]/10 to-[#9c408c]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300'></div>
                <div className='relative glass-card rounded-2xl p-6 text-center hover-lift'>
                  <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#6c7cae] to-[#9c408c] rounded-full flex items-center justify-center animate-float-delayed'>
                    <BookOpenIcon className='w-8 h-8 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                    Industry-recognized Certifications
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Earn valuable certifications that enhance your professional credibility
                  </p>
                </div>
              </div>

              {/* Feature 3 - Flexible Learning Options */}
              <div className='group relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-[#9c408c]/10 to-[#be3437]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300'></div>
                <div className='relative glass-card rounded-2xl p-6 text-center hover-lift'>
                  <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#9c408c] to-[#be3437] rounded-full flex items-center justify-center animate-bounce-slow'>
                    <CalendarIcon className='w-8 h-8 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                    Flexible Learning Options
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Choose from online, offline, or hybrid learning formats to fit your schedule
                  </p>
                </div>
              </div>

              {/* Feature 4 - Post-training Support */}
              <div className='group relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-[#be3437]/10 to-[#6c7cae]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300'></div>
                <div className='relative glass-card rounded-2xl p-6 text-center hover-lift'>
                  <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#be3437] to-[#6c7cae] rounded-full flex items-center justify-center animate-spin-slow'>
                    <StarIcon className='w-8 h-8 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                    Post-training Support
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Ongoing assistance and resources to ensure successful implementation
                  </p>
                </div>
              </div>

              {/* Feature 5 - Strong Event & Networking Capabilities */}
              <div className='group relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-[#6c7cae]/10 to-[#9c408c]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300'></div>
                <div className='relative glass-card rounded-2xl p-6 text-center hover-lift'>
                  <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#6c7cae] to-[#9c408c] rounded-full flex items-center justify-center animate-float'>
                    <CalendarIcon className='w-8 h-8 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                    Strong Event & Networking Capabilities
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Connect with industry peers and expand your professional network
                  </p>
                </div>
              </div>

              {/* Feature 6 - Brand Visibility & Lead Generation */}
              <div className='group relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-[#9c408c]/10 to-[#be3437]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300'></div>
                <div className='relative glass-card rounded-2xl p-6 text-center hover-lift'>
                  <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#9c408c] to-[#be3437] rounded-full flex items-center justify-center animate-bounce-slow'>
                    <StarIcon className='w-8 h-8 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                    Brand Visibility & Lead Generation
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Enhance your brand presence and generate valuable business opportunities
                  </p>
                </div>
              </div>

              {/* Feature 7 - Comprehensive Enterprise Solutions */}
              <div className='group relative md:col-span-2 lg:col-span-1'>
                <div className='absolute inset-0 bg-gradient-to-r from-[#be3437]/10 to-[#6c7cae]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300'></div>
                <div className='relative glass-card rounded-2xl p-6 text-center hover-lift'>
                  <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#be3437] to-[#6c7cae] rounded-full flex items-center justify-center animate-float-delayed'>
                    <AwardIcon className='w-8 h-8 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                    Comprehensive Enterprise Solutions
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Tailored training and development solutions for organizations of all sizes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className='bg-gray-50 py-16'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
              {stats.map((stat, index) => (
                <div key={index} className='text-center'>
                  <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#be3437] to-[#6c7cae] rounded-full mb-4'>
                    <stat.icon className='w-8 h-8 text-white' />
                  </div>
                  <div className='text-3xl font-bold text-gray-900 mb-2'>
                    {stat.value}
                  </div>
                  <div className='text-gray-600 font-medium'>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <PartnersSection />

        {/* Upcoming Events Section */}
        <div className='py-20 bg-white'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl font-bold text-gray-900 mb-4'>
                Upcoming Events
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Don't miss our upcoming conferences, workshops, and training
                programs. Secure your spot and advance your professional
                journey.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100'
                >
                  <div className='relative'>
                    <div className='h-48 bg-gradient-to-br from-[#be3437]/10 to-[#6c7cae]/10 flex items-center justify-center'>
                      <div className='text-center'>
                        <CalendarIcon className='w-16 h-16 text-[#be3437] mx-auto mb-4' />
                        <div className='text-2xl font-bold text-gray-800 mb-2'>
                          {event.date}
                        </div>
                        <div className='text-lg font-semibold text-gray-700'>
                          {event.location}
                        </div>
                      </div>
                    </div>
                    {event.featured && (
                      <div className='absolute top-4 right-4 bg-[#be3437] text-white px-3 py-1 rounded-full text-sm font-semibold'>
                        Featured
                      </div>
                    )}
                  </div>

                  <div className='p-6'>
                    <div className='flex items-center justify-between mb-3'>
                      <span className='bg-[#be3437]/10 text-[#be3437] px-3 py-1 rounded-full text-sm font-medium'>
                        {event.category}
                      </span>
                      <div className='text-right'>
                        <div className='text-lg font-bold text-gray-900'>
                          ₹{event.price.toLocaleString()}
                        </div>
                        <div className='text-xs text-gray-500'>Early Bird</div>
                      </div>
                    </div>

                    <h3 className='text-lg font-bold text-gray-900 mb-3 line-clamp-2'>
                      {event.title}
                    </h3>

                    <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
                      <div className='flex items-center space-x-1'>
                        <UsersIcon className='w-4 h-4' />
                        <span>{event.attendees} registered</span>
                      </div>
                    </div>

                    <Link
                      href='/upcoming-event'
                      className='w-full bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white px-4 py-2 rounded-lg font-semibold hover:from-[#be3437]/90 hover:to-[#6c7cae]/90 transition-all duration-200 text-center block'
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className='text-center'>
              <Link
                href='/upcoming-event'
                className='inline-flex items-center bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white px-8 py-3 rounded-full font-semibold hover:from-[#be3437]/90 hover:to-[#6c7cae]/90 transition-all duration-200 shadow-lg'
              >
                View All Upcoming Events
                <ArrowRightIcon className='w-5 h-5 ml-2' />
              </Link>
            </div>
          </div>
        </div>

        {/* Our Partners Section */}
        <div className='py-16 bg-gray-50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                Our Partners
              </h2>
              <p className='text-lg text-gray-600'>
                Collaborating with industry leaders to deliver exceptional events
              </p>
            </div>
            
            <Partners 
              partners={mockPartners}
              title=""
              subtitle=""
              showAll={true}
              maxItems={8}
              className="bg-gray-50"
            />
          </div>
        </div>

        {/* Services Section */}
        <div className='bg-gray-50 py-20'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl font-bold text-gray-900 mb-4'>
                Our Services
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Comprehensive solutions designed to meet your professional
                development and training needs.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {services.map((service) => (
                <div
                  key={service.id}
                  className='bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
                >
                  <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#be3437] to-[#6c7cae] rounded-full mb-6'>
                    <service.icon className='w-8 h-8 text-white' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-4'>
                    {service.title}
                  </h3>
                  <p className='text-gray-600 mb-6'>{service.description}</p>
                  <ul className='space-y-2'>
                    {service.features.map((feature, index) => (
                      <li key={index} className='flex items-center space-x-2'>
                        <CheckCircleIcon className='w-4 h-4 text-[#be3437] flex-shrink-0' />
                        <span className='text-gray-700 text-sm'>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Past Events Section */}
        <div className='py-20 bg-white'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl font-bold text-gray-900 mb-4'>
                Past Events
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Explore our successful past events and conferences. Learn from
                our expertise and join us for future transformative experiences.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
              {pastEvents.map((event) => (
                <div
                  key={event.id}
                  className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100'
                >
                  <div className='relative'>
                    <div className='h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center'>
                      <div className='text-center'>
                        <CalendarIcon className='w-16 h-16 text-gray-600 mx-auto mb-4' />
                        <div className='text-2xl font-bold text-gray-800 mb-2'>
                          {event.date}
                        </div>
                        <div className='text-lg font-semibold text-gray-700'>
                          {event.location}
                        </div>
                      </div>
                    </div>
                    {event.featured && (
                      <div className='absolute top-4 right-4 bg-[#6c7cae] text-white px-3 py-1 rounded-full text-sm font-semibold'>
                        Featured
                      </div>
                    )}
                  </div>

                  <div className='p-6'>
                    <h3 className='text-lg font-bold text-gray-900 mb-3 line-clamp-2'>
                      {event.title}
                    </h3>

                    <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
                      <div className='flex items-center space-x-1'>
                        <UsersIcon className='w-4 h-4' />
                        <span>{event.attendees} attendees</span>
                      </div>
                      <div className='flex items-center space-x-1'>
                        {renderStars(event.rating)}
                        <span className='text-xs text-gray-500 ml-1'>
                          ({event.rating})
                        </span>
                      </div>
                    </div>

                    <Link
                      href='/past-event'
                      className='w-full bg-gradient-to-r from-[#6c7cae] to-[#9c408c] text-white px-4 py-2 rounded-lg font-semibold hover:from-[#6c7cae]/90 hover:to-[#9c408c]/90 transition-all duration-200 text-center block'
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className='text-center'>
              <Link
                href='/past-event'
                className='inline-flex items-center bg-gradient-to-r from-[#6c7cae] to-[#9c408c] text-white px-8 py-3 rounded-full font-semibold hover:from-[#6c7cae]/90 hover:to-[#9c408c]/90 transition-all duration-200 shadow-lg'
              >
                View All Past Events
                <ArrowRightIcon className='w-5 h-5 ml-2' />
              </Link>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className='py-20 bg-gray-50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl font-bold text-gray-900 mb-4'>
                Event Gallery
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Take a look at our successful events and see the impact we've
                made in professional development and training.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
              {/* Gallery Item 1 */}
              <div className='group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-card-float'>
                <div className='h-64 bg-gradient-to-br from-[#be3437]/20 to-[#6c7cae]/20 flex items-center justify-center'>
                  <div className='text-center'>
                    <UsersIcon className='w-16 h-16 text-[#be3437] mx-auto mb-3' />
                    <h3 className='text-lg font-semibold text-gray-800'>
                      Financial Summit 2024
                    </h3>
                    <p className='text-sm text-gray-600'>150+ Professionals</p>
                  </div>
                </div>
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4'>
                  <div className='text-white'>
                    <p className='text-sm font-medium'>
                      Keynote sessions and networking
                    </p>
                  </div>
                </div>
              </div>

              {/* Gallery Item 2 */}
              <div className='group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-card-float'>
                <div className='h-64 bg-gradient-to-br from-[#6c7cae]/20 to-[#9c408c]/20 flex items-center justify-center'>
                  <div className='text-center'>
                    <AwardIcon className='w-16 h-16 text-[#6c7cae] mx-auto mb-3' />
                    <h3 className='text-lg font-semibold text-gray-800'>
                      Legal Conference 2024
                    </h3>
                    <p className='text-sm text-gray-600'>120+ Attendees</p>
                  </div>
                </div>
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4'>
                  <div className='text-white'>
                    <p className='text-sm font-medium'>
                      Corporate governance discussions
                    </p>
                  </div>
                </div>
              </div>

              {/* Gallery Item 3 */}
              <div className='group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                <div className='h-64 bg-gradient-to-br from-[#9c408c]/20 to-[#be3437]/20 flex items-center justify-center'>
                  <div className='text-center'>
                    <BookOpenIcon className='w-16 h-16 text-[#9c408c] mx-auto mb-3' />
                    <h3 className='text-lg font-semibold text-gray-800'>
                      GST Workshop 2024
                    </h3>
                    <p className='text-sm text-gray-600'>80+ Participants</p>
                  </div>
                </div>
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4'>
                  <div className='text-white'>
                    <p className='text-sm font-medium'>
                      Hands-on training sessions
                    </p>
                  </div>
                </div>
              </div>

              {/* Gallery Item 4 */}
              <div className='group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                <div className='h-64 bg-gradient-to-br from-[#be3437]/20 to-[#6c7cae]/20 flex items-center justify-center'>
                  <div className='text-center'>
                    <ChartBarIcon className='w-16 h-16 text-[#be3437] mx-auto mb-3' />
                    <h3 className='text-lg font-semibold text-gray-800'>
                      Enterprise Training
                    </h3>
                    <p className='text-sm text-gray-600'>Corporate Programs</p>
                  </div>
                </div>
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4'>
                  <div className='text-white'>
                    <p className='text-sm font-medium'>
                      Custom training solutions
                    </p>
                  </div>
                </div>
              </div>

              {/* Gallery Item 5 */}
              <div className='group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                <div className='h-64 bg-gradient-to-br from-[#6c7cae]/20 to-[#9c408c]/20 flex items-center justify-center'>
                  <div className='text-center'>
                    <StarIcon className='w-16 h-16 text-[#6c7cae] mx-auto mb-3' />
                    <h3 className='text-lg font-semibold text-gray-800'>
                      Award Ceremony 2024
                    </h3>
                    <p className='text-sm text-gray-600'>
                      Excellence Recognition
                    </p>
                  </div>
                </div>
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4'>
                  <div className='text-white'>
                    <p className='text-sm font-medium'>
                      Celebrating achievements
                    </p>
                  </div>
                </div>
              </div>

              {/* Gallery Item 6 */}
              <div className='group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
                <div className='h-64 bg-gradient-to-br from-[#9c408c]/20 to-[#be3437]/20 flex items-center justify-center'>
                  <div className='text-center'>
                    <CheckCircleIcon className='w-16 h-16 text-[#9c408c] mx-auto mb-3' />
                    <h3 className='text-lg font-semibold text-gray-800'>
                      Certification Program
                    </h3>
                    <p className='text-sm text-gray-600'>
                      Professional Development
                    </p>
                  </div>
                </div>
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4'>
                  <div className='text-white'>
                    <p className='text-sm font-medium'>
                      Industry-recognized certifications
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='text-center'>
              <Link
                href='/past-event'
                className='inline-flex items-center bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white px-8 py-3 rounded-full font-semibold hover:from-[#be3437]/90 hover:to-[#6c7cae]/90 transition-all duration-200 shadow-lg'
              >
                View All Event Photos
                <ArrowRightIcon className='w-5 h-5 ml-2' />
              </Link>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className='bg-gradient-to-r from-[#be3437] to-[#6c7cae] py-20'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              <div>
                <h2 className='text-4xl font-bold text-white mb-6'>
                  About Achromic Point
                </h2>
                <p className='text-xl text-white/90 mb-6'>
                  We are India's leading platform for professional development,
                  compliance training, and industry expertise. With over 15
                  years of experience, we have successfully trained more than
                  50,000 professionals across various industries.
                </p>
                <p className='text-lg text-white/80 mb-8'>
                  Our mission is to empower professionals through excellence in
                  training, providing them with the knowledge and skills needed
                  to excel in their careers and contribute to organizational
                  success.
                </p>
                <div className='flex flex-col sm:flex-row gap-4'>
                  <Link
                    href='/contact-us'
                    className='bg-white text-[#be3437] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg text-center'
                  >
                    Learn More About Us
                  </Link>
                  <Link
                    href='/emagzine'
                    className='border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#be3437] transition-all duration-200 text-center'
                  >
                    Read Our eMagazine
                  </Link>
                </div>
              </div>
              <div className='relative'>
                <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20'>
                  <div className='grid grid-cols-2 gap-6'>
                    <div className='text-center'>
                      <div className='text-3xl font-bold text-white mb-2'>
                        15+
                      </div>
                      <div className='text-white/80 text-sm'>
                        Years Experience
                      </div>
                    </div>
                    <div className='text-center'>
                      <div className='text-3xl font-bold text-white mb-2'>
                        500+
                      </div>
                      <div className='text-white/80 text-sm'>
                        Events Conducted
                      </div>
                    </div>
                    <div className='text-center'>
                      <div className='text-3xl font-bold text-white mb-2'>
                        50K+
                      </div>
                      <div className='text-white/80 text-sm'>
                        Professionals Trained
                      </div>
                    </div>
                    <div className='text-center'>
                      <div className='text-3xl font-bold text-white mb-2'>
                        200+
                      </div>
                      <div className='text-white/80 text-sm'>
                        Industry Partners
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className='py-20 bg-gray-50'>
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl font-bold text-gray-900 mb-4'>
                Frequently Asked Questions
              </h2>
              <p className='text-xl text-gray-600'>
                Find answers to common questions about our events and services.
              </p>
            </div>

            <div className='space-y-4'>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className='w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200'
                  >
                    <span className='font-semibold text-gray-900'>
                      {faq.question}
                    </span>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className='px-6 pb-4'>
                      <p className='text-gray-600 leading-relaxed'>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
      

        {/* Footer */}
        <Footer />

        {/* Enhanced Testimonial Section */}
        <div className='relative py-20 overflow-hidden'>
          {/* Background with animated elements */}
          <div className='absolute inset-0 bg-gradient-to-br from-[#be3437]/5 via-[#6c7cae]/5 to-[#9c408c]/5'>
            {/* Floating decorative elements */}
            <div className='absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-[#be3437]/10 to-[#6c7cae]/10 rounded-full blur-3xl animate-float'></div>
            <div className='absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-[#6c7cae]/10 to-[#9c408c]/10 rounded-full blur-3xl animate-float-delayed'></div>
            <div className='absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-[#9c408c]/10 to-[#be3437]/10 rounded-full blur-2xl animate-bounce-slow'></div>
          </div>

          <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-16'>
              <div className='inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 border border-[#be3437]/20 mb-6'>
                <span className='text-[#be3437] font-semibold text-sm uppercase tracking-wider'>
                  ⭐ Testimonials
                </span>
              </div>
              <h2 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6'>
                Voices of
                <span className='block text-transparent bg-clip-text bg-gradient-to-r from-[#be3437] via-[#6c7cae] to-[#9c408c] animate-gradient'>
                  Success
                </span>
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Discover how our training programs have transformed careers and
                empowered professionals across India's leading organizations
              </p>
            </div>

            {/* Featured Testimonial */}
            <div className='mb-16'>
              <div className='group relative max-w-4xl mx-auto'>
                <div className='absolute inset-0 bg-gradient-to-r from-[#be3437]/20 to-[#6c7cae]/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500'></div>
                <div className='relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl hover-lift'>
                  <div className='flex items-center justify-center mb-8'>
                    <div className='w-20 h-20 bg-gradient-to-r from-[#be3437] to-[#6c7cae] rounded-full flex items-center justify-center animate-float'>
                      <span className='text-white font-bold text-2xl'>RK</span>
                    </div>
                  </div>
                  <blockquote className='text-center mb-8'>
                    <p className='text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed italic'>
                      "Achromic Point didn't just provide training; they
                      transformed my entire approach to financial compliance.
                      The practical insights and real-world applications have
                      been game-changing for my career."
                    </p>
                  </blockquote>
                  <div className='flex justify-center mb-6 space-x-1'>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-6 h-6 text-yellow-400 fill-current ${
                          i % 2 === 0 ? "animate-pulse" : "animate-bounce"
                        }`}
                      />
                    ))}
                  </div>
                  <div className='text-center'>
                    <h4 className='text-xl font-bold text-gray-900 mb-2'>
                      Rajesh Kumar
                    </h4>
                    <p className='text-[#be3437] font-semibold mb-2'>
                      Chief Financial Officer
                    </p>
                    <p className='text-gray-600'>
                      TechCorp Industries • Fortune 500
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid Testimonials */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {/* Testimonial 1 */}
              <div className='group relative'>
                <div className='absolute inset-0 bg-gradient-to-br from-[#be3437]/15 to-[#6c7cae]/15 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300'></div>
                <div className='relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift border border-gray-100'>
                  <div className='flex items-center mb-4'>
                    <div className='w-16 h-16 bg-gradient-to-r from-[#be3437] to-[#6c7cae] rounded-full flex items-center justify-center mr-4 animate-bounce-slow'>
                      <span className='text-white font-bold text-lg'>PS</span>
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-bold text-gray-900 text-lg'>
                        Priya Sharma
                      </h4>
                      <p className='text-[#6c7cae] font-semibold text-sm'>
                        Legal Counsel
                      </p>
                      <p className='text-gray-500 text-xs'>InnovateLtd</p>
                    </div>
                  </div>
                  <div className='flex mb-4'>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className='w-4 h-4 text-yellow-400 fill-current'
                      />
                    ))}
                  </div>
                  <blockquote className='text-gray-700 italic leading-relaxed'>
                    "The Legal Framework Conference provided cutting-edge
                    insights into corporate governance. The expert speakers and
                    interactive sessions exceeded my expectations completely."
                  </blockquote>
                  <div className='mt-4 pt-4 border-t border-gray-100'>
                    <p className='text-xs text-gray-500'>
                      Attended: Legal Framework Conference 2024
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className='group relative'>
                <div className='absolute inset-0 bg-gradient-to-br from-[#6c7cae]/15 to-[#9c408c]/15 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300'></div>
                <div className='relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift border border-gray-100'>
                  <div className='flex items-center mb-4'>
                    <div className='w-16 h-16 bg-gradient-to-r from-[#6c7cae] to-[#9c408c] rounded-full flex items-center justify-center mr-4 animate-spin-slow'>
                      <span className='text-white font-bold text-lg'>AP</span>
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-bold text-gray-900 text-lg'>
                        Amit Patel
                      </h4>
                      <p className='text-[#9c408c] font-semibold text-sm'>
                        Tax Consultant
                      </p>
                      <p className='text-gray-500 text-xs'>FinancePro</p>
                    </div>
                  </div>
                  <div className='flex mb-4'>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className='w-4 h-4 text-yellow-400 fill-current'
                      />
                    ))}
                  </div>
                  <blockquote className='text-gray-700 italic leading-relaxed'>
                    "The GST Compliance Workshop was a game-changer. The
                    hands-on approach and real-world case studies helped me
                    implement better tax strategies for my clients."
                  </blockquote>
                  <div className='mt-4 pt-4 border-t border-gray-100'>
                    <p className='text-xs text-gray-500'>
                      Attended: GST Compliance Workshop 2024
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className='group relative'>
                <div className='absolute inset-0 bg-gradient-to-br from-[#9c408c]/15 to-[#be3437]/15 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300'></div>
                <div className='relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift border border-gray-100'>
                  <div className='flex items-center mb-4'>
                    <div className='w-16 h-16 bg-gradient-to-r from-[#9c408c] to-[#be3437] rounded-full flex items-center justify-center mr-4 animate-float-delayed'>
                      <span className='text-white font-bold text-lg'>SD</span>
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-bold text-gray-900 text-lg'>
                        Dr. Sarah Desai
                      </h4>
                      <p className='text-[#be3437] font-semibold text-sm'>
                        Compliance Director
                      </p>
                      <p className='text-gray-500 text-xs'>
                        GlobalTech Solutions
                      </p>
                    </div>
                  </div>
                  <div className='flex mb-4'>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className='w-4 h-4 text-yellow-400 fill-current'
                      />
                    ))}
                  </div>
                  <blockquote className='text-gray-700 italic leading-relaxed'>
                    "Outstanding professional development experience! The
                    comprehensive curriculum and industry expert faculty have
                    significantly enhanced our team's capabilities."
                  </blockquote>
                  <div className='mt-4 pt-4 border-t border-gray-100'>
                    <p className='text-xs text-gray-500'>
                      Attended: Enterprise Solutions Program
                    </p>
                  </div>
                </div>
              </div>
            </div>

          
          </div>
        </div>
      </div>
    </>
  );
}
