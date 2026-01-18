/*
  # Insert Section Templates
  
  Inserts predefined section templates that match the existing Career Capital site structure.
  These templates can be used to quickly create new sections with the proper configuration.

  ## Templates Included
  1. Hero/Banner - Full-width hero with image, heading, subheading, badges, and buttons
  2. Icon Grid (3 columns) - Three icon cards with title and description
  3. CTA Section - Call-to-action with heading, text, and buttons
  4. Text Block - Simple content section with heading and paragraphs
  5. Image + Text - Side-by-side image and text content
  6. Badge List - Series of badge/pill elements
*/

-- Insert section templates
INSERT INTO section_templates (name, section_type, description, default_config) VALUES
(
  'Hero Banner with Image',
  'hero_banner',
  'Full-width hero section with background image, heading, subheading, optional badges, and CTA buttons',
  '{
    "background_color": "bg-navy",
    "text_color": "text-trueWhite",
    "padding": "pt-36 pb-36",
    "has_background_image": true,
    "content_structure": {
      "heading": true,
      "subheading": true,
      "paragraph": true,
      "badges": true,
      "buttons": true
    }
  }'::jsonb
),
(
  '3-Column Icon Grid',
  'icon_grid_3',
  'Three-column layout with icon, title, and description for each item',
  '{
    "background_color": "bg-softWhite",
    "text_color": "text-ink",
    "padding": "py-24",
    "grid_columns": 3,
    "icon_size": "w-12 h-12",
    "icon_stroke": 2,
    "content_structure": {
      "section_heading": true,
      "section_subheading": false,
      "items": [
        {"icon": "", "title": "", "description": ""}
      ]
    }
  }'::jsonb
),
(
  'CTA Section',
  'cta',
  'Call-to-action section with heading, description, and action buttons',
  '{
    "background_color": "bg-navy",
    "text_color": "text-trueWhite",
    "padding": "py-20",
    "content_structure": {
      "heading": true,
      "paragraph": true,
      "buttons": true
    }
  }'::jsonb
),
(
  'Text Content Block',
  'text_block',
  'Simple text section with heading and one or more paragraphs',
  '{
    "background_color": "bg-surface",
    "text_color": "text-ink",
    "padding": "py-24",
    "max_width": "max-w-4xl",
    "content_structure": {
      "heading": true,
      "subheading": false,
      "paragraphs": true
    }
  }'::jsonb
),
(
  'Image + Text Side-by-Side',
  'image_text',
  'Two-column layout with image on one side and text content on the other',
  '{
    "background_color": "bg-softWhite",
    "text_color": "text-ink",
    "padding": "py-24",
    "image_position": "left",
    "content_structure": {
      "image": true,
      "heading": true,
      "paragraphs": true,
      "buttons": false
    }
  }'::jsonb
),
(
  'Badge List',
  'badge_list',
  'Series of badge/pill elements typically used for highlighting key topics or features',
  '{
    "background_color": "transparent",
    "text_color": "text-trueWhite",
    "padding": "",
    "badge_style": "bg-trueWhite/20 backdrop-blur-md border-2 border-trueWhite",
    "content_structure": {
      "badges": true
    }
  }'::jsonb
)
ON CONFLICT DO NOTHING;