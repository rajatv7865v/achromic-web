'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// FAQ Data
const faqs = [
  {
    category: "General Information",
    questions: [
      {
        question: "What is Achromic Point Consulting Private Limited?",
        answer: "Achromic Point Consulting Private Limited is a leading training and development company that empowers professionals through excellence in training and development. We specialize in providing comprehensive training solutions, corporate events, and professional development programs across various industries."
      },
      {
        question: "Where is Achromic Point located?",
        answer: "Our headquarters is located at F-11, First Floor, Kalkaji, New Delhi-110019, India. We also conduct training programs and events at various locations across India and internationally."
      },
      {
        question: "How can I contact Achromic Point?",
        answer: "You can contact us through multiple channels: Phone: 011-4601-1835, Email: contactus@achromicpoint.com, or visit our office in New Delhi. You can also use our website's contact form or WhatsApp chat for immediate assistance."
      }
    ]
  },
  {
    category: "Training Programs",
    questions: [
      {
        question: "What types of training programs do you offer?",
        answer: "We offer a wide range of training programs including corporate training, professional development courses, industry-specific workshops, leadership development, technical training, and certification programs. Our programs are designed for individuals and organizations across various sectors."
      },
      {
        question: "Do you provide customized training solutions?",
        answer: "Yes, we specialize in creating customized training solutions tailored to your organization's specific needs. Our enterprise solutions include bespoke training programs, on-site training, and specialized workshops designed to meet your business objectives."
      },
      {
        question: "Are your training programs certified?",
        answer: "Many of our training programs offer certifications upon successful completion. We partner with industry leaders and certification bodies to provide recognized credentials that enhance your professional profile."
      },
      {
        question: "What is the duration of your training programs?",
        answer: "Our training programs vary in duration from half-day workshops to comprehensive multi-week courses. We offer flexible scheduling including weekend and evening sessions to accommodate working professionals."
      }
    ]
  },
  {
    category: "Events and Conferences",
    questions: [
      {
        question: "What type of events do you organize?",
        answer: "We organize professional seminars, conferences, workshops, panel discussions, and corporate training events on topics which revolves around Compliance. Risk, Accounting, Finance and Taxation."
      },
      {
        question: "Who can attend your seminars and conferences?",
        answer: "Our events are open to professionals, business leaders, students, entrepreneurs, academics, and organizations, depending on the event theme and target audience."
      },
      {
        question: "How can I register for an event?",
        answer: "You can register online through our website by selecting the event and completing the registration form. Confirmation details will be sent via email after successful registration."
      },
      {
        question: "Are your events held online or in person?",
        answer: "We offer in-person and virtual events. The format of each event is clearly stated on the event details page."
      },
      {
        question: "What is included in the registration fee?",
        answer: "Registration fees typically include access to event sessions, conference materials, certificates of participation, and refreshments or meals for in-person events. Specific inclusions vary by event."
      },
      {
        question: "Do you offer group or corporate discounts?",
        answer: "Yes, we offer special rates for group registrations and corporate bookings. Please contact us directly for details and customized packages."
      },
      {
        question: "Will I receive a certificate of participation?",
        answer: "Yes, participants receive a certificate of participation or attendance after completing the seminar or conference, either digitally or in print."
      },
      {
        question: "Can I cancel or transfer my registration?",
        answer: "Cancellation and transfer policies vary by event. Please refer to the event's terms and conditions or contact our support team for assistance."
      },
      {
        question: "How can I become a speaker or partner for your events?",
        answer: "If you are interested in speaking, sponsoring, or partnering with us, please reach out through our contact page or email us with your proposal and credentials."
      },
      {
        question: "How can I contact you for more information?",
        answer: "You can contact us via email, phone, or the contact form on our website. Our team will be happy to assist you with any inquiries."
      }
    ]
  },
  {
    category: "Corporate Services",
    questions: [
      {
        question: "What corporate membership benefits do you offer?",
        answer: "Our corporate membership provides exclusive benefits including discounted training rates, priority access to events, customized training solutions, dedicated account management, and access to our premium content and resources."
      },
      {
        question: "Do you provide on-site training for companies?",
        answer: "Yes, we offer comprehensive on-site training solutions for companies. Our trainers can conduct sessions at your office location, providing convenience and cost-effectiveness for your team."
      },
      {
        question: "What industries do you serve?",
        answer: "We serve a wide range of industries including IT, finance, healthcare, manufacturing, retail, consulting, and government sectors. Our training programs are designed to meet the specific needs of each industry."
      }
    ]
  },
  {
    category: "Publications and Resources",
    questions: [
      {
        question: "Do you publish any magazines or newsletters?",
        answer: "Yes, we publish regular e-magazines featuring industry insights, training tips, case studies, and expert articles. Our publications are available for free download and provide valuable resources for professional development."
      },
      {
        question: "How can I access your e-magazines?",
        answer: "You can access our e-magazines through our website's e-magazine section. All issues are free to download and no registration is required. You can also subscribe to our newsletter for regular updates."
      },
      {
        question: "Do you have a speaker directory?",
        answer: "Yes, we maintain a comprehensive directory of our speakers and trainers. You can view speaker profiles, their expertise areas, and previous speaking engagements on our speakers page."
      }
    ]
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "I'm having trouble accessing the website. What should I do?",
        answer: "If you're experiencing technical issues with our website, please try clearing your browser cache, updating your browser, or using a different browser. You can also contact our technical support team for assistance."
      },
      {
        question: "How do I reset my password?",
        answer: "If you have an account with us, you can reset your password using the 'Forgot Password' link on the login page. You'll receive instructions via email to reset your password securely."
      },
      {
        question: "Is my personal information secure on your website?",
        answer: "Yes, we take data security seriously. We use industry-standard encryption and security measures to protect your personal information. Please refer to our Privacy Policy for detailed information about how we handle your data."
      }
    ]
  }
];

export default function FAQPage() {
  const [openFaq, setOpenFaq] = useState<{category: string, question: number} | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFaq = (category: string, questionIndex: number) => {
    const key = `${category}-${questionIndex}`;
    if (openFaq?.category === category && openFaq?.question === questionIndex) {
      setOpenFaq(null);
    } else {
      setOpenFaq({ category, question: questionIndex });
    }
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#be3437] to-[#6c7cae] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/90">
            Find answers to common questions about our services, training programs, and events.
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#be3437] focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.5M15 6.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No FAQs found</h3>
            <p className="text-gray-600">Try adjusting your search terms or browse all categories.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredFaqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-[#be3437] to-[#6c7cae] px-6 py-4">
                  <h2 className="text-xl font-bold text-white">{category.category}</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {category.questions.map((faq, questionIndex) => (
                    <div key={questionIndex} className="border-b border-gray-200 last:border-b-0">
                      <button
                        onClick={() => toggleFaq(category.category, questionIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#be3437] focus:ring-inset"
                      >
                        <span className="font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        <svg
                          className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                            openFaq?.category === category.category && openFaq?.question === questionIndex ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openFaq?.category === category.category && openFaq?.question === questionIndex && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-[#be3437] to-[#6c7cae] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Can't find what you're looking for? Our team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact-us"
              className="bg-white text-[#be3437] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Contact Us
            </Link>
            <a
              href="tel:011-4601-1835"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#be3437] transition-colors duration-200"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            Need more information? Browse our website or contact us directly.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            © 2024 Achromic Point Consulting Private Limited. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
