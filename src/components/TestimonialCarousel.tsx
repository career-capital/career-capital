import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
}

export default function TestimonialCarousel({
  testimonials,
  autoPlayInterval = 6000
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setIsPlaying(false);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      if (!prefersReducedMotion) {
        setIsTransitioning(true);
        setTimeout(() => setIsTransitioning(false), 500);
      }
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, prefersReducedMotion, testimonials.length, autoPlayInterval]);

  const goToPrevious = () => {
    if (!prefersReducedMotion) {
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 500);
    }
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    if (!prefersReducedMotion) {
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 500);
    }
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    if (!prefersReducedMotion) {
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 500);
    }
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative" role="region" aria-label="Testimonials carousel">
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Testimonial {currentIndex + 1} of {testimonials.length}
      </div>

      <div className="overflow-hidden px-4 sm:px-6 lg:px-8">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0"
              aria-hidden={index !== currentIndex}
            >
              <blockquote className="max-w-4xl mx-auto space-y-6 px-4 text-center">
                <p className="testimonial-quote text-2xl">
                  "{testimonial.quote}"
                </p>
                <footer>
                  <p className="testimonial-attribution max-w-none">
                    <strong className="font-semibold">— {testimonial.author}</strong>, {testimonial.company}
                  </p>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={goToPrevious}
          className="p-2 text-navy hover:text-steel transition-colors focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 rounded"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" aria-hidden="true" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 ${
                index === currentIndex
                  ? 'bg-navy w-8'
                  : 'bg-border hover:bg-slate'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-2 text-navy hover:text-steel transition-colors focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 rounded"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
