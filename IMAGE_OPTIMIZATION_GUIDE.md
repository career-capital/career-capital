# Image Optimization Guide

Your hero image (`siteherojan2026_opac80.png`) is currently **6.5MB**, which significantly impacts page load times. Follow this guide to optimize it using Squoosh.

## Current Image Issues

- **File**: `siteherojan2026_opac80.png`
- **Size**: 6.5MB (way too large)
- **Used on**: Home page hero, Contact page hero
- **Target**: Under 200KB for optimal performance

## Using Squoosh (squoosh.app)

### Step 1: Open Squoosh
1. Go to https://squoosh.app
2. Drag and drop `siteherojan2026_opac80.png` into the browser

### Step 2: Choose WebP Format
1. On the right panel, select **WebP** as the output format
2. Adjust quality slider to **75-85%** (sweet spot for quality vs size)
3. Check the file size preview - aim for under 200KB

### Step 3: Create Multiple Sizes
Create 3 versions for responsive loading:

#### Desktop Version (1920px wide)
- Resize to: 1920px width (maintain aspect ratio)
- Format: WebP, Quality: 80%
- Save as: `siteherojan2026_opac80-desktop.webp`

#### Tablet Version (1024px wide)
- Resize to: 1024px width
- Format: WebP, Quality: 80%
- Save as: `siteherojan2026_opac80-tablet.webp`

#### Mobile Version (640px wide)
- Resize to: 640px width
- Format: WebP, Quality: 75%
- Save as: `siteherojan2026_opac80-mobile.webp`

#### Fallback PNG (for older browsers)
- Resize to: 1920px width
- Format: PNG or JPEG, Quality: 75%
- Save as: `siteherojan2026_opac80-fallback.jpg`

### Step 4: Replace Files
1. Save all optimized versions to the `/public` folder
2. Keep the original file as backup (rename it with `_original` suffix)
3. The code will automatically use the optimized versions

## Expected Results

| Version | Original Size | Optimized Size | Savings |
|---------|---------------|----------------|---------|
| Desktop | 6.5MB | ~150-200KB | 97% |
| Tablet | 6.5MB | ~80-100KB | 98.5% |
| Mobile | 6.5MB | ~40-60KB | 99% |

## Other Images to Optimize

While you're at it, optimize these images too:

1. **career_capital_hero_image.png** - Currently a placeholder
2. **Headshot images** - All 3 copies (keep only one, optimize to ~50KB)
3. **214151248_1f08d030-d9e7-4794-a816-4049de17b4bf.jpg** - Unused, can be deleted

## Quick Optimization Checklist

- [ ] Open siteherojan2026_opac80.png in Squoosh
- [ ] Create 3 WebP versions (desktop, tablet, mobile)
- [ ] Create 1 fallback JPEG version
- [ ] Save all to `/public` folder
- [ ] Delete unused image files
- [ ] Test the site to verify images load correctly
- [ ] Check page load speed (should be much faster!)

## Testing Performance

After optimization, test your site:
1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Reload the page
4. Check the size column for your images
5. Page should load in under 2 seconds on 3G

## Pro Tips

- **Always use WebP** for web images (95% browser support)
- **Keep originals** as backup before optimizing
- **Test on mobile** to ensure quality is acceptable
- **Lazy load** below-the-fold images (already implemented in code)
- **Use CSS background colors** that match your image for smooth loading
