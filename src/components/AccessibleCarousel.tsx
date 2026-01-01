import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

interface AccessibleCarouselProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
}

/**
 * Fully accessible carousel component with:
 * - Pause/Play controls
 * - Reduced motion support
 * - ARIA live regions
 * - Keyboard navigation
 * - Screen reader announcements
 */
export default function AccessibleCarousel({
  testimonials,
  autoPlayInterval = 6000
}: AccessibleCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const intervalRef = useRef<number | null>(null);

  const shouldAutoPlay = isPlaying && !isUserInteracting && !prefersReducedMotion;

  useEffect(() => {
    if (!shouldAutoPlay) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [shouldAutoPlay, testimonials.length, autoPlayInterval]);

  const goToPrevious = () => {
    setIsUserInteracting(true);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setIsUserInteracting(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsUserInteracting(true);
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setIsUserInteracting(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(testimonials.length - 1);
    }
  };

  return (
    <div
      className="relative max-w-3xl mx-auto"
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Testimonials carousel"
      aria-roledescription="carousel"
    >
      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Testimonial {currentIndex + 1} of {testimonials.length}
      </div>

      {/* Main content area */}
      <div className="overflow-hidden">
        <div
          className={`flex ${prefersReducedMotion ? '' : 'transition-transform duration-500 ease-out'}`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 px-4"
              role="group"
              aria-roledescription="slide"
              aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
              aria-hidden={index !== currentIndex}
            >
              <div className="text-center space-y-6">
                <p className="text-2xl text-ink leading-relaxed italic font-light">
                  "{testimonial.quote}"
                </p>
                <p className="text-slate font-medium">
                  — {testimonial.author}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        {/* Previous button */}
        <button
          onClick={goToPrevious}
          className="p-2 text-navy hover:text-steel transition-colors focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 rounded"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" aria-hidden="true" />
        </button>

        {/* Pause/Play button - WCAG 2.2.2 compliance */}
        <button
          onClick={togglePlayPause}
          className="p-2 text-navy hover:text-steel transition-colors focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 rounded"
          aria-label={isPlaying ? 'Pause automatic rotation' : 'Resume automatic rotation'}
          disabled={prefersReducedMotion}
        >
          {isPlaying && !prefersReducedMotion ? (
            <Pause className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Play className="w-5 h-5" aria-hidden="true" />
          )}
        </button>

        {/* Dot indicators */}
        <div className="flex gap-2" role="tablist" aria-label="Choose testimonial">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 ${
                index === currentIndex
                  ? 'bg-navy w-8'
                  : 'bg-border hover:bg-slate'
              }`}
              role="tab"
              aria-label={`View testimonial ${index + 1}`}
              aria-selected={index === currentIndex}
              aria-controls={`testimonial-${index}`}
              tabIndex={index === currentIndex ? 0 : -1}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={goToNext}
          className="p-2 text-navy hover:text-steel transition-colors focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 rounded"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>

      {/* Instruction for keyboard users */}
      <p className="text-sm text-slate text-center mt-4">
        Use arrow keys to navigate, Home/End for first/last
      </p>
    </div>
  );
}
