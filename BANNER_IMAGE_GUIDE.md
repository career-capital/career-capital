# Banner Image Size Guide

This document provides specifications for creating properly-sized banner images for the Career Capital website.

## Page Hero/Banner Images

The site uses responsive hero images at the top of each page (Home, About, Services, Speaking, Contact, Testimonials). These are implemented using the `<picture>` element with multiple sources for different screen sizes.

### Required Image Sizes

Create **three versions** of each banner image:

1. **Desktop (`sitehero_desktop.webp`)**
   - Recommended size: **1920px × 600px**
   - Used for: Screens 1024px and wider
   - Format: WebP (preferred) or JPG
   - Aspect ratio: 16:5 (wide and cinematic)

2. **Tablet (`sitehero_tablet.webp`)**
   - Recommended size: **1200px × 500px**
   - Used for: Screens 640px to 1023px
   - Format: WebP (preferred) or JPG
   - Aspect ratio: 12:5

3. **Mobile (`sitehero_mobile.webp`)**
   - Recommended size: **800px × 600px**
   - Used for: Screens under 640px
   - Format: WebP (preferred) or JPG
   - Aspect ratio: 4:3 (taller for mobile viewing)

4. **Fallback (`sitehero_fallback.jpg`)**
   - Recommended size: **1920px × 600px**
   - Used for: Browsers that don't support WebP
   - Format: JPG only
   - Should match desktop dimensions

### Image Guidelines

- **File format**: WebP preferred for smaller file sizes, JPG for fallback
- **Compression**: Optimize for web (60-80% quality for JPG, 80-90% for WebP)
- **Color space**: sRGB
- **Subject placement**: Keep important subjects centered or slightly left/right of center to ensure visibility across all breakpoints
- **Text overlay**: Remember that white text with drop shadows will be overlaid on these images, so avoid very light areas in the center-left portion
- **File naming**: Use descriptive names if creating page-specific banners (e.g., `services_hero_desktop.webp`)

## Section Images (Services & Speaking Pages)

The Services and Speaking pages include images within content sections. These use the aspect ratio `aspect-[4/3]` and are constrained to `lg:w-[500px]`.

### Recommended Specifications

- **Dimensions**: **1500px × 1125px** (4:3 aspect ratio)
- **Format**: WebP or JPG
- **Display size**: Rendered at maximum 500px width on desktop
- **Compression**: Can be more aggressive since displayed size is smaller
- **Examples on site**:
  - `/workshop-facilitation.webp` (Services page)
  - `/public-speaking.jpg` (Speaking page)

### Image Guidelines

- Images should be high quality since they showcase Nisaini's work
- Ensure faces and important details are clearly visible
- Images should convey professionalism and engagement
- Consider the 4:3 crop when selecting/editing images

## Other Image Types

### Profile/Headshot Images
- **Recommended**: 800px × 800px (square) or larger
- Used in the About page

### Testimonial/Content Images
- Vary by use case
- Generally smaller than hero images
- Follow the same optimization guidelines

## File Size Targets

- **Desktop hero**: Under 200KB (WebP), under 300KB (JPG)
- **Tablet hero**: Under 150KB (WebP), under 250KB (JPG)
- **Mobile hero**: Under 100KB (WebP), under 200KB (JPG)
- **Section images**: Under 150KB

## Tools for Image Optimization

- **Squoosh.app** - Free web-based image optimizer
- **ImageOptim** (Mac) - Drag-and-drop optimizer
- **TinyPNG/TinyJPG** - Online compression
- **Adobe Photoshop** - Export for Web feature
- **GIMP** - Free alternative with export options

## Testing Recommendations

After adding new images:
1. Test on actual devices (phone, tablet, desktop)
2. Check load times in browser DevTools
3. Verify images display correctly at all breakpoints
4. Ensure text remains readable over images
5. Test on slow 3G connection to verify performance
