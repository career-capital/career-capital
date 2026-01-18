/*
  # Career Capital CMS System
  
  This migration creates a comprehensive CMS system that allows the founder to edit all site content
  without touching code. The system supports multiple section types, dynamic content blocks, and
  flexible button configurations.

  ## New Tables
  
  ### `pages`
  - `id` (uuid, primary key)
  - `slug` (text, unique) - URL path (e.g., 'home', 'about', 'services')
  - `title` (text) - Page title for SEO and admin display
  - `meta_description` (text) - SEO meta description
  - `is_published` (boolean) - Whether page is live
  - `display_order` (integer) - For navigation ordering
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `sections`
  - `id` (uuid, primary key)
  - `page_id` (uuid, foreign key to pages)
  - `section_type` (text) - Type of section (hero, icon_grid, cta, accordion, etc.)
  - `display_order` (integer) - Order on the page
  - `is_published` (boolean) - Whether section is visible
  - `background_color` (text) - CSS class for background (e.g., 'bg-navy', 'bg-softWhite')
  - `text_color` (text) - CSS class for text color (e.g., 'text-trueWhite', 'text-ink')
  - `padding` (text) - CSS class for padding (e.g., 'py-24', 'py-20')
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `content_blocks`
  - `id` (uuid, primary key)
  - `section_id` (uuid, foreign key to sections)
  - `block_type` (text) - Type: heading, subheading, paragraph, badge, icon_item, image
  - `content` (text) - The actual content
  - `display_order` (integer) - Order within section
  - `metadata` (jsonb) - Flexible storage for additional properties (icon name, image URL, etc.)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `buttons`
  - `id` (uuid, primary key)
  - `section_id` (uuid, foreign key to sections)
  - `button_text` (text) - Display text
  - `button_type` (text) - 'primary' or 'secondary'
  - `link_type` (text) - 'internal', 'external', or 'document'
  - `link_destination` (text) - URL or path
  - `is_external` (boolean) - Shows external link icon
  - `display_order` (integer) - Order among buttons in section
  - `style_variant` (text) - 'btn-primary', 'btn-primary-on-dark', etc.
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `section_templates`
  - `id` (uuid, primary key)
  - `name` (text) - Human-readable name
  - `section_type` (text) - Matches section_type in sections table
  - `description` (text) - Explains what this template is for
  - `default_config` (jsonb) - Default configuration for new sections
  - `preview_image` (text) - URL to preview image
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Authenticated users can read published content
  - Only specific admin emails can modify content
  - Anonymous users can read published content for public pages

  ## Indexes
  - Index on page slug for fast lookups
  - Index on section page_id and display_order
  - Index on content_blocks section_id and display_order
  - Index on buttons section_id and display_order
*/

-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  meta_description text DEFAULT '',
  is_published boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create sections table
CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid REFERENCES pages(id) ON DELETE CASCADE NOT NULL,
  section_type text NOT NULL,
  display_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  background_color text DEFAULT 'bg-softWhite',
  text_color text DEFAULT 'text-ink',
  padding text DEFAULT 'py-24',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create content_blocks table
CREATE TABLE IF NOT EXISTS content_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid REFERENCES sections(id) ON DELETE CASCADE NOT NULL,
  block_type text NOT NULL,
  content text NOT NULL,
  display_order integer DEFAULT 0,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create buttons table
CREATE TABLE IF NOT EXISTS buttons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid REFERENCES sections(id) ON DELETE CASCADE NOT NULL,
  button_text text NOT NULL,
  button_type text DEFAULT 'primary',
  link_type text DEFAULT 'internal',
  link_destination text NOT NULL,
  is_external boolean DEFAULT false,
  display_order integer DEFAULT 0,
  style_variant text DEFAULT 'btn-primary',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create section_templates table
CREATE TABLE IF NOT EXISTS section_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  section_type text NOT NULL,
  description text NOT NULL,
  default_config jsonb DEFAULT '{}'::jsonb,
  preview_image text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_sections_page_order ON sections(page_id, display_order);
