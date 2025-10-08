import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/assets/logo/logo.png";
import { useState } from "react";

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function SpeakerCard({ speaker }: { speaker: any }) {
  const [imageError, setImageError] = useState(false);
  
  // Early return if speaker is not provided
  if (!speaker) {
    return (
      <div className="flex items-center bg-white py-6 px-3 text-gray-800 p-2 gap-3 rounded-xl">
        <div className="h-20 w-20 rounded-full border-[1px] flex items-center justify-center p-2 bg-gray-200">
          <span className="text-gray-500">N/A</span>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-[19px] text-gray-500">No Speaker Data</h3>
        </div>
      </div>
    );
  }
  
  // Helper function to validate and format image URL
  const getImageSrc = () => {
    try {
      if (!speaker?.avatar || imageError || typeof speaker.avatar !== 'string') {
        console.log('No avatar or image error:', { avatar: speaker?.avatar, imageError });
        return Logo;
      }
      
      console.log('Processing avatar URL:', speaker.avatar);
      
      // If it's already a full URL, return as is
      if (speaker.avatar.startsWith('http://') || speaker.avatar.startsWith('https://')) {
        console.log('Full URL detected:', speaker.avatar);
        return speaker.avatar;
      }
      
      // If it's a relative path, make it absolute
      if (speaker.avatar.startsWith('/')) {
        console.log('Relative path detected:', speaker.avatar);
        return speaker.avatar;
      }
      
      // If it's just a filename or relative path, prepend with base URL
      // Try to construct the full backend URL
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const constructedUrl = `${baseUrl}${speaker.avatar.startsWith('/') ? '' : '/'}${speaker.avatar}`;
      console.log('Constructed URL:', constructedUrl);
      return constructedUrl;
    } catch (error) {
      console.error('Error processing image URL:', error);
      return Logo;
    }
  };

  return (
    <div className="group relative flex items-center bg-gradient-to-br from-white to-gray-50 py-8 px-6 text-gray-800 gap-6 rounded-2xl hover:text-white hover:bg-gradient-to-br hover:from-[#be3437] hover:to-[#8b2a2d] transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 border border-gray-100 hover:border-[#be3437]/20">
      {/* LinkedIn Icon in top-right corner */}
      {speaker?.linkedinUrl && (
        <a
          href={speaker.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 text-[#0077B5] hover:text-[#0077B5]/80 transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 transform hover:scale-110"
          title="LinkedIn Profile"
        >
          <LinkedInIcon className="w-6 h-6" />
        </a>
      )}
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#be3437]/10 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <section className="h-32 w-32 rounded-full border-2 border-white shadow-xl flex items-center justify-center p-1 overflow-hidden group-hover:border-white/20 transition-all duration-300">
        {speaker?.avatar && !imageError && typeof speaker.avatar === 'string' ? (
          <>
            <Image
              src={getImageSrc()}
              alt={speaker?.name || "Speaker"}
              width={128}
              height={128}
              className="object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
              onError={() => {
                console.log('Next.js Image failed, trying fallback');
                setImageError(true);
              }}
              onLoad={() => setImageError(false)}
              unoptimized={true}
            />
            {/* Fallback img tag if Next.js Image fails */}
            {imageError && (
              <img
                src={getImageSrc()}
                alt={speaker?.name || "Speaker"}
                className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                onError={() => {
                  console.log('Fallback img also failed');
                  setImageError(true);
                }}
                onLoad={() => {
                  console.log('Fallback img loaded successfully');
                  setImageError(false);
                }}
              />
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center transition-all duration-300 group-hover:from-[#be3437]/20 group-hover:to-[#8b2a2d]/20">
            <span className="text-gray-600 font-semibold text-2xl transition-colors duration-300 group-hover:text-white">
              {speaker?.name?.charAt(0)?.toUpperCase() || "S"}
            </span>
          </div>
        )}
      </section>
      <section className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-xl text-gray-900 group-hover:text-white transition-colors duration-300">
            {speaker?.name || "Unknown Speaker"}
          </h3>
          <div className="flex flex-col gap-1">
            <h4 className="text-[#be3437] font-semibold text-sm group-hover:text-white/90 transition-colors duration-300">
              {speaker?.designation || "N/A"}
            </h4>
            <h4 className="text-gray-600 font-medium text-sm group-hover:text-white/80 transition-colors duration-300">
              {speaker?.organization || "N/A"}
            </h4>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-500 text-sm group-hover:text-white/70 transition-colors duration-300">
            {speaker?.country || "N/A"}
          </h4>
          {/* Status indicator */}
          <div className="w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </section>
    </div>
  );
}
