"use client";
import { useApi } from "@/hooks/useApi";
import { getEventBySlug } from "@/services/event";
import {
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  X,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Speaker from "./_components/Speaker";
import Agenda from "@/components/agenda";
import Partner from "./_components/Partner";
import RegisterationPage from "./_components/Registeration";

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
  speakers: any;
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
        session: "registration & Welcome Coffee",
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
      "Full-day access to all sessions",
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
        session: "registration & Welcome",
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
        session: "registration & Welcome",
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
export default function pgae() {
  const params = useParams(); // ✅ Get all route params
  const slug = params.slug as string; // Extract slug
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(
    upcomingEvents[0]
  );
  const [activeTab, setActiveTab] = useState("overview");
  const [event, setEvent] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    company: "",
  });
  const { data, loading, error, run } = useApi<{ data: any[] }>();

  useEffect(() => {
    (async () => {
      // First: get event details
      const eventRes: any = await run(getEventBySlug, slug);
      console.log("Event response:", eventRes);
      console.log("Event data:", eventRes.data);
      setEvent(eventRes.data);
    })();
  }, [run, slug]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      email: "",
      phone: "",
      company: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Implement actual form submission logic
    handleCloseModal();
  };

  return (
    <>
      <div className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2b8ffb]/90 to-[#6c7cae]/90">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80")',
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
            <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
              {event?.name}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow-md">
              {event.description}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4 text-white text-[18px] font-semibold">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-[#2b8ffb]" />
                <span>{event.dateFrom}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="w-5 h-5 text-[#2b8ffb]" />
                <span>{event.timeFrom}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPinIcon className="w-5 h-5 text-[#2b8ffb]" />
                <span>
                  {event.venue}, {event.location}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-10">
              <button className="bg-white text-[#2b8ffb] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                Register Now
              </button>
              <button 
                onClick={handleOpenModal}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#2b8ffb] transition-all duration-200"
              >
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
      {selectedEvent && (
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Event Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {event?.name}
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                "overview",
                "speakers",
                "partners",
                "agenda",
                "benefits",
                "registration",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 capitalize ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-gray-50 rounded-xl p-8">
              {activeTab === "overview" && (
                <div className="space-y-6 w-full">
                  <div className=" gap-8 w-full text-justify">
                    <div className="prose prose-lg text-gray-700 max-w-none">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Event Overview
                      </h3>
                      <div
                        dangerouslySetInnerHTML={{ __html: event?.content }}
                      />
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "partners" && <Partner eventId={event._id} />}
              {activeTab === "speakers" && <Speaker eventId={event._id} />}
              {activeTab === "registration" && (
                <RegisterationPage eventId={event._id} />
              )}
              {activeTab === "agenda" && (
                <div>
                  {event._id ? (
                    <Agenda eventId={event._id} />
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">
                        Loading event details...
                      </p>
                    </div>
                  )}
                </div>
              )}
              {activeTab === "benefits" && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    What You'll Get
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedEvent.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
                      >
                        <CheckCircleIcon className="w-6 h-6 text-[#2b8ffb] flex-shrink-0" />
                        <span className="text-gray-700 font-medium">
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

      {/* Download Brochure Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] p-6 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Download Brochure</h3>
                <button 
                  onClick={handleCloseModal}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-[#2b8ffb] outline-none transition"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-[#2b8ffb] outline-none transition"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2b8ffb] focus:border-[#2b8ffb] outline-none transition"
                    placeholder="Enter your company name"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Download Brochure
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
