# Career Capital - Project Context & Design Guide

## Overview
Career Capital is a professional services website for Nisaini Rexach, focusing on AI readiness consulting and relationship-driven leadership. The site combines sophisticated design with deep accessibility considerations, creating a premium, trustworthy experience that reflects the founder's values: AI fluency meets strong human relationships.

---

## Core Philosophy & Brand Identity

### The "Career Capital" Concept
The central thesis: **AI fluency + strong relationships = the new career capital**

The founder's philosophy centers on three key ideas:
1. **Social Wealth** - Your network underwrites your next opportunity. Every encounter is an interview.
2. **AI Fluency** - Leaders need to understand AI strategically (not technically) to guide their teams through transformation
3. **Relationships First** - Human connection becomes more valuable as AI handles routine tasks

### Brand Voice & Language
The site uses a distinctive voice that blends:
- **Professional authority** with **warm accessibility**
- **Strategic thinking** with **practical action**
- **Future-focused optimism** without **technology hype**

Key recurring phrases that appear throughout (from the TEDx talk and consulting philosophy):
- "Every encounter is an interview"
- "Your network underwrites your next opportunity"
- "Make deposits with intention"
- "The dividends will surprise you"
- "Come to the table prepared"
- "Your brand is in the room even when you're not"
- "Small, consistent deposits yield bigger returns"
- "When people feel seen, they remember"
- "Let's live the learning"

**Tone Guidelines:**
- Conversational but not casual
- Confident but not arrogant
- Warm but not overly emotional
- Direct and clear without being blunt
- Uses metaphors from finance/investment to describe relationship-building

---

## Visual Design System

### Color Palette
The site uses a **refined, professional navy-and-neutral** color system. **NEVER use purple, indigo, or violet tones** - this is explicitly against the design requirements.

**Primary Colors:**
- **Navy** (`#0F2A44`) - Primary brand color, authority, trust
- **Steel Blue** (`#2F5D8A`) - Interactive elements, hover states, accent color
- **Ink** (`#1A1A1A`) - Body text, headlines
- **Slate** (`#3F4653`) - Secondary text (WCAG AAA compliant: 8.01:1 contrast ratio)

**Neutrals:**
- **Soft White** (`#F8F9FA`) - Primary background
- **True White** (`#FFFFFF`) - Card backgrounds, overlays
- **Border** (`#D1D5DB`) - Dividers, card borders
- **Surface** (`#F1F3F5`) - Section backgrounds

### Typography
- **Font Family:** System font stack for optimal performance and readability
- **Heading Style:** Light weight (font-light), generous spacing, minimal letter-spacing
- **Body Text:**
  - Line height: 1.7 (1.5 for body, 1.2 for headings)
  - Letter spacing: 0.01em for readability
  - Max width: 65ch for optimal reading
- **Small Text:** Increased line-height (1.6) and letter-spacing (0.02em) for legibility

### Design Aesthetic
**Premium, Clean, Human-Centered**

The design avoids:
- ❌ Flashy animations or heavy effects
- ❌ Stock photography (except Pexels when needed)
- ❌ Purple/indigo/violet color schemes
- ❌ Overly technical jargon
- ❌ Cookie-cutter templates

The design embraces:
- ✅ Generous white space
- ✅ Subtle micro-interactions
- ✅ Clear visual hierarchy
- ✅ Professional photography (founder headshots)
- ✅ Sophisticated hover states and transitions
- ✅ Clean, modern layouts with breathing room

---

## UI/UX Considerations

### Interactive Elements & Link Behavior
**Critical Standard:** All hyperlinks must behave consistently across the site.

**Text Links:**
- Always underlined (`underline underline-offset-2`)
- Navy color (`text-navy`)
- Hover: Steel blue color (`hover:text-steel`)
- Thicker underline on hover (2px)

**Button-Styled Links:**
- NO underlines (explicitly removed with CSS)
- Use button classes (`.btn-primary`, `.btn-secondary-on-dark`, etc.)
- Examples: "Watch the Talk", "Book for Your Event"

**This consistency is critical for accessibility** - users must be able to distinguish clickable text from regular text at a glance.

### Button System
The site has a comprehensive button system for different contexts:

**On Light Backgrounds:**
- `.btn-primary` - Navy fill, most prominent
- `.btn-secondary` - Solid white fill with navy border
- `.btn-secondary-transparent` - Transparent with navy border (use sparingly)

**On Dark Backgrounds:**
- `.btn-primary-on-dark` - Soft white fill
- `.btn-secondary-on-dark` - Solid navy fill with soft white border
- `.btn-secondary-on-dark-transparent` - Transparent with soft white border

### Card Components

**Flip Cards** (Services, Speaking pages):
- Interactive cards that flip on click/tap to reveal details
- Front: Overview with title and description
- Back: Bullet-point details
- Height: 260px (desktop), 300px (mobile)
- Speaking page cards: Slightly shorter (220px/280px)
- Border: 2px solid on all cards for consistency
- Hover: Lifts 4px with steel blue border
- Icon: Rotate icon in steel blue (subtle visual cue)

