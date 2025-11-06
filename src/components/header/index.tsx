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
        { name: "Agenda", href: "/agenda" },
      ],
    },
    {
      name: "Services",
      href: "#",
      type: "dropdown",
      children: [
        { name: "Enterprise Solutions", href: "/enterprise-solutions" },
        { name: "Seminars and Conferences", href: "/seminars-and-conferences" },
        { name: "Enterprise Solutions", href: "/enterprise-solutions" },
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
              <span className="flex items-center">📞 011-4601-1835</span>
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
                  className="hover:text-white/80 transition-colors"
                >
                  <LinkedinIcon />
                </a>
                <a
                  href="https://www.instagram.com/achromicpoint/"
                  target="_blank"
                  className="hover:text-white/80 transition-colors"
                >
                  <InstagramIcon />
                </a>

                <a
                  href="https://www.facebook.com/AchromicPoint"
                  target="_blank"
                  className="hover:text-white/80 transition-colors"
                >
                  <FacebookIcon />
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
