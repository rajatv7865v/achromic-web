"use client";

import Pagination from "@/components/common/Pagination";
import { useApi } from "@/hooks/useApi";
import { getCategories } from "@/services/category";
import { getEvents } from "@/services/event/index";
import { daysDifference, formatCustomDate } from "@/utils/helper";
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

const EyeIcon = ({ className }: { className?: string }) => (
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
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
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

export default function PastEventPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [categories, setCategories] = useState<any>([]);
  const [events, setEvents] = useState<any>([]);
  const { data, loading, error, run } = useApi<{ data: any[] }>();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000); // 500ms delay

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    (async () => {
      const [category, events]: any = await Promise.all([
        run(getCategories),
        getEvents({
          eventType: "PAST",
          page,
          limit: 9,
          search: debouncedSearchTerm,
          searchFields: "name,location",
        }),
      ]);
      setCategories([
        "All",
        ...(category?.data?.map((item: any) => item.name) ?? []),
      ]);
      setTotalPages(events.data?.meta?.totalPages);
      const eventsData = events?.data?.data || [];
      setEvents(eventsData);
      // Set first event as selected by default
    })();
  }, [run, page, debouncedSearchTerm]);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#6c7cae]/5">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2b8ffb]/90 to-[#6c7cae]/90">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80")',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#2b8ffb]/80 to-[#6c7cae]/80"></div>

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
                  📅 Past Events
                </span>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Our Event History
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow-md">
              Explore our successful past events and conferences. Learn from our
              expertise and join us for future transformative experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#2b8ffb] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                View Upcoming Events
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#2b8ffb] transition-all duration-200">
                Subscribe to Updates
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Past Events
          </h2>
          <p className="text-lg text-gray-600">
            Our most successful and impactful events from the past year
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {events
            .filter((_: any, index: number) => index < 2)
            .map((event: any) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <div className="h-full w-full bg-gradient-to-br from-[#2b8ffb]/10 to-[#6c7cae]/10 flex items-center justify-center">
                    <div className="h-full w-full bg-gradient-to-br from-[#2b8ffb]/10 to-[#6c7cae]/10 flex items-center justify-center">
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
                        <CalendarIcon className="w-16 h-16 text-[#2b8ffb] mx-auto mb-4" />
                        <div className="text-2xl font-bold text-white mb-2">
                          {formatCustomDate(event.dateFrom)}
                        </div>
                        <div className="text-xl font-semibold text-white">
                          {event.venue}, {event.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-[#2b8ffb] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {`${daysDifference(
                      event.dateFrom,
                      event.dateTo
                    )} Day's Conference`}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-wrap gap-2">
                      {(event.categories || []).map((tag: string) => (
                        <span
                          key={tag}
                          className="bg-[#2b8ffb]/10 text-[#2b8ffb] px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-1">
                      {renderStars(4.6)}
                      <span className="text-sm text-gray-600 ml-1">
                        ({4.6})
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {event.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <UsersIcon className="w-4 h-4" />
                      <span>{event.attendees || 250}+ attendees</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <div className="w-full">
                      <Link
                        href={`/event/${event.slug}`}
                        className="w-full items-center justify-center flex bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white px-4 py-2 rounded-lg font-semibold hover:from-[#2b8ffb]/90 hover:to-[#6c7cae]/90 transition-all duration-200"
                      >
                        View Details
                      </Link>
                    </div>
                    <Link
                      href={`/gallery/${event.slug}`}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Gallery
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* All Events Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All Past Events
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Browse through our complete history of successful events and
              conferences
            </p>

            {/* Search and Category Filter */}
            <div className="mb-8">
            

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category: string) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

                {/* Search Input */}
              <div className="max-w-2xl mx-auto mt-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search events by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2b8ffb] focus:border-transparent shadow-sm text-lg text-gray-800"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event: any) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <div className="relative">
                  <div className="h-full bg-gradient-to-br from-[#2b8ffb]/5 to-[#6c7cae]/5 flex items-center justify-center">
                    <div className="h-full w-full bg-gradient-to-br from-[#2b8ffb]/10 to-[#6c7cae]/10 flex items-center justify-center">
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
                        <CalendarIcon className="w-14 h-14 text-[#2b8ffb] mx-auto mb-4" />
                        <div className="text-xl font-bold text-white mb-2">
                          {formatCustomDate(event.dateFrom)}
                        </div>
                        <div className="text-[18px] font-semibold text-white">
                          {event.venue}, {event.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  {hoveredEvent === event.id && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-3">
                      <button className="bg-[#2b8ffb] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#2b8ffb]/90 transition-colors duration-200 flex items-center space-x-2">
                        <EyeIcon className="w-4 h-4" />
                        <Link href={`/event/${event.slug}`}>View</Link>
                      </button>
                      <Link
                        href={`/gallery/${event.slug}`}
                        className="bg-white text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                      >
                        Gallery
                      </Link>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex flex-wrap gap-2">
                      {(event.categories || []).map((tag: string) => (
                        <span
                          key={tag}
                          className="bg-[#2b8ffb]/10 text-[#2b8ffb] px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-1">
                      {renderStars(event.rating)}
                      <span className="text-xs text-gray-500 ml-1">
                        ({event.rating})
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    {event.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <UsersIcon className="w-3 h-3" />
                      <span>{event.attendees || 200}+ attendees</span>
                    </div>
                    <span className="text-[#2b8ffb] font-medium">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Statistics Section */}
      <div className="bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-white/90">
              Celebrating our successful journey in professional development
            </p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            📅 Join us for our upcoming events and be part of our success story
          </p>
          <p className="text-sm text-gray-400 mt-2">
            © 2026 Achromic Point. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
