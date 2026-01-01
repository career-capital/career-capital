import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenItems?: string[];
}

/**
 * Accessible accordion component
 * Follows WAI-ARIA Authoring Practices for Accordion pattern
 * Supports single or multiple open panels
 */
export default function Accordion({
  items,
  allowMultiple = false,
  defaultOpenItems = []
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(defaultOpenItems)
  );
  const prefersReducedMotion = useReducedMotion();
  const contentRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newOpenItems = new Set(prev);

      if (newOpenItems.has(id)) {
        newOpenItems.delete(id);
      } else {
        if (!allowMultiple) {
          newOpenItems.clear();
        }
        newOpenItems.add(id);
      }

      return newOpenItems;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, itemId: string, index: number) => {
    const currentButton = e.currentTarget as HTMLButtonElement;
    let nextButton: HTMLButtonElement | null = null;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        nextButton = currentButton
          .closest('.accordion-item')
          ?.nextElementSibling?.querySelector('button') as HTMLButtonElement;
        nextButton?.focus();
        break;

      case 'ArrowUp':
        e.preventDefault();
        nextButton = currentButton
          .closest('.accordion-item')
          ?.previousElementSibling?.querySelector('button') as HTMLButtonElement;
        nextButton?.focus();
        break;

      case 'Home':
        e.preventDefault();
        const firstButton = currentButton
          .closest('.accordion')
          ?.querySelector('button') as HTMLButtonElement;
        firstButton?.focus();
        break;

      case 'End':
        e.preventDefault();
        const buttons = currentButton
          .closest('.accordion')
          ?.querySelectorAll('button');
        const lastButton = buttons?.[buttons.length - 1] as HTMLButtonElement;
        lastButton?.focus();
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();
        toggleItem(itemId);
        break;
    }
  };

  return (
    <div className="accordion space-y-2" role="region" aria-label="Accordion control">
      {items.map((item, index) => {
        const isOpen = openItems.has(item.id);

        return (
          <div key={item.id} className="accordion-item border border-border rounded-lg overflow-hidden">
            <h3>
              <button
                type="button"
                id={`accordion-button-${item.id}`}
                onClick={() => toggleItem(item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id, index)}
                className="w-full flex items-center justify-between p-4 text-left bg-surface hover:bg-border/50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-navy"
                aria-expanded={isOpen}
                aria-controls={`accordion-panel-${item.id}`}
              >
                <span className="text-lg font-medium text-ink">{item.title}</span>
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
              id={`accordion-panel-${item.id}`}
              ref={(el) => {
                if (el) {
                  contentRefs.current.set(item.id, el);
                }
              }}
              role="region"
              aria-labelledby={`accordion-button-${item.id}`}
              className={`overflow-hidden ${
                prefersReducedMotion ? '' : 'transition-all duration-300'
              }`}
              style={{
                maxHeight: isOpen
                  ? contentRefs.current.get(item.id)?.scrollHeight
                    ? `${contentRefs.current.get(item.id)!.scrollHeight}px`
                    : '1000px'
                  : '0'
              }}
              hidden={!isOpen}
            >
              <div className="p-4 pt-0 text-slate leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}

      <div className="sr-only" role="status" aria-live="polite">
        {openItems.size} {openItems.size === 1 ? 'section' : 'sections'} expanded
      </div>
    </div>
  );
}
