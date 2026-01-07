"use client";

import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { useCart } from "@/components/cart/CartProvider";
import type { EventItem } from "@/store/cartSlice";

export default function CorporateMembershipPage() {
  const dispatch = useAppDispatch();
  const { openCart } = useCart();

  const handleAddToCart = (
    category: 'Industry' | 'Consulting',
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum',
    price: number,
    topics: number
  ) => {
    const membershipItem: EventItem = {
      id: Date.now(),
      title: `Annual Membership 2026 - ${category} - ${tier}`,
      date: "2026 (January - December)",
      location: "Year-round Access",
      price: price,
      category: "Annual Membership",
      duration: "12 Months",
      seats: "Unlimited",
      registered: 0,
      featured: tier === 'Gold' || tier === 'Platinum',
      description: `Annual Membership ${tier} tier for ${category} - Calendar Year 2026. Access to ${topics} topics/events.`,
      benefits: [
        "Attend all India Events free of charge",
        "Member eMagazine (worth INR 1,200)",
        "Nomination flexibility with authorization"
      ],
      selectedPrice: price,
      selectedType: category,
      selectedCurrency: "INR",
    };
    
    dispatch(addToCart(membershipItem));
    openCart();
  };

  return (
    <div>
      <section className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-[#2b8ffb] via-[#2b8ffb]/80 to-[#6c7cae] opacity-90'>
        </div>
        <svg
          className='absolute -top-20 -right-20 w-[520px] h-[520px] text-white/10'
          viewBox='0 0 200 200'
          xmlns='http://www.w3.org/200/svg'
        >
          <path
            fill='currentColor'
            d='M36.1,-57.5C48.1,-50.3,60.1,-40.9,67.7,-28.3C75.4,-15.6,78.8,0.2,73.9,13.1C68.9,26.1,55.6,36.2,43.1,46.1C30.6,56,18.9,65.6,4.8,72C-9.3,78.4,-26,81.7,-40.2,76.8C-54.3,71.9,-65.8,58.8,-70.6,44.2C-75.4,29.6,-73.5,13.5,-69.6,-0.4C-65.7,-14.3,-59.7,-25.9,-50.9,-35.7C-42,-45.5,-30.4,-53.5,-18.1,-61.2C-5.8,-68.8,7.3,-76.1,18.8,-73.6C30.3,-71.1,40.2,-58.8,36.1,-57.5Z'
            transform='translate(100 100)'
          />
        </svg>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
          <div className='grid lg:grid-cols-2 gap-10 items-center'>
            
            <div>
              <p className='uppercase tracking-widest text-white/80 text-sm font-semibold'>
                India Events Annual Membership
              </p>
              <h1 className='mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight'>
                Annual Membership for Delegates - Calendar Year 2026
              </h1>
              <p className='mt-4 text-white/90 text-base sm:text-lg max-w-2xl'>
                The India Events Annual Membership for Delegates is open for Calendar year 2026 (January 2026 – December 2026). 
                Unlock year-round access to all India Events organized by Achromic Point with exclusive member benefits.
              </p>
              <div className='mt-8 flex flex-wrap items-center gap-4'>
                <a
                  href='#pricing'
                  className='inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-[#2b8ffb] font-semibold shadow-lg hover:shadow-xl transition-all'
                >
                  View Plans
                </a>
                <a
                  href='#benefits'
                  className='inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/70 text-white font-semibold hover:bg-white/10 transition-all'
                >
                  View Benefits
                </a>
              </div>
            </div>
            <div className='bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 sm:p-8 shadow-xl'>
              <ul className='space-y-4 text-white'>
                <li className='flex items-start gap-3'>
                  <span className='text-2xl'>🎟️</span>
                  <span>
                    Attend all India Events (Maximum of <b>9 events</b>) organized by Achromic Point free of charge throughout calendar year 2026
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-2xl'>👥</span>
                  <span>
                    Depute any other officer from your organisation with authorization on Company Letter Head
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-2xl'>🤝</span>
                  <span>
                    Individual members may depute partner/employee from the same firm (Authorization letter required)
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-2xl'>📰</span>
                  <span>
                    Copy of Achromic Point Knowledge Forum <b>eMagazine</b> worth INR 1,200 Per Annum for free
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className='py-14' id='benefits'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-900'>
              Buy Annual Membership for India Events
            </h2>
            <p className='mt-2 text-lg text-gray-600'>
              January 2026 – December 2026
            </p>
          </div>

          <div className='grid lg:grid-cols-2 gap-8 mb-12'>
            <div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-8'>
              <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                Delegate Benefits
              </h3>
              <ul className='space-y-4 text-gray-700'>
                <li className='flex items-start gap-3'>
                  <span className='text-green-600 font-bold mt-1'>•</span>
                  <span>Full event access</span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-green-600 font-bold mt-1'>•</span>
                  <span>All sessions, panels & presentations</span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-green-600 font-bold mt-1'>•</span>
                  <span>Networking with industry leaders</span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-green-600 font-bold mt-1'>•</span>
                  <span>Event materials & post-event reports</span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-green-600 font-bold mt-1'>•</span>
                  <span>Delegate certificate</span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-green-600 font-bold mt-1'>•</span>
                  <span>Priority registration</span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-green-600 font-bold mt-1'>•</span>
                  <span>Lunch, tea/coffee & refreshments</span>
                </li>
              </ul>
            </div>

            <div className='bg-gradient-to-br from-[#2b8ffb]/5 to-[#6c7cae]/5 rounded-2xl border-2 border-[#2b8ffb]/20 shadow-sm p-8'>
              <h3 className='text-2xl font-bold text-gray-900 mb-6'>
                Next Steps
              </h3>
              <div className='space-y-4 text-gray-700'>
                <div className='flex items-start gap-3'>
                  <span className='text-[#2b8ffb] font-bold mt-1'>1.</span>
                  <p>
                  Please confirm the number of events <b>(3 to 9)</b> and share the event names you wish to opt for.
                  </p>
                </div>
                <div className='flex items-start gap-3'>
                  <span className='text-[#2b8ffb] font-bold mt-1'>2.</span>
                  <p>
                  Select your membership type: <b>Bronze</b> | <b>Silver</b> | <b>Gold</b> | <b>Platinum</b>
                  </p>
                </div>
                <div className='flex items-start gap-3'>
                  <span className='text-[#2b8ffb] font-bold mt-1'>3.</span>
                  <p>
                  If convenient, we can <b>schedule a call</b> to discuss the best-fit plan for your organization and address any queries.
                  </p>
                </div>
              
              </div>
             
            </div>
          </div>
        </div>
      </section>

      <section className='py-14 bg-gray-50' id='pricing'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-900'>
              Membership Pricing Plans
            </h2>
            <p className='mt-2 text-lg text-gray-600'>
              Choose the plan that best fits your needs
            </p>
          </div>

          {/* Industry experts | Corporates */}
          <div className='mb-16'>
            <h3 className='text-2xl font-bold text-gray-900 mb-8 text-center'>
              For Industry experts | Corporates
            </h3>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              <div className='bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-6'>
                <p className='text-sm font-semibold text-[#6c7cae]'>Bronze</p>
                <h3 className='mt-1 text-3xl font-extrabold text-gray-800'>
                  ₹15,000
                </h3>
                <p className='text-sm text-gray-500 mt-1'>3 Topics</p>
                <button
                  onClick={() => handleAddToCart('Industry', 'Bronze', 15000, 3)}
                  className='mt-6 inline-flex w-full items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white font-semibold hover:opacity-95 transition'
                >
                  Choose Bronze
                </button>
              </div>
              <div className='bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-6'>
                <p className='text-sm font-semibold text-[#6c7cae]'>Silver</p>
                <h3 className='mt-1 text-3xl font-extrabold text-gray-800'>
                  ₹23,000
                </h3>
                <p className='text-sm text-gray-500 mt-1'>5 Topics</p>
                <button
                  onClick={() => handleAddToCart('Industry', 'Silver', 23000, 5)}
                  className='mt-6 inline-flex w-full items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white font-semibold hover:opacity-95 transition'
                >
                  Choose Silver
                </button>
              </div>
              <div className='bg-white rounded-2xl border-2 border-[#2b8ffb] shadow-lg p-6 relative'>
                <span className='absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold bg-[#2b8ffb] text-white shadow'>
                  Popular
                </span>
                <p className='text-sm font-semibold text-[#2b8ffb]'>Gold</p>
                <h3 className='mt-1 text-3xl font-extrabold text-gray-800'>
                  ₹28,000
                </h3>
                <p className='text-sm text-gray-500 mt-1'>7 Topics</p>
                <button
                  onClick={() => handleAddToCart('Industry', 'Gold', 28000, 7)}
                  className='mt-6 inline-flex w-full items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white font-semibold hover:opacity-95 transition'
                >
                  Choose Gold
                </button>
              </div>
              <div className='bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-6'>
                <p className='text-sm font-semibold text-[#6c7cae]'>Platinum</p>
                <h3 className='mt-1 text-3xl font-extrabold text-gray-800'>
                  ₹32,000
                </h3>
                <p className='text-sm text-gray-500 mt-1'>9 Topics</p>
                <button
                  onClick={() => handleAddToCart('Industry', 'Platinum', 32000, 9)}
                  className='mt-6 inline-flex w-full items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white font-semibold hover:opacity-95 transition'
                >
                  Choose Platinum
                </button>
              </div>
            </div>
          </div>

          {/* Consulting | Freelancers | Law firm experts */}
          <div>
            <h3 className='text-2xl font-bold text-gray-900 mb-8 text-center'>
              For Consulting | Freelancers | Law firm experts
            </h3>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
              <div className='bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-6'>
                <p className='text-sm font-semibold text-[#6c7cae]'>Bronze</p>
                <h3 className='mt-1 text-3xl font-extrabold text-gray-800'>
                  ₹30,000
                </h3>
                <p className='text-sm text-gray-500 mt-1'>3 Topics</p>
                <button
                  onClick={() => handleAddToCart('Consulting', 'Bronze', 30000, 3)}
                  className='mt-6 inline-flex w-full items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white font-semibold hover:opacity-95 transition'
                >
                  Choose Bronze
                </button>
              </div>
              <div className='bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-6'>
                <p className='text-sm font-semibold text-[#6c7cae]'>Silver</p>
                <h3 className='mt-1 text-3xl font-extrabold text-gray-800'>
                  ₹48,000
                </h3>
                <p className='text-sm text-gray-500 mt-1'>5 Topics</p>
                <button
                  onClick={() => handleAddToCart('Consulting', 'Silver', 48000, 5)}
                  className='mt-6 inline-flex w-full items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white font-semibold hover:opacity-95 transition'
                >
                  Choose Silver
                </button>
              </div>
              <div className='bg-white rounded-2xl border-2 border-[#2b8ffb] shadow-lg p-6 relative'>
                <span className='absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold bg-[#2b8ffb] text-white shadow'>
                  Popular
                </span>
                <p className='text-sm font-semibold text-[#2b8ffb]'>Gold</p>
                <h3 className='mt-1 text-3xl font-extrabold text-gray-800'>
                  ₹58,800
                </h3>
                <p className='text-sm text-gray-500 mt-1'>7 Topics</p>
                <button
                  onClick={() => handleAddToCart('Consulting', 'Gold', 58800, 7)}
                  className='mt-6 inline-flex w-full items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white font-semibold hover:opacity-95 transition'
                >
                  Choose Gold
                </button>
              </div>
              <div className='bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-6'>
                <p className='text-sm font-semibold text-[#6c7cae]'>Platinum</p>
                <h3 className='mt-1 text-3xl font-extrabold text-gray-800'>
                  ₹64,800
                </h3>
                <p className='text-sm text-gray-500 mt-1'>9 Topics</p>
                <button
                  onClick={() => handleAddToCart('Consulting', 'Platinum', 64800, 9)}
                  className='mt-6 inline-flex w-full items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white font-semibold hover:opacity-95 transition'
                >
                  Choose Platinum
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-2'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid lg:grid-cols-2 gap-8'>
            <div className='bg-white rounded-2xl border border-gray-200 p-6 shadow-sm'>
              <h2 className='text-xl font-bold text-gray-900'>
                Payment Details
              </h2>
              <div className='mt-4 grid sm:grid-cols-2 gap-4 text-gray-700'>
                <div>
                  <p className='text-sm text-gray-500'>Account Name</p>
                  <p className='font-semibold'>
                    Achromic Point Consulting Pvt Ltd
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Bank</p>
                  <p className='font-semibold'>Axis Bank, Kalkaji, New Delhi</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Account No</p>
                  <p className='font-semibold'>914020057251909</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>IFSC</p>
                  <p className='font-semibold'>UTIB0001021</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>MICR</p>
                  <p className='font-semibold'>11021107</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>SWIFT</p>
                  <p className='font-semibold'>AXISINBBA45</p>
                </div>
                <div className='sm:col-span-2'>
                  <p className='text-sm text-gray-500'>GSTIN</p>
                  <p className='font-semibold'>07AAICA4140L1ZO</p>
                </div>
              </div>
              <p className='mt-4 text-sm text-gray-600'>
                Payment must be received prior to the event. Cheque/DD payable
                to “Achromic Point Consulting Pvt Ltd”.
              </p>
            </div>
            <div className='bg-white rounded-2xl border border-gray-200 p-6 shadow-sm'>
              <h2 className='text-xl font-bold text-gray-900'>Contact</h2>
              <div className='mt-4 space-y-2 text-gray-700'>
                <p>
                  <b>Nupur Verma</b>
                </p>
                <p>Call: <a href='tel:+918447758768' className='text-[#2b8ffb] hover:underline'>+91-8447758768</a></p>
                <p>Email: <a href='mailto:contactus@achromicpoint.com' className='text-[#2b8ffb] hover:underline'>contactus@achromicpoint.com</a></p>
                <p>Email: <a href='mailto:nupur.verma@achromicpoint.com' className='text-[#2b8ffb] hover:underline'>nupur.verma@achromicpoint.com</a></p>
              </div>
              {/* <div className='mt-6'>
                <a
                  href='/registration'
                  className='inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white font-semibold hover:opacity-95 transition'
                >
                  Enroll Now
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className='py-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-white rounded-2xl border border-gray-200 p-6 shadow-sm'>
            <h2 className='text-xl font-bold text-gray-900'>
              Terms & Conditions
            </h2>
            <ul className='mt-4 space-y-3 text-gray-700 list-disc list-inside pl-4'>
              <li>
                Membership is valid for Calendar Year 2026 (January 2026 – December 2026).
              </li>
              <li>
                Members can attend all India Events (Maximum of 9) organized by Achromic Point free of charge throughout the calendar year 2026.
              </li>
              <li>
                The member may depute any other officer only from his/her organisation with the authorization on Company Letter Head certifying that the nominated person is from his/her organisation.
              </li>
              <li>
                Individual member may depute his/her partner, employee from the same firm (Authorization letter would be needed).
              </li>
              <li>
                Copy of Achromic Point Knowledge Forum eMagazine worth INR 1,200 Per Annum will be provided free of charge.
              </li>
              <li>
              registration is confirmed upon receipt of completed form and payment. A confirmation email will follow.
              </li>
              <li>Payment must be received before the event date.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
