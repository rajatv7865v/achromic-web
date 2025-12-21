import { useApi } from "@/hooks/useApi";
import { getEvent } from "@/services/event";
import { formatCustomDate } from "@/utils/helper";
import { ArrowRightIcon, CalendarIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const PastEvent = () => {
  const [pastEvents, setPastEvent] = useState<any>([]);
  const { data, loading, error, run } = useApi<{ data: any[] }>();

  useEffect(() => {
    (async () => {
      const eventsData = await run(getEvent, "PAST");
      setPastEvent(eventsData?.data || []);
    })();
  }, [run]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Past Events</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our successful past events and conferences. Learn from our
            expertise and join us for future transformative experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {pastEvents.map((event: any) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <CalendarIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-gray-800 mb-2">
                      {formatCustomDate(event.dateFrom)}
                    </div>
                    <div className="text-lg font-semibold text-gray-700">
                      {event.location}
                    </div>
                  </div>
                </div>
                {event.featured && (
                  <div className="absolute top-4 right-4 bg-[#6c7cae] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                  {event.name}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(4.3)}
                    <span className="text-xs text-gray-500 ml-1">
                      ({event.rating})
                    </span>
                  </div>
                </div>

                <Link
                  href={`/event/${event.slug}`}
                  className="w-full bg-gradient-to-r from-[#6c7cae] to-[#9c408c] text-white px-4 py-2 rounded-lg font-semibold hover:from-[#6c7cae]/90 hover:to-[#9c408c]/90 transition-all duration-200 text-center block"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/past-events"
            className="inline-flex items-center bg-gradient-to-r from-[#6c7cae] to-[#9c408c] text-white px-8 py-3 rounded-full font-semibold hover:from-[#6c7cae]/90 hover:to-[#9c408c]/90 transition-all duration-200 shadow-lg"
          >
            View All Past Events
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PastEvent;
