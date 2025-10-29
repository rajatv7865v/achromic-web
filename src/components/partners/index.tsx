'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Partner } from '../../services/partner';

interface PartnersProps {
  partners: Partner[];
  title?: string;
  subtitle?: string;
  showAll?: boolean;
  maxItems?: number;
  className?: string;
}

const Partners: React.FC<PartnersProps> = ({
  partners,
  title = "Trusted by Leading Organizations",
  subtitle = "We're proud to partner with industry leaders across various sectors",
  showAll = false,
  maxItems = 12,
  className = ""
}) => {
  // Filter active partners
  const displayPartners = partners.filter(partner => partner.isActive);
  
  // Limit the number of partners to display
  const limitedPartners = displayPartners.slice(0, maxItems);

  return (
    <div className={`py-16 bg-white ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {(title || subtitle) && (
          <div className='text-center mb-12'>
            {title && (
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className='text-lg text-gray-600'>
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        {/* Single Line Scrollable Container */}
        <div className='relative overflow-hidden'>
          <div className='flex gap-8 overflow-hidden'>
            <div className='flex gap-8 animate-scroll whitespace-nowrap'>
              {limitedPartners.map((partner, index) => (
                <div key={index} className='flex-shrink-0'>
                  <Link 
                    href={partner.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className='group block'
                  >
                    <div className='flex items-center justify-center p-6 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:border-[#be3437] hover:shadow-2xl transition-all duration-300 min-w-[180px] h-[120px]'>
                      <div className='relative w-40 h-20'>
                        {partner.logo ? (
                          <Image
                            src={partner.logo}
                            alt="Partner logo"
                            fill
                            className='object-contain'
                            sizes='180px'
                          />
                        ) : (
                          <div className='w-full h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg flex items-center justify-center text-white font-bold'>
                            Logo
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
              {/* Add spacing for smooth scroll */}
              <div className='flex-shrink-0 min-w-[180px] h-[120px]'></div>
            </div>
          </div>
        </div>

        {/* CSS Animation Styles */}
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Partners;
