import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface PaginationProps {
  currentPage: number | string;
  totalPages: number | string;
  onPageChange: (page: number) => void;
  showPages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showPages = 5,
}) => {
  const page = Number(currentPage);
  const total = Number(totalPages);

  if (total <= 1) return null;

  const half = Math.floor(showPages / 2);
  let start = Math.max(1, page - half);
  let end = Math.min(total, start + showPages - 1);

  if (end - start + 1 < showPages) {
    start = Math.max(1, end - showPages + 1);
  }

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="flex justify-center bg-current pb-10">
      <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/60 backdrop-blur-xl shadow-xl border border-white/40 max-w-[600px]">
        {/* Prev */}
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 text-black
            ${
              page === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white shadow hover:scale-105 hover:bg-gradient-to-r hover:from-[#2b8ffb] hover:to-[#6c7cae] hover:text-white"
            }`}
        >
          <ArrowLeft size={18} />
        </button>

        {/* Page numbers */}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-11 h-11 rounded-full text-sm font-semibold transition-all duration-300
              ${
                p === page
                  ? "bg-gradient-to-r from-[#2b8ffb] to-[#6c7cae] text-white shadow-lg scale-110 ring-4 ring-[#2b8ffb]/30"
                  : "bg-white text-gray-700 shadow hover:scale-105 hover:bg-gray-100"
              }`}
          >
            {p}
          </button>
        ))}

        {/* Next */}
        <button
          disabled={page === total}
          onClick={() => onPageChange(page + 1)}
          className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 text-black
            ${
              page === total
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white shadow hover:scale-105 hover:bg-gradient-to-r hover:from-[#2b8ffb] hover:to-[#6c7cae] hover:text-white"
            }`}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
