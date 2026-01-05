"use client"; // for Next 13+ app directory client component

import Pagination from "@/components/common/Pagination";
import { getGalleryByEvent, getGalleryByEventSlug } from "@/services/gallery";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [gallery, setGallery] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const params = useParams();
  const slug: any = params.slug; // string

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!slug) {
    return null;
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (!mounted) return;

    const fetchGallery = async () => {
      setLoading(true);
      try {
        const result = await getGalleryByEventSlug(slug);
        setGallery(result ?? []);
      } catch (error) {
        console.error("Failed to fetch gallery", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [slug, mounted]);

  console.log("gallery", gallery);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Gallery
      </h1>

      {/* Loading Bar */}
      {loading && (
        <div className="w-full mb-6">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden relative">
            <div className="h-full bg-blue-600 rounded-full animate-progress"></div>
          </div>
          <p className="text-center text-gray-600 mt-2">Loading gallery...</p>
        </div>
      )}

      {/* Grid */}
      {!loading && (
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
      )}

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
