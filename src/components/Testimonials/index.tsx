"use client";

import { useRef, useEffect, useState } from 'react';

// Star Icon Component
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

// Testimonial Data Interface
interface Testimonial {
  id: number;
  name: string;
  initials: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  event?: string;
  gradientFrom: string;
  gradientTo: string;
  animation?: string;
}

interface TestimonialsProps {
  className?: string;
}

// Testimonials Data from https://achromicpoint.com/
const featuredTestimonial = {
  name: "Sumeer Chawla",
  initials: "SC",
  role: "HR Professional",
  company: "Corporate Professional",
  quote:
    "Thank you. It was a wonderful session and full of learning. I got to know more about new labour codes and it will be really useful in my job. I would like to appreciate your company for organizing such a great session through a qualified trainer. The quality and content of the slides are excellent and it has resolved many of my queries related to new labour reforms in India. Thank you very much for organizing this session.",
  rating: 5,
  event: "New Labour Codes Training",
  gradientFrom: "#be3437",
  gradientTo: "#6c7cae",
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ahmed Zaki",
    initials: "AZ",
    role: "Independent Arbitrator",
    company: "SVP Legal Affairs - Al Hamra Group LLC",
    quote: `I want to extend my heartfelt appreciation to my fellow outstanding panellists —
Andrea, Wolora, Awanish and Vijai— for sharing their valuable insights and candid
perspectives. Your practical advice and thought-provoking contributions made this

discussion truly engaging and impactful.

A special thank you goes to Aashish, Nupur, Surabhi, and the entire fantastic team
of Achromic Point for their exceptional efforts, seamless coordination, and
continued dedication behind the scenes. Your professionalism and attention to detail
ensured the success of this session. It was a privilege moderating such an insightful

and dynamic discussion with all of you.`,
    rating: 5,
    event: "Fraud Risk Management Course",
    gradientFrom: "#6c7cae",
    gradientTo: "#9c408c",
    animation: "animate-bounce-slow",
  },
  {
    id: 2,
    name: "Susie Beaumont",
    initials: "SB",
    role: "Award Recipient",
    company: "",
    quote: `Thank you so much. I feel very humbled and grateful to receive the award. Thank
you also for the kind invitation to attend the event - I really enjoyed it.`,
    rating: 5,
    event: "Recognition at Achromic Point",
    gradientFrom: "#be3437",
    gradientTo: "#f59e0b",
  },
  {
    id: 3,
    name: "Aishwarya Gaur",
    initials: "AG",
    role: "Senior Legal Counsel",
    company: "esyasoft",
    quote: `Congratulations to you and the entire team at Achromic Point for managing the
General Counsel Summit so well. It was my pleasure to be there and look forward to

your next events in the UAE.`,
    rating: 5,
    event: "General Counsel Summit",
    gradientFrom: "#0ea5e9",
    gradientTo: "#6366f1",
  },
  {
    id: 4,
    name: "General Counsel Summit Panelist",
    initials: "GP",
    role: "Panelist",
    company: "The Summit of Legal Minds - Dubai, UAE",
    quote: `Many thanks, Surabhi! It was a pleasure to be part of this event on General Counsel

Summit (UAE) The Summit of Legal Minds - Dubai, UAE`,
    rating: 5,
    event: "General Counsel Summit (UAE)",
    gradientFrom: "#10b981",
    gradientTo: "#0ea5e9",
  },
  {
    id: 5,
    name: "Andrea Sesin-Tabarelli",
    initials: "AS",
    role: "Legal Manager - Local Office",
    company: "Attorney & Solicitor (EW)",
    quote:
      "Many thanks — it was a pleasure to share the panel with all of you. Special thanks to Achromic Point for the organization.",
    rating: 5,
    event: "General Counsel Summit (UAE)",
    gradientFrom: "#f97316",
    gradientTo: "#ec4899",
  },
  {
    id: 6,
    name: "Sumeet Bajaj",
    initials: "SB",
    role: "Vice President - Legal",
    company: "Canara HSBC Life Insurance",
    quote: `Dear Achromic Point Team,

We sincerely thank you for the warm wishes and for recognizing us with the award at
the Commercial Litigation & Disputes: Current Trends & Developments – Conference

and Awards held on 20th November 2025 in New Delhi.

It is truly an honour to be acknowledged, and we deeply appreciate the efforts
Achromic Point invests in creating a platform that fosters meaningful dialogue and

celebrates excellence in the field.

We look forward to continued engagement and contributing together to the evolving

landscape of commercial litigation and dispute resolution.`,
    rating: 5,
    event: "Commercial Litigation & Disputes Conference",
    gradientFrom: "#22c55e",
    gradientTo: "#0ea5e9",
  },
  {
    id: 7,
    name: "Alok Saxena",
    initials: "AS",
    role: "Head - Legal and Compliance",
    company: "Hippo Homes",
    quote: `Thank you for your kind message. It was a privilege to be part of such a well-

organized and insightful event.

I truly appreciate the efforts of the entire Achromic Point team in putting together
such a structured and knowledge-rich program. I look forward to future

engagements.`,
    rating: 5,
    event: "Industry Roundtable",
    gradientFrom: "#6c7cae",
    gradientTo: "#be3437",
  },
  {
    id: 8,
    name: "Puja Tiwari",
    initials: "PT",
    role: "Legal Advisor",
    company: "Experion Developers",
    quote:
      "It was a pleasure to be part of the well-organized event and to hear the views of learned industry colleagues and friends.",
    rating: 5,
    event: "Legal Leadership Forum",
    gradientFrom: "#14b8a6",
    gradientTo: "#0ea5e9",
  },
];