**Design Considerations:**
- Consistent padding: 1.5rem (desktop), 1.75rem (mobile)
- Steel blue accents (bullets, icons) for cohesion
- "Click for details" / "Tap for details" helper text
- Accessible keyboard interaction (Enter/Space to flip)

**Standard Cards:**
- `.card-interactive` - For clickable content
- `.card-info` - For static presentation
- Dark variants available for navy backgrounds

### Navigation
**Auto-hiding Navigation:**
- Hides on scroll down (reduces distraction)
- Reappears on scroll up (always accessible)
- Always visible at top of page
- Smooth transitions (300ms)

**Mobile Menu:**
- Hamburger icon with smooth animation
- Backdrop blur overlay
- Focus trap for accessibility
- Staggered fade-in animation for menu items

**Active Page Indicator:**
- Steel blue underline on current page
- Scale animation on hover for other links

---

## Accessibility Standards

### WCAG AAA Compliance
The site targets **WCAG AAA** compliance (the highest standard).

**Color Contrast:**
- Slate text on white: 8.01:1 ratio
- All interactive elements meet 4.5:1 minimum
- Focus indicators: 3px steel blue outline with 2px offset

**Keyboard Navigation:**
- All interactive elements keyboard-accessible
- Visible focus indicators (3px outline)
- Focus trap in mobile menu
- Skip link to main content
- Logical tab order throughout

