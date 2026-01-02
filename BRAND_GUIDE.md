# Career Capital Brand Guide

## Color Palette

### Primary Colors

| Color Name | Hex Code | Tailwind Class | Usage |
|------------|----------|----------------|-------|
| Deep Space Blue | `#0F2A44` | `navy` | Primary brand color, headings, hero sections, primary CTAs |
| Baltic Blue | `#2F5D8A` | `steel` | Links, hover states, focus rings, interactive accents |
| Carbon Black | `#1A1A1A` | `ink` | High-emphasis text, footer content, dark UI elements |

### Neutral Colors

| Color Name | Hex Code | Tailwind Class | Usage |
|------------|----------|----------------|-------|
| True White | `#FFFFFF` | `trueWhite` | **Cards only** - all card components, modals, high-contrast surfaces |
| Bright Snow | `#F8F9FA` | `softWhite` | Page backgrounds, navigation bar |
| Surface | `#E6E9EE` | `surface` | Section backgrounds, form containers, panels |
| Pale Slate | `#D1D5DB` | `border` | Borders, dividers, subtle outlines |
| Charcoal Blue | `#4B5563` | `slate` | Primary body text, content |

## Component Color Guidelines

### Cards

**Background:** Pure white (`#FFFFFF`) only
- Interactive cards: `.card-interactive`
- Informational cards: `.card-info`
- Flip cards: `.flip-card-front`, `.flip-card-back`

**Purpose:** Cards use pure white to stand out against softer page backgrounds, creating clear visual hierarchy and focus.

### Buttons

#### Primary Button (CTA)
- Background: Deep Space Blue (`#0F2A44`)
- Text: True White (`#FFFFFF`)
- Hover: Baltic Blue (`#2F5D8A`)
- Border: None
- Class: `.btn-primary`

#### Secondary Button
- Background: Bright Snow (`#F8F9FA`)
- Text: Deep Space Blue (`#0F2A44`)
- Hover Border: Baltic Blue (`#2F5D8A`)
- Border: Pale Slate (`#D1D5DB`)
- Class: `.btn-secondary`

#### Accent Button (Alternative)
- Background: True White (`#FFFFFF`)
- Text: Baltic Blue (`#2F5D8A`)
- Border: Baltic Blue (`#2F5D8A`)
- Hover: Background transitions to Baltic Blue, text to white
- Class: `.btn-accent`

### Navigation

- Background: Bright Snow (`#F8F9FA`)
- Links (inactive): Deep Space Blue (`#0F2A44`)
- Links (hover): Baltic Blue (`#2F5D8A`)
- Active indicator: Baltic Blue (`#2F5D8A`) underline
- Border bottom: Pale Slate (`#D1D5DB`)

### Forms

#### Form Containers
- Background: Surface (`#E6E9EE`)
- Border: Pale Slate (`#D1D5DB`)
- Padding: 2rem (32px)

#### Input Fields
- Background: True White (`#FFFFFF`)
- Border: Pale Slate (`#D1D5DB`)
- Focus border: Baltic Blue (`#2F5D8A`)
- Focus ring: Baltic Blue with 20% opacity
- Text: Charcoal Blue (`#4B5563`)
- Placeholder: Charcoal Blue at 60% opacity

#### Labels
- Color: Charcoal Blue (`#4B5563`)
- Required indicator: Baltic Blue (`#2F5D8A`)

### Interactive States

#### Hover
- Primary action: Baltic Blue (`#2F5D8A`)
- Cards: Border changes to Baltic Blue
- Links: Baltic Blue (`#2F5D8A`)
- Slight elevation (-1px to -4px transform)

#### Focus
- Border: Baltic Blue (`#2F5D8A`) 2px solid
- Ring: Baltic Blue with 50% opacity, 3px offset
- No outline (replaced with custom focus ring)

#### Active/Pressed
- Slight scale down (98%)
- Border remains Baltic Blue

#### Disabled
- Opacity: 50%
- Cursor: not-allowed
- No hover effects

### Backgrounds

#### Page Backgrounds
- Main: Bright Snow (`#F8F9FA`)
- Sections: Alternating Bright Snow and Surface

