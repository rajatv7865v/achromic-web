"use client";

import { useState } from "react";

// Simple SVG Icons
const UsersIcon = ({ className }: { className?: string }) => (
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
      d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
    />
  </svg>
);

const TargetIcon = ({ className }: { className?: string }) => (
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
      d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    />
  </svg>
);

const BookOpenIcon = ({ className }: { className?: string }) => (
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
      d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
    />
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
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
      d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
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
      d='M13 7l5 5m0 0l-5 5m5-5H6'
    />
  </svg>
);

const BriefcaseIcon = ({ className }: { className?: string }) => (
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
      d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    />
  </svg>
);

interface CourseCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  courses: string[];
  color: string;
}

const courseCategories: CourseCategory[] = [
  {
    id: "legal-risk",
    title: "Legal, Risk & Advisory",
    description: "Comprehensive legal and risk management training programs",
    icon: BookOpenIcon,
    courses: [
      "White Collar Crime",
      "Cyber Security",
      "Compliance",
      "Commercial Litigation",
      "Insolvency and Bankruptcy Code",
      "Arbitration and Dispute Resolution",
      "Digital Forensics",
      "Corporate Fraud",
      "Corporate Governance",
      "Cyber Crime",
      "Vendor Risk",
      "Third Party Risk Management",
    ],
    color: "from-[#2b8ffb] to-[#2b8ffb]/80",
  },
  {
    id: "taxation",
    title: "Taxation",
    description: "Advanced taxation and compliance training solutions",
    icon: TargetIcon,
    courses: [
      "International Tax",
      "Transfer Pricing",
      "Income Tax",
      "Tax Disputes",
      "Goods and Services Tax (GST)",
      "Customs",
      "Foreign Trade Policy (FTP)",
      "VAT",
    ],
    color: "from-[#6c7cae] to-[#6c7cae]/80",
  },
  {
    id: "accounting",
    title: "Accounting",
    description: "Professional accounting standards and practices",
    icon: BookOpenIcon,
    courses: ["IFRS", "Ind – AS", "Internal Audit"],
    color: "from-[#9c408c] to-[#9c408c]/80",
  },
  {
    id: "leadership",
    title: "Leadership",
    description: "Leadership development and team building programs",
    icon: UsersIcon,
    courses: ["Breakthrough in effectiveness", "Team building", "Soft Skills"],
    color: "from-[#2b8ffb] to-[#6c7cae]",
  },
];