**Screen Reader Support:**
- Semantic HTML5 landmarks (`<nav>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels on all buttons and interactive elements
- `role` attributes where needed (e.g., flip cards as buttons)
- SR-only content for context ("opens in new window", etc.)
- Live regions for dynamic content (form submissions, filters)

**Reduced Motion:**
- Respects `prefers-reduced-motion` media query
- Disables all animations when preference is set
- Flip cards become instant

**Touch Device Optimization:**
- Minimum touch target: 44x44px
- Appropriate spacing between interactive elements

### Inclusive Design
- Clear, plain language
- No reliance on color alone to convey information
- Generous line-spacing for dyslexia-friendliness
- High contrast mode support
- Progressive enhancement approach

---

## Content Strategy

### Page Structure

**Home Page:**
- Hero: Bold value proposition with background image
- Core Capabilities: AI Fluency, Relationship Management, Mindset Shifts
- Featured Testimonials: Carousel from Supabase
- TEDx Section: Speaking engagement highlight with CTA

**Services Page:**
- Core Services: 4 flip cards (Assessment, Strategy, Advisory, Enablement)
- How Engagements Work: 4-step timeline visualization
- Add-On Services: 2 flip cards (Executive Coaching, Office Hours)
- Each service card includes social wealth philosophy phrases

**Speaking Page:**
- Engagement Formats: Keynote, Workshops, Facilitation
- Speaking Topics: 4 flip cards with detailed content
- Differentiators: 4 key principles (relationships first, customized, fluency, partnership)
- TEDx Chicago: Extended description with video link

**About Page:**
- Personal narrative with founder philosophy
- Professional headshot (responsive: different crops for mobile/desktop)
- Core Philosophy: 3 values with icons
- LinkedIn link to founder profile (underlined)

**Testimonials Page:**
- Database-driven from Supabase
- Filterable by source (Client vs. Professional Endorsement)
- Filterable by engagement type
- Load More functionality (8 per page)
- Full testimonial display with quotes and attribution

**Contact Page:**
- Simple contact form (name, email, organization, inquiry type, message)
- What to Expect: 4-step process
- "Just exploring?" encouragement section

### Testimonials System (Supabase)

**Database Schema:**
- `testimonials` table with RLS policies
- Fields: quote, author, company, testimonial_type, tags, featured, display_order, is_active
- Types: 'client' or 'character_witness' (professional endorsements)
- Tags: Engagement types (Keynote Speaking, Workshop Facilitation, Executive Coaching, Strategy & Roadmap)
- Featured testimonials appear on home page

**Admin Interface:**
- CRUD operations for testimonials
- Toggle featured status
- Reorder with drag-and-drop
- Tag management
- Type selection

---

## Technical Architecture

### Stack
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom design tokens
- **Database:** Supabase (PostgreSQL with RLS)
- **Icons:** Lucide React
- **Deployment:** Configured for static hosting (Netlify/Vercel)

### Project Structure
```
src/
├── components/     # Reusable components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── FlipCard.tsx
│   ├── TestimonialCarousel.tsx
│   ├── TestimonialGrid.tsx
│   └── ...
├── pages/          # Page components
│   ├── Home.tsx
│   ├── Services.tsx
│   ├── Speaking.tsx
│   ├── About.tsx
│   ├── Testimonials.tsx
│   ├── Contact.tsx
│   └── Admin.tsx
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── lib/            # Supabase client
└── index.css       # Global styles & design tokens
```

### Key Components

**FlipCard:**
- Reusable card component with flip animation
- Front/back content structure
- Keyboard accessible
- Used on Services and Speaking pages

**TestimonialCarousel:**
- Auto-rotating carousel (8 seconds per slide)
- Pause on hover/focus
- Keyboard navigation (arrows, dots)
- Accessible announcements

**Navigation:**
- Responsive with mobile hamburger menu
- Auto-hide on scroll
- Focus trap in mobile menu

### Supabase Integration

**Environment Variables Required:**
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

**Row Level Security:**
- Testimonials table: Public read access, admin write access
- All tables have RLS enabled
- Policies check authentication for write operations

---

## Design Principles Summary

### Do's:
✅ Use navy and steel blue exclusively for brand colors
✅ Maintain generous white space and breathing room
✅ Keep language conversational but professional
✅ Underline all text links consistently
✅ Use social wealth metaphors and recurring phrases
✅ Prioritize accessibility in every decision
✅ Make hover states subtle but clear
✅ Keep navigation clean and unobtrusive
✅ Use real testimonials and authentic content
✅ Maintain WCAG AAA contrast standards

### Don'ts:
❌ Never use purple, indigo, or violet colors
❌ Don't add underlines to button-styled links
❌ Don't use technical jargon without explanation
❌ Don't create busy or cluttered layouts
❌ Don't skip accessibility features
❌ Don't use stock photos (except Pexels when needed)
❌ Don't add emojis unless explicitly requested
❌ Don't use flashy animations
❌ Don't break the consistent link styling
❌ Don't compromise on mobile responsiveness

---

## Maintenance & Future Development

### When Adding New Features:
1. **Check existing patterns** - Look at similar components before creating new ones
2. **Follow the design system** - Use established colors, spacing, and typography
3. **Test accessibility** - Keyboard navigation, screen readers, reduced motion
4. **Maintain link consistency** - Text links underlined, buttons without underlines
5. **Use social wealth language** - Incorporate recurring phrases where appropriate
6. **Build mobile-first** - Ensure responsive design at all breakpoints

### Content Updates:
- Testimonials: Use Admin page to add/edit/reorder
- All content: Plain language, relationship-focused
- New services: Follow flip card pattern with philosophy phrases
- Images: Optimize for web, use responsive images

### Code Quality:
- Run `npm run build` before deploying
- Check TypeScript errors with `npm run typecheck`
- Lint with `npm run lint`
- Test on multiple devices and browsers
- Verify keyboard navigation works

---

## Key Files Reference

**Design System:**
- `src/index.css` - Global styles, design tokens, component classes

**Core Pages:**
- `src/pages/Home.tsx` - Homepage with hero and testimonials
- `src/pages/Services.tsx` - Service offerings with flip cards
- `src/pages/Speaking.tsx` - Speaking topics and TEDx info
- `src/pages/About.tsx` - Founder bio and philosophy
- `src/pages/Testimonials.tsx` - Full testimonials with filters
- `src/pages/Contact.tsx` - Contact form and expectations

**Database:**
- `src/lib/supabase.ts` - Supabase client configuration
- `supabase/migrations/` - Database schema and RLS policies

**Documentation:**
- `ACCESSIBILITY_AUDIT.md` - Detailed accessibility implementation
- `INCLUSIVE_DESIGN_GUIDE.md` - Design accessibility guidelines
- `TESTIMONIALS_CMS_GUIDE.md` - Guide for managing testimonials

---

## Contact & Brand Assets

**Founder:** Nisaini Rexach
- LinkedIn: https://www.linkedin.com/in/nisainirexach/
- TEDx Talk: https://youtu.be/vT3fUJ1-BvA?si=VM77gHpuH9371MAY

**Primary Images:**
- Hero: `/career_capital_hero_image.png`
- Headshot (Desktop): `/nisaini_rexach_headshot_2025 copy.jpg`
- Headshot (Mobile): `/nisaini_rexach_headshot_2025 copy copy.jpg`

**Color Values (for reference):**
```css
--cc-soft-white: #F8F9FA;
--cc-true-white: #FFFFFF;
--cc-ink: #1A1A1A;
--cc-slate: #3F4653;
--cc-border: #D1D5DB;
--cc-surface: #E6E9EE;
--cc-navy: #0F2A44;
--cc-steel: #2F5D8A;
```

---

## Final Notes

This website is built with exceptional attention to:
1. **Accessibility** - WCAG AAA compliant, fully keyboard navigable
2. **Brand consistency** - Every design decision reflects "relationships + AI fluency"
3. **User experience** - Clean, intuitive, respectful of user preferences
4. **Performance** - Optimized bundle, minimal dependencies
5. **Maintainability** - Clear structure, documented patterns

The site successfully communicates that Career Capital is about **investing in both technology and humanity** - a message that's reflected in every design choice, every line of copy, and every interaction pattern.
