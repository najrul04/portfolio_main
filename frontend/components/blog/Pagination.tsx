'use client';

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface PaginationProps {
   currentPage: number;
   totalPages: number;
   onPageChange: (page: number) => void;
}

// Builds the list of page numbers to render. Returns plain numbers for clickable
// pages and the string '…' as a placeholder for skipped ranges.
//
// Why this logic: showing all page numbers gets unwieldy past 7-8. The standard
// pattern shows first 1-2 pages, current ±1, last 1-2 pages, with ellipses.
// Window of 1 on each side of `current` keeps the bar compact on mobile.
const buildPageList = (current: number, total: number): (number | '…')[] => {
   if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
   }

   const pages = new Set([1, total, current, current - 1, current + 1]);
   const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

   // Insert '…' wherever there's a gap > 1 between consecutive numbers.
   const result: (number | '…')[] = [];
   sorted.forEach((p, i) => {
      if (i > 0 && p - sorted[i - 1] > 1) result.push('…');
      result.push(p);
   });
   return result;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
   // Single-page lists don't need a paginator — render nothing rather than
   // a sad lone "1" button.
   if (totalPages <= 1) return null;

   const pages = buildPageList(currentPage, totalPages);

   const go = (page: number) => {
      if (page < 1 || page > totalPages || page === currentPage) return;
      onPageChange(page);
   };

   return (
      <nav className="pagination" aria-label="Blog pagination">
         <button
            type="button"
            className="pagination_btn pagination_arrow"
            onClick={() => go(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
         >
            <AiOutlineLeft />
         </button>

         {pages.map((p, i) =>
            p === '…' ? (
               <span key={`gap-${i}`} className="pagination_gap" aria-hidden>
                  …
               </span>
            ) : (
               <button
                  key={p}
                  type="button"
                  className={`pagination_btn ${p === currentPage ? 'is-current' : ''}`}
                  onClick={() => go(p)}
                  aria-current={p === currentPage ? 'page' : undefined}
                  aria-label={`Page ${p}`}
               >
                  {p}
               </button>
            )
         )}

         <button
            type="button"
            className="pagination_btn pagination_arrow"
            onClick={() => go(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
         >
            <AiOutlineRight />
         </button>
      </nav>
   );
};

export default Pagination;
