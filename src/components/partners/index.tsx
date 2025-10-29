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
  // Filter featured partners if not showing all
  const displayPartners = showAll ? partners : partners.filter(partner => partner.featured);
  
  // Limit the number of partners to display
  const limitedPartners = displayPartners.slice(0, maxItems);

  // Split partners into two rows for better layout
  const firstRowPartners = limitedPartners.slice(0, Math.ceil(limitedPartners.length / 2));
  const secondRowPartners = limitedPartners.slice(Math.ceil(limitedPartners.length / 2));

  return (
    <div className={`py-16 bg-white ${className}`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>
            {title}
          </h2>
          <p className='text-lg text-gray-600'>
            {subtitle}
          </p>
        </div>
        
        {/* First Row of Partners */}
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center mb-8'>
          {firstRowPartners.map((partner) => (
            <div key={partner.id} className='flex items-center justify-center'>
              <Link 
                href={partner.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className='group block w-full'
              >
                <div className='flex items-center justify-center p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 group-hover:scale-105'>
                  <div className='relative w-24 h-16'>
                    {partner.logo ? (
                      <Image
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        fill
                        className='object-contain'
                        sizes='(max-width: 768px) 100px, (max-width: 1024px) 120px, 150px'
                      />
                    ) : (
                      <div className='w-full h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg flex items-center justify-center text-white font-bold text-xs'>
                        {partner.name.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Second Row of Partners (if needed) */}
        {secondRowPartners.length > 0 && (
          <div className='hidden lg:grid grid-cols-6 gap-8 items-center'>
            {secondRowPartners.map((partner) => (
              <div key={partner.id} className='flex items-center justify-center'>
                <Link 
                  href={partner.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className='group block w-full'
                >
                  <div className='flex items-center justify-center p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 group-hover:scale-105'>
                    <div className='relative w-24 h-16'>
                      {partner.logo ? (
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          fill
                          className='object-contain'
                          sizes='(max-width: 768px) 100px, (max-width: 1024px) 120px, 150px'
                        />
                      ) : (
                        <div className='w-full h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg flex items-center justify-center text-white font-bold text-xs'>
                          {partner.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Show more button if there are more partners */}
        {!showAll && partners.length > maxItems && (
          <div className='text-center mt-8'>
            <button className='inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200'>
              View All Partners
              <svg className='ml-2 w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Partners;
