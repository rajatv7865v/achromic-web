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

const GlobeIcon = ({ className }: { className?: string }) => (
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
      d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    />
  </svg>
);

const LightningIcon = ({ className }: { className?: string }) => (
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
      d='M13 10V3L4 14h7v7l9-11h-7z'
    />
  </svg>
);

const TrophyIcon = ({ className }: { className?: string }) => (
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
      d='M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7'
    />
  </svg>
);

const ChartIcon = ({ className }: { className?: string }) => (
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
      d='M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z'
    />
  </svg>
);

interface EventType {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const eventTypes: EventType[] = [
  {
    id: "conferences",
    title: "Conferences",
    description: "Professional conferences with expert speakers and networking opportunities",
    icon: UsersIcon,
    color: "from-[#2b8ffb] to-[#2b8ffb]/80",
  },
  {
    id: "exhibitions",
    title: "Exhibitions",
    description: "Engaging exhibitions showcasing products, services, and innovations",
    icon: StarIcon,
    color: "from-[#6c7cae] to-[#6c7cae]/80",
  },
  {
    id: "awards",
    title: "Awards Ceremonies",
    description: "Prestigious award ceremonies celebrating excellence and achievement",
    icon: TrophyIcon,
    color: "from-[#9c408c] to-[#9c408c]/80",
  },
];

const services: Service[] = [
  {
    id: "programme",
    title: "Programme Development",
    description: "Creating engaging and relevant event programs tailored to your objectives",
    icon: ChartIcon,
  },
  {
    id: "marketing",
    title: "Marketing & Design",
    description: "Strategic marketing campaigns and stunning visual designs",
    icon: LightningIcon,
  },
  {
    id: "registration",
    title: "Attendee Registration",
    description: "Seamless registration processes and attendee management",
    icon: UsersIcon,
  },
  {
    id: "sponsorship",
    title: "Sponsorship Sales",
    description: "Securing valuable partnerships and sponsorship opportunities",
    icon: StarIcon,
  },
  {
    id: "hospitality",
    title: "Hospitality Services",
    description: "Premium hospitality and customer service experiences",
    icon: CheckCircleIcon,
  },
  {
    id: "customer-service",
    title: "Customer Service",
    description: "Professional and responsive support throughout the event lifecycle",
    icon: CalendarIcon,
  },
];

export default function ManagedEventsPage() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-[#6c7cae]/5'>
      {/* Hero Section */}
      <div className='relative py-20 overflow-hidden'>
        {/* Background Image */}
        <div className='absolute inset-0 bg-gradient-to-r from-[#2b8ffb]/90 to-[#6c7cae]/90'>
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80")',
            }}
          ></div>
          <div className='absolute inset-0 bg-gradient-to-r from-[#2b8ffb]/80 to-[#6c7cae]/80'></div>

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
                  🎯 Managed Events
                </span>
              </div>
            </div>
            <h1 className='text-5xl font-bold text-white mb-6 drop-shadow-lg'>
              End-to-End Event Management
            </h1>
            <p className='text-xl text-white/90 max-w-4xl mx-auto mb-4 drop-shadow-md'>
              We recognize that running events can be resource intensive and a
              distraction from your everyday business. We are here to help you
              deliver expertly-run, cost-effective and engaging events without
              the stress.
            </p>
            <p className='text-lg text-white/90 max-w-4xl mx-auto mb-8 drop-shadow-md'>
              From creation to completion and everything in between, you can
              trust us to deliver.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button className='bg-white text-[#2b8ffb] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg'>
                Plan Your Event
              </button>
              <button className='border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#2b8ffb] transition-all duration-200'>
                View Our Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Why Choose Our Managed Event Services?
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              APC managed events are uniquely positioned to provide fine,
              high-value, competitively priced end-to-end event management
              services to help you extend your market reach and enhance your
              brand.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center p-6 rounded-xl bg-gradient-to-br from-[#2b8ffb]/5 to-[#2b8ffb]/10 border border-[#2b8ffb]/20'>
              <div className='w-16 h-16 bg-gradient-to-r from-[#2b8ffb] to-[#2b8ffb]/80 rounded-full flex items-center justify-center mx-auto mb-4'>
                <CheckCircleIcon className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Partnership Approach
              </h3>
              <p className='text-gray-600'>
                We work in partnership with our clients as an extension of their
                team from the outset to deliver an efficient, professional and
                responsive service.
              </p>
            </div>

            <div className='text-center p-6 rounded-xl bg-gradient-to-br from-[#6c7cae]/5 to-[#6c7cae]/10 border border-[#6c7cae]/20'>
              <div className='w-16 h-16 bg-gradient-to-r from-[#6c7cae] to-[#6c7cae]/80 rounded-full flex items-center justify-center mx-auto mb-4'>
                <GlobeIcon className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Global Reach
              </h3>
              <p className='text-gray-600'>
                We are used to working on a full range of events, including
                awards, exhibitions and conferences, across worldwide locations.
              </p>
            </div>

            <div className='text-center p-6 rounded-xl bg-gradient-to-br from-[#9c408c]/5 to-[#9c408c]/10 border border-[#9c408c]/20'>
              <div className='w-16 h-16 bg-gradient-to-r from-[#9c408c] to-[#9c408c]/80 rounded-full flex items-center justify-center mx-auto mb-4'>
                <StarIcon className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Expert Team
              </h3>
              <p className='text-gray-600'>
                Our team is supported by specialists in programme development,
                marketing, design, and comprehensive event services.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Event Types Section */}
      <div className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Types of Events We Manage
            </h2>
            <p className='text-lg text-gray-600'>
              From intimate gatherings to large-scale international events
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {eventTypes.map((eventType) => (
              <div
                key={eventType.id}
                className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2'
              >
                <div
                  className={`h-2 bg-gradient-to-r ${eventType.color}`}
                ></div>
                <div className='p-6'>
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${eventType.color} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <eventType.icon className='w-6 h-6 text-white' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-3'>
                    {eventType.title}
                  </h3>
                  <p className='text-gray-600'>{eventType.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Our Specialist Services
            </h2>
            <p className='text-lg text-gray-600'>
              Our team is supported by specialists across all aspects of event
              management
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {services.map((service) => (
              <div
                key={service.id}
                className='bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-[#2b8ffb]/30 transition-all duration-300'
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ${
                    hoveredService === service.id
                      ? "bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae]"
                      : "bg-gray-100"
                  }`}
                >
                  <service.icon
                    className={`w-6 h-6 transition-colors duration-300 ${
                      hoveredService === service.id
                        ? "text-white"
                        : "text-gray-600"
                    }`}
                  />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {service.title}
                </h3>
                <p className='text-gray-600 text-sm'>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Our Event Management Process
            </h2>
            <p className='text-lg text-gray-600'>
              From creation to completion and everything in between
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white font-bold text-xl'>1</span>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Planning & Strategy
              </h3>
              <p className='text-gray-600 text-sm'>
                Understanding your objectives and developing comprehensive event
                strategy
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-[#6c7cae] to-[#9c408c] rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white font-bold text-xl'>2</span>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Design & Marketing
              </h3>
              <p className='text-gray-600 text-sm'>
                Creating compelling event branding and promotional campaigns
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-[#9c408c] to-[#2b8ffb] rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white font-bold text-xl'>3</span>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Execution
              </h3>
              <p className='text-gray-600 text-sm'>
                Seamless event delivery with professional management on the day
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white font-bold text-xl'>4</span>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Follow-Up
              </h3>
              <p className='text-gray-600 text-sm'>
                Post-event analysis, reporting, and continuous improvement
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl font-bold text-gray-900 mb-6'>
                Benefits of Managed Events
              </h2>
              <div className='space-y-4'>
                <div className='flex items-start space-x-3'>
                  <CheckCircleIcon className='w-6 h-6 text-[#2b8ffb] flex-shrink-0 mt-1' />
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-1'>
                      Cost-Effective Solutions
                    </h4>
                    <p className='text-gray-600'>
                      Competitively priced services that deliver exceptional
                      value for your investment
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-3'>
                  <CheckCircleIcon className='w-6 h-6 text-[#2b8ffb] flex-shrink-0 mt-1' />
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-1'>
                      Resource Optimization
                    </h4>
                    <p className='text-gray-600'>
                      Free your team to focus on core business while we handle
                      event complexities
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-3'>
                  <CheckCircleIcon className='w-6 h-6 text-[#2b8ffb] flex-shrink-0 mt-1' />
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-1'>
                      Market Reach Enhancement
                    </h4>
                    <p className='text-gray-600'>
                      Extend your reach and enhance your brand through
                      professionally managed events
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-3'>
                  <CheckCircleIcon className='w-6 h-6 text-[#2b8ffb] flex-shrink-0 mt-1' />
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-1'>
                      Stress-Free Experience
                    </h4>
                    <p className='text-gray-600'>
                      Expertly-run, engaging events delivered without the stress
                      and hassle
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-3'>
                  <CheckCircleIcon className='w-6 h-6 text-[#2b8ffb] flex-shrink-0 mt-1' />
                  <div>
                    <h4 className='font-semibold text-gray-900 mb-1'>
                      Professional Excellence
                    </h4>
                    <p className='text-gray-600'>
                      Efficient, professional and responsive service at every
                      stage
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-gradient-to-br from-[#2b8ffb]/5 to-[#6c7cae]/5 rounded-2xl p-8 border border-[#2b8ffb]/10'>
              <div className='text-center'>
                <GlobeIcon className='w-16 h-16 text-[#2b8ffb] mx-auto mb-6' />
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  Ready to Create Something Amazing?
                </h3>
                <p className='text-gray-600 mb-6'>
                  Let us manage your next event and deliver an exceptional
                  experience that exceeds expectations.
                </p>
                <div className='space-y-3'>
                  <div className='flex items-center justify-center space-x-2 text-gray-700'>
                    <CalendarIcon className='w-5 h-5 text-[#2b8ffb]' />
                    <span>Worldwide event locations</span>
                  </div>
                  <div className='flex items-center justify-center space-x-2 text-gray-700'>
                    <UsersIcon className='w-5 h-5 text-[#2b8ffb]' />
                    <span>Experienced specialist team</span>
                  </div>
                  <div className='flex items-center justify-center space-x-2 text-gray-700'>
                    <StarIcon className='w-5 h-5 text-[#2b8ffb]' />
                    <span>High-value services</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] py-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl font-bold text-white mb-4'>
            Let's Create Your Next Successful Event
          </h2>
          <p className='text-xl text-white/90 mb-8'>
            Contact us today to discuss your event management needs and discover
            how we can help you deliver an exceptional experience.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-white text-[#2b8ffb] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg'>
              Get Started
            </button>
            <button className='border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#2b8ffb] transition-all duration-200'>
              Contact Our Team
            </button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className='bg-gray-900 text-white py-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <p className='text-gray-300'>
            🎯 Partner with us for expertly-managed, stress-free events
          </p>
          <p className='text-sm text-gray-400 mt-2'>
            © 2025 Achromic Point Consulting. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

