"use client";

import { useState } from "react";

// Simple SVG Icons
const DownloadIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    />
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
    />
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
    />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    />
  </svg>
);

const TagIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
    />
  </svg>
);

interface MagazineIssue {
  id: number;
  issueNumber: string;
  title: string;
  month: string;
  year: string;
  description: string;
  coverImage: string;
  downloadUrl: string;
  previewUrl: string;
  tags: string[];
  featured: boolean;
}

const magazineIssues: MagazineIssue[] = [
  {
    id: 19,
    issueNumber: "Issue#19",
    title: "Digital Transformation in Finance",
    month: "Jun",
    year: "2024",
    description:
      "Exploring the latest trends in financial technology and digital banking solutions.",
    coverImage: "/api/placeholder/300/400",
    downloadUrl: "#",
    previewUrl: "#",
    tags: ["Finance", "Digital Banking", "Technology"],
    featured: true,
  },
  {
    id: 18,
    issueNumber: "Issue#18",
    title: "Risk Management Excellence",
    month: "Sep",
    year: "2023",
    description:
      "Comprehensive guide to modern risk management strategies and compliance frameworks.",
    coverImage: "/api/placeholder/300/400",
    downloadUrl: "#",
    previewUrl: "#",
    tags: ["Risk Management", "Compliance", "Strategy"],
    featured: true,
  },
  {
    id: 17,
    issueNumber: "Issue#17",
    title: "Tax Compliance & Planning",
    month: "Apr",
    year: "2023",
    description:
      "Latest updates on tax regulations and strategic planning for businesses.",
    coverImage: "/api/placeholder/300/400",
    downloadUrl: "#",
    previewUrl: "#",
    tags: ["Tax", "Compliance", "Planning"],
    featured: false,
  },
  {
    id: 16,
    issueNumber: "Issue#16",
    title: "Legal Framework Updates",
    month: "Oct",
    year: "2022",
    description:
      "Important legal changes and their impact on business operations.",
    coverImage: "/api/placeholder/300/400",
    downloadUrl: "#",
    previewUrl: "#",
    tags: ["Legal", "Updates", "Business"],
    featured: false,
  },
  {
    id: 15,
    issueNumber: "Issue#15",
    title: "Accounting Standards",
    month: "Jul",
    year: "2022",
    description:
      "New accounting standards and their implementation guidelines.",
    coverImage: "/api/placeholder/300/400",
    downloadUrl: "#",
    previewUrl: "#",
    tags: ["Accounting", "Standards", "Implementation"],
    featured: false,
  },
  {
    id: 14,
    issueNumber: "Issue#14",
    title: "Corporate Governance",
    month: "Mar",
    year: "2022",
    description: "Best practices in corporate governance and board management.",
    coverImage: "/api/placeholder/300/400",
    downloadUrl: "#",
    previewUrl: "#",
    tags: ["Governance", "Corporate", "Management"],
    featured: false,
  },
];