export default function SeminarsAndConferencesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-[#6c7cae]/5'>
      {/* Hero Section */}
      <div className='relative py-20 overflow-hidden'>
        {/* Background Image */}
        <div className='absolute inset-0 bg-gradient-to-r from-[#2b8ffb]/90 to-[#6c7cae]/90'>
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80")',
            }}
          ></div>
          <div className='absolute inset-0 bg-gradient-to-r from-[#2b8ffb]/80 to-[#6c7cae]/80'></div>

          {/* Decorative Elements */}
          <div className='absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse'></div>
          <div className='absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000'></div>
          <div className='absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse delay-500'></div>
        </div>

        {/* Content */}
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <div className='mb-6'>
              <div className='inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 border border-white/20 mb-4'>
                <span className='text-white/90 font-medium'>
                  🎓 Seminars & Conferences
                </span>
              </div>
            </div>
            <h1 className='text-5xl font-bold text-white mb-6 drop-shadow-lg'>
              Enterprise Solutions
            </h1>
            <p className='text-xl text-white/90 max-w-4xl mx-auto mb-8 drop-shadow-md'>
              Achromic Point Consulting is the one stop shop for in-house
              customised training programs on diversified specialized subjects –
              Legal, Risk, Taxation, Accounting, IFRS, Soft Skills, Leadership
              Development and many more!
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button className='bg-white text-[#2b8ffb] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg'>
                Request Consultation
              </button>
              <button className='border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#2b8ffb] transition-all duration-200'>
                View Course Catalog
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Tailored Training Programs for Your Organization
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              These courses are tailored specifically to your organization's
              essentials, culture, strategy and core competencies. Having
              identified your organization's needs, we thoroughly assess the
              vision and individuals' goals to identify knowledge gaps and
              behavioural changes necessary to emerge triumphant in the race to
              success and continual progress.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center p-6 rounded-xl bg-gradient-to-br from-[#2b8ffb]/5 to-[#2b8ffb]/10 border border-[#2b8ffb]/20'>
              <div className='w-16 h-16 bg-gradient-to-r from-[#2b8ffb] to-[#2b8ffb]/80 rounded-full flex items-center justify-center mx-auto mb-4'>
                <TargetIcon className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Customized Approach
              </h3>
              <p className='text-gray-600'>
                Tailored specifically to your organization's essentials,
                culture, strategy, and core competencies.
              </p>
            </div>

            <div className='text-center p-6 rounded-xl bg-gradient-to-br from-[#6c7cae]/5 to-[#6c7cae]/10 border border-[#6c7cae]/20'>
              <div className='w-16 h-16 bg-gradient-to-r from-[#6c7cae] to-[#6c7cae]/80 rounded-full flex items-center justify-center mx-auto mb-4'>
                <UsersIcon className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Expert-Led Training
              </h3>
              <p className='text-gray-600'>
                Industry experts deliver comprehensive training programs
                designed for real-world application.
              </p>
            </div>

            <div className='text-center p-6 rounded-xl bg-gradient-to-br from-[#9c408c]/5 to-[#9c408c]/10 border border-[#9c408c]/20'>
              <div className='w-16 h-16 bg-gradient-to-r from-[#9c408c] to-[#9c408c]/80 rounded-full flex items-center justify-center mx-auto mb-4'>
                <CheckCircleIcon className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                Proven Results
              </h3>
              <p className='text-gray-600'>
                Measurable outcomes that drive organizational success and
                continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Categories Section */}
      <div className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Course Topics
            </h2>
            <p className='text-lg text-gray-600'>
              Uncover, discover and explore new options and avenues with APC's
              services on the dynamic canvas of Enterprise solutions
            </p>
          </div>

          <div className='space-y-6'>
            {courseCategories.map((category) => (
              <div
                key={category.id}
                className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'
              >
                <div
                  className='p-6 cursor-pointer'
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <category.icon className='w-6 h-6 text-white' />
                      </div>
                      <div>
                        <h3 className='text-xl font-semibold text-gray-900'>
                          {category.title}
                        </h3>
                        <p className='text-gray-600'>{category.description}</p>
                      </div>
                    </div>
                    <div className='flex items-center space-x-4'>
                      <span className='text-sm text-gray-500'>
                        {category.courses.length} Courses
                      </span>
                      <ArrowRightIcon
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                          selectedCategory === category.id ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {selectedCategory === category.id && (
                  <div className='border-t border-gray-200 bg-gray-50 p-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                      {category.courses.map((course, index) => (
                        <div
                          key={index}
                          className='bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200'
                        >
                          <div className='flex items-center space-x-3'>
                            <CheckCircleIcon className='w-5 h-5 text-[#2b8ffb] flex-shrink-0' />
                            <span className='text-gray-700 font-medium'>
                              {course}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className='py-16 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Our Training Process
            </h2>
            <p className='text-lg text-gray-600'>
              A systematic approach to delivering customized training solutions
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white font-bold text-xl'>1</span>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Assessment
              </h3>
              <p className='text-gray-600 text-sm'>
                Identify your organization's needs and knowledge gaps
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-[#6c7cae] to-[#9c408c] rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white font-bold text-xl'>2</span>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Customization
              </h3>
              <p className='text-gray-600 text-sm'>
                Tailor programs to your culture and strategy
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-[#9c408c] to-[#2b8ffb] rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white font-bold text-xl'>3</span>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Delivery
              </h3>
              <p className='text-gray-600 text-sm'>
                Expert-led training with practical applications
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-white font-bold text-xl'>4</span>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Evaluation
              </h3>
              <p className='text-gray-600 text-sm'>
                Measure results and continuous improvement
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] py-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl font-bold text-white mb-4'>
            Ready to Transform Your Organization?
          </h2>
          <p className='text-xl text-white/90 mb-8'>
            Contact us today to discuss your customized training needs and get a
            tailored proposal for your organization's success.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-white text-[#2b8ffb] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg'>
              Request a Quote
            </button>
            <button className='border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#2b8ffb] transition-all duration-200'>
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className='bg-gray-900 text-white py-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <p className='text-gray-300'>
            🎓 Transform your workforce with our specialized training and
            enterprise solutions
          </p>
          <p className='text-sm text-gray-400 mt-2'>
            © 2026 Achromic Point Consulting. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

