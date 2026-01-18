# Career Capital CMS - Technical Documentation

## Architecture Overview

The Career Capital website now uses a fully database-driven CMS that allows non-technical users to manage all site content. This system was built on top of Supabase and React.

## Database Schema

### Core Tables

#### `pages`
Represents each page on the website (Home, About, Services, etc.)
- Tracks publication status
- Maintains display order for navigation
- Includes SEO metadata

#### `sections`
Individual sections within a page (hero, icon grids, CTAs, etc.)
- Links to parent page via `page_id`
- Supports multiple section types
- Configurable styling (background, text color, padding)
- Display order determines position on page

#### `content_blocks`
Text and media content within sections
- Types: heading, subheading, paragraph, badge, icon_item, image, background_image
- Flexible `metadata` JSONB field for type-specific properties
- Display order for positioning

#### `buttons`
Call-to-action buttons within sections
- Supports internal links, external links, and documents
- Configurable styles (primary, secondary, on-dark variants)
- External link indicator flag

#### `section_templates`
Predefined templates for quick section creation
- Stores default configuration as JSONB
- Describes section type and use case

### Security

All tables use Row Level Security (RLS):
- Published content is publicly readable
- Only the admin email (nisaini@careercapital.cc) can modify content
- Cascading deletes ensure data integrity

## Frontend Components

### CMS Components (`src/components/cms/`)

#### `SectionRenderer.tsx`
Central router that renders the appropriate section component based on `section_type`.

#### Section Components
- `HeroBanner.tsx`: Hero sections with background images, badges, and CTAs
- `IconGrid3.tsx`: Three-column layouts with icons
- `CTASection.tsx`: Call-to-action sections with centered content
- `TextBlock.tsx`: Simple text content sections
- `ImageText.tsx`: Two-column image + text layouts

Each component:
- Receives a `SectionWithContent` object
- Handles conditional rendering based on content
- Supports button navigation (internal, external, document)
- Uses consistent styling from Tailwind classes

#### `ContentEditor.tsx`
Inline editor for section content:
- Add/edit/delete content blocks
- Configure buttons
- Auto-save on change
- Type-specific input fields

#### `CMSInterface.tsx`
Main admin interface:
- Page selector
- Section management (add, delete, reorder, publish/unpublish)
- Template-based section creation
- Integrates ContentEditor for each section

### Admin Page

The `/admin` route includes three tabs:
1. **Content Editor**: Full CMS interface
2. **Testimonials**: Existing testimonial management
3. **Contact Submissions**: Form submission review

## Data Flow

### Fetching Page Content
```typescript
1. Fetch page by slug
2. Fetch sections for page_id (ordered by display_order)
3. For each section:
   - Fetch content_blocks
   - Fetch buttons
4. Pass to SectionRenderer
```

### Updating Content
```typescript
1. User edits content in ContentEditor
2. onChange triggers immediate update to Supabase
3. Component refetches section data
4. SectionRenderer re-renders with new content
```

## Migration System

Migrations are located in `supabase/migrations/`:
- `create_cms_system.sql`: Core schema
- `insert_section_templates.sql`: Default templates
- `seed_home_page_content.sql`: Home page seed data

## Adding New Section Types

To add a new section type:

1. **Create Section Component** (`src/components/cms/NewSectionType.tsx`)
   ```typescript
   import { SectionWithContent } from '../../lib/supabase';

   interface NewSectionTypeProps {
     section: SectionWithContent;
   }

   export default function NewSectionType({ section }: NewSectionTypeProps) {
     // Render section using section.content_blocks and section.buttons
   }
   ```

2. **Add to SectionRenderer** (`src/components/cms/SectionRenderer.tsx`)
   ```typescript
   case 'new_section_type':
     return <NewSectionType section={section} />;
   ```

3. **Add Template** (via database insert or Supabase SQL editor)
   ```sql
   INSERT INTO section_templates (name, section_type, description, default_config)
   VALUES (
     'New Section Type',
     'new_section_type',
     'Description of what this section does',
     '{"background_color": "bg-softWhite", "text_color": "text-ink"}'::jsonb
   );
   ```

4. **Update CMSInterface Template Handler** (if custom initialization needed)
   ```typescript
   case 'new_section_type':
     await supabase.from('content_blocks').insert([
       // Default content blocks for this type
     ]);
     break;
   ```

## Icon System

Icons use Lucide React. The `IconGrid3` component dynamically imports icons by name:

```typescript
const getIcon = (iconName: string) => {
  const Icon = (LucideIcons as any)[iconName];
  return Icon || LucideIcons.Circle;
};
```

Users enter icon names like "MessageCircle", "Users", "Sparkles", etc.

## Styling Conventions

### Background Colors
- `bg-navy`: Dark navy blue (primary brand)
- `bg-softWhite`: Off-white (default page background)
- `bg-surface`: Light gray (section alternation)
- `bg-trueWhite`: Pure white (cards, modals)

### Text Colors
- `text-ink`: Near black (primary text)
- `text-slate`: Dark gray (secondary text)
- `text-trueWhite`: White (on dark backgrounds)
- `text-navy`: Navy (headings, links)

### Button Variants
- `btn-primary`: Default solid button
- `btn-primary-on-dark`: Primary for dark backgrounds
- `btn-secondary`: Outlined button
- `btn-secondary-on-dark`: Outlined for dark backgrounds

All defined in `src/index.css`.

## Performance Considerations

1. **Eager Loading**: Hero images use `loading="eager"`
2. **Lazy Loading**: Below-fold images use `loading="lazy"`
3. **Cascading Deletes**: Database handles cleanup automatically
4. **Optimistic UI**: No loading states on auto-save for smooth UX

## Future Enhancements

Potential improvements:
1. **Drag-and-drop reordering**: Currently uses up/down buttons
2. **Image upload**: Currently uses URLs only
3. **Rich text editor**: Currently plain text only
4. **Preview mode**: See changes before publishing
5. **Version history**: Undo/redo capability
6. **Global site settings**: Footer content, navigation, etc.
7. **SEO fields per section**: Custom meta tags
8. **A/B testing**: Multiple variants per section

## Development Workflow

### Local Development
```bash
npm run dev
```

### Testing Changes
1. Login as admin
2. Navigate to Content Editor
3. Create/edit content
4. Verify changes on public pages

### Deployment
```bash
npm run build
```

All database changes persist across deployments. No need to re-seed.

## Troubleshooting

### Content Not Appearing
- Check section `is_published` status
- Check page `is_published` status
- Verify content_blocks are linked to correct section_id
- Check browser console for errors

### Permission Errors
- Verify user is authenticated
- Check RLS policies in Supabase
- Ensure user email matches admin email in policies

### Styling Issues
- Verify CSS classes are defined in `tailwind.config.js`
- Check that color names match Tailwind theme
- Ensure responsive breakpoints are correct

## Contact

For questions or issues with the CMS system, refer to:
- This documentation
- `CMS_USER_GUIDE.md` for end-user instructions
- Supabase dashboard for database queries
- Browser DevTools console for frontend errors

---

The CMS is designed to be maintainable, extensible, and user-friendly. The architecture separates concerns cleanly: database for content, React components for rendering, and admin interface for editing.
