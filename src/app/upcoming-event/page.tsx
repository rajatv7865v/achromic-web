"use client";

import { useApi } from "@/hooks/useApi";
import { getCategories } from "@/services/category";
import { getEvent } from "@/services/event";
import {
  daysDifference,
  formatCustomDate,
  formatTimeRange,
} from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

const MapPinIcon = ({ className }: { className?: string }) => (
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

export default function UpcomingEventPage() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("overview");

  const [categories, setCategories] = useState<any>([]);
  const [events, setEvents] = useState<any>([]);
  const { data, loading, error, run } = useApi<{ data: any[] }>();

  useEffect(() => {
    (async () => {
      const [category, events]: any = await Promise.all([
        run(getCategories),
        run(getEvent, "UPCOMING"),
      ]);
      setCategories([
        "All",
        ...(category?.data?.map((item: any) => item.name) ?? []),
      ]);
      const eventsData = events?.data || [];
      setEvents(eventsData);
      // Set first event as selected by default
      if (eventsData.length > 0 && !selectedEvent) {
        setSelectedEvent(transformEvent(eventsData[0]));
      }
    })();
  }, [run, selectedEvent]);

  const getRegistrationProgress = (registered: number, max: number) => {
    return (registered / max) * 100;
  };

  const getDaysUntilEvent = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Transform API event data to match component expectations
  const transformEvent = (event: any) => {
    return {
      ...event,
      // Use name as title if title doesn't exist
      title: event.title || event.name,
      // Handle date formatting
      date: event.dateFrom
        ? new Date(event.dateFrom).toLocaleDateString()
        : event.date,
      // Handle time formatting
      time:
        event.timeFrom && event.timeTo
          ? `${event.timeFrom} - ${event.timeTo}`
          : event.timeFrom || event.time,
      // Default values for missing fields
      price: event.price || 10000,
      earlyBirdPrice: event.earlyBirdPrice || 8000,
      maxAttendees: event.maxAttendees || 100,
      registeredAttendees: event.registeredAttendees || 0,
      featured: event.featured || false,
      highlights: event.highlights || [
        "Expert-led sessions",
        "Networking opportunities",
        "Certificate of participation",
        "Refreshments included",
      ],
      speakers: event.speakers || [],
      agenda: event.agenda || [],
      benefits: event.benefits || [
        "Certificate of Participation",
        "Networking Opportunities",
        "Event Materials",
        "Refreshments",
      ],
    };
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#6c7cae]/5">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#be3437]/90 to-[#6c7cae]/90">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80")',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#be3437]/80 to-[#6c7cae]/80"></div>

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 border border-white/20 mb-4">
                <span className="text-white/90 font-medium">
                  📅 Upcoming Events
                </span>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Join Our Next Event
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow-md">
              Discover our upcoming conferences, workshops, and training
              programs. Connect with industry experts and advance your
              professional journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#be3437] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                Register Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#be3437] transition-all duration-200">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Events List Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-600">
            Choose from our upcoming events and secure your spot
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {events
            .filter((_: any, index: number) => index < 2)
            .map((event: any) => {
              const transformedEvent = transformEvent(event);
              return (
                <div
                  key={event._id || event.id || Date.now()}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
                    selectedEvent?._id === event._id ||
                    selectedEvent?.id === event.id
                      ? "ring-2 ring-[#be3437]"
                      : ""
                  }`}
                  onClick={() => setSelectedEvent(transformedEvent)}
                >
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-[#be3437]/10 to-[#6c7cae]/10 flex items-center justify-center">
                      <Image
                        alt={event.title || event.name || "Event"}
                        src={
                          "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80"
                        }
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="text-center absolute h-full w-full bg-black/40 flex flex-col justify-center text-white items-center">
                        <CalendarIcon className="w-16 h-16 text-[#be3437] mx-auto mb-4" />
                        <div className="text-2xl font-bold text-white mb-2">
                          {formatCustomDate(event.dateFrom)}
                        </div>
                        <div className="text-xl font-semibold text-white">
                          {event.venue}, {event.location}
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 bg-[#be3437] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {`${daysDifference(
                        event.dateFrom,
                        event.dateTo
                      )} Days Conference`}
                    </div>

                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="text-sm font-semibold text-gray-900">
                        {getDaysUntilEvent(event.dateFrom)} days to go
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex flex-wrap gap-2">
                        {(event.categories || []).map((tag: string) => (
                          <span
                            key={tag}
                            className="bg-[#be3437]/10 text-[#be3437] px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {event.location}
                        </div>
                        <div className="text-sm text-gray-500 ">
                          {event.venue}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {event.title || event.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>
                          {event.timeFrom && event.timeTo
                            ? formatTimeRange(
                                `${event.timeFrom} - ${event.timeTo}`
                              )
                            : "TBA"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <UsersIcon className="w-4 h-4" />
                        <span>
                          {143}/{200} registered
                        </span>
                      </div>
                    </div>

                    {/* Registration Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Registration Progress</span>
                        <span>
                          {Math.round(getRegistrationProgress(143, 200))}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-[#be3437] to-[#6c7cae] h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${getRegistrationProgress(143, 200)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="w-full">
                      <Link
                        href={`/event/${event.slug}`}
                        className="w-full items-center justify-center flex bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white px-4 py-2 rounded-lg font-semibold hover:from-[#be3437]/90 hover:to-[#6c7cae]/90 transition-all duration-200"
                      >
                        View Details & Register
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Category Filter */}
      <div className="text-center mb-12 bg-white py-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          All Conferences
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Browse through our complete collection of upcoming events
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category: any) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {events
            .filter((item: any) =>
              selectedCategory == "All"
                ? item
                : item.categories.includes(selectedCategory)
            )
            .map((event: any) => {
              const transformedEvent = transformEvent(event);
              return (
                <div
                  key={event._id || event.id || Date.now()}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
                    selectedEvent?._id === event._id ||
                    selectedEvent?.id === event.id
                      ? "ring-2 ring-[#be3437]"
                      : ""
                  }`}
                  onClick={() => setSelectedEvent(transformedEvent)}
                >
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-[#be3437]/10 to-[#6c7cae]/10 flex items-center justify-center">
                      <Image
                        alt={event.title || event.name || "Event"}
                        src={
                          "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80"
                        }
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="text-center absolute h-full w-full bg-black/40 flex flex-col justify-center text-white items-center">
                        <CalendarIcon className="w-16 h-16 text-[#be3437] mx-auto mb-4" />
                        <div className="text-2xl font-bold text-white mb-2">
                          {formatCustomDate(event.dateFrom)}
                        </div>
                        <div className="text-xl font-semibold text-white">
                          {event.location}
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-4 right-2 bg-[#be3437] text-white px-2 py-1 rounded-full text-[14px] font-semibold">
                      {`${daysDifference(
                        event.dateFrom,
                        event.dateTo
                      )} Days Conference`}
                    </div>

                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="text-sm font-semibold text-gray-900">
                        {getDaysUntilEvent(event.dateFrom)} days to go
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex flex-wrap gap-2">
                        {(event.categories || []).map((tag: string) => (
                          <span
                            key={tag}
                            className="bg-[#be3437]/10 text-[#be3437] px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {event.location}
                        </div>
                        <div className="text-sm text-gray-500 ">
                          {event.venue}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {event.title || event.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>
                          {event.timeFrom && event.timeTo
                            ? formatTimeRange(
                                `${event.timeFrom} - ${event.timeTo}`
                              )
                            : "TBA"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <UsersIcon className="w-4 h-4" />
                        <span>
                          {143}/{200} registered
                        </span>
                      </div>
                    </div>

                    {/* Registration Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Registration Progress</span>
                        <span>
                          {Math.round(getRegistrationProgress(143, 200))}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-[#be3437] to-[#6c7cae] h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${getRegistrationProgress(143, 200)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="w-full">
                      <Link
                        href={`/event/${event.slug}`}
                        className="w-full items-center justify-center flex bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white px-4 py-2 rounded-lg font-semibold hover:from-[#be3437]/90 hover:to-[#6c7cae]/90 transition-all duration-200"
                      >
                        View Details & Register
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#be3437] to-[#6c7cae] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Join Us?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Don't miss out on these transformative learning experiences.
            Register now and secure your spot.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#be3437] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg">
              Register for Event
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#be3437] transition-all duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            📅 Early bird pricing available. Limited seats remaining!
          </p>
          <p className="text-sm text-gray-400 mt-2">
            © 2024 Achromic Point. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
