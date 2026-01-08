import { useApi } from "@/hooks/useApi";
import { getEvents } from "@/services/event";
import {
  submitContactForm,
  ContactFormData,
} from "@/services/contact";
import { ArrowRightIcon, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";



const UpcomingEvent = () => {
  const [events, setEvents] = useState<any>([]);
  const { data, loading, error, run } = useApi<{ data: any[] }>();

  // Event registration modal state
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedEventForModal, setSelectedEventForModal] = useState<any>(null);
  const [eventFormData, setEventFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    designation: "",
  });
  const [eventFormErrors, setEventFormErrors] = useState<any>({});
  const [isSubmittingEventForm, setIsSubmittingEventForm] = useState(false);

  const getDaysUntilEvent = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Handle event registration modal
  const handleEventRegistrationClick = (event: any) => {
    setSelectedEventForModal(event);
    setIsEventModalOpen(true);
    // Reset form
    setEventFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      designation: "",
    });
    setEventFormErrors({});
  };

  const closeEventModal = () => {
    setIsEventModalOpen(false);
    setSelectedEventForModal(null);
    setEventFormErrors({});
    setIsSubmittingEventForm(false);
  };

  const handleEventFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (eventFormErrors[name]) {
      setEventFormErrors((prev: any) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateEventForm = () => {
    const errs: any = {};
    if (!eventFormData.name.trim()) {
      errs.name = "Name is required";
    }
    if (
      !eventFormData.email.trim() ||
      !/^\S+@\S+\.\S+$/.test(eventFormData.email)
    ) {
      errs.email = "Valid email is required";
    }
    if (
      !eventFormData.phone.trim() ||
      !/^[\d()+\s-]{7,}$/.test(eventFormData.phone)
    ) {
      errs.phone = "Valid phone number is required";
    }
    if (!eventFormData.company.trim()) {
      errs.company = "Company is required";
    }
    if (!eventFormData.designation.trim()) {
      errs.designation = "Designation is required";
    }
    setEventFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleEventFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEventForm()) return;

    setIsSubmittingEventForm(true);

    try {
      // Prepare contact form data with auto-generated message
      const eventName =
        selectedEventForModal?.title || selectedEventForModal?.name || "Event";
      const eventSlug = selectedEventForModal?.slug || "";
      const subject = `Request to View Event: ${eventName}`;
      const message = `I would like to view the event "${eventName}" with event slug: ${eventSlug}. Please provide me access to the event details.`;

      const contactFormData: ContactFormData = {
        name: eventFormData.name,
        email: eventFormData.email,
        phone: eventFormData.phone,
        company: eventFormData.company,
        subject: subject,
        message: message,
      };

      // Submit to contact API
      await submitContactForm(contactFormData);

      // Get event link
      const eventLink = eventSlug ? `/event/${eventSlug}` : "#";

      // Close modal
      closeEventModal();

      // Redirect to event page
      if (eventLink !== "#") {
        window.location.href = eventLink;
      }
    } catch (error: any) {
      console.error("Error submitting event form:", error);
      setEventFormErrors({
        submit:
          error?.response?.data?.message ||
          "Failed to submit form. Please try again.",
      });
    } finally {
      setIsSubmittingEventForm(false);
    }
  };

  useEffect(() => {
    (async () => {
      const eventsData = await (getEvents({eventType:'UPCOMING',page:1,limit:6}));
      setEvents(eventsData?.data?.data || []);
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
                  <button
                    onClick={() => handleEventRegistrationClick(event)}
                    className="w-full items-center justify-center flex bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white px-4 py-2 rounded-lg font-semibold hover:from-[#2b8ffb]/90 hover:to-[#6c7cae]/90 transition-all duration-200"
                  >
                    View Details & Register
                  </button>
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

      {/* Event Registration Modal */}
      {isEventModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={closeEventModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">
                    {selectedEventForModal?.title ||
                      selectedEventForModal?.name ||
                      "Register for Event"}
                  </h3>
                  <p className="text-sm text-white/90 mt-1">
                    Please fill in your details to continue
                  </p>
                </div>
                <button
                  onClick={closeEventModal}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleEventFormSubmit} className="p-6 text-black">
              {/* Error Message */}
              {eventFormErrors.submit && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    {eventFormErrors.submit}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={eventFormData.name}
                    onChange={handleEventFormChange}
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-[#2b8ffb] outline-none transition ${
                      eventFormErrors.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your name"
                  />
                  {eventFormErrors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {eventFormErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={eventFormData.email}
                    onChange={handleEventFormChange}
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-[#2b8ffb] outline-none transition ${
                      eventFormErrors.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your email"
                  />
                  {eventFormErrors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {eventFormErrors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={eventFormData.phone}
                    onChange={handleEventFormChange}
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-[#2b8ffb] outline-none transition ${
                      eventFormErrors.phone
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {eventFormErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {eventFormErrors.phone}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={eventFormData.company}
                    onChange={handleEventFormChange}
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-[#2b8ffb] outline-none transition ${
                      eventFormErrors.company
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your company name"
                  />
                  {eventFormErrors.company && (
                    <p className="mt-1 text-sm text-red-600">
                      {eventFormErrors.company}
                    </p>
                  )}
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={eventFormData.designation}
                    onChange={handleEventFormChange}
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-[#2b8ffb] outline-none transition ${
                      eventFormErrors.designation
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your designation"
                  />
                  {eventFormErrors.designation && (
                    <p className="mt-1 text-sm text-red-600">
                      {eventFormErrors.designation}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={closeEventModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingEventForm}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold text-white transition-all ${
                    isSubmittingEventForm
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] hover:from-[#2b8ffb]/90 hover:to-[#6c7cae]/90 shadow-lg"
                  }`}
                >
                  {isSubmittingEventForm ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </span>
                  ) : (
                    "Continue to Event"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvent;
