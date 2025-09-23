"use client";

import { useState } from "react";

// Simple SVG Icons
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

const ChevronRightIcon = ({ className }: { className?: string }) => (
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
      d='M9 5l7 7-7 7'
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

const UserIcon = ({ className }: { className?: string }) => (
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
      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
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

interface Session {
  id: number;
  title: string;
  time: string;
  duration: string;
  location: string;
  type: "keynote" | "panel" | "workshop" | "break" | "networking";
  description: string;
  speakers: Speaker[];
}

const mockAgenda: Session[] = [
  {
    id: 1,
    title: "Welcome & Opening Keynote",
    time: "09:00",
    duration: "45 min",
    location: "Main Hall",
    type: "keynote",
    description:
      "Join us for an inspiring opening keynote that sets the tone for the day ahead.",
    speakers: [
      {
        id: 1,
        name: "Sarah Johnson",
        title: "CEO",
        company: "Tech Innovations Inc.",
        bio: "Sarah is a visionary leader with 15+ years of experience in technology and innovation.",
        image: "/api/placeholder/100/100",
        socialLinks: {
          linkedin: "https://linkedin.com/in/sarahjohnson",
          twitter: "@sarahj_ceo",
        },
      },
    ],
  },
  {
    id: 2,
    title: "Panel Discussion: Future of AI",
    time: "10:00",
    duration: "60 min",
    location: "Main Hall",
    type: "panel",
    description:
      "Leading experts discuss the latest trends and challenges in artificial intelligence.",
    speakers: [
      {
        id: 2,
        name: "Dr. Michael Chen",
        title: "Chief AI Officer",
        company: "AI Solutions Ltd.",
        bio: "Michael is a leading researcher in machine learning and AI ethics.",
        image: "/api/placeholder/100/100",
        socialLinks: {
          linkedin: "https://linkedin.com/in/michaelchen",
          website: "https://michaelchen.ai",
        },
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        title: "Head of Data Science",
        company: "DataFlow Systems",
        bio: "Emily specializes in predictive analytics and big data solutions.",
        image: "/api/placeholder/100/100",
        socialLinks: {
          linkedin: "https://linkedin.com/in/emilyrodriguez",
        },
      },
      {
        id: 4,
        name: "James Wilson",
        title: "AI Research Director",
        company: "Future Labs",
        bio: "James focuses on neural networks and deep learning applications.",
        image: "/api/placeholder/100/100",
        socialLinks: {
          linkedin: "https://linkedin.com/in/jameswilson",
          twitter: "@jameswilson_ai",
        },
      },
    ],
  },
  {
    id: 3,
    title: "Coffee Break & Networking",
    time: "11:00",
    duration: "30 min",
    location: "Foyer",
    type: "break",
    description:
      "Take a break, grab some coffee, and network with fellow attendees.",
    speakers: [],
  },
  {
    id: 4,
    title: "Workshop: Building Scalable Applications",
    time: "11:30",
    duration: "90 min",
    location: "Workshop Room A",
    type: "workshop",
    description:
      "Hands-on workshop covering best practices for building scalable web applications.",
    speakers: [
      {
        id: 5,
        name: "Alex Thompson",
        title: "Senior Software Architect",
        company: "CloudScale Technologies",
        bio: "Alex has over 10 years of experience in designing and building scalable systems.",
        image: "/api/placeholder/100/100",
        socialLinks: {
          linkedin: "https://linkedin.com/in/alexthompson",
          website: "https://alexthompson.dev",
        },
      },
    ],
  },
  {
    id: 5,
    title: "Lunch & Networking",
    time: "13:00",
    duration: "60 min",
    location: "Restaurant",
    type: "networking",
    description:
      "Enjoy a delicious lunch while connecting with industry professionals.",
    speakers: [],
  },
  {
    id: 6,
    title: "Closing Keynote: The Next Decade",
    time: "14:00",
    duration: "45 min",
    location: "Main Hall",
    type: "keynote",
    description:
      "A forward-looking presentation on what the next decade holds for our industry.",
    speakers: [
      {
        id: 6,
        name: "Dr. Lisa Park",
        title: "Futurist & Innovation Strategist",
        company: "Future Insights Group",
        bio: "Lisa is a renowned futurist who helps organizations prepare for tomorrow's challenges.",
        image: "/api/placeholder/100/100",
        socialLinks: {
          linkedin: "https://linkedin.com/in/lisapark",
          twitter: "@lisapark_future",
          website: "https://futureinsights.com",
        },
      },
    ],
  },
];

export default function Agenda() {
  const [expandedSessions, setExpandedSessions] = useState<number[]>([]);

  const toggleSession = (sessionId: number) => {
    setExpandedSessions((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const getSessionTypeColor = (type: Session["type"]) => {
    switch (type) {
      case "keynote":
        return "bg-[#be3437]/10 text-[#be3437] border-[#be3437]/20";
      case "panel":
        return "bg-[#6c7cae]/10 text-[#6c7cae] border-[#6c7cae]/20";
      case "workshop":
        return "bg-[#9c408c]/10 text-[#9c408c] border-[#9c408c]/20";
      case "break":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "networking":
        return "bg-[#6c7cae]/10 text-[#6c7cae] border-[#6c7cae]/20";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSessionTypeIcon = (type: Session["type"]) => {
    switch (type) {
      case "keynote":
        return "🎤";
      case "panel":
        return "👥";
      case "workshop":
        return "🛠️";
      case "break":
        return "☕";
      case "networking":
        return "🤝";
      default:
        return "📋";
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-[#6c7cae]/5'>
      <div className='max-w-6xl mx-auto px-4 py-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Event Agenda
          </h1>
          <p className='text-xl text-gray-600 font-medium'>
            Discover our carefully curated lineup of sessions and speakers
          </p>
        </div>

        {/* Agenda Timeline */}
        <div className='relative'>
          {/* Main Timeline Line */}
          <div className='absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#be3437] to-[#6c7cae]'></div>

          <div className='space-y-8'>
            {mockAgenda.map((session, index) => (
              <div key={session.id} className='relative flex items-start'>
                {/* Time Badge */}
                <div className='flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#be3437] to-[#6c7cae] rounded-full flex items-center justify-center text-white font-bold text-lg relative z-10 border-4 border-white shadow-lg'>
                  {session.time}
                </div>

                {/* Session Card */}
                <div className='ml-6 flex-1'>
                  <div className='bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300'>
                    {/* Session Header */}
                    <div
                      className='p-6 cursor-pointer'
                      onClick={() => toggleSession(session.id)}
                    >
                      <div className='flex items-start justify-between'>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center space-x-3 mb-2'>
                            <span className='text-2xl'>
                              {getSessionTypeIcon(session.type)}
                            </span>
                            <h3 className='text-xl font-semibold text-gray-900'>
                              {session.title}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium border ${getSessionTypeColor(
                                session.type
                              )}`}
                            >
                              {session.type.charAt(0).toUpperCase() +
                                session.type.slice(1)}
                            </span>
                          </div>

                          <p className='text-gray-600 mb-3'>
                            {session.description}
                          </p>

                          <div className='flex items-center space-x-6 text-sm text-gray-500'>
                            <div className='flex items-center space-x-1'>
                              <ClockIcon className='w-4 h-4' />
                              <span>{session.duration}</span>
                            </div>
                            <div className='flex items-center space-x-1'>
                              <MapPinIcon className='w-4 h-4' />
                              <span>{session.location}</span>
                            </div>
                            {session.speakers.length > 0 && (
                              <div className='flex items-center space-x-1'>
                                <UserIcon className='w-4 h-4' />
                                <span>
                                  {session.speakers.length} Speaker
                                  {session.speakers.length !== 1 ? "s" : ""}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Expand/Collapse Button */}
                        <div className='flex-shrink-0 ml-4'>
                          {expandedSessions.includes(session.id) ? (
                            <ChevronDownIcon className='w-6 h-6 text-gray-400' />
                          ) : (
                            <ChevronRightIcon className='w-6 h-6 text-gray-400' />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {expandedSessions.includes(session.id) &&
                      session.speakers.length > 0 && (
                        <div className='border-t border-gray-200 bg-gray-50 p-6'>
                          <h4 className='text-lg font-semibold text-gray-900 mb-4'>
                            Speakers
                          </h4>
                          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {session.speakers.map((speaker) => (
                              <div
                                key={speaker.id}
                                className='bg-white rounded-lg p-4 shadow-sm border border-gray-100'
                              >
                                <div className='flex items-start space-x-3'>
                                  <div className='w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center'>
                                    <UserIcon className='w-6 h-6 text-gray-600' />
                                  </div>
                                  <div className='flex-1 min-w-0'>
                                    <h5 className='font-semibold text-gray-900'>
                                      {speaker.name}
                                    </h5>
                                    <p className='text-sm text-[#be3437] font-medium'>
                                      {speaker.title}
                                    </p>
                                    <p className='text-sm text-gray-600'>
                                      {speaker.company}
                                    </p>
                                    <p className='text-xs text-gray-500 mt-2 line-clamp-2'>
                                      {speaker.bio}
                                    </p>

                                    {/* Social Links */}
                                    <div className='flex space-x-2 mt-3'>
                                      {speaker.socialLinks.linkedin && (
                                        <a
                                          href={speaker.socialLinks.linkedin}
                                          target='_blank'
                                          rel='noopener noreferrer'
                                          className='text-[#be3437] hover:text-[#be3437]/80 text-xs'
                                        >
                                          LinkedIn
                                        </a>
                                      )}
                                      {speaker.socialLinks.twitter && (
                                        <a
                                          href={`https://twitter.com/${speaker.socialLinks.twitter.replace(
                                            "@",
                                            ""
                                          )}`}
                                          target='_blank'
                                          rel='noopener noreferrer'
                                          className='text-[#6c7cae] hover:text-[#6c7cae]/80 text-xs'
                                        >
                                          Twitter
                                        </a>
                                      )}
                                      {speaker.socialLinks.website && (
                                        <a
                                          href={speaker.socialLinks.website}
                                          target='_blank'
                                          rel='noopener noreferrer'
                                          className='text-gray-600 hover:text-gray-800 text-xs'
                                        >
                                          Website
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className='text-center mt-12 p-6 bg-[#be3437]/5 rounded-xl border border-[#be3437]/20'>
          <p className='text-[#be3437] font-medium'>
            📅 All times are in local timezone. Schedule subject to change.
          </p>
        </div>
      </div>
    </div>
  );
}
