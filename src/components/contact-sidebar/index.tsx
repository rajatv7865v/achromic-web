"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Message Icon with Hover Animation */}
      <button
        aria-label='Open Contact Modal'
        onClick={() => setOpen(true)}
        className='fixed right-0 top-1/2 -translate-y-1/2 z-40 group'
      >
        <div className='relative overflow-hidden'>
          <div className='flex items-center bg-[#be3437] text-white shadow-2xl border-y border-l border-white/20 rounded-l-2xl transition-all duration-300 ease-in-out group-hover:w-40 w-12'>
            <div className='flex items-center justify-center min-w-[48px] h-12'>
              <span className='text-xl'>💬</span>
            </div>
            <div className='whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pr-4'>
              <span className='font-semibold text-sm'>Get In Touch</span>
            </div>
          </div>
        </div>
      </button>

      {/* Modal Overlay */}
      {open && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center'
          aria-modal='true'
          role='dialog'
        >
          <div
            className='absolute inset-0 bg-black/50 backdrop-blur-sm'
            onClick={() => setOpen(false)}
          />

          {/* Modal Card */}
          <div className='relative z-10 mx-4 w-full max-w-lg rounded-2xl bg-white border border-gray-200 shadow-2xl'>
            <div className='p-6 sm:p-7'>
              <div className='flex items-start justify-between'>
                <div>
                  <h3 className='text-xl font-bold text-gray-900'>
                    Contact Us
                  </h3>
                  <p className='mt-1 text-sm text-gray-600'>
                    We usually respond within a business day.
                  </p>
                </div>
                <button
                  aria-label='Close Contact Modal'
                  className='text-gray-400 hover:text-gray-600 transition'
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </div>

              <div className='mt-6 grid gap-4 sm:grid-cols-2'>
                <a
                  href='tel:01146011835'
                  className='flex items-center gap-3 rounded-xl border border-gray-200 p-4 hover:bg-gray-50 transition'
                >
                  <span>📞</span>
                  <div>
                    <p className='text-sm text-gray-500'>Call us</p>
                    <p className='font-semibold text-gray-900'>011-4601-1835</p>
                  </div>
                </a>
                <a
                  href='mailto:contactus@achromicpoint.com'
                  className='flex items-center gap-3 rounded-xl border border-gray-200 p-4 hover:bg-gray-50 transition'
                >
                  <span>📧</span>
                  <div>
                    <p className='text-sm text-gray-500'>Email</p>
                    <p className='font-semibold text-gray-900 w-full'>
                      contactus@achromicpoint.com
                    </p>
                  </div>
                </a>
              </div>

              {/* Quick Message */}
              <form
                className='mt-6 space-y-4'
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  const formData = new FormData(form);
                  const name = String(formData.get("name") || "");
                  const phone = String(formData.get("phone") || "");
                  const email = String(formData.get("email") || "");
                  const message = String(formData.get("message") || "");
                  const subject = encodeURIComponent(
                    `Website Contact: ${name}`
                  );
                  const body = encodeURIComponent(
                    `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`
                  );
                  window.location.href = `mailto:contactus@achromicpoint.com?subject=${subject}&body=${body}`;
                }}
              >
                <div className='grid sm:grid-cols-2 gap-4'>
                  <input
                    name='name'
                    required
                    placeholder='Your Name'
                    className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#be3437]/30 focus:border-[#be3437]'
                  />
                  <input
                    name='phone'
                    placeholder='Phone (optional)'
                    className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#be3437]/30 focus:border-[#be3437]'
                  />
                </div>
                <input
                  type='email'
                  name='email'
                  required
                  placeholder='Email'
                  className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#be3437]/30 focus:border-[#be3437]'
                />
                <textarea
                  name='message'
                  rows={4}
                  placeholder='How can we help you?'
                  className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#be3437]/30 focus:border-[#be3437]'
                />
                <div className='flex items-center justify-between gap-3'>
                  <Link
                    href='/contact-us'
                    className='inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 transition'
                    onClick={() => setOpen(false)}
                  >
                    Visit Contact Page
                  </Link>
                  <button
                    type='submit'
                    className='inline-flex items-center justify-center rounded-lg px-5 py-3 font-semibold text-white bg-gradient-to-r from-[#be3437] to-[#6c7cae] hover:opacity-95 shadow'
                  >
                    Send Email
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
