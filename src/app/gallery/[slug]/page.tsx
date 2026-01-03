"use client"; // for Next 13+ app directory client component

import Pagination from "@/components/common/Pagination";
import { useApi } from "@/hooks/useApi";
import { getGalleryByEvent, getGalleryByEventSlug } from "@/services/gallery";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const { data, loading, error, run } = useApi<{ data: any[] }>();
  const [gallery, setGallery] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const params = useParams();
  const slug: any = params.slug; // string

  if (!slug) {
    return null;
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const gallery = await getGalleryByEventSlug(slug);
        setGallery(gallery ?? []);
      } catch (error) {
        console.error("Failed to fetch gallery", error);
      }
    };
    fetchGallery();
  }, [slug]);

  console.log("gallery", gallery);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Gallery
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {gallery?.files?.map((item: any, idx: number) => {
          console.log("it", item);

          return (
            <div
              key={item._id ?? idx}
              className="relative w-full h-60 cursor-pointer overflow-hidden rounded-lg group"
              onClick={() => setSelectedImg(item)}
            >
              <Image
                src={item}
                alt={`Gallery image ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 100vw,
                 (max-width: 768px) 50vw,
                 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          );
        })}
      </div>
     
      {/* Lightbox */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-70 flex bg-black/60 items-center justify-center p-4"
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
