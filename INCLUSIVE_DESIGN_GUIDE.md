# Inclusive Design Implementation Guide

## Overview
This guide provides comprehensive instructions for implementing accessible, inclusive design patterns in your React application. These patterns ensure your application works well for all users, including those with disabilities, older users, and those on slower connections.

## New Components Available

### 1. AccessibleCarousel
**Location:** `src/components/AccessibleCarousel.tsx`

**Features:**
- Pause/Play controls (WCAG 2.2.2 compliance)
- Reduced motion support
- ARIA live regions for screen reader announcements
- Keyboard navigation (Arrow keys, Home, End)
- Focus management

**Usage:**
```tsx
import AccessibleCarousel from './components/AccessibleCarousel';

<AccessibleCarousel
  testimonials={testimonials}
  autoPlayInterval={6000}
/>
```

**When to use:**
- When you need to show rotating content
- For testimonials or featured items
- When auto-play is essential to the design

### 2. TestimonialGrid
**Location:** `src/components/TestimonialGrid.tsx`

**Features:**
- Static grid layout (no animation)
- Pagination controls
- All content accessible without timing
- Better for SEO and cognitive accessibility

**Usage:**
```tsx
import TestimonialGrid from './components/TestimonialGrid';

<TestimonialGrid
  testimonials={testimonials}
  itemsPerPage={6}
/>
```

**When to use:**
- When content doesn't need to rotate
- For better accessibility and SEO
- When users need to scan all options quickly
- **RECOMMENDED** over carousel when possible

### 3. Accordion
**Location:** `src/components/Accordion.tsx`

**Features:**
- Single or multiple panel expansion
- Keyboard navigation (Arrow Up/Down, Home, End)
- ARIA attributes for accessibility
- Reduced motion support

**Usage:**
```tsx
import Accordion from './components/Accordion';

const items = [
  {
    id: 'item-1',
    title: 'What is Career Capital?',
    content: <p>Career Capital refers to...</p>
  },
  // more items...
];

<Accordion
  items={items}
  allowMultiple={false}
  defaultOpenItems={['item-1']}
/>
```

**When to use:**
- FAQs sections
- Progressive disclosure of information
- Long content that needs organization
- Alternative to tabs for mobile

### 4. Disclosure
**Location:** `src/components/Disclosure.tsx`

**Features:**
- Simple expand/collapse pattern
- Single panel (simpler than Accordion)
- ARIA compliant
- Reduced motion support

**Usage:**
```tsx
import Disclosure from './components/Disclosure';

<Disclosure
  title="More Information"
  defaultOpen={false}
  id="details-section"
>
  <p>Hidden content that can be revealed...</p>
</Disclosure>
```

**When to use:**
- Single expandable section
- "Read more" functionality
- Optional content that's not critical
- Keeping interfaces clean

### 5. LoadMore
**Location:** `src/components/LoadMore.tsx`

**Features:**
- User-controlled loading
- Clear completion state
- Screen reader announcements
- Works with browser history

**Usage:**
```tsx
import { LoadMore } from './components/LoadMore';

<LoadMore
  items={allItems}
  initialItemsCount={6}
  itemsPerLoad={6}
  renderItem={(item, index) => (
    <div key={index}>{item.title}</div>
  )}
  className="grid md:grid-cols-2 gap-8"
/>
```

**When to use:**
- **ALWAYS** use instead of infinite scroll
- Long lists or galleries
- Search results
- Product catalogs

### 6. SkipLink
**Location:** `src/components/SkipLink.tsx`

**Features:**
- WCAG 2.4.1 compliance
- Hidden until focused
- Allows keyboard users to skip navigation

**Usage:**
```tsx
import SkipLink from './components/SkipLink';

// Place at the very top of your app
<SkipLink />
```

**Already implemented in App.tsx**

## Custom Hooks

### useReducedMotion
**Location:** `src/hooks/useReducedMotion.ts`

