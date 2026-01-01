/**
 * Progressive Enhancement Utilities
 * Provides graceful degradation and enhancement strategies
 */

/**
 * Check if JavaScript is enabled (always true when this runs)
 * Use class-based approach in HTML: <html class="no-js">
 * Then remove it: document.documentElement.classList.remove('no-js')
 */
export function detectJavaScript(): void {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');
  }
}

/**
 * Detect if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Detect if user prefers dark color scheme
 */
export function prefersDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Detect if user prefers high contrast
 */
export function prefersHighContrast(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Detect connection speed
 */
export function getConnectionSpeed(): 'slow' | 'medium' | 'fast' {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return 'medium';
  }

  const connection = (navigator as any).connection;
  const effectiveType = connection?.effectiveType;

  if (effectiveType === '4g') return 'fast';
  if (effectiveType === '3g') return 'medium';
  return 'slow';
}

/**
 * Check if user has save data preference enabled
 */
export function shouldSaveData(): boolean {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return false;
  }

  const connection = (navigator as any).connection;
  return connection?.saveData === true;
}

/**
 * Get safe scroll behavior based on user preference
 */
export function getSafeScrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? 'auto' : 'smooth';
}

/**
 * Get safe transition duration based on user preference
 * Returns 0 if reduced motion is preferred
 */
export function getSafeTransitionDuration(duration: number): number {
  return prefersReducedMotion() ? 0 : duration;
}

/**
 * Check if device has coarse pointer (touch)
 */
export function hasCoarsePointer(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

/**
 * Check if device has hover capability
 */
export function hasHoverCapability(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(hover: hover)').matches;
}

/**
 * Add CSS classes to document based on capabilities
 */
export function enhanceDocument(): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  // JavaScript detection
  root.classList.remove('no-js');
  root.classList.add('js');

  // Motion preference
  if (prefersReducedMotion()) {
    root.classList.add('reduce-motion');
  }

  // Dark mode preference
  if (prefersDarkMode()) {
    root.classList.add('dark-mode');
  }

  // High contrast preference
  if (prefersHighContrast()) {
    root.classList.add('high-contrast');
  }

  // Connection speed
  const connectionSpeed = getConnectionSpeed();
  root.classList.add(`connection-${connectionSpeed}`);

  // Save data mode
  if (shouldSaveData()) {
    root.classList.add('save-data');
  }

  // Touch/hover detection
  if (hasCoarsePointer()) {
    root.classList.add('touch-device');
  }

  if (!hasHoverCapability()) {
    root.classList.add('no-hover');
  }
}

/**
 * Initialize progressive enhancement on page load
 */
export function initializeProgressiveEnhancement(): void {
  if (typeof window === 'undefined') return;

  enhanceDocument();

  // Listen for preference changes
  if (window.matchMedia) {
    // Reduced motion changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      document.documentElement.classList.toggle('reduce-motion', e.matches);
    });

    // Dark mode changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      document.documentElement.classList.toggle('dark-mode', e.matches);
    });

    // High contrast changes
    window.matchMedia('(prefers-contrast: high)').addEventListener('change', (e) => {
      document.documentElement.classList.toggle('high-contrast', e.matches);
    });
  }
}
