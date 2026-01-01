# Testimonials CMS Guide

## Overview

Your website now includes a content management system (CMS) for testimonials, making it easy to add, edit, reorder, and manage testimonials without touching any code.

## Accessing the Admin Panel

To access the testimonials admin interface, navigate to:

```
https://your-website.com/#admin
```

Or, if running locally:

```
http://localhost:5173/#admin
```

Simply add `#admin` to the end of your website URL in the browser.

## Managing Testimonials

### Adding a New Testimonial

1. Click the "Add New" button in the top right
2. Fill in the testimonial details:
   - **Quote**: The testimonial text
   - **Author**: The person's name or title
   - **Company**: Their organization
   - **Display on website**: Check this box to make it visible immediately
3. Click "Add Testimonial"

### Editing a Testimonial

1. Find the testimonial you want to edit
2. Click the pencil/edit icon
3. Make your changes
4. Click "Update Testimonial"

### Reordering Testimonials

Use the up/down arrow buttons to change the order in which testimonials appear on your homepage carousel.

### Hiding/Showing Testimonials

Click the "Hide" or "Show" button to toggle whether a testimonial appears on the website. Hidden testimonials are saved in the database but won't display to visitors.

### Deleting a Testimonial

Click the trash icon to permanently delete a testimonial. You'll be asked to confirm before deletion.

## How It Works

- All testimonials are stored in a Supabase database
- The homepage automatically fetches and displays active testimonials
- Changes take effect immediately - no need to rebuild or redeploy
- Testimonials are ordered by the display order you set in the admin panel

## Database Details

If you need direct database access, testimonials are stored in the `testimonials` table with these fields:

- `id`: Unique identifier
- `quote`: Testimonial text
- `author`: Person's name/title
- `company`: Organization name
- `display_order`: Order for display
- `is_active`: Whether it shows on the website
- `created_at`: When it was added
- `updated_at`: When it was last modified

## Security Note

Currently, the admin panel is accessible to anyone who knows the URL. For production use, consider:

1. Adding authentication (username/password)
2. Using a custom admin subdomain
3. Implementing IP restrictions
4. Adding Supabase authentication

The database is already secured with Row Level Security (RLS) policies that allow public read access for active testimonials, but require authentication for modifications.