Detects if user has reduced motion preference enabled.

**Usage:**
```tsx
import { useReducedMotion } from './hooks/useReducedMotion';

function MyComponent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={prefersReducedMotion ? '' : 'animate-fade-in'}>
      Content
    </div>
  );
}
```

### useFocusTrap
**Location:** `src/hooks/useFocusTrap.ts`

Traps focus within a container (for modals, dialogs, menus).

**Usage:**
```tsx
import { useFocusTrap } from './hooks/useFocusTrap';

function Modal({ isOpen }) {
  const trapRef = useFocusTrap(isOpen);

  return (
    <div ref={trapRef} role="dialog">
      Modal content
    </div>
  );
}
```

## Utility Functions

### Progressive Enhancement
**Location:** `src/utils/progressiveEnhancement.ts`

**Key Functions:**
- `initializeProgressiveEnhancement()` - Call on app mount
- `prefersReducedMotion()` - Check motion preference
- `getSafeScrollBehavior()` - Get safe scroll setting
- `shouldSaveData()` - Check if user wants to save data
- `getConnectionSpeed()` - Detect connection quality

**Usage:**
```tsx
import {
  initializeProgressiveEnhancement,
  getSafeScrollBehavior,
  shouldSaveData
} from './utils/progressiveEnhancement';

// In App.tsx
useEffect(() => {
  initializeProgressiveEnhancement();
}, []);

// In component
window.scrollTo({
  top: 0,
  behavior: getSafeScrollBehavior()
});

// Conditionally load images
if (!shouldSaveData()) {
  loadHighResImages();
}
```

### Accessibility Utilities
**Location:** `src/utils/accessibility.ts`

**Key Functions:**
- `announceToScreenReader(message, priority)` - Announce to screen readers
- `getFocusableElements(container)` - Get all focusable elements
- `scrollToElement(element, options)` - Scroll with accessibility
- `detectKeyboardNavigation()` - Add keyboard nav indicators

**Usage:**
```tsx
import {
  announceToScreenReader,
  scrollToElement,
  detectKeyboardNavigation
} from './utils/accessibility';

// On app mount
useEffect(() => {
  detectKeyboardNavigation();
}, []);

// Announce updates
const handleSubmit = () => {
  // ... submit logic
  announceToScreenReader('Form submitted successfully', 'polite');
};

// Safe scrolling
const scrollToSection = (element: HTMLElement) => {
  scrollToElement(element, {
    block: 'start',
    respectReducedMotion: true
  });
};
```

## Updated Components

### TestimonialCarousel (Improved)
**Changes made:**
- Added pause/play button
- Respects `prefers-reduced-motion`
- Added ARIA live regions
- Improved focus indicators
- Auto-pauses when reduced motion is preferred

### Navigation (Improved)
**Changes made:**
- Added focus trap for mobile menu
- Better keyboard navigation
- Improved ARIA attributes

### BackToTop (Improved)
**Changes made:**
- Respects `prefers-reduced-motion`
- No smooth scroll if user prefers instant scroll

## Migration Guide

### Step 1: Replace Carousel with Grid (Recommended)

**Before:**
```tsx
<TestimonialCarousel testimonials={testimonials} />
```

**After:**
```tsx
<TestimonialGrid testimonials={testimonials} itemsPerPage={6} />
```

**Why:** Better accessibility, SEO, and user control. No timing requirements.

### Step 2: Use AccessibleCarousel if carousel is required

**If you must keep the carousel:**
```tsx
<AccessibleCarousel
  testimonials={testimonials}
  autoPlayInterval={6000}
/>
```

### Step 3: Replace Infinite Scroll with Load More

**Before:**
```tsx
<InfiniteScroll
  dataLength={items.length}
  next={fetchMore}
  hasMore={hasMore}
>
  {items.map(item => <ItemCard key={item.id} {...item} />)}
</InfiniteScroll>
```

