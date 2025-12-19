"use client";

import { useApi } from "@/hooks/useApi";
import { getCategories } from "@/services/category";
import { getMagzine } from "@/services/magzine";
import { useEffect, useState } from "react";

// Simple SVG Icons
const DownloadIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const TagIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
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
  categories: string[];
  featured: boolean;
}

export default function EMagazinePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredIssue, setHoveredIssue] = useState<number | null>(null);

  const { data, loading, error, run } = useApi<{ data: any[] }>();
  const [categories, setCategories] = useState<any>([]);
  const [magazineIssues, setMagazineIssues] = useState<MagazineIssue[]>([]);

  useEffect(() => {
    (async () => {
      const [category, magazines]: any = await Promise.all([
        run(getCategories),
        run(getMagzine),
      ]);
      setCategories([
        "All",
        ...(category?.data?.map((item: any) => item.name) ?? []),
      ]);
      setMagazineIssues(magazines?.data);
    })(); // Pass the function and args
  }, [run]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const filteredIssues =
    selectedCategory === "All"
      ? magazineIssues
      : magazineIssues.filter((issue) =>
          issue.categories.includes(selectedCategory)
        );

  const featuredIssues = magazineIssues.filter((_, id) => id < 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[#6c7cae]/5">
      {/* Header Section */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">eMagazine</h1>
            <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto">
              Stay updated with the latest insights, trends, and best practices
              in finance, legal, compliance, and business management through our
              comprehensive digital magazine.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white px-8 py-3 rounded-full font-semibold shadow-lg">
                📚 Free Digital Publications
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Issues Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Issues
          </h2>
          <p className="text-lg text-gray-600">
            Our most popular and recent publications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {featuredIssues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <div className="h-80 bg-gradient-to-br from-[#2b8ffb]/10 to-[#6c7cae]/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-40 bg-white rounded-lg shadow-lg mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-700">
                        {issue.issueNumber}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-2">
                      {issue.month} {issue.year}
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {issue.title}
                </h3>
                <p className="text-gray-600 mb-4">{issue.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {issue.categories.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#2b8ffb]/10 text-[#2b8ffb] px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white px-4 py-2 rounded-lg font-semibold hover:from-[#2b8ffb]/90 hover:to-[#6c7cae]/90 transition-all duration-200 flex items-center justify-center space-x-2">
                    <DownloadIcon className="w-4 h-4" />
                    <span>Download Free</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
                    <EyeIcon className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Issues Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All Issues
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Browse through our complete collection of digital magazines
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category: any) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Issues Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredIssues.map((issue) => (
              <div
                key={issue.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onMouseEnter={() => setHoveredIssue(issue.id)}
                onMouseLeave={() => setHoveredIssue(null)}
              >
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-[#2b8ffb]/5 to-[#6c7cae]/5 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-20 bg-white rounded shadow-md mx-auto mb-2 flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-700">
                          {issue.issueNumber}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-gray-700">
                        {issue.month} {issue.year}
                      </div>
                    </div>
                  </div>

                  {hoveredIssue === issue.id && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-3">
                      <button className="bg-[#2b8ffb] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#2b8ffb]/90 transition-colors duration-200 flex items-center space-x-2">
                        <DownloadIcon className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                      <button className="bg-white text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2">
                        <EyeIcon className="w-4 h-4" />
                        <span>Preview</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    {issue.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {issue.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {issue.categories.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {issue.categories.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{issue.categories.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="w-3 h-3" />
                      <span>
                        {issue.month} {issue.year}
                      </span>
                    </div>
                    <span className="bg-[#9c408c]/10 text-[#9c408c] px-2 py-1 rounded-full font-medium">
                      Free
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white px-8 py-3 rounded-full font-semibold hover:from-[#2b8ffb]/90 hover:to-[#6c7cae]/90 transition-all duration-200 shadow-lg">
              Load More Issues
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-xl text-white/90 mb-8">
            Subscribe to our newsletter and get notified when new issues are
            released
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-[#2b8ffb] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            📚 All eMagazine issues are free to download. No registration
            required.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            © 2025 Achromic Point. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
