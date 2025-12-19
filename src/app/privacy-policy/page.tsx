import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-white/90">
            Achromic Point Consulting Private Limited is committed to protecting your privacy.
          </p>
          <p className="text-sm text-white/70 mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          
          {/* Introduction */}
          <section className="mb-8">
            <p className="text-gray-700 leading-relaxed text-lg">
              At Achromic Point Consulting Private Limited, we are committed to protecting your privacy. We use the information we collect about you to process orders and to provide a more customised information experience. Please read on for more details about our privacy policy.
            </p>
          </section>

          {/* What personal information do we keep? */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What personal information do we keep?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you are a customer of ACHROMIC POINT CONSULTING PRIVATE LIMITED, we generally request and/or store the following information in relation to you in order to manage our business relationship:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>your name, company name, contact/delivery details, email address;</li>
              <li>your type of business, your business title;</li>
              <li>the date and time of your order;</li>
              <li>your history of product and service orders with ACHROMIC POINT CONSULTING PRIVATE LIMITED; and</li>
              <li>your "Ship To" and "Sold To" numbers.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Depending on the product or service you have acquired, we may also store other specific information about you. If you want more detailed information on this matter then please contact ACHROMIC POINT CONSULTING PRIVATE LIMITED. Contact details are provided below.
            </p>
          </section>

          {/* What do we use this personal information for? */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What do we use this personal information for?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The customer personal information that we maintain is kept for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>to send you the product or service you have acquired;</li>
              <li>to protect you and us from fraud;</li>
              <li>internal accounting and administration;</li>
              <li>the date and time of your order;</li>
              <li>to help us identify other products or services that might be beneficial to you, and inform you about them; and</li>
              <li>to inform you about updates or changes to the product or service you have acquired.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              If you contact us with an inquiry about our services or, for example, to order a product or service, the information we request from you is necessary to enable us to respond to your query or process your order. Failure to provide the information sought may mean that we are unable to comply with your request.
            </p>
          </section>

          {/* Third parties and your personal information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third parties and your personal information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In some circumstances, it may be necessary for Achromic Point Consulting Private Limited to provide a third party with personal information obtained about you, or allow a third party to access that information.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Circumstances in which this may occur include where:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>you have consented to such a disclosure;</li>
              <li>a law enforcement agency, or other government agency, is exercising its legal authority and has asked ACHROMIC POINT CONSULTING PRIVATE LIMITED to provide access to that information; or</li>
              <li>the purpose for which the information is disclosed is directly related to the purpose for which the information was collected</li>
              <li>Achromic Point Consulting Private Limited discloses anonymous, aggregated, statistical information to non-ACHROMIC POINT CONSULTING PRIVATE LIMITED third parties such as advertisers, promoters and partners</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Also, Achromic Point Consulting Private Limited, in conjunction with 3rd parties, handles the mailing of any products or product updates. The outsourcing of this activity involves the disclosure of your name and address to 3rd parties, and which product or service you have acquired. We have taken all steps to ensure that 3rd parties deal with personal information according to the same standards we subscribe to.
            </p>
          </section>

          {/* Right of access */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Right of access</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have a right to make a request:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>to be informed by ACHROMIC POINT CONSULTING PRIVATE LIMITED whether it holds personal information in relation to you; and</li>
              <li>if ACHROMIC POINT CONSULTING PRIVATE LIMITED holds such information, to be supplied by ACHROMIC POINT CONSULTING PRIVATE LIMITED with a copy of the information.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              This is known as an "access request". In some circumstances, ACHROMIC POINT CONSULTING PRIVATE LIMITED may be entitled to refuse your access request. This includes where you have not supplied sufficient information to enable ACHROMIC POINT CONSULTING PRIVATE LIMITED to identify you, or the personal information you are requesting access to is being used for the purpose of prevention of unlawful or seriously improper conduct where granting access to the data would prejudice that purpose.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you wish to request access to personal information ACHROMIC POINT CONSULTING PRIVATE LIMITED holds in relation to you, please write to us (contact details are provided below). In order to enable us to respond to your request, we will need to verify your identity. To this end, please include in your letter the following information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>your name;</li>
              <li>the name of your organisation;</li>
              <li>for ACHROMIC POINT CONSULTING PRIVATE LIMITED customers, your Customer "Ship To" and "Sold To" numbers; and</li>
              <li>the details of your request.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              ACHROMIC POINT CONSULTING PRIVATE LIMITED will endeavour to respond to your access request no later than 60 days after receiving the request. However, if ACHROMIC POINT CONSULTING PRIVATE LIMITED is unable to comply with the request within this period, or if it has made a decision to refuse your request, it will inform you of its position prior to the expiration of the 60 day period.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              On receipt of your request we may also provide you with additional information about the way our organization manages the personal information it holds.
            </p>
            <p className="text-gray-700 leading-relaxed">
              ACHROMIC POINT CONSULTING PRIVATE LIMITED is committed to adopting procedures which ensure that the information it holds is accurate, complete and up to date. To assist ACHROMIC POINT CONSULTING PRIVATE LIMITED in this process we request that you notify ACHROMIC POINT CONSULTING PRIVATE LIMITED Customer Support if you are aware that our records in relation to you are inaccurate or to inform us of any changes in the personal information ACHROMIC POINT CONSULTING PRIVATE LIMITED holds about you so as to enable us to update our records.
            </p>
          </section>

          {/* ACHROMIC POINT CONSULTING PRIVATE LIMITED complaints procedures */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ACHROMIC POINT CONSULTING PRIVATE LIMITED complaints procedures</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We value the privacy of the personal information relating to our customers and are committed to ensuring that personal information is handled in a manner that respects their privacy.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have a complaint in relation to ACHROMIC POINT CONSULTING PRIVATE LIMITED's handling of personal information, please write to the Director (contact details are provided below) and include in your letter the following information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>your name;</li>
              <li>the name of your organisation;</li>
              <li>for ACHROMIC POINT CONSULTING PRIVATE LIMITED customers, your customer "Ship To" and "Sold To" numbers; and</li>
              <li>the details of your complaint/concern.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              On receipt of your letter, ACHROMIC POINT CONSULTING PRIVATE LIMITED will endeavour to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>acknowledge your correspondence within fourteen working days of receipt;</li>
              <li>acknowledge your correspondence within fourteen working days of receipt;</li>
              <li>provide a substantive response to the correspondence within four weeks for routine enquiries;</li>
              <li>keep you informed of progress for more complex enquiries requiring investigation; and</li>
              <li>include in our response details of the name and contact telephone number of the person responsible for the matter.</li>
            </ul>
          </section>

          {/* ACHROMIC POINT CONSULTING PRIVATE LIMITED contact details */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ACHROMIC POINT CONSULTING PRIVATE LIMITED contact details</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions or complaints concerning this privacy policy or the information collection practices of ACHROMIC POINT CONSULTING PRIVATE LIMITED, please contact:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-800">Mail:</span>
                </div>
                <div className="ml-4 text-gray-700">
                  <p>Managing Director,</p>
                  <p>Achromic Point Consulting Pvt Ltd,</p>
                  <p>F-11, First Floor, Kalkaji, New Delhi-110019, India</p>
                </div>
                <div className="flex items-center mt-4">
                  <span className="font-semibold text-gray-800 w-24">Email:</span>
                  <a href="mailto:contactus@achromicpoint.com" className="text-[#2b8ffb] hover:underline">
                    contactus@achromicpoint.com
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-800 w-24">Phone:</span>
                  <a href="tel:+91 11 4601 1835" className="text-gray-700 hover:text-[#2b8ffb]">
                    +91 11 4601 1835
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Back to Home */}
          <div className="text-center pt-8 border-t border-gray-200">
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white rounded-lg hover:from-[#2b8ffb]/90 hover:to-[#6c7cae]/90 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            This privacy policy is effective as of the date listed above and applies to all information collected by Achromic Point Consulting Private Limited.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            © 2024 Achromic Point Consulting Private Limited. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
