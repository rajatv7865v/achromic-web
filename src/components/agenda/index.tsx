"use client";

import { useState, useEffect } from "react";
import { getAgenda } from "../../services/agenda";

// Simple SVG Icons
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

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

interface Speaker {
  id: string;
  name: string;
  designation: string;
  organization: string;
  description: string;
  avatar?: string;
  linkedinUrl?: string;
}

interface Session {
  eventId: {
    name: string;
    description: string;
    content: string;
    dateFrom: string;
    dateTo: string;
    bannerUrl: string;
    timeFrom: string;
    timeTo: string;
    slug: string;
    venue: string;
    location: string;
  };
  id: string;
  title: string;
  time: string;
  duration: string;
  location: string;
  date?: string;
  venue?: string;
  content?: string;
  images?: string[];
  analytics?: {
    views?: number;
    likes?: number;
    attendees?: number;
    rating?: number;
  };
  type: "keynote" | "panel" | "award" | "break" | "networking";
  description: string;
  sessions: Session[];
  speakers: Speaker[];
}

interface AgendaData {
  data: {
    data: Session[];
  };
}

interface AgendaProps {
  eventId?: string;
}

export default function Agenda({ eventId }: AgendaProps) {
  const [expandedSessions, setExpandedSessions] = useState<string[]>([]);
  const [agendaData, setAgendaData] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!eventId) {
          // If no eventId provided, show empty state
          setAgendaData([]);
          setError("No event ID provided");
          setLoading(false);
          return;
        }

        const data = await getAgenda(eventId);

        // Extract agenda data from the API response structure
        let agendaArray: Session[] = [];

        try {
          if (data?.data?.data && Array.isArray(data.data.data)) {
            agendaArray = data.data.data;
          } else if (data?.data && Array.isArray(data.data)) {
            agendaArray = data.data;
          } else if (Array.isArray(data)) {
            agendaArray = data;
          } else {
            throw new Error("Invalid data structure received from API");
          }
        } catch (parseError) {
          throw new Error("Failed to parse agenda data from API response");
        }

        if (agendaArray.length === 0) {
          setError("No agenda sessions found for this event");
        } else {
          setError(null); // Clear any previous errors
        }

        setAgendaData(agendaArray);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to load agenda data from backend";
        setError(errorMessage);
        setAgendaData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAgenda();
  }, [eventId]);
  const toggleSession = (sessionId: string) => {
    setExpandedSessions((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const retryFetch = () => {
    if (eventId) {
      setError(null);
      setLoading(true);
      // The useEffect will automatically retry when eventId changes
      // We can trigger it by updating the dependency
      window.location.reload();
    }
  };

  const getSessionTypeColor = (type: Session["type"]) => {
    switch (type) {
      case "keynote":
        return "bg-[#2b8ffb]/10 text-[#2b8ffb] border-[#2b8ffb]/20";
      case "panel":
        return "bg-[#6c7cae]/10 text-[#6c7cae] border-[#6c7cae]/20";
      case "award":
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
      case "award":
        return "🛠️";
      case "break":
        return "☕";
      case "networking":
        return "🤝";
      default:
        return "📋";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#6c7cae]/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2b8ffb] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading agenda...</p>
        </div>
      </div>
    );
  }

  if (error && agendaData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#6c7cae]/5 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-600 mb-4">
            <h3 className="text-xl font-semibold mb-2">
              Unable to Load Agenda
            </h3>
            <p className="text-sm">{error}</p>
            {eventId && (
              <p className="text-xs mt-2 text-gray-500">Event ID: {eventId}</p>
            )}
          </div>
          <button
            onClick={retryFetch}
            className="px-4 py-2 bg-[#2b8ffb] text-white rounded-lg hover:bg-[#2b8ffb]/80"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#6c7cae]/5">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {agendaData[0]?.eventId?.name || "Event Agenda"}
          </h1>
          <div className="text-xl text-gray-600 font-medium space-y-2">
            {agendaData[0]?.eventId?.dateFrom && (
              <p className="flex items-center justify-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-[#2b8ffb]" />
                <span>{agendaData[0]?.eventId?.dateFrom}</span>
              </p>
            )}
            {agendaData[0]?.eventId?.venue && (
              <p className="flex items-center justify-center space-x-2">
                <MapPinIcon className="w-5 h-5 text-[#2b8ffb]" />
                <span>{agendaData[0]?.eventId?.venue}</span>
              </p>
            )}
            {<p>{agendaData[0]?.eventId?.description}</p>}
          </div>
        </div>

        {/* Agenda Timeline */}
        <div className="relative">
          {/* Main Timeline Line */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#2b8ffb] to-[#6c7cae]"></div>

          <div className="space-y-8">
            {!Array.isArray(agendaData) || agendaData.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No agenda sessions found for this event.
                </p>
              </div>
            ) : (
              agendaData[0]?.sessions?.map(
                (session: Session, index: number) => (
                  <div key={session.id} className="relative flex items-start">
                    {/* Time Badge */}
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#2b8ffb] to-[#6c7cae] rounded-full flex items-center justify-center text-white font-bold text-lg relative z-10 border-4 border-white shadow-lg">
                      {session.time}
                    </div>

                    {/* Session Card */}
                    <div className="ml-6 flex-1">
                      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        {/* Session Header */}
                        <div
                          className="p-6 cursor-pointer"
                          onClick={() => toggleSession(session.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-3 mb-2">
                                <span className="text-2xl">
                                  {getSessionTypeIcon(session.type)}
                                </span>
                                <h3 className="text-xl font-semibold text-gray-900">
                                  {session.title}
                                </h3>
                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getSessionTypeColor(
                                    session.type
                                  )}`}
                                >
                                  {session?.type?.charAt(0).toUpperCase() +
                                    session?.type?.slice(1)}
                                </span>
                              </div>

                              <div className="flex items-center space-x-6 text-sm text-gray-500 pt-5">
                                <div className="flex items-center space-x-1">
                                  <ClockIcon className="w-4 h-4" />
                                  <span>{session.duration}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MapPinIcon className="w-4 h-4" />
                                  <span>{agendaData[0]?.eventId?.venue}</span>
                                </div>
                                {session.speakers?.length > 0 && (
                                  <div className="flex items-center space-x-1">
                                    <UserIcon className="w-4 h-4" />
                                    <span>
                                      {session.speakers.length} Speaker
                                      {session.speakers.length !== 1 ? "s" : ""}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Expand/Collapse Button */}
                            <div className="flex-shrink-0 ml-4">
                              {expandedSessions.includes(session.id) ? (
                                <ChevronDownIcon className="w-6 h-6 text-gray-400" />
                              ) : (
                                <ChevronRightIcon className="w-6 h-6 text-gray-400" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Expanded Content */}
                        {expandedSessions.includes(session.id) && (
                          <div className="border-t border-gray-200 bg-gray-50 p-6">
                            {/* Session Description/Content */}

                            {session.content && (
                              <div className="mb-6">
                                <h5 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
                                  Additional Details
                                </h5>
                                <div
                                  className="prose prose-sm max-w-none text-gray-700
                                    prose-ul:list-disc prose-ul:pl-6
                                    prose-ol:list-decimal prose-ol:pl-6"
                                  dangerouslySetInnerHTML={{
                                    __html: session.content || "",
                                  }}
                                />
                              </div>
                            )}
                            {/* Analytics Snapshot */}
                            {session.analytics && (
                              <div className="mb-6">
                                <h5 className="text-sm uppercase tracking-wide text-gray-500 mb-3">
                                  Session Analytics
                                </h5>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                  {session.analytics.attendees !==
                                    undefined && (
                                    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                                      <p className="text-xs text-gray-500">
                                        Attendees
                                      </p>
                                      <p className="text-xl font-semibold text-gray-900">
                                        {session.analytics.attendees}
                                      </p>
                                    </div>
                                  )}
                                  {session.analytics.views !== undefined && (
                                    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                                      <p className="text-xs text-gray-500">
                                        Views
                                      </p>
                                      <p className="text-xl font-semibold text-gray-900">
                                        {session.analytics.views}
                                      </p>
                                    </div>
                                  )}
                                  {session.analytics.likes !== undefined && (
                                    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                                      <p className="text-xs text-gray-500">
                                        Likes
                                      </p>
                                      <p className="text-xl font-semibold text-gray-900">
                                        {session.analytics.likes}
                                      </p>
                                    </div>
                                  )}
                                  {session.analytics.rating !== undefined && (
                                    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                                      <p className="text-xs text-gray-500">
                                        Avg. Rating
                                      </p>
                                      <p className="text-xl font-semibold text-gray-900">
                                        {session.analytics.rating.toFixed(1)}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                            {/* Image Gallery */}
                            {session.images && session.images.length > 0 && (
                              <div className="mb-6">
                                <h5 className="text-sm uppercase tracking-wide text-gray-500 mb-3">
                                  Session Gallery
                                </h5>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                  {session.images.map((src, idx) => (
                                    <div
                                      key={`${session.id}-img-${idx}`}
                                      className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
                                    >
                                      <img
                                        src={src}
                                        alt={`Session media ${idx + 1}`}
                                        className="w-full h-28 object-cover"
                                        onError={(e) => {
                                          (
                                            e.target as HTMLImageElement
                                          ).style.display = "none";
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Speakers */}
                            {session.speakers &&
                              session.speakers.length > 0 && (
                                <>
                                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                    Speakers
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {session.speakers &&
                                    session.speakers.length > 0 ? (
                                      session.speakers.map(
                                        (speaker: Speaker) => (
                                          <div
                                            key={speaker.id}
                                            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
                                          >
                                            <div className="flex items-start space-x-3">
                                              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                                {speaker.avatar ? (
                                                  <img
                                                    src={speaker?.avatar}
                                                    alt={speaker?.avatar}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                      const target =
                                                        e.target as HTMLImageElement;
                                                      target.style.display =
                                                        "none";
                                                      target.nextElementSibling?.classList.remove(
                                                        "hidden"
                                                      );
                                                    }}
                                                  />
                                                ) : null}
                                                <div
                                                  className={`w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center ${
                                                    speaker.avatar
                                                      ? "hidden"
                                                      : ""
                                                  }`}
                                                >
                                                  <UserIcon className="w-6 h-6 text-gray-600" />
                                                </div>
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <h5 className="font-semibold text-gray-900">
                                                  {speaker.name}
                                                </h5>
                                                <p className="text-sm text-[#2b8ffb] font-medium">
                                                  {speaker.designation}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                  {speaker.organization}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                                                  {speaker.description}
                                                </p>

                                                {/* Social Links */}
                                                <div className="flex space-x-2 mt-3">
                                                  {speaker?.linkedinUrl && (
                                                    <a
                                                      href={
                                                        speaker?.linkedinUrl
                                                      }
                                                      target="_blank"
                                                      rel="noopener noreferrer"
                                                      className="text-[#0077B5] hover:text-[#0077B5]/80 transition-colors duration-200"
                                                      title="LinkedIn Profile"
                                                    >
                                                      <LinkedInIcon className="w-5 h-5" />
                                                    </a>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )
                                    ) : (
                                      <div className="col-span-full text-center py-4">
                                        <p className="text-gray-500 text-sm">
                                          No speakers assigned to this session
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 p-6 bg-[#2b8ffb]/5 rounded-xl border border-[#2b8ffb]/20">
          <p className="text-[#2b8ffb] font-medium">
            📅 All times are in local timezone. Schedule subject to change.
          </p>
        </div>
      </div>
    </div>
  );
}