#### Hero Sections
- Background: Deep Space Blue (`#0F2A44`) with hero image overlay
- Text: True White (`#FFFFFF`) or Bright Snow (`#F8F9FA`)
- Accents: Baltic Blue (`#2F5D8A`)

#### Dark Sections
- Background: Deep Space Blue (`#0F2A44`)
- Text: Bright Snow (`#F8F9FA`)
- Accents: Baltic Blue (`#2F5D8A`)

### Text Color Hierarchy

1. **Headings (H1-H6):** Deep Space Blue (`#0F2A44`)
2. **Body text:** Charcoal Blue (`#4B5563`)
3. **Secondary/Meta text:** Charcoal Blue at 70% opacity
4. **Links:** Baltic Blue (`#2F5D8A`) → darker on hover
5. **Text on dark backgrounds:** Bright Snow (`#F8F9FA`) or True White (`#FFFFFF`)

### Accordions & Disclosures

- Background (closed): Surface (`#E6E9EE`)
- Background (open): Surface (`#E6E9EE`)
- Border: Pale Slate (`#D1D5DB`)
- Header text: Deep Space Blue (`#0F2A44`)
- Icon: Baltic Blue (`#2F5D8A`)
- Content text: Charcoal Blue (`#4B5563`)

### Testimonials

#### Grid/Carousel Cards
- Background: True White (`#FFFFFF`)
- Border: Pale Slate (`#D1D5DB`)
- Quote text: Charcoal Blue (`#4B5563`)
- Attribution: Charcoal Blue at 70% opacity
- Hover border: Baltic Blue (`#2F5D8A`)

#### Featured Testimonials
- Background: Surface (`#E6E9EE`)
- Border: 2px Baltic Blue (`#2F5D8A`)
- Special treatment to highlight importance

## Typography

### Font Families
- Primary: System font stack for optimal performance
  ```
  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  ```

### Font Weights
- Light: 300 (sparingly, for large headings)
- Regular: 400 (body text)
- Medium: 500 (subheadings, emphasis)
- Semibold: 600 (headings, buttons)
- Bold: 700 (strong emphasis, H1)

### Font Sizes & Line Heights

| Element | Size | Line Height | Weight |
|---------|------|-------------|--------|
| H1 | 3rem (48px) | 1.1 | 700 |
| H2 | 2.25rem (36px) | 1.2 | 600 |
| H3 | 1.875rem (30px) | 1.3 | 600 |
| H4 | 1.5rem (24px) | 1.4 | 600 |
| H5 | 1.25rem (20px) | 1.4 | 500 |
| H6 | 1.125rem (18px) | 1.4 | 500 |
| Body | 1rem (16px) | 1.5 | 400 |
| Small | 0.875rem (14px) | 1.5 | 400 |

## Spacing System

Uses 8px base unit (0.5rem):

| Class | Size | Usage |
|-------|------|-------|
| 1 | 4px | Minimal spacing |
| 2 | 8px | Tight spacing |
| 3 | 12px | Small spacing |
| 4 | 16px | Default spacing |
| 6 | 24px | Medium spacing |
| 8 | 32px | Large spacing |
| 12 | 48px | XL spacing |
| 16 | 64px | XXL spacing |
| 24 | 96px | Section spacing |

### Layout Spacing

- Card padding: 24px (1.5rem)
- Section padding vertical: 64px to 96px
- Section padding horizontal: 16px (mobile) to 32px (desktop)
- Container max-width: 1280px (xl)
- Component gap: 16px to 24px

## Shadows

### Card Shadows
```css
/* Default */
box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

/* Hover */
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

/* Large (modal, important elements) */
box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

## Border Radius

| Class | Size | Usage |
|-------|------|-------|
| sm | 0.25rem (4px) | Small elements, badges |
| base | 0.5rem (8px) | Buttons, inputs, tags |
| md | 0.5rem (8px) | Default for most components |
| lg | 0.75rem (12px) | Cards, panels |
| xl | 1rem (16px) | Large cards, hero sections |
| 2xl | 1.5rem (24px) | Special showcase elements |

## Transitions

### Duration
- Fast: 150ms (micro-interactions)
- Base: 200ms (most interactions)
- Slow: 300ms (complex animations)

### Easing
- Default: `ease-out`
- Enter: `ease-out`
- Exit: `ease-in`
- Smooth: `cubic-bezier(0.4, 0, 0.2, 1)`

### Common Transitions
```css
/* Hover lift */
transition: all 200ms ease-out;
transform: translateY(-4px);

