import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "@/components/assets/logo/logo.png";
import Link from "next/link";
import type { Partner } from "@/services/partner";
import { mockPartners } from "@/data/mockPartners";

export default function Partner({ eventId }: { eventId: string }) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventPartners = async () => {
      try {
        setLoading(true);
        setError(null);
        // For now, use mock data filtered by active partners
        const eventPartners = mockPartners.filter(partner => partner.isActive);
        setPartners(eventPartners);
      } catch (err) {
        setError('Failed to fetch partners');
        console.error('Error fetching event partners:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventPartners();
  }, [eventId]);

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index));
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#be3437] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading partners...</p>
      </div>
    );
  }

  if (error || partners.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No partners found for this event.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Partners</h3>
        <p className="text-gray-600 text-lg">Trusted by industry leaders</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#be3437]/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
          >
            {/* Decorative background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#be3437]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Partner logo container */}
            <Link 
              href={partner.website || '/'} 
              className="relative block text-center group-hover:scale-110 transition-transform duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative h-20 w-full flex items-center justify-center">
                {!imageErrors.has(index) && partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt="Partner Logo"
                    width={120}
                    height={80}
                    className="max-h-20 w-auto object-contain filter group-hover:brightness-110 transition-all duration-300"
                    onError={() => handleImageError(index)}
                    unoptimized={true}
                  />
                ) : (
                  <div className="h-16 w-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-bold text-lg">
                      P
                    </span>
                  </div>
                )}
              </div>
              
              {/* Partner website */}
              <h4 className="mt-4 text-sm font-semibold text-gray-700 group-hover:text-[#be3437] transition-colors duration-300 line-clamp-2">
                {partner.website.replace(/^https?:\/\//, '').split('/')[0] || 'Partner'}
              </h4>
              
              {/* Hover indicator */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#be3437] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                <div className="w-full h-full bg-white rounded-full scale-50"></div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
