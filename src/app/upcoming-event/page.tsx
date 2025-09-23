"use client";

import { useState } from "react";

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

const MapPinIcon = ({ className }: { className?: string }) => (
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
      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
    />
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
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

const ClockIcon = ({ className }: { className?: string }) => (
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
      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
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

interface Speaker {
  id: number;
  name: string;
  title: string;
  company: string;
  bio: string;
  image: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  price: number;
  earlyBirdPrice: number;
  maxAttendees: number;
  registeredAttendees: number;
  featured: boolean;
  highlights: string[];
  speakers: Speaker[];
  agenda: {
    time: string;
    session: string;
    speaker: string;
    type: string;
  }[];
  benefits: string[];
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Financial Compliance & Risk Management Summit 2025",
    date: "March 15, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "New Delhi",
    venue: "Hotel Taj Palace, Sardar Patel Marg",
    category: "Finance",
    description:
      "A comprehensive summit covering the latest trends in financial compliance, risk management, and regulatory updates.",
    longDescription:
      "Join industry leaders, regulatory experts, and compliance professionals for a day of insightful discussions on the evolving landscape of financial compliance. This summit will cover recent regulatory changes, risk assessment methodologies, and best practices for maintaining compliance in an increasingly complex financial environment.",
    image: "/api/placeholder/600/400",
    price: 15000,
    earlyBirdPrice: 12000,
    maxAttendees: 200,
    registeredAttendees: 85,
    featured: true,
    highlights: [
      "Keynote by RBI Deputy Governor",
      "Panel on Digital Banking Innovations",
      "Workshop on Advanced Risk Assessment",
      "Networking Lunch with Industry Leaders",
      "Compliance Technology Showcase",
    ],
    speakers: [
      {
        id: 1,
        name: "Dr. Rajesh Kumar",
        title: "Deputy Governor",
        company: "Reserve Bank of India",
        bio: "Dr. Kumar has over 25 years of experience in banking and financial regulation.",
        image: "/api/placeholder/100/100",
        socialLinks: {
          linkedin: "https://linkedin.com/in/rajeshkumar",
        },
      },
      {
        id: 2,
        name: "Ms. Priya Sharma",
        title: "Chief Risk Officer",
        company: "HDFC Bank",
        bio: "Ms. Sharma specializes in enterprise risk management and regulatory compliance.",
        image: "/api/placeholder/100/100",
        socialLinks: {
          linkedin: "https://linkedin.com/in/priyasharma",
          twitter: "@priyasharma_cro",
        },
      },
      {
        id: 3,
        name: "Mr. Amit Patel",
        title: "Partner",
        company: "Deloitte India",
        bio: "Mr. Patel leads the financial services advisory practice at Deloitte.",
        image: "/api/placeholder/100/100",
        socialLinks: {
          linkedin: "https://linkedin.com/in/amitpatel",
          website: "https://deloitte.com",
        },
      },
    ],
    agenda: [
      {
        time: "9:00 AM",
        session: "Registration & Welcome Coffee",
        speaker: "",
        type: "break",
      },
      {
        time: "9:30 AM",
        session: "Opening Keynote: Future of Financial Regulation",
        speaker: "Dr. Rajesh Kumar",
        type: "keynote",
      },
      {
        time: "10:30 AM",
        session: "Panel: Digital Banking & Fintech Innovation",
        speaker: "Panel Discussion",
        type: "panel",
      },
      {
        time: "11:30 AM",
        session: "Coffee Break & Networking",
        speaker: "",
        type: "break",
      },
      {
        time: "12:00 PM",
        session: "Workshop: Advanced Risk Assessment Techniques",
        speaker: "Ms. Priya Sharma",
        type: "workshop",
      },
      {
        time: "1:00 PM",
        session: "Networking Lunch",
        speaker: "",
        type: "break",
      },
      {
        time: "2:30 PM",
        session: "Case Study: Compliance in Digital Era",
        speaker: "Mr. Amit Patel",
        type: "presentation",
      },
      {
        time: "3:30 PM",
        session: "Technology Showcase",
        speaker: "Various",
        type: "exhibition",
      },
      {
        time: "4:30 PM",
        session: "Q&A & Closing Remarks",
        speaker: "All Speakers",
        type: "discussion",
      },
    ],
    benefits: [
      "Certificate of Participation",
      "Networking with Industry Leaders",
      "Access to Event Materials",
      "Complimentary Lunch & Refreshments",
      "One-on-One Q&A Sessions",
    ],
  },
  {
    id: 2,
    title: "Legal Framework & Corporate Governance Conference 2025",
    date: "April 20, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Mumbai",
    venue: "Bombay Stock Exchange, Dalal Street",
    category: "Legal",
    description:
      "Exploring the evolving landscape of corporate governance and legal frameworks in the digital age.",
    longDescription:
      "This conference brings together legal experts, corporate leaders, and governance professionals to discuss the latest developments in corporate law, governance frameworks, and regulatory compliance.",
    image: "/api/placeholder/600/400",
    price: 12000,
    earlyBirdPrice: 9500,
    maxAttendees: 150,
    registeredAttendees: 67,
    featured: true,
    highlights: [
      "SEBI Regulatory Updates",
      "Corporate Ethics Workshop",
      "Legal Tech Innovations",
      "Governance Best Practices",
      "Case Study Presentations",
    ],
    speakers: [
      {
        id: 4,
        name: "Adv. Sunil Mehta",
        title: "Senior Partner",
        company: "Cyril Amarchand Mangaldas",
        bio: "Adv. Mehta is a leading expert in corporate and securities law.",
        image: "/api/placeholder/100/100",
        socialLinks: {
          linkedin: "https://linkedin.com/in/sunilmehta",
        },
      },
      {
        id: 5,
        name: "Ms. Neha Gupta",
        title: "General Counsel",
        company: "Reliance Industries",
        bio: "Ms. Gupta oversees legal affairs for one of India's largest conglomerates.",
        image: "/api/placeholder/100/100",
        socialLinks: {
          linkedin: "https://linkedin.com/in/nehagupta",
        },
      },
    ],
    agenda: [
      {
        time: "9:00 AM",
        session: "Registration & Welcome",
        speaker: "",
        type: "break",
      },
      {
        time: "9:30 AM",
        session: "SEBI Updates & Regulatory Changes",
        speaker: "Adv. Sunil Mehta",
        type: "presentation",
      },
      {
        time: "10:30 AM",
        session: "Corporate Governance Best Practices",
        speaker: "Ms. Neha Gupta",
        type: "workshop",
      },
      { time: "11:30 AM", session: "Coffee Break", speaker: "", type: "break" },
      {
        time: "12:00 PM",
        session: "Legal Tech Innovations",
        speaker: "Panel Discussion",
        type: "panel",
      },
      {
        time: "1:00 PM",
        session: "Networking Lunch",
        speaker: "",
        type: "break",
      },
      {
        time: "2:30 PM",
        session: "Case Studies & Q&A",
        speaker: "All Speakers",
        type: "discussion",
      },
    ],
    benefits: [
      "Certificate of Participation",
      "Networking Opportunities",
      "Event Materials",
      "Complimentary Lunch",
      "Legal Updates Newsletter",
    ],
  },
  {
    id: 3,
    title: "Taxation & GST Compliance Workshop 2025",
    date: "May 10, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Bangalore",
    venue: "ITC Gardenia, Residency Road",
    category: "Tax",
    description:
      "Hands-on workshop covering GST compliance, tax planning strategies, and recent amendments.",
    longDescription:
      "A practical workshop designed for tax professionals, accountants, and business owners to understand the latest GST regulations and tax planning strategies.",
    image: "/api/placeholder/600/400",
    price: 8000,
    earlyBirdPrice: 6500,
    maxAttendees: 100,
    registeredAttendees: 45,
    featured: false,
    highlights: [
      "GST Return Filing Workshop",
      "Tax Planning Strategies",
      "Recent Amendments Discussion",
      "Practical Case Studies",
      "Expert Q&A Session",
    ],
    speakers: [
      {
        id: 6,
        name: "CA Ravi Kumar",
        title: "Tax Consultant",
        company: "KPMG India",
        bio: "CA Kumar specializes in indirect taxation and GST compliance.",
        image: "/api/placeholder/100/100",
        socialLinks: {
          linkedin: "https://linkedin.com/in/ravikumar",
        },
      },
    ],
    agenda: [
      {
        time: "10:00 AM",
        session: "Registration & Welcome",
        speaker: "",
        type: "break",
      },
      {
        time: "10:30 AM",
        session: "GST Updates & Amendments",
        speaker: "CA Ravi Kumar",
        type: "presentation",
      },
      { time: "11:30 AM", session: "Coffee Break", speaker: "", type: "break" },
      {
        time: "12:00 PM",
        session: "GST Return Filing Workshop",
        speaker: "CA Ravi Kumar",
        type: "workshop",
      },
      { time: "1:00 PM", session: "Lunch", speaker: "", type: "break" },
      {
        time: "2:00 PM",
        session: "Tax Planning Strategies",
        speaker: "CA Ravi Kumar",
        type: "workshop",
      },
      {
        time: "3:00 PM",
        session: "Q&A & Discussion",
        speaker: "CA Ravi Kumar",
        type: "discussion",
      },
    ],
    benefits: [
      "Workshop Certificate",
      "Practical Templates",
      "Networking Lunch",
      "Follow-up Support",
      "Resource Materials",
    ],
  },
];

export default function UpcomingEventPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(
    upcomingEvents[0]
  );
  const [activeTab, setActiveTab] = useState("overview");

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

  const getRegistrationProgress = (event: Event) => {
    return (event.registeredAttendees / event.maxAttendees) * 100;
  };

  const getDaysUntilEvent = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-[#6c7cae]/5'>
      {/* Hero Section */}
      <div className='relative py-20 overflow-hidden'>
        {/* Background Image */}
        <div className='absolute inset-0 bg-gradient-to-r from-[#be3437]/90 to-[#6c7cae]/90'>
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80")',
            }}
          ></div>
          <div className='absolute inset-0 bg-gradient-to-r from-[#be3437]/80 to-[#6c7cae]/80'></div>

          {/* Decorative Elements */}
          <div className='absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse'></div>
          <div className='absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000'></div>
          <div className='absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse delay-500'></div>
        </div>

        {/* Content */}
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <div className='mb-6'>
              <div className='inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 border border-white/20 mb-4'>
                <span className='text-white/90 font-medium'>
                  📅 Upcoming Events
                </span>
              </div>
            </div>
            <h1 className='text-5xl font-bold text-white mb-6 drop-shadow-lg'>
              Join Our Next Event
            </h1>
            <p className='text-xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow-md'>
              Discover our upcoming conferences, workshops, and training
              programs. Connect with industry experts and advance your
              professional journey.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button className='bg-white text-[#be3437] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg'>
                Register Now
              </button>
              <button className='border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#be3437] transition-all duration-200'>
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Events List Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Upcoming Events
          </h2>
          <p className='text-lg text-gray-600'>
            Choose from our upcoming events and secure your spot
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16'>
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
                selectedEvent?.id === event.id ? "ring-2 ring-[#be3437]" : ""
              }`}
              onClick={() => setSelectedEvent(event)}
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
                <div className='absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2'>
                  <div className='text-sm font-semibold text-gray-900'>
                    {getDaysUntilEvent(event.date)} days to go
                  </div>
                </div>
              </div>

              <div className='p-6'>
                <div className='flex items-center justify-between mb-3'>
                  <span className='bg-[#be3437]/10 text-[#be3437] px-3 py-1 rounded-full text-sm font-medium'>
                    {event.category}
                  </span>
                  <div className='text-right'>
                    <div className='text-lg font-bold text-gray-900'>
                      ₹{event.earlyBirdPrice.toLocaleString()}
                    </div>
                    <div className='text-sm text-gray-500 line-through'>
                      ₹{event.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                  {event.title}
                </h3>
                <p className='text-gray-600 mb-4'>{event.description}</p>

                <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
                  <div className='flex items-center space-x-1'>
                    <ClockIcon className='w-4 h-4' />
                    <span>{event.time}</span>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <UsersIcon className='w-4 h-4' />
                    <span>
                      {event.registeredAttendees}/{event.maxAttendees}{" "}
                      registered
                    </span>
                  </div>
                </div>

                {/* Registration Progress */}
                <div className='mb-4'>
                  <div className='flex justify-between text-sm text-gray-600 mb-1'>
                    <span>Registration Progress</span>
                    <span>{Math.round(getRegistrationProgress(event))}%</span>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-gradient-to-r from-[#be3437] to-[#6c7cae] h-2 rounded-full transition-all duration-300'
                      style={{ width: `${getRegistrationProgress(event)}%` }}
                    ></div>
                  </div>
                </div>

                <button className='w-full bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white px-4 py-2 rounded-lg font-semibold hover:from-[#be3437]/90 hover:to-[#6c7cae]/90 transition-all duration-200'>
                  View Details & Register
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Section */}
      {selectedEvent && (
        <div className='bg-white py-16'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            {/* Event Header */}
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                {selectedEvent.title}
              </h2>
              <div className='flex flex-wrap justify-center items-center gap-4 text-gray-600'>
                <div className='flex items-center space-x-2'>
                  <CalendarIcon className='w-5 h-5 text-[#be3437]' />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <ClockIcon className='w-5 h-5 text-[#be3437]' />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <MapPinIcon className='w-5 h-5 text-[#be3437]' />
                  <span>
                    {selectedEvent.venue}, {selectedEvent.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className='flex flex-wrap justify-center gap-4 mb-8'>
              {["overview", "speakers", "agenda", "benefits"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 capitalize ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className='bg-gray-50 rounded-xl p-8'>
              {activeTab === "overview" && (
                <div className='space-y-6'>
                  <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <div>
                      <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                        Event Overview
                      </h3>
                      <p className='text-gray-600 mb-6'>
                        {selectedEvent.longDescription}
                      </p>

                      <div className='space-y-4'>
                        <h4 className='text-lg font-semibold text-gray-900'>
                          Key Highlights:
                        </h4>
                        <ul className='space-y-2'>
                          {selectedEvent.highlights.map((highlight, index) => (
                            <li
                              key={index}
                              className='flex items-center space-x-3'
                            >
                              <CheckCircleIcon className='w-5 h-5 text-[#be3437] flex-shrink-0' />
                              <span className='text-gray-700'>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className='bg-white rounded-lg p-6 shadow-sm'>
                      <h4 className='text-lg font-semibold text-gray-900 mb-4'>
                        Event Details
                      </h4>
                      <div className='space-y-4'>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Date:</span>
                          <span className='font-medium'>
                            {selectedEvent.date}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Time:</span>
                          <span className='font-medium'>
                            {selectedEvent.time}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Venue:</span>
                          <span className='font-medium text-right'>
                            {selectedEvent.venue}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Location:</span>
                          <span className='font-medium'>
                            {selectedEvent.location}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Category:</span>
                          <span className='font-medium'>
                            {selectedEvent.category}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-gray-600'>Capacity:</span>
                          <span className='font-medium'>
                            {selectedEvent.maxAttendees} attendees
                          </span>
                        </div>
                      </div>

                      <div className='mt-6 pt-6 border-t border-gray-200'>
                        <div className='text-center'>
                          <div className='text-3xl font-bold text-[#be3437] mb-2'>
                            ₹{selectedEvent.earlyBirdPrice.toLocaleString()}
                          </div>
                          <div className='text-sm text-gray-500 line-through mb-4'>
                            Regular Price: ₹
                            {selectedEvent.price.toLocaleString()}
                          </div>
                          <button className='w-full bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#be3437]/90 hover:to-[#6c7cae]/90 transition-all duration-200 shadow-lg'>
                            Register Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "speakers" && (
                <div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                    Our Speakers
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {selectedEvent.speakers.map((speaker) => (
                      <div
                        key={speaker.id}
                        className='bg-white rounded-lg p-6 shadow-sm border border-gray-100'
                      >
                        <div className='text-center'>
                          <div className='w-20 h-20 bg-gradient-to-br from-[#be3437] to-[#6c7cae] rounded-full mx-auto mb-4 flex items-center justify-center'>
                            <span className='text-white font-bold text-xl'>
                              {speaker.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <h4 className='text-lg font-semibold text-gray-900 mb-1'>
                            {speaker.name}
                          </h4>
                          <p className='text-[#be3437] font-medium mb-2'>
                            {speaker.title}
                          </p>
                          <p className='text-gray-600 text-sm mb-3'>
                            {speaker.company}
                          </p>
                          <p className='text-gray-600 text-sm'>{speaker.bio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "agenda" && (
                <div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                    Event Agenda
                  </h3>
                  <div className='space-y-4'>
                    {selectedEvent.agenda.map((item, index) => (
                      <div
                        key={index}
                        className='bg-white rounded-lg p-4 shadow-sm border border-gray-100'
                      >
                        <div className='flex items-start space-x-4'>
                          <div className='flex-shrink-0 w-20 text-sm font-medium text-[#be3437]'>
                            {item.time}
                          </div>
                          <div className='flex-1'>
                            <h4 className='font-semibold text-gray-900 mb-1'>
                              {item.session}
                            </h4>
                            {item.speaker && (
                              <p className='text-gray-600 text-sm'>
                                Speaker: {item.speaker}
                              </p>
                            )}
                          </div>
                          <div className='flex-shrink-0'>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                item.type === "keynote"
                                  ? "bg-purple-100 text-purple-800"
                                  : item.type === "panel"
                                  ? "bg-blue-100 text-blue-800"
                                  : item.type === "workshop"
                                  ? "bg-green-100 text-green-800"
                                  : item.type === "break"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {item.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "benefits" && (
                <div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                    What You'll Get
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {selectedEvent.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className='flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100'
                      >
                        <CheckCircleIcon className='w-6 h-6 text-[#be3437] flex-shrink-0' />
                        <span className='text-gray-700 font-medium'>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className='bg-gradient-to-r from-[#be3437] to-[#6c7cae] py-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl font-bold text-white mb-4'>
            Ready to Join Us?
          </h2>
          <p className='text-xl text-white/90 mb-8'>
            Don't miss out on these transformative learning experiences.
            Register now and secure your spot.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-white text-[#be3437] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg'>
              Register for Event
            </button>
            <button className='border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#be3437] transition-all duration-200'>
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className='bg-gray-900 text-white py-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <p className='text-gray-300'>
            📅 Early bird pricing available. Limited seats remaining!
          </p>
          <p className='text-sm text-gray-400 mt-2'>
            © 2024 Achromic Point. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
