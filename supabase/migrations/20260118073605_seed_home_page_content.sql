/*
  # Seed Home Page Content
  
  This migration populates the CMS with the existing Home page content,
  converting it from hard-coded React to database-driven content.

  ## Content Structure
  
  1. Create "Home" page
  2. Add Hero Banner section with heading, subheading, paragraph, badges, and buttons
  3. Add "What We Do" 3-icon grid section
  4. Add "Why Career Capital" 3-icon grid section
  5. Add Speaking CTA section

  This allows the founder to immediately start editing the site through the CMS.
*/

-- Create Home page
DO $$
DECLARE
  v_home_page_id uuid;
  v_hero_section_id uuid;
  v_what_we_do_section_id uuid;
  v_why_cc_section_id uuid;
  v_speaking_section_id uuid;
BEGIN
  -- Insert Home page
  INSERT INTO pages (slug, title, meta_description, is_published, display_order)
  VALUES ('home', 'Home', 'Don''t just adapt to AI. Lead with it. Career Capital helps people, leaders, and organizations develop the human and strategic capacity needed to adapt, grow, and thrive in the AI era.', true, 0)
  RETURNING id INTO v_home_page_id;

  -- Hero Banner Section
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_home_page_id, 'hero_banner', 0, true, 'bg-navy', 'text-trueWhite', 'pt-36 pb-36')
  RETURNING id INTO v_hero_section_id;

  -- Hero content blocks
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_hero_section_id, 'background_image', '/sitehero-fallback.jpg', 0, '{"desktop": "/sitehero-desktop.webp", "tablet": "/sitehero-tablet.webp", "fallback": "/sitehero-fallback.jpg"}'::jsonb),
  (v_hero_section_id, 'heading', 'Don''t just adapt to AI. <em>Lead with it</em>.', 1, '{}'::jsonb),
  (v_hero_section_id, 'subheading', 'Your greatest advantage isn''t in the technology—it''s in the mindset and relationships you build around it.', 2, '{}'::jsonb),
  (v_hero_section_id, 'paragraph', 'In a world reshaped by AI, your greatest advantage is the mindset and relationships you cultivate. We help people, leaders, and organizations develop the human and strategic capacity needed to adapt, grow, and thrive.', 3, '{}'::jsonb),
  (v_hero_section_id, 'badge', 'AI Fluency', 4, '{}'::jsonb),
  (v_hero_section_id, 'badge', 'Leadership Coaching', 5, '{}'::jsonb),
  (v_hero_section_id, 'badge', 'Relationship Management', 6, '{}'::jsonb),
  (v_hero_section_id, 'badge', 'Strategic Guidance', 7, '{}'::jsonb),
  (v_hero_section_id, 'badge', 'Keynote Speaking', 8, '{}'::jsonb);

  -- Hero buttons
  INSERT INTO buttons (section_id, button_text, button_type, link_type, link_destination, is_external, display_order, style_variant) VALUES
  (v_hero_section_id, 'Work With Us', 'primary', 'internal', '/contact', false, 0, 'btn-primary-on-dark'),
  (v_hero_section_id, 'Explore Services', 'secondary', 'internal', '/services', false, 1, 'btn-secondary-on-dark');

  -- What We Do Section
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_home_page_id, 'icon_grid_3', 1, true, 'bg-softWhite', 'text-ink', 'py-24')
  RETURNING id INTO v_what_we_do_section_id;

  -- What We Do content
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_what_we_do_section_id, 'section_heading', 'What We Do', 0, '{}'::jsonb),
  (v_what_we_do_section_id, 'icon_item', 'One-on-one and small group coaching to develop strategic thinking, build confidence, and navigate career transitions in the AI era.', 1, '{"icon": "MessageCircle", "title": "Coaching"}'::jsonb),
  (v_what_we_do_section_id, 'icon_item', 'Interactive sessions that equip teams with practical tools for AI fluency, relationship building, and adaptive mindsets.', 2, '{"icon": "Presentation", "title": "Workshops"}'::jsonb),
  (v_what_we_do_section_id, 'icon_item', 'Organizational consulting to integrate AI strategy, strengthen culture, and build leadership capacity for the future of work.', 3, '{"icon": "Compass", "title": "Strategic Guidance"}'::jsonb);

  -- Why Career Capital Section
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_home_page_id, 'icon_grid_3', 2, true, 'bg-surface', 'text-ink', 'py-24')
  RETURNING id INTO v_why_cc_section_id;

  -- Why Career Capital content
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_why_cc_section_id, 'section_heading', 'Why Career Capital', 0, '{}'::jsonb),
  (v_why_cc_section_id, 'section_subheading', 'We believe the future of work is human. AI is a tool, but your relationships, mindset, and strategic thinking are what will drive lasting success.', 1, '{}'::jsonb),
  (v_why_cc_section_id, 'icon_item', 'Build confidence and capability around AI through strategic guidance and practical enablement.', 2, '{"icon": "Sparkles", "title": "AI Fluency"}'::jsonb),
  (v_why_cc_section_id, 'icon_item', 'Strengthen the human connections that drive business success, even as technology evolves.', 3, '{"icon": "Users", "title": "Relationship Management"}'::jsonb),
  (v_why_cc_section_id, 'icon_item', 'Transform how leaders think about AI—from threat to tool, from confusion to clarity.', 4, '{"icon": "TrendingUp", "title": "Mindset Shifts"}'::jsonb);

  -- Why CC button
  INSERT INTO buttons (section_id, button_text, button_type, link_type, link_destination, is_external, display_order, style_variant)
  VALUES (v_why_cc_section_id, 'Learn More About Us', 'primary', 'internal', '/about', false, 0, 'btn-primary');

  -- Speaking CTA Section
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_home_page_id, 'cta', 3, true, 'bg-navy', 'text-trueWhite', 'py-20')
  RETURNING id INTO v_speaking_section_id;

  -- Speaking content
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_speaking_section_id, 'heading', 'Featured TEDx Talk: The Surprising Investment Strategy That Changed My Career', 0, '{}'::jsonb),
  (v_speaking_section_id, 'paragraph', 'Relationships are career capital. When you invest in building genuine connections—your "social wealth"—your network becomes the foundation that underwrites your next opportunity.', 1, '{}'::jsonb);

  -- Speaking buttons
  INSERT INTO buttons (section_id, button_text, button_type, link_type, link_destination, is_external, display_order, style_variant) VALUES
  (v_speaking_section_id, 'Book for Your Event', 'primary', 'internal', '/contact', false, 0, 'btn-primary-on-dark'),
  (v_speaking_section_id, 'Watch the Talk', 'secondary', 'external', 'https://youtu.be/vT3fUJ1-BvA?si=VM77gHpuH9371MAY', true, 1, 'btn-secondary-on-dark');

END $$;