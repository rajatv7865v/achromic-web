import { useApi } from "@/hooks/useApi";
import { getEvents } from "@/services/event";
import { ArrowRightIcon, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";



const UpcomingEvent = () => {
  const [events, setEvents] = useState<any>([]);
  const { data, loading, error, run } = useApi<{ data: any[] }>();

  const getDaysUntilEvent = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  useEffect(() => {
    (async () => {
      const eventsData = await (getEvents({eventType:'UPCOMING'}));
      setEvents(eventsData?.data || []);
    })();
  }, [run]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't miss our upcoming conferences, workshops, and training
            programs. Secure your spot and advance your professional journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event: any) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-[#2b8ffb]/10 to-[#6c7cae]/10 flex items-center justify-center">
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="text-sm font-semibold text-gray-900">
                      {getDaysUntilEvent(event.dateFrom)} days to go
                    </div>
                  </div>
                  <div className="text-center">
                    <CalendarIcon className="w-16 h-16 text-[#2b8ffb] mx-auto mb-4" />
                    <div className="text-2xl font-bold text-gray-800 mb-2">
                      {event.dateFrom}
                    </div>
                    <div className="text-lg font-semibold text-gray-700">
                      {event.venue}
                    </div>
                  </div>
                </div>
                {event.featured && (
                  <div className="absolute top-4 right-4 bg-[#2b8ffb] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}
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
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {event.location}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                  {event.title || event.name}
                </h3>

                <div className="w-full">
                  <Link
                    href={`/event/${event.slug}`}
                    className="w-full items-center justify-center flex bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white px-4 py-2 rounded-lg font-semibold hover:from-[#2b8ffb]/90 hover:to-[#6c7cae]/90 transition-all duration-200"
                  >
                    View Details & Register
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/upcoming-event"
            className="inline-flex items-center bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white px-8 py-3 rounded-full font-semibold hover:from-[#2b8ffb]/90 hover:to-[#6c7cae]/90 transition-all duration-200 shadow-lg"
          >
            View All Upcoming Events
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvent;