/* Color change */
transition: color 200ms ease-out, border-color 200ms ease-out;

/* Background change */
transition: background-color 200ms ease-out;
```

## Accessibility Guidelines

### Color Contrast
- All text on white backgrounds must meet WCAG AA standards (4.5:1 minimum)
- Large text (18px+) must meet 3:1 minimum
- Interactive elements must have 3:1 contrast with surroundings

### Focus Indicators
- Visible on all interactive elements
- Baltic Blue (`#2F5D8A`) 2px border
- 3px offset ring with 50% opacity
- Never remove focus indicators

### Interactive States
- All clickable elements must have distinct hover states
- Focus states must be keyboard accessible
- Active states provide immediate visual feedback

## Responsive Breakpoints

```css
/* Mobile first approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large desktops */
```

## Icon System

### Source
Lucide React icon library

### Sizing
- Small: 16px (1rem)
- Base: 20px (1.25rem)
- Large: 24px (1.5rem)
- XL: 32px (2rem)

### Color
- Default: Inherit from parent
- Primary action: Baltic Blue (`#2F5D8A`)
- Decorative: Charcoal Blue at 60% opacity
- On dark: True White (`#FFFFFF`)

## Motion & Animation

### Reduced Motion
Always respect `prefers-reduced-motion` media query:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Animation Principles
- Purposeful: Enhance understanding, don't distract
- Subtle: Micro-interactions, not heavy animations
- Fast: Keep under 300ms for most interactions
- Responsive: No animation lag on user actions

## Usage Examples

### Service Cards (Home Page)
```tsx
<div className="card-info">
  <h3 className="text-2xl font-semibold text-navy mb-4">Service Title</h3>
  <p className="text-slate mb-4">Description content...</p>
</div>
```

### CTA Button
```tsx
<button className="btn-primary">
  Get Started
</button>
```

### Form Section
```tsx
<div className="bg-surface border border-border rounded-lg p-8">
  <form>
    <input
      type="text"
      className="input-field"
      placeholder="Enter your email"
    />
    <button className="btn-primary">Submit</button>
  </form>
</div>
```

### Navigation Link
```tsx
<a
  href="/services"
  className="text-steel hover:text-navy transition-colors duration-200"
>
  Services
</a>
```

## Design Principles

1. **Clarity First**: Every design decision should enhance clarity and usability
2. **Accessible by Default**: Build accessibility into every component
3. **Consistent Hierarchy**: Use color, size, and spacing to create clear visual hierarchy
4. **Progressive Enhancement**: Start with semantic HTML, enhance with CSS/JS
5. **Performance Matters**: Optimize for speed without sacrificing quality
6. **Mobile First**: Design for small screens first, enhance for larger screens
7. **Purposeful Motion**: Use animation to guide and inform, not decorate

## Notes

- This is a living document and will be updated as the brand evolves
- When in doubt, prioritize accessibility and clarity over decoration
- Test all color combinations for sufficient contrast
- Cards are the primary content containers and should always use pure white
- Keep the overall aesthetic clean, professional, and modern

### Color Palette Updates (January 2026)

**Refined Color System** - The palette has been optimized for improved contrast, readability, and brand consistency:

1. **Primary Colors**: Deep Space Blue (#0F2A44), Baltic Blue (#2F5D8A), and Carbon Black (#1A1A1A) provide a sophisticated, professional foundation
2. **Neutral System**: Bright Snow (#F8F9FA), Surface (#E6E9EE), Pale Slate (#D1D5DB), and Charcoal Blue (#4B5563) create optimal hierarchy and readability
3. **Removed**: Warm Gold accent has been removed to maintain a restrained, premium aesthetic
4. **Text Colors**: Charcoal Blue (#4B5563) replaces previous text colors for better readability on light backgrounds
5. **Surface Color**: Updated from #F1F3F5 to #E6E9EE for improved background contrast
6. **Link Behavior**: Links now default to Baltic Blue and darken to Deep Space Blue on hover for clearer interactivity
