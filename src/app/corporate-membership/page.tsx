import Image from "next/image";
import Banner from '@/components/assets/banner/Corporate-Membership_2025-Banner-002.jpeg'

export default function CorporateMembershipPage() {
  return (
    <div>
      <section className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-[#be3437] via-[#be3437]/80 to-[#6c7cae] opacity-90'>
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
                Corporate Membership 2025
              </p>
              <h1 className='mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight'>
                Unlock year-round access to Achromic Point knowledge and events
              </h1>
              <p className='mt-4 text-white/90 text-base sm:text-lg max-w-2xl'>
                Become a Corporate Member for Calendar Year 2025 (January –
                December) and empower your team with complimentary access to
                curated programs, premium content, and exclusive benefits.
              </p>
              <div className='mt-8 flex flex-wrap items-center gap-4'>
                <a
                  href='#tiers'
                  className='inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-[#be3437] font-semibold shadow-lg hover:shadow-xl transition-all'
                >
                  View Plans
                </a>
                <a
                  href='/registeration'
                  className='inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/70 text-white font-semibold hover:bg-white/10 transition-all'
                >
                  Enroll Now
                </a>
              </div>
            </div>
            <div className='bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 sm:p-8 shadow-xl'>
              <ul className='space-y-4 text-white'>
                <li className='flex items-start gap-3'>
                  <span className='text-2xl'>🎟️</span>
                  <span>
                    Attend up to <b>8 programs</b> free of charge during 2025
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-2xl'>👥</span>
                  <span>
                    Nominate colleagues from the same organisation via an
                    authorization letter
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-2xl'>📰</span>
                  <span>
                    Get Achromic Point Knowledge Forum <b>eMagazine</b> (worth
                    ₹1,200) free
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <span className='text-2xl'>🏷️</span>
                  <span>
                    Special recognition and priority updates for members
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className='py-14'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid md:grid-cols-3 gap-6' id='tiers'>
            <div className='bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-6'>
              <p className='text-sm font-semibold text-[#6c7cae]'>Silver</p>
              <h3 className='mt-1 text-3xl font-extrabold text-gray-800'>
                ₹15,000
              </h3>
              <p className='text-sm text-gray-500'>Up to 3 Topics</p>
              <ul className='mt-6 space-y-3 text-gray-700'>
                <li className='flex gap-2'>
                  ✅ Free access to selected programs
                </li>
                <li className='flex gap-2'>✅ Member eMagazine</li>
                <li className='flex gap-2'>✅ Nomination flexibility</li>
              </ul>
              <a
                href='/registeration'
                className='mt-6 inline-flex w-full items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white font-semibold hover:opacity-95 transition'
              >
                Choose Silver
              </a>
            </div>
            <div className='bg-white rounded-2xl border-2 border-[#be3437] shadow-lg p-6 relative'>
              <span className='absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold bg-[#be3437] text-white shadow'>
                Popular
              </span>
              <p className='text-sm font-semibold text-[#be3437]'>Gold</p>
              <h3 className='mt-1 text-3xl font-extrabold text-gray-800'>
                ₹27,000
              </h3>
              <p className='text-sm text-gray-500'>Up to 6 Topics</p>
              <ul className='mt-6 space-y-3 text-gray-700'>
                <li className='flex gap-2'>✅ More program access</li>
                <li className='flex gap-2'>✅ Member eMagazine</li>
                <li className='flex gap-2'>✅ Priority communication</li>
              </ul>
              <a
                href='/registeration'
                className='mt-6 inline-flex w-full items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white font-semibold hover:opacity-95 transition'
              >
                Choose Gold
              </a>
            </div>
            <div className='bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-6'>
              <p className='text-sm font-semibold text-[#6c7cae]'>Platinum</p>
              <h3 className='mt-1 text-3xl font-extrabold text-gray-800'>
                ₹32,000
              </h3>
              <p className='text-sm text-gray-500'>Up to 8 Topics</p>
              <ul className='mt-6 space-y-3 text-gray-700'>
                <li className='flex gap-2'>✅ Maximum program access</li>
                <li className='flex gap-2'>✅ Member eMagazine</li>
                <li className='flex gap-2'>✅ Highest priority</li>
              </ul>
              <a
                href='/registeration'
                className='mt-6 inline-flex w-full items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white font-semibold hover:opacity-95 transition'
              >
                Choose Platinum
              </a>
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
                <p>Call: 8447758768</p>
                <p>Email: nupur.verma@achromicpoint.com</p>
              </div>
              <div className='mt-6'>
                <a
                  href='/registeration'
                  className='inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white font-semibold hover:opacity-95 transition'
                >
                  Enroll Now
                </a>
              </div>
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
            <ul className='mt-4 space-y-3 text-gray-700'>
              <li>
                Registration is confirmed upon receipt of completed form and
                payment. A confirmation email will follow.
              </li>
              <li>Payment must be received before the event date.</li>
              <li>
                Members may nominate officers from the same organisation via
                authorization on company letterhead.
              </li>
              <li>
                Individual members may depute partner/employee from the same
                firm with authorization.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
