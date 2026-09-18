import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
}

export function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  className,
  showFirstLast = true,
  maxVisiblePages = 5,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(currentPage, totalPages, maxVisiblePages);

  return (
    <nav
      className={cn('flex items-center justify-center gap-1', className)}
      aria-label="Paginación"
    >
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Primera página"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Página anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((page, index) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            'h-10 w-10 rounded-md text-sm font-medium transition-colors',
            page === currentPage
              ? 'bg-irons-charcoal text-irons-warm-white'
              : 'text-muted-foreground hover:bg-irons-stone-gray hover:text-irons-charcoal'
          )}
          aria-label={`Página ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Página siguiente"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Última página"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </nav>
  );
}

function getVisiblePages(current: number, total: number, maxVisible: number): number[] {
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const half = Math.floor(maxVisible / 2);
  let start = Math.max(1, current - half);
  let end = Math.min(total, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}