export default function EMagazinePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredIssue, setHoveredIssue] = useState<number | null>(null);

  const categories = [
    "All",
    "Finance",
    "Legal",
    "Compliance",
    "Risk",
    "Tax",
    "Accounting",
  ];

  const filteredIssues =
    selectedCategory === "All"
      ? magazineIssues
      : magazineIssues.filter((issue) => issue.tags.includes(selectedCategory));

  const featuredIssues = magazineIssues.filter((issue) => issue.featured);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-[#6c7cae]/5'>
      {/* Header Section */}
      <div className='bg-white shadow-lg border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
          <div className='text-center'>
            <h1 className='text-5xl font-bold text-gray-900 mb-4'>eMagazine</h1>
            <p className='text-xl text-gray-600 font-medium max-w-3xl mx-auto'>
              Stay updated with the latest insights, trends, and best practices
              in finance, legal, compliance, and business management through our
              comprehensive digital magazine.
            </p>
            <div className='mt-8 flex justify-center'>
              <div className='bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white px-8 py-3 rounded-full font-semibold shadow-lg'>
                📚 Free Digital Publications
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Issues Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            Featured Issues
          </h2>
          <p className='text-lg text-gray-600'>
            Our most popular and recent publications
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-16'>
          {featuredIssues.map((issue) => (
            <div
              key={issue.id}
              className='bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'
            >
              <div className='relative'>
                <div className='h-80 bg-gradient-to-br from-[#be3437]/10 to-[#6c7cae]/10 flex items-center justify-center'>
                  <div className='text-center'>
                    <div className='w-32 h-40 bg-white rounded-lg shadow-lg mx-auto mb-4 flex items-center justify-center'>
                      <span className='text-2xl font-bold text-gray-700'>
                        {issue.issueNumber}
                      </span>
                    </div>
                    <div className='text-2xl font-bold text-gray-800 mb-2'>
                      {issue.month} {issue.year}
                    </div>
                  </div>
                </div>
                <div className='absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold'>
                  Featured
                </div>
              </div>

              <div className='p-6'>
                <h3 className='text-xl font-bold text-gray-900 mb-2'>
                  {issue.title}
                </h3>
                <p className='text-gray-600 mb-4'>{issue.description}</p>

                <div className='flex flex-wrap gap-2 mb-4'>
                  {issue.tags.map((tag) => (
                    <span
                      key={tag}
                      className='bg-[#be3437]/10 text-[#be3437] px-3 py-1 rounded-full text-sm font-medium'
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className='flex space-x-3'>
                  <button className='flex-1 bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white px-4 py-2 rounded-lg font-semibold hover:from-[#be3437]/90 hover:to-[#6c7cae]/90 transition-all duration-200 flex items-center justify-center space-x-2'>
                    <DownloadIcon className='w-4 h-4' />
                    <span>Download Free</span>
                  </button>
                  <button className='px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2'>
                    <EyeIcon className='w-4 h-4' />
                    <span>Preview</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Issues Section */}
      <div className='bg-white py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              All Issues
            </h2>
            <p className='text-lg text-gray-600 mb-8'>
              Browse through our complete collection of digital magazines
            </p>

            {/* Category Filter */}
            <div className='flex flex-wrap justify-center gap-3 mb-8'>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Issues Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {filteredIssues.map((issue) => (
              <div
                key={issue.id}
                className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
                onMouseEnter={() => setHoveredIssue(issue.id)}
                onMouseLeave={() => setHoveredIssue(null)}
              >
                <div className='relative'>
                  <div className='h-48 bg-gradient-to-br from-[#be3437]/5 to-[#6c7cae]/5 flex items-center justify-center'>
                    <div className='text-center'>
                      <div className='w-16 h-20 bg-white rounded shadow-md mx-auto mb-2 flex items-center justify-center'>
                        <span className='text-sm font-bold text-gray-700'>
                          {issue.issueNumber}
                        </span>
                      </div>
                      <div className='text-sm font-semibold text-gray-700'>
                        {issue.month} {issue.year}
                      </div>
                    </div>
                  </div>

                  {hoveredIssue === issue.id && (
                    <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-3'>
                      <button className='bg-[#be3437] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#be3437]/90 transition-colors duration-200 flex items-center space-x-2'>
                        <DownloadIcon className='w-4 h-4' />
                        <span>Download</span>
                      </button>
                      <button className='bg-white text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2'>
                        <EyeIcon className='w-4 h-4' />
                        <span>Preview</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className='p-4'>
                  <h3 className='font-bold text-gray-900 mb-2 line-clamp-2'>
                    {issue.title}
                  </h3>
                  <p className='text-sm text-gray-600 mb-3 line-clamp-2'>
                    {issue.description}
                  </p>

                  <div className='flex flex-wrap gap-1 mb-3'>
                    {issue.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className='bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium'
                      >
                        {tag}
                      </span>
                    ))}
                    {issue.tags.length > 2 && (
                      <span className='text-xs text-gray-500'>
                        +{issue.tags.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className='flex items-center justify-between text-xs text-gray-500'>
                    <div className='flex items-center space-x-1'>
                      <CalendarIcon className='w-3 h-3' />
                      <span>
                        {issue.month} {issue.year}
                      </span>
                    </div>
                    <span className='bg-[#9c408c]/10 text-[#9c408c] px-2 py-1 rounded-full font-medium'>
                      Free
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className='text-center mt-12'>
            <button className='bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white px-8 py-3 rounded-full font-semibold hover:from-[#be3437]/90 hover:to-[#6c7cae]/90 transition-all duration-200 shadow-lg'>
              Load More Issues
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className='bg-gradient-to-r from-[#be3437] to-[#6c7cae] py-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl font-bold text-white mb-4'>Stay Updated</h2>
          <p className='text-xl text-white/90 mb-8'>
            Subscribe to our newsletter and get notified when new issues are
            released
          </p>

          <div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
            <input
              type='email'
              placeholder='Enter your email address'
              className='flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none'
            />
            <button className='bg-white text-[#be3437] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200'>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className='bg-gray-900 text-white py-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <p className='text-gray-300'>
            📚 All eMagazine issues are free to download. No registration
            required.
          </p>
          <p className='text-sm text-gray-400 mt-2'>
            © 2024 Achromic Point. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
