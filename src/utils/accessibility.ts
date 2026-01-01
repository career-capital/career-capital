/**
 * Accessibility utility functions
 */

/**
 * Announce message to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  if (typeof document === 'undefined') return;

  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(', ');

  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors));
}

/**
 * Trap focus within a container
 */
export function createFocusTrap(container: HTMLElement): () => void {
  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement?.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement?.focus();
        e.preventDefault();
      }
    }
  };

  document.addEventListener('keydown', handleTabKey);

  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleTabKey);
  };
}

/**
 * Manage focus return after modal/dialog closes
 */
export class FocusManager {
  private previouslyFocusedElement: HTMLElement | null = null;

  saveFocus(): void {
    this.previouslyFocusedElement = document.activeElement as HTMLElement;
  }

  restoreFocus(): void {
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
      this.previouslyFocusedElement = null;
    }
  }
}

/**
 * Check if element is visible in viewport
 */
export function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Smooth scroll to element with accessibility considerations
 */
export function scrollToElement(
  element: HTMLElement,
  options: {
    block?: ScrollLogicalPosition;
    behavior?: ScrollBehavior;
    respectReducedMotion?: boolean;
  } = {}
): void {
  const {
    block = 'start',
    behavior = 'smooth',
    respectReducedMotion = true
  } = options;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const safeBehavior = respectReducedMotion && prefersReducedMotion ? 'auto' : behavior;

  element.scrollIntoView({
    behavior: safeBehavior,
    block
  });

  // Set focus after scrolling
  if (!element.hasAttribute('tabindex')) {
    element.setAttribute('tabindex', '-1');
  }
  element.focus({ preventScroll: true });
}

/**
 * Generate unique IDs for ARIA relationships
 */
let idCounter = 0;
export function generateId(prefix: string = 'element'): string {
  return `${prefix}-${++idCounter}`;
}

/**
 * Check if keyboard navigation is being used
 */
export function detectKeyboardNavigation(): void {
  if (typeof document === 'undefined') return;

  let isUsingKeyboard = false;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      isUsingKeyboard = true;
      document.documentElement.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    isUsingKeyboard = false;
    document.documentElement.classList.remove('keyboard-nav');
  });
}
