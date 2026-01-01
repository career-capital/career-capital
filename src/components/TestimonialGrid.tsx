import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

interface TestimonialGridProps {
  testimonials: Testimonial[];
  itemsPerPage?: number;
}

/**
 * Static grid alternative to carousel
 * Better for accessibility, SEO, and cognitive load
 * All content is accessible without animation or timing
 */
export default function TestimonialGrid({
  testimonials,
  itemsPerPage = 6
}: TestimonialGridProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTestimonials = testimonials.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Grid of testimonials */}
      <div
        className="grid md:grid-cols-2 gap-8 mb-12 min-h-[600px]"
        role="region"
        aria-label="Client testimonials"
      >
        {currentTestimonials.map((testimonial, index) => (
          <article
            key={startIndex + index}
            className="bg-surface border border-border p-8"
          >
            <blockquote className="space-y-4">
              <p className="text-lg text-ink leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <footer className="text-slate font-medium not-italic">
                — {testimonial.author}
                {testimonial.company && (
                  <>, <cite className="not-italic">{testimonial.company}</cite></>
                )}
              </footer>
            </blockquote>
          </article>
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <nav
          className="flex items-center justify-center gap-4"
          aria-label="Testimonials pagination"
        >
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="p-2 text-navy hover:text-steel transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 rounded"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="flex gap-2" role="list" aria-label="Page numbers">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`min-w-[2.5rem] h-10 px-3 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 ${
                  i === currentPage
                    ? 'bg-navy text-trueWhite font-medium'
                    : 'bg-surface text-slate hover:bg-border'
                }`}
                aria-label={`Page ${i + 1}`}
                aria-current={i === currentPage ? 'page' : undefined}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className="p-2 text-navy hover:text-steel transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 rounded"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </nav>
      )}

      {/* Status announcement for screen readers */}
      <div className="sr-only" role="status" aria-live="polite">
        Page {currentPage + 1} of {totalPages}.
        Showing {currentTestimonials.length} testimonials.
      </div>
    </div>
  );
}
