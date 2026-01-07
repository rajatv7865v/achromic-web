"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Partners from "../components/partners";
import { mockPartners } from "../data/mockPartners";
import Testimonials from "@/components/Testimonials";
import { getAllGalleries } from "@/services/gallery";

import Banner1 from "@/components/assets/banner/banner 1.jpg";
import Banner2 from "@/components/assets/banner/banner 2.jpg";
import Banner3 from "@/components/assets/banner/banner 3.jpg";
import Banner4 from "@/components/assets/banner/banner 4.jpg";
import UpcomingEvent from "@/components/Upcoming-event";
import PastEvent from "@/components/Past-event";

// Simple SVG Icons
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

const UsersIcon = ({ className }: { className?: string }) => (
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
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
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

const StarIcon = ({ className }: { className?: string }) => (
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
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
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

const ChevronDownIcon = ({ className }: { className?: string }) => (
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
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const AwardIcon = ({ className }: { className?: string }) => (
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
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);

const BookOpenIcon = ({ className }: { className?: string }) => (
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
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const ChartBarIcon = ({ className }: { className?: string }) => (
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
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const ChevronLeftIcon = ({ className }: { className?: string }) => (
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
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
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
      d="M9 5l7 7-7 7"
    />
  </svg>
);

// Sample data

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
    title: "Seminars and Conferences ",
    description:
      "Seminars and conferences on various topics related to compliance, risk, accounting, finance and taxation.",
    icon: AwardIcon,
    features: [
      "Seminars and conferences on various topics related to compliance, risk, accounting, finance and taxation.",
    ],
  },
  {
    id: 3,
    title: "Managed Events",
    description:
      "Managed events on various topics related to compliance, risk, accounting, finance and taxation.",
    icon: BookOpenIcon,
    features: [
      "Managed events on various topics related to compliance, risk, accounting, finance and taxation.",
    ],
  },
];

const stats = [
  { label: "Years of Experience", value: "15+", icon: AwardIcon },
  { label: "Participants Trained", value: "25,000+", icon: UsersIcon },
  { label: "Corporate Partnerships", value: "4,500+", icon: StarIcon },
  { label: "Global Events Delivered", value: "2,000+", icon: CalendarIcon },
];

// Carousel slides data
const heroSlides = [
  {
    id: 1,
    type: "image",
    image: "/image/banner 1.jpg",
    title: "Empowering Professionals Through Excellence in Training",
    subtitle: "Join India's premier platform for professional development",
  },
  {
    id: 2,
    type: "image",
    image: "/image/banner 2.jpg",
    title: "Empowering Professionals Through Excellence in Training",
    subtitle: "Join India's premier platform for professional development",
  },
  {
    id: 3,
    type: "image",
    image: "/image/banner 3.jpg",
    title: "Empowering Professionals Through Excellence in Training",
    subtitle: "Join India's premier platform for professional development",
  },
  {
    id: 4,
    type: "image",
    image: "/image/banner 4.jpg",
    title: "Empowering Professionals Through Excellence in Training",
    subtitle: "Join India's premier platform for professional development",
  },

  {
    id: 7,
    type: "video",
    video: "/video/video1.mp4",
    title: "Watch Our Success Story",
    subtitle: "See how we've transformed careers and organizations",
  },
  {
    id: 8,
    type: "video",
    video: "/video/video2.mp4",
    title: "Watch Our Success Story",
    subtitle: "See how we've transformed careers and organizations",
  },
];

// Hero Carousel Component
function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000); // Change slide every 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  // Handle video playback
  useEffect(() => {
    const currentSlideData = heroSlides[currentSlide];
    if (videoRef.current) {
      if (currentSlideData.type === "video") {
        videoRef.current.play().catch(() => {
          // Handle autoplay restrictions
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 3000); // Resume auto-play after 3 seconds
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 3000);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 3000);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Slides Container */}
      <div className="relative w-full h-[600px]">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Slide Content */}
            {slide.type === "video" ? (
              <div className="absolute inset-0 z-0">
                <video
                  ref={index === currentSlide ? videoRef : null}
                  className="w-full h-full object-cover"
                  autoPlay={index === currentSlide}
                  loop
                  muted
                  playsInline
                  src={slide.video}
                  key={slide.id}
                />
              </div>
            ) : (
              slide.image && (
                <img
                  src={slide.image.replace(/ /g, "%20")}
                  alt={slide.title}
                  className="w-full h-full "
                  loading={index === 0 ? "eager" : "lazy"}
                />
              )
            )}

            {/* Content Overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-[#2b8ffb]/80 to-[#6c7cae]/80 z-20"></div> */}

            {/* Animated Decorative Elements */}
            {/* <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse z-30"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000 z-30"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse delay-500 z-30"></div> */}

            {/* Floating Geometric Shapes */}
            {/* <div className="absolute top-20 right-20 w-8 h-8 border-2 border-white/20 rotate-45 animate-spin-slow z-30"></div>
            <div className="absolute bottom-32 left-32 w-12 h-12 border-2 border-white/15 rounded-full animate-bounce-slow z-30"></div> */}

            {/* Text Content */}
            {/* <div className="relative z-40 h-full flex items-center justify-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-6">
                  <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 border border-white/20 mb-4">
                    <span className="text-white/90 font-medium">
                      🏆 Achromic Point
                    </span>
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg animate-text-glow">
                  {slide.title}
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow-md">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/upcoming-event"
                    className="bg-white text-[#2b8ffb] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg text-lg"
                  >
                    View Upcoming Events
                  </Link>
                  <Link
                    href="/contact-us"
                    className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#2b8ffb] transition-all duration-200 text-lg"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div> */}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 group"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="w-6 h-6 text-white group-hover:text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 group"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-6 h-6 text-white group-hover:text-white" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const faqs = [
  {
    question: "What type of events do you organize?",
    answer:
      "We organize professional seminars, conferences, workshops, panel discussions, and corporate training events on topics which revolves around Compliance. Risk, Accounting, Finance and Taxation.",
  },
  {
    question: "Who can attend your seminars and conferences?",
    answer:
      "Our events are open to professionals, business leaders, students, entrepreneurs, academics, and organizations, depending on the event theme and target audience.",
  },
  {
    question: "How can I register for an event?",
    answer:
      "You can register online through our website by selecting the event and completing the registration form. Confirmation details will be sent via email after successful registration.",
  },
  {
    question: "Are your events held online or in person?",
    answer:
      "We offer in-person and virtual events. The format of each event is clearly stated on the event details page.",
  },
  {
    question: "What is included in the registration fee?",
    answer:
      "registration fees typically include access to event sessions, conference materials, certificates of participation, and refreshments or meals for in-person events. Specific inclusions vary by event.",
  },
  {
    question: "Do you offer group or corporate discounts?",
    answer:
      "Yes, we offer special rates for group registrations and corporate bookings. Please contact us directly for details and customized packages.",
  },
];

// Partners Section Component
function PartnersSection() {
  // Use static mock data directly
  const partners = mockPartners.filter((p) => p.isActive);

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
  const [galleries, setGalleries] = useState<any[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryPage, setGalleryPage] = useState(1);
  const [galleryTotalPages, setGalleryTotalPages] = useState(1);
  
  // Gallery modal state
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<any>(null);
  const [galleryFormData, setGalleryFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    designation: "",
  });
  const [galleryFormErrors, setGalleryFormErrors] = useState<any>({});
  const [isSubmittingGalleryForm, setIsSubmittingGalleryForm] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Handle gallery item click
  const handleGalleryItemClick = (gallery: any) => {
    setSelectedGallery(gallery);
    setIsGalleryModalOpen(true);
    // Reset form
    setGalleryFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      designation: "",
    });
    setGalleryFormErrors({});
  };

  // Close gallery modal
  const closeGalleryModal = () => {
    setIsGalleryModalOpen(false);
    setSelectedGallery(null);
    setGalleryFormErrors({});
    setIsSubmittingGalleryForm(false);
  };

  // Handle form input change
  const handleGalleryFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGalleryFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (galleryFormErrors[name]) {
      setGalleryFormErrors((prev: any) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Validate gallery form
  const validateGalleryForm = () => {
    const errors: any = {};
    if (!galleryFormData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!galleryFormData.email.trim() || !/^\S+@\S+\.\S+$/.test(galleryFormData.email)) {
      errors.email = "Valid email is required";
    }
    if (!galleryFormData.phone.trim() || !/^[\d()+\s-]{7,}$/.test(galleryFormData.phone)) {
      errors.phone = "Valid phone number is required";
    }
    if (!galleryFormData.company.trim()) {
      errors.company = "Company is required";
    }
    if (!galleryFormData.designation.trim()) {
      errors.designation = "Designation is required";
    }
    setGalleryFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle gallery form submit
  const handleGalleryFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateGalleryForm()) return;

    setIsSubmittingGalleryForm(true);

    try {
      // TODO: Submit form data to API if needed
      // await submitGalleryForm(galleryFormData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Get gallery link
      const galleryLink = selectedGallery?.event?.slug
        ? `/gallery/${selectedGallery.event.slug}`
        : selectedGallery?.eventId
        ? `/gallery/${selectedGallery.eventId}`
        : "#";

      // Close modal
      closeGalleryModal();

      // Redirect to gallery page
      if (galleryLink !== "#") {
        window.location.href = galleryLink;
      }
    } catch (error) {
      console.error("Error submitting gallery form:", error);
      setGalleryFormErrors({
        submit: "Failed to submit form. Please try again.",
      });
    } finally {
      setIsSubmittingGalleryForm(false);
    }
  };

  // Fetch galleries on component mount
  useEffect(() => {
    const fetchGalleries = async () => {
      setGalleryLoading(true);
      try {
        const result = await getAllGalleries({
          page: galleryPage,
          limit: 6,
          sortBy: "createdAt",
          sortOrder: "desc",
        });
        setGalleries(result.data || []);
        setGalleryTotalPages(result.meta?.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch galleries:", error);
        setGalleries([]);
      } finally {
        setGalleryLoading(false);
      }
    };

    fetchGalleries();
  }, [galleryPage]);

  // Helper function to get icon based on index
  const getIconForIndex = (index: number) => {
    const icons = [
      UsersIcon,
      AwardIcon,
      BookOpenIcon,
      ChartBarIcon,
      StarIcon,
      CheckCircleIcon,
    ];
    return icons[index % icons.length];
  };

  // Helper function to get gradient colors based on index
  const getGradientColors = (index: number) => {
    const gradients = [
      {
        from: "from-[#2b8ffb]/20",
        to: "to-[#6c7cae]/20",
        iconColor: "text-[#2b8ffb]",
      },
      {
        from: "from-[#6c7cae]/20",
        to: "to-[#9c408c]/20",
        iconColor: "text-[#6c7cae]",
      },
      {
        from: "from-[#9c408c]/20",
        to: "to-[#2b8ffb]/20",
        iconColor: "text-[#9c408c]",
      },
    ];
    return gradients[index % gradients.length];
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

      <div className="min-h-screen bg-white">
        {/* Hero Section with Carousel */}
        <HeroCarousel />

        {/* Partners Section - Trusted by Leading Organizations */}
        <PartnersSection />

        {/* Creative Features Showcase */}
        <div className="relative py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose{" "}
                <span className="gradient-text">Achromic Point?</span>
              </h2>
              <p className="text-lg text-gray-600">
                Experience the future of professional development
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 - Expert-led Training Programs */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2b8ffb]/10 to-[#6c7cae]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative glass-card rounded-2xl p-6 text-center hover-lift">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] rounded-full flex items-center justify-center animate-float">
                    <AwardIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Expert-led Training Programs
                  </h3>
                  <p className="text-sm text-gray-600">
                    Industry professionals with extensive experience leading
                    comprehensive training sessions
                  </p>
                </div>
              </div>

              {/* Feature 2 - Industry-recognized Certifications */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#6c7cae]/10 to-[#9c408c]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative glass-card rounded-2xl p-6 text-center hover-lift">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#6c7cae] to-[#9c408c] rounded-full flex items-center justify-center animate-float-delayed">
                    <BookOpenIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Industry-recognized Certifications
                  </h3>
                  <p className="text-sm text-gray-600">
                    Earn valuable certifications that enhance your professional
                    credibility
                  </p>
                </div>
              </div>

              {/* Feature 3 - Flexible Learning Options */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#9c408c]/10 to-[#2b8ffb]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative glass-card rounded-2xl p-6 text-center hover-lift">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#9c408c] to-[#2b8ffb] rounded-full flex items-center justify-center animate-bounce-slow">
                    <CalendarIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Flexible Learning Options
                  </h3>
                  <p className="text-sm text-gray-600">
                    Choose from online, offline, or hybrid learning formats to
                    fit your schedule
                  </p>
                </div>
              </div>

              {/* Feature 4 - Post-training Support */}
              {/* <div className='group relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-[#2b8ffb]/10 to-[#6c7cae]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300'></div>
                <div className='relative glass-card rounded-2xl p-6 text-center hover-lift'>
                  <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] rounded-full flex items-center justify-center animate-spin-slow'>
                    <StarIcon className='w-8 h-8 text-white' />
                  </div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                    Post-training Support
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Ongoing assistance and resources to ensure successful implementation
                  </p>
                </div>
              </div> */}

              {/* Feature 5 - Strong Event & Networking Capabilities */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#6c7cae]/10 to-[#9c408c]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative glass-card rounded-2xl p-6 text-center hover-lift">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#6c7cae] to-[#9c408c] rounded-full flex items-center justify-center animate-float">
                    <CalendarIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Strong Event & Networking Capabilities
                  </h3>
                  <p className="text-sm text-gray-600">
                    Connect with industry peers and expand your professional
                    network
                  </p>
                </div>
              </div>

              {/* Feature 6 - Brand Visibility & Lead Generation */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#9c408c]/10 to-[#2b8ffb]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative glass-card rounded-2xl p-6 text-center hover-lift">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#9c408c] to-[#2b8ffb] rounded-full flex items-center justify-center animate-bounce-slow">
                    <StarIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Brand Visibility & Lead Generation
                  </h3>
                  <p className="text-sm text-gray-600">
                    Enhance your brand presence and generate valuable business
                    opportunities
                  </p>
                </div>
              </div>

              {/* Feature 7 - Comprehensive Enterprise Solutions */}
              <div className="group relative md:col-span-2 lg:col-span-1">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2b8ffb]/10 to-[#6c7cae]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative glass-card rounded-2xl p-6 text-center hover-lift">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] rounded-full flex items-center justify-center animate-float-delayed">
                    <AwardIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Comprehensive Enterprise Solutions
                  </h3>
                  <p className="text-sm text-gray-600">
                    Tailored training and development solutions for
                    organizations of all sizes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#2b8ffb] to-[#6c7cae] rounded-full mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events Section */}
        <UpcomingEvent />

        {/* Services Section */}
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive solutions designed to meet your professional
                development and training needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#2b8ffb] to-[#6c7cae] rounded-full mb-6">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircleIcon className="w-4 h-4 text-[#2b8ffb] flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Past Events Section */}
        <PastEvent />

        {/* Gallery Section */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Event Gallery
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Take a look at our successful events and see the impact we've
                made in professional development and training.
              </p>
            </div>

            {galleryLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="h-64 bg-gray-200 rounded-xl animate-pulse"
                  />
                ))}
              </div>
            ) : galleries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {galleries.map((gallery, index) => {
                  const IconComponent = getIconForIndex(index);
                  const gradient = getGradientColors(index);
                  const galleryName = gallery.title || "Event Gallery";
                  const galleryImage =
                    gallery.filePath && gallery.filePath.length > 0
                      ? gallery.filePath[0]
                      : null;
                  // Use event slug if available, otherwise use eventId (gallery page may need to handle eventId)
                  const galleryLink = gallery.event?.slug
                    ? `/gallery/${gallery.event.slug}`
                    : gallery.eventId
                    ? `/gallery/${gallery.eventId}`
                    : "#";

                  return (
                    <div
                      key={gallery._id || index}
                      onClick={() => handleGalleryItemClick(gallery)}
                      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-card-float cursor-pointer"
                    >
                      {galleryImage ? (
                        <div className="h-64 relative overflow-hidden">
                          <img
                            src={galleryImage}
                            alt={galleryName}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                      ) : (
                        <div
                          className={`h-64 bg-gradient-to-br ${gradient.from} ${gradient.to} flex items-center justify-center`}
                        >
                          <div className="text-center">
                            <IconComponent
                              className={`w-16 h-16 ${gradient.iconColor} mx-auto mb-3`}
                            />
                            <h3 className="text-lg font-semibold text-gray-800">
                              {galleryName}
                            </h3>
                            {gallery.filePath &&
                              gallery.filePath.length > 0 && (
                                <p className="text-sm text-gray-600">
                                  {gallery.filePath.length}{" "}
                                  {gallery.filePath.length === 1
                                    ? "Image"
                                    : "Images"}
                                </p>
                              )}
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="text-white">
                          <h3 className="text-lg font-semibold mb-1">
                            {galleryName}
                          </h3>
                          {/* {gallery.filePath && gallery.filePath.length > 0 && (
                            <p className="text-sm font-medium">
                              {gallery.filePath.length}{" "}
                              {gallery.filePath.length === 1
                                ? "Photo"
                                : "Photos"}
                            </p>
                          )} */}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  No galleries available at the moment.
                </p>
              </div>
            )}

            <div className="text-center">
              <Link
                href="/past-events"
                className="inline-flex items-center bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white px-8 py-3 rounded-full font-semibold hover:from-[#2b8ffb]/90 hover:to-[#6c7cae]/90 transition-all duration-200 shadow-lg"
              >
                View All Event Photos
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">
                  About Achromic Point
                </h2>
                <p className="text-xl text-white/90 mb-6">
                  We are India's leading platform for professional development,
                  compliance training, and industry expertise. With over 15
                  years of experience, we have successfully trained more than
                  50,000 professionals across various industries.
                </p>
                <p className="text-lg text-white/80 mb-8">
                  Our mission is to empower professionals through excellence in
                  training, providing them with the knowledge and skills needed
                  to excel in their careers and contribute to organizational
                  success.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact-us"
                    className="bg-white text-[#2b8ffb] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg text-center"
                  >
                    Learn More About Us
                  </Link>
                  <Link
                    href="/emagzine"
                    className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#2b8ffb] transition-all duration-200 text-center"
                  >
                    Read Our eMagazine
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        15+
                      </div>
                      <div className="text-white/80 text-sm">
                        Years Experience
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        25,000+
                      </div>
                      <div className="text-white/80 text-sm">
                        Events ConductedParticipants Trained
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        4,500+
                      </div>
                      <div className="text-white/80 text-sm">
                        Corporate Partnerships
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        2,000+
                      </div>
                      <div className="text-white/80 text-sm">
                        Global Events Delivered
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Find answers to common questions about our events and services.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-semibold text-gray-900">
                      {faq.question}
                    </span>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">
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

        <Testimonials />

        {/* Enhanced Testimonial Section */}

        {/* Gallery Form Modal */}
        {isGalleryModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={closeGalleryModal}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] p-6 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">
                      {selectedGallery?.title || "View Gallery"}
                    </h3>
                    <p className="text-sm text-white/90 mt-1">
                      Please fill in your details to continue
                    </p>
                  </div>
                  <button
                    onClick={closeGalleryModal}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleGalleryFormSubmit} className="p-6">
                {/* Error Message */}
                {galleryFormErrors.submit && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                      {galleryFormErrors.submit}
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={galleryFormData.name}
                      onChange={handleGalleryFormChange}
                      required
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-[#2b8ffb] outline-none transition ${
                        galleryFormErrors.name
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your name"
                    />
                    {galleryFormErrors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {galleryFormErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={galleryFormData.email}
                      onChange={handleGalleryFormChange}
                      required
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-[#2b8ffb] outline-none transition ${
                        galleryFormErrors.email
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your email"
                    />
                    {galleryFormErrors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {galleryFormErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={galleryFormData.phone}
                      onChange={handleGalleryFormChange}
                      required
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-[#2b8ffb] outline-none transition ${
                        galleryFormErrors.phone
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {galleryFormErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {galleryFormErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={galleryFormData.company}
                      onChange={handleGalleryFormChange}
                      required
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-[#2b8ffb] outline-none transition ${
                        galleryFormErrors.company
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your company name"
                    />
                    {galleryFormErrors.company && (
                      <p className="mt-1 text-sm text-red-600">
                        {galleryFormErrors.company}
                      </p>
                    )}
                  </div>

                  {/* Designation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Designation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={galleryFormData.designation}
                      onChange={handleGalleryFormChange}
                      required
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-[#2b8ffb] outline-none transition ${
                        galleryFormErrors.designation
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your designation"
                    />
                    {galleryFormErrors.designation && (
                      <p className="mt-1 text-sm text-red-600">
                        {galleryFormErrors.designation}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={closeGalleryModal}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingGalleryForm}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold text-white transition-all ${
                      isSubmittingGalleryForm
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] hover:from-[#2b8ffb]/90 hover:to-[#6c7cae]/90 shadow-lg"
                    }`}
                  >
                    {isSubmittingGalleryForm ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </span>
                    ) : (
                      "View Gallery"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
