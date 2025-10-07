import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/assets/logo/logo.png";
import { BuildingIcon, CalendarIcon, CheckCircleIcon, UserIcon } from "lucide-react";

export default function RegisterCard({event}:{event:any}) {
    const getProgressPercentage = (registered: number, seats: string) => {
        return (registered / parseInt(seats)) * 100;
      };
  return (
    <div
    key={event.id}
    className={`group relative cursor-pointer transition-all duration-300 ${
        event === event.id
        ? "ring-4 ring-[#be3437] ring-opacity-50"
        : ""
    }`}
    // onClick={() => {
    //   setSelectedEvent(event.id);
    //   setFormData((prev) => ({
    //     ...prev,
    //     eventId: event.id.toString(),
    //   }));
    // }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-[#be3437]/10 to-[#6c7cae]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
    <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift border border-gray-100">
      {event.featured && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white px-3 py-1 rounded-full text-sm font-semibold">
          Featured
        </div>
      )}

      <div className="mb-4">
        <span className="bg-[#be3437]/10 text-[#be3437] px-3 py-1 rounded-full text-sm font-medium">
          {event.category}
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">
        {event.title}
      </h3>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-gray-600">
          <CalendarIcon className="w-5 h-5 mr-2 text-[#be3437]" />
          <span className="font-medium">{event.date}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <BuildingIcon className="w-5 h-5 mr-2 text-[#6c7cae]" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <UserIcon className="w-5 h-5 mr-2 text-[#9c408c]" />
          <span>{event.duration}</span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-6 line-clamp-3">
        {event.description}
      </p>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            Registration Progress
          </span>
          <span className="text-sm font-medium text-gray-900">
            {event.registered}/{parseInt(event.seats)}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-[#be3437] to-[#6c7cae] h-2 rounded-full transition-all duration-300"
            style={{
              width: `${getProgressPercentage(
                event.registered,
                event.seats
              )}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-2xl font-bold text-gray-900">
            ₹{event.earlyBirdPrice.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500 line-through">
            ₹{event.price.toLocaleString()}
          </div>
          <div className="text-xs text-green-600 font-medium">
            Early Bird Price
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">
            Seats Available
          </div>
          <div className="text-lg font-bold text-[#be3437]">
            {parseInt(event.seats) - event.registered}
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <h4 className="font-semibold text-gray-900 text-sm">
          What's Included:
        </h4>
        {event.benefits.slice(0, 3).map((benefit:any, index:any) => (
          <div
            key={index}
            className="flex items-center text-sm text-gray-600"
          >
            <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
            <span>{benefit}</span>
          </div>
        ))}
      </div>

      <button
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
          event === event.id
            ? "bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white shadow-lg"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {event === event.id ? "Selected" : "Select Event"}
      </button>
    </div>
  </div>
  );
}
