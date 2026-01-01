/**
 * Skip navigation link component
 * Allows keyboard users to skip directly to main content
 * WCAG 2.4.1 Bypass Blocks (Level A)
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-navy focus:text-trueWhite focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy"
    >
      Skip to main content
    </a>
  );
}
