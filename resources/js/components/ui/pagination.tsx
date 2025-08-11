import { PaginationProps } from "@/types";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 3; // show only a few numbers
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      {/* Previous Button */}
      <button
        className="px-3 py-1 rounded border disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded border ${
            page === currentPage
              ? "bg-blue-500 text-white"
              : "bg-white dark:bg-gray-800 text-black dark:text-white"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Ellipsis if more pages */}
      {currentPage + 1 < totalPages && <span>...</span>}

      {/* Next Button */}
      <button
        className="px-3 py-1 rounded border disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}