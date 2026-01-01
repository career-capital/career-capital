import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface DisclosureProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  id?: string;
}

/**
 * Accessible disclosure/accordion component
 * Better alternative to complex dropdowns
 * Follows WAI-ARIA Authoring Practices for Disclosure pattern
 */
export default function Disclosure({
  title,
  children,
  defaultOpen = false,
  id
}: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const buttonId = id ? `${id}-button` : undefined;
  const panelId = id ? `${id}-panel` : undefined;

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleOpen();
    }
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={toggleOpen}
          onKeyDown={handleKeyDown}
          className="w-full flex items-center justify-between p-4 text-left bg-surface hover:bg-border/50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-navy"
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span className="text-lg font-medium text-ink">{title}</span>
          <ChevronDown
            className={`w-5 h-5 text-slate flex-shrink-0 ${
              prefersReducedMotion
                ? ''
                : 'transition-transform duration-200'
            } ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </h3>

      <div
        id={panelId}
        ref={contentRef}
        role="region"
        aria-labelledby={buttonId}
        className={`overflow-hidden ${
          prefersReducedMotion ? '' : 'transition-all duration-300'
        }`}
        style={{
          maxHeight: isOpen
            ? contentRef.current?.scrollHeight
              ? `${contentRef.current.scrollHeight}px`
              : '1000px'
            : '0'
        }}
        hidden={!isOpen}
      >
        <div className="p-4 pt-0 text-slate leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