export default function Testimonials({ className = "" }: TestimonialsProps) {
  // Combine all testimonials including featured one
  const allTestimonials = [
    {
      ...featuredTestimonial,
      id: 0,
    },
    ...testimonials,
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      // Calculate active dot index
      const cardWidth = getCardWidth();
      const gap = 24;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(newIndex, allTestimonials.length - 1));
    }
  };

  const renderQuoteWithBreaks = (quote: string) =>
    quote.split('\n').map((paragraph, idx) => (
      <p key={idx} className='mb-3 last:mb-0'>
        {paragraph.trim()}
      </p>
    ));

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, []);

  const getCardWidth = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const gap = 24; // gap-6 = 24px
      return (containerWidth - (gap * 2)) / 3;
    }
    if (typeof window !== 'undefined') {
      const containerPadding = 64;
      const gap = 24;
      return (window.innerWidth - containerPadding - (gap * 2)) / 3;
    }
    return 400; // Default fallback
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = getCardWidth();
      scrollContainerRef.current.scrollBy({ left: -cardWidth - 24, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = getCardWidth();
      scrollContainerRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
    }
  };

  const closeModal = () => setSelectedTestimonial(null);

  return (
    <div className={`relative py-16 md:py-20 overflow-hidden bg-white ${className}`}>
      {/* Background with animated elements */}
      <div className='absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50'>
        {/* Floating decorative elements */}
        <div className='absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-[#be3437]/5 to-[#6c7cae]/5 rounded-full blur-3xl animate-float'></div>
        <div className='absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-[#6c7cae]/5 to-[#9c408c]/5 rounded-full blur-3xl animate-float-delayed'></div>
        <div className='absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-[#9c408c]/5 to-[#be3437]/5 rounded-full blur-2xl animate-bounce-slow'></div>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-8 md:mb-12'>
          <div className='inline-block bg-gradient-to-r from-[#be3437]/10 to-[#6c7cae]/10 backdrop-blur-sm rounded-full px-6 py-2 border border-[#be3437]/20 mb-4'>
            <span className='text-[#be3437] font-semibold text-sm uppercase tracking-wider'>
              ⭐ Testimonials
            </span>
          </div>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3'>
            Voices of
            <span className='block text-transparent bg-clip-text bg-gradient-to-r from-[#be3437] via-[#6c7cae] to-[#9c408c]'>
              Success
            </span>
          </h2>
          <p className='text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4'>
            Discover how our training programs have transformed careers and
            empowered professionals across India's leading organizations
          </p>
        </div>

        {/* Scrollable Testimonials Container */}
        <div className='relative'>
          {/* Scroll Buttons */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className='absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-all border border-gray-200 hidden md:flex items-center justify-center'
              aria-label='Scroll left'
            >
              <svg className='w-5 h-5 text-[#be3437]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
              </svg>
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className='absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-all border border-gray-200 hidden md:flex items-center justify-center'
              aria-label='Scroll right'
            >
              <svg className='w-5 h-5 text-[#be3437]' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
            </button>
          )}

          <div 
            ref={scrollContainerRef}
            className='overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 scroll-smooth'
            style={{ scrollbarWidth: 'thin' }}
            onScroll={checkScrollButtons}
          >
            <div className='flex gap-4 md:gap-6' style={{ width: 'max-content', paddingRight: '1rem' }}>
              {allTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className='group relative flex-shrink-0'
                  style={{
                    width: 'calc((100vw - 4rem) / 3 - 1rem)',
                    minWidth: '280px',
                    maxWidth: '400px'
                  }}
                >
                  <div
                    className='absolute inset-0 bg-gradient-to-br rounded-lg blur-md opacity-40 group-hover:opacity-60 transition-all duration-300'
                    style={{
                      background: `linear-gradient(to bottom right, ${testimonial.gradientFrom}/10, ${testimonial.gradientTo}/10)`,
                    }}
                  ></div>
                    <div className='relative bg-white rounded-lg p-5 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 h-full flex flex-col'>
                      <div className='flex items-center mb-4'>
                        <div
                          className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r rounded-full flex items-center justify-center mr-3 flex-shrink-0 shadow-sm ${testimonial.animation || ""}`}
                          style={{
                            background: `linear-gradient(to right, ${testimonial.gradientFrom}, ${testimonial.gradientTo})`,
                          }}
                        >
                          <span className='text-white font-bold text-sm'>
                            {testimonial.initials}
                          </span>
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h4 className='font-bold text-gray-900 text-base md:text-lg mb-0.5 truncate'>
                            {testimonial.name}
                          </h4>
                        {/* <p
                          className='font-semibold text-xs mb-0.5 truncate'
                          style={{ color: testimonial.gradientFrom }}
                        >
                          {testimonial.role}
                        </p> */}
                        {/* <p className='text-gray-500 text-xs truncate'>{testimonial.company}</p> */}
                      </div>
                    </div>
                    <div className='flex mb-3'>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className='w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current'
                        />
                      ))}
                    </div>
                    <blockquote className='text-gray-700 text-sm md:text-base leading-relaxed mb-4 flex-grow overflow-hidden' style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 6,
                      WebkitBoxOrient: 'vertical',
                    }}>
                      "{testimonial.quote}"
                    </blockquote>
                    <div className='mt-auto flex items-center justify-between pt-2 border-t border-gray-100 gap-3'>
                      {testimonial.event && (
                        <p className='text-xs text-gray-500 truncate'>
                          {testimonial.event}
                        </p>
                      )}
                      <button
                        onClick={() => setSelectedTestimonial(testimonial)}
                        className='text-xs font-semibold text-[#be3437] hover:text-[#9c2f32] transition-colors'
                      >
                        Read more
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Scroll Indicator Dots */}
          <div className='flex justify-center items-center gap-2 mt-6'>
            {allTestimonials.map((_, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      const cardWidth = getCardWidth();
                      const gap = 24;
                      scrollContainerRef.current.scrollTo({
                        left: index * (cardWidth + gap),
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    isActive 
                      ? 'w-8 h-2 bg-gradient-to-r from-[#be3437] to-[#6c7cae]' 
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {selectedTestimonial && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center px-4 md:px-6'
          role='dialog'
          aria-modal='true'
        >
          <div className='absolute inset-0 bg-black/40 backdrop-blur-sm' onClick={closeModal}></div>
          <div className='relative bg-white max-w-3xl w-full rounded-2xl shadow-2xl border border-gray-200 overflow-hidden'>
            <div className='absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#be3437] via-[#6c7cae] to-[#9c408c]'></div>
            <div className='p-6 md:p-8'>
              <div className='flex items-start gap-4 mb-4'>
                <div
                  className='w-14 h-14 rounded-full flex items-center justify-center text-white font-bold shadow-sm'
                  style={{
                    background: `linear-gradient(to right, ${selectedTestimonial.gradientFrom}, ${selectedTestimonial.gradientTo})`,
                  }}
                >
                  {selectedTestimonial.initials}
                </div>
                <div className='flex-1'>
                  <h3 className='text-xl font-bold text-gray-900'>{selectedTestimonial.name}</h3>
                  <p className='text-sm text-gray-600'>
                    {selectedTestimonial.role}
                    {selectedTestimonial.company ? ` • ${selectedTestimonial.company}` : ""}
                  </p>
                  {selectedTestimonial.event && (
                    <p className='text-xs text-gray-500 mt-1'>{selectedTestimonial.event}</p>
                  )}
                </div>
                <button
                  onClick={closeModal}
                  className='text-gray-500 hover:text-gray-700 transition-colors'
                  aria-label='Close testimonial'
                >
                  <svg className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </button>
              </div>
              <div className='text-gray-700 text-base leading-relaxed space-y-3'>
                {renderQuoteWithBreaks(selectedTestimonial.quote)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide {
          scrollbar-width: thin;
          scrollbar-color: #be3437 #f1f1f1;
        }
        .scrollbar-hide::-webkit-scrollbar {
          height: 6px;
        }
        .scrollbar-hide::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
          margin: 0 1rem;
        }
        .scrollbar-hide::-webkit-scrollbar-thumb {
          background: linear-gradient(to right, #be3437, #6c7cae);
          border-radius: 10px;
        }
        .scrollbar-hide::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to right, #9c2f32, #5a6a9e);
        }
      `}</style>
    </div>
  );
}

