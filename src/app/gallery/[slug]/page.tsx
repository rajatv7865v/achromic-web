"use client"; // for Next 13+ app directory client component

import Image from "next/image";
import { useState } from "react";

const images = [
  "https://source.unsplash.com/random/400x400/?nature,water",
  "https://source.unsplash.com/random/400x400/?nature,forest",
  "https://source.unsplash.com/random/400x400/?nature,mountain",
  "https://source.unsplash.com/random/400x400/?nature,sky",
  "https://source.unsplash.com/random/400x400/?nature,river",
  "https://source.unsplash.com/random/400x400/?nature,tree",
];

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Gallery</h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="relative w-full h-60 cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setSelectedImg(src)}
          >
            <Image
              src={src}
              alt={`Gallery image ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
        >
          <div className="relative w-full max-w-3xl h-96 md:h-[600px]">
            <Image
              src={selectedImg}
              alt="Selected"
              fill
              className="object-contain rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}
