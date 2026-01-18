# Career Capital CMS User Guide

Welcome to your Content Management System! This guide will help you manage all the content on your website without touching any code.

## Getting Started

1. **Login**: Visit the login page at `/login` and sign in with your admin email (nisaini@careercapital.cc)
2. **Access Admin Panel**: Once logged in, navigate to `/admin`
3. **Select Content Editor Tab**: Click on the "Content Editor" tab to access the CMS

## Understanding the CMS Structure

Your website is organized into **Pages**, and each page contains **Sections**. Each section can have:
- **Content Blocks**: Text content like headings, paragraphs, badges, icons, and images
- **Buttons**: Call-to-action buttons that link to other pages or external sites

## Managing Pages

### View All Pages
At the top of the CMS, you'll see tabs for each page (Home, About, Services, etc.). Click on a page tab to view and edit its content.

### Create a New Page
1. Click the "New Page" button
2. Enter a slug (URL path, e.g., "about" for `/about`)
3. Enter a page title
4. The page will be created as a draft (not published)

### Publish/Unpublish a Page
- Click the "Published" or "Draft" button next to the page name
- Published pages are visible to website visitors
- Draft pages are only visible to you in the admin panel

## Managing Sections

### Add a New Section
1. Select a page
2. Click "Add Section"
3. Choose from available templates:
   - **Hero Banner with Image**: Large header with background image, heading, and buttons
   - **3-Column Icon Grid**: Three items with icons, titles, and descriptions
   - **CTA Section**: Call-to-action with heading and buttons
   - **Text Content Block**: Simple text section
   - **Image + Text Side-by-Side**: Two-column layout with image and text

### Reorder Sections
Use the up/down arrow buttons next to each section to change their order on the page.

### Show/Hide Sections
Click the eye icon to toggle a section's visibility without deleting it.

### Delete a Section
Click the trash icon to permanently delete a section and all its content.

## Editing Content

### Edit Mode
1. Click "Edit Content" on any section to enter edit mode
2. Make your changes
3. Changes are saved automatically as you type

### Content Block Types

#### Heading
Large title text at the top of a section. You can use `<em>` tags for italics:
```
Don't just adapt to AI. <em>Lead with it</em>.
```

#### Subheading
Secondary heading text, typically below the main heading.

#### Paragraph
Body text content. You can have multiple paragraphs in one section.

#### Badge
Small pill-shaped tags displayed in a row (e.g., "AI Fluency", "Leadership Coaching").

#### Icon Item (for 3-Column Grid)
Each item requires:
- **Icon name**: Enter a Lucide React icon name (e.g., MessageCircle, Users, Sparkles)
  - [View all available icons](https://lucide.dev/icons/)
- **Title**: The heading for this item
- **Description**: The body text for this item

#### Image
- **Image URL**: Path to the image file (e.g., `/my-image.jpg`)
- **Alt text**: Description for accessibility

#### Background Image (for Hero Banner)
- **Fallback image URL**: Default image
- **Desktop image URL**: Large screens (optional)
- **Tablet image URL**: Medium screens (optional)

### Adding and Removing Content Blocks
- Click the "+ Heading", "+ Paragraph", "+ Icon Item", etc. buttons to add new content blocks
- Click the trash icon next to any content block to delete it
- Use the grip icon to drag and reorder blocks (coming soon)

## Managing Buttons

### Add a Button
1. In edit mode, click "+ Add Button"
2. Configure the button:
   - **Button text**: What the button says (e.g., "Get Started", "Learn More")
   - **Link type**:
     - Internal Page: Links to another page on your site (e.g., `/about`)
     - External Link: Links to another website (e.g., `https://example.com`)
     - Document: Links to a downloadable file
   - **Destination**: The URL or path where the button goes
   - **Style variant**:
     - Primary: Solid color button
     - Primary on Dark: For use on dark backgrounds
     - Secondary: Outlined button
     - Secondary on Dark: Outlined for dark backgrounds
   - **Show external link icon**: Check this to add an external link icon to the button

### Delete a Button
Click the trash icon next to the button configuration.

## Section Styling

Each section has default styling that maintains your brand consistency:
- **Background colors**: Navy, white, or surface gray
- **Text colors**: Automatically set for readability
- **Padding**: Consistent spacing above and below

These are set automatically based on the template you choose and ensure your site maintains a professional, cohesive look.

## Best Practices

### Content Writing
1. **Keep headings concise**: 5-10 words is ideal
2. **Write clear paragraphs**: 2-3 sentences per paragraph
3. **Use active voice**: "We help you grow" vs "You are helped by us"
4. **Be specific**: Use concrete examples and clear language

### Images
1. **Use high-quality images**: Minimum 1200px wide for hero images
2. **Optimize file size**: Keep images under 500KB when possible
3. **Write descriptive alt text**: Helps with accessibility and SEO

### Buttons
1. **Use action words**: "Get Started", "Learn More", "Book Now"
2. **Limit buttons per section**: 1-2 buttons maximum
3. **Make destinations clear**: Users should know where they're going

### Section Organization
1. **Start with a hero**: First section should grab attention
2. **Follow a logical flow**: Guide visitors through your story
3. **End with a call-to-action**: Give visitors a clear next step
4. **Don't overwhelm**: 4-6 sections per page is usually enough

## Common Tasks

### Update the Hero Heading
1. Go to "Content Editor" tab
2. Select "Home" page
3. Find the "hero_banner" section
4. Click "Edit Content"
5. Update the "heading" content block
6. Changes save automatically

### Add a New Service
1. Select the page with your services section
2. Find the "icon_grid_3" section
3. Click "Edit Content"
4. Click "+ Icon Item"
5. Fill in the icon name, title, and description
6. Changes save automatically

### Change Button Destinations
1. Find the section with the button
2. Click "Edit Content"
3. Scroll to the Buttons section
4. Update the "Destination" field
5. Changes save automatically

### Create a New Page
1. Click "New Page"
2. Enter slug and title
3. Click "Add Section" to add content
4. Build your page using templates
5. Click "Published" when ready to make it live

## Need Help?

If you encounter any issues or have questions:
- All changes are saved automatically
- You can always unpublish a page if you need to work on it
- Deleted content cannot be recovered, so delete carefully
- Contact your developer if you need custom section types or functionality

## Tips for Success

1. **Preview before publishing**: Make a page live when you're satisfied with it
2. **Update regularly**: Fresh content keeps visitors engaged
3. **Stay consistent**: Use similar section layouts across pages
4. **Test your links**: Make sure all buttons go to the right place
5. **Think mobile-first**: Most visitors will view on phones

---

Your website is now fully under your control. You can update text, add new sections, create pages, and manage all content without needing to write any code. The system maintains your brand's professional design while giving you complete flexibility over the message.
