"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/assets/logo/logo.png";
import { Linkedin } from "lucide";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
  ShoppingCart,
  X
} from "lucide-react";
import { useAppSelector } from "@/store/hooks";

// Simple SVG Icons
const MenuIcon = ({ className }: { className?: string }) => (
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
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
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
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
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
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export default function Header({ onCartClick }: { onCartClick?: () => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = cartItems.length;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const navigationItems = [
    {
      name: "Home",
      href: "/",
      type: "link",
    },
    {
      name: "Events",
      href: "#",
      type: "dropdown",
      children: [
        { name: "Upcoming Events", href: "/upcoming-event" },
        { name: "Past Events", href: "/past-events" },
      ],
    },
    {
      name: "Services",
      href: "#",
      type: "dropdown",
      children: [
        { name: "Enterprise Solutions", href: "/enterprise-solutions" },
        { name: "Seminars and Conferences", href: "/seminars-and-conferences" },
        { name: "Managed Events", href: "/managed-events" },
      ],
    },
    {
      name: "eMagazine",
      href: "/emagzine",
      type: "link",
    },
    {
      name: "Annual Membership",
      href: "/annual-membership",
      type: "link",
    },
    {
      name: "Contact",
      href: "/contact-us",
      type: "link",
    },
  ];

  return (
    <header className="relative bg-white shadow-xl border-b border-gray-200">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#be3437] to-[#6c7cae] py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-white text-sm">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">📞 +91 11 4601 1835</span>
              <span className="flex items-center">
                📧 contactus@achromicpoint.com
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {/* <span className='text-white/90'>Follow us:</span> */}
              <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/30248529/admin/page-posts/published/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/achromicpoint/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/AchromicPoint"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://x.com/AchromicPoint"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-colors"
                aria-label="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M18.244 2.25h3.308l-7.227 8.26
    8.502 11.24h-6.654l-5.21-6.817
    -5.966 6.817H1.688l7.73-8.835
    -8.147-10.665h6.82l4.713 6.231
    5.44-6.231zm-1.16 17.52h1.833
    L7.084 4.126H5.117z"
                  />
                </svg>
              </a>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image
                src={Logo}
                alt="Achromic Point Logo"
                className="w-44 h-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative">
                {item.type === "dropdown" ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center space-x-1 text-gray-700 hover:text-[#be3437] font-semibold transition-colors duration-200 py-2"
                    >
                      <span>{item.name}</span>
                      <ChevronDownIcon className="w-4 h-4" />
                    </button>

                    {activeDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                        {item.children?.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-[#be3437]/10 hover:text-[#be3437] transition-colors duration-200"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-[#be3437] font-semibold transition-colors duration-200 py-2 relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#be3437] to-[#6c7cae] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button & Cart */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-[#be3437] transition-colors duration-200"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
            <Link
              href="/contact-us"
              className="bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white px-6 py-2 rounded-full font-semibold hover:from-[#be3437]/90 hover:to-[#6c7cae]/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-[#be3437] transition-colors duration-200 p-2"
            >
              {isMobileMenuOpen ? (
                <CloseIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.type === "dropdown" ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className="flex items-center justify-between w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold transition-colors duration-200"
                    >
                      <span>{item.name}</span>
                      <ChevronDownIcon
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {activeDropdown === item.name && (
                      <div className="pl-6 space-y-2 mt-2">
                        {item.children?.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2 text-gray-600 hover:bg-[#be3437]/10 hover:text-[#be3437] rounded-lg transition-colors duration-200"
                            onClick={() => {
                              setActiveDropdown(null);
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <button
                onClick={() => {
                  onCartClick?.();
                  setIsMobileMenuOpen(false);
                }}
                className="relative w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              <Link
                href="/contact-us"
                className="block w-full bg-gradient-to-r from-[#be3437] to-[#6c7cae] text-white px-6 py-3 rounded-lg font-semibold text-center hover:from-[#be3437]/90 hover:to-[#6c7cae]/90 transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
