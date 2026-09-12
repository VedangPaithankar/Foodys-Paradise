import React from 'react';

// Shared windowed pagination -- Search.js and Cuisines.js used to each
// hand-roll their own version of this (and had drifted into two different,
// both slightly-off algorithms). One correct implementation now: prev,
// first page, an ellipsis if there's a gap, a window around the current
// page, another ellipsis if needed, last page, next.
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const windowSize = 1;
  const pages = new Set([1, totalPages]);
  for (let i = currentPage - windowSize; i <= currentPage + windowSize; i++) {
    if (i >= 1 && i <= totalPages) {
      pages.add(i);
    }
  }
  const sorted = [...pages].sort((a, b) => a - b);

  const items = [];
  let previous = 0;
  for (const page of sorted) {
    if (page - previous > 1) {
      items.push({ type: 'ellipsis', key: `ellipsis-${page}` });
    }
    items.push({ type: 'page', page });
    previous = page;
  }

  const baseButton = "min-w-[2.25rem] h-9 px-2 rounded-full font-sans text-sm font-medium transition-colors";

  return (
    <nav className="flex justify-center items-center gap-1.5 my-10" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`${baseButton} px-3 text-ink-light hover:bg-sand disabled:opacity-30 disabled:hover:bg-transparent`}
      >
        Prev
      </button>
      {items.map((item) =>
        item.type === 'ellipsis' ? (
          <span key={item.key} className="px-1 text-ink-light select-none">&hellip;</span>
        ) : (
          <button
            key={item.page}
            type="button"
            onClick={() => onPageChange(item.page)}
            aria-current={item.page === currentPage ? 'page' : undefined}
            className={`${baseButton} ${
              item.page === currentPage
                ? 'bg-paprika text-white'
                : 'bg-white text-ink border border-sand hover:bg-sand'
            }`}
          >
            {item.page}
          </button>
        )
      )}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`${baseButton} px-3 text-ink-light hover:bg-sand disabled:opacity-30 disabled:hover:bg-transparent`}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