CREATE INDEX IF NOT EXISTS idx_content_blocks_section_order ON content_blocks(section_id, display_order);
CREATE INDEX IF NOT EXISTS idx_buttons_section_order ON buttons(section_id, display_order);

-- Enable RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE buttons ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for pages
CREATE POLICY "Anyone can view published pages"
  ON pages FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can view all pages"
  ON pages FOR SELECT
  TO authenticated
  USING (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  );

CREATE POLICY "Admins can insert pages"
  ON pages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  );

CREATE POLICY "Admins can update pages"
  ON pages FOR UPDATE
  TO authenticated
  USING (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  )
  WITH CHECK (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  );

CREATE POLICY "Admins can delete pages"
  ON pages FOR DELETE
  TO authenticated
  USING (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  );

-- RLS Policies for sections
CREATE POLICY "Anyone can view published sections"
  ON sections FOR SELECT
  USING (
    is_published = true 
    AND EXISTS (
      SELECT 1 FROM pages 
      WHERE pages.id = sections.page_id 
      AND pages.is_published = true
    )
  );

CREATE POLICY "Admins can view all sections"
  ON sections FOR SELECT
  TO authenticated
  USING (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  );

CREATE POLICY "Admins can insert sections"
  ON sections FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  );

CREATE POLICY "Admins can update sections"
  ON sections FOR UPDATE
  TO authenticated
  USING (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  )
  WITH CHECK (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  );

CREATE POLICY "Admins can delete sections"
  ON sections FOR DELETE
  TO authenticated
  USING (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  );

-- RLS Policies for content_blocks
CREATE POLICY "Anyone can view content blocks for published sections"
  ON content_blocks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM sections
      JOIN pages ON sections.page_id = pages.id
      WHERE sections.id = content_blocks.section_id
      AND sections.is_published = true
      AND pages.is_published = true
    )
  );

CREATE POLICY "Admins can view all content blocks"
  ON content_blocks FOR SELECT
  TO authenticated
  USING (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  );

CREATE POLICY "Admins can insert content blocks"
  ON content_blocks FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  );

CREATE POLICY "Admins can update content blocks"
  ON content_blocks FOR UPDATE
  TO authenticated
  USING (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  )
  WITH CHECK (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  );

CREATE POLICY "Admins can delete content blocks"
  ON content_blocks FOR DELETE
  TO authenticated
  USING (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  );

-- RLS Policies for buttons
CREATE POLICY "Anyone can view buttons for published sections"
  ON buttons FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM sections
      JOIN pages ON sections.page_id = pages.id
      WHERE sections.id = buttons.section_id
      AND sections.is_published = true
      AND pages.is_published = true
    )
  );

CREATE POLICY "Admins can view all buttons"
  ON buttons FOR SELECT
  TO authenticated
  USING (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  );

CREATE POLICY "Admins can insert buttons"
  ON buttons FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  );

CREATE POLICY "Admins can update buttons"
  ON buttons FOR UPDATE
  TO authenticated
  USING (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  )
  WITH CHECK (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  );

CREATE POLICY "Admins can delete buttons"
  ON buttons FOR DELETE
  TO authenticated
  USING (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  );

-- RLS Policies for section_templates
CREATE POLICY "Admins can view section templates"
  ON section_templates FOR SELECT
  TO authenticated
  USING (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  );

CREATE POLICY "Admins can insert section templates"
  ON section_templates FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  );

CREATE POLICY "Admins can update section templates"
  ON section_templates FOR UPDATE
  TO authenticated
  USING (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  )
  WITH CHECK (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  );

CREATE POLICY "Admins can delete section templates"
  ON section_templates FOR DELETE
  TO authenticated
  USING (
    auth.jwt()->>'email' IN (
      'nisaini@careercapital.cc'
    )
  );