**After:**
```tsx
<LoadMore
  items={allItems}
  initialItemsCount={9}
  itemsPerLoad={9}
  renderItem={(item) => <ItemCard key={item.id} {...item} />}
  className="grid md:grid-cols-3 gap-6"
/>
```

### Step 4: Replace Complex Dropdowns with Disclosure/Accordion

**Before:**
```tsx
<Dropdown trigger="Click me">
  <DropdownItem>Option 1</DropdownItem>
  <DropdownItem>Option 2</DropdownItem>
</Dropdown>
```

**After:**
```tsx
<Disclosure title="Click me" id="options">
  <ul>
    <li>Option 1</li>
    <li>Option 2</li>
  </ul>
</Disclosure>
```

## CSS Best Practices

### Add to your CSS for better accessibility:

```css
/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

/* Focus visible only for keyboard users */
.js:not(.keyboard-nav) *:focus {
  outline: none;
}

.keyboard-nav *:focus-visible {
  outline: 2px solid #1e3a8a; /* navy color */
  outline-offset: 2px;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  * {
    border-color: currentColor;
  }

  button,
  a {
    outline: 2px solid currentColor;
  }
}
```

## Testing Checklist

### Manual Testing
- [ ] Test with keyboard only (no mouse)
- [ ] Test with screen reader (NVDA, JAWS, or VoiceOver)
- [ ] Test at 200% browser zoom
- [ ] Test with Windows High Contrast Mode
- [ ] Enable `prefers-reduced-motion` and verify animations stop
- [ ] Test on mobile with touch
- [ ] Test with voice control (Dragon NaturallySpeaking)

### Automated Testing
- [ ] Run axe DevTools on every page
- [ ] Run Lighthouse accessibility audit (score 90+)
- [ ] Validate HTML (W3C Validator)
- [ ] Check color contrast (WebAIM Contrast Checker)
- [ ] Test with Pa11y or similar tool

### Browser Testing
- [ ] Chrome/Edge with keyboard
- [ ] Firefox with keyboard
- [ ] Safari with VoiceOver
- [ ] Mobile Safari with VoiceOver
- [ ] Chrome Android with TalkBack

## WCAG 2.1 Compliance Summary

### Level A (Critical)
- ✅ 1.1.1 Non-text Content
- ✅ 2.1.1 Keyboard
- ✅ 2.2.2 Pause, Stop, Hide (with new carousel)
- ✅ 2.4.1 Bypass Blocks (skip link added)
- ✅ 4.1.2 Name, Role, Value

### Level AA (Required)
- ✅ 1.4.3 Contrast (Minimum)
- ✅ 2.4.7 Focus Visible
- ✅ 3.2.3 Consistent Navigation
- ✅ 4.1.3 Status Messages

### Level AAA (Best Practice)
- ✅ 2.3.3 Animation from Interactions (reduced motion)
- ✅ 2.4.8 Location
- ✅ 3.2.5 Change on Request

## Resources

### Documentation
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)

### Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

### Screen Readers
- [NVDA](https://www.nvaccess.org/) (Windows, free)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) (Windows)
- VoiceOver (macOS/iOS, built-in)
- TalkBack (Android, built-in)

## Quick Wins

Implement these for immediate accessibility improvements:

1. ✅ Add skip link (already done)
2. ✅ Add pause controls to carousel (already done)
3. ✅ Respect reduced motion (already done)
4. ✅ Add ARIA live regions (already done)
5. ✅ Improve focus indicators (already done)
6. Replace carousel with grid (recommended)
7. Add keyboard shortcuts for common actions
8. Add loading states with ARIA
9. Test with screen reader
10. Fix any contrast issues

## Support

For questions or issues with these components:
1. Review the ACCESSIBILITY_AUDIT.md document
2. Check component JSDoc comments
3. Review WCAG guidelines
4. Test with actual assistive technology
5. Get feedback from users with disabilities
