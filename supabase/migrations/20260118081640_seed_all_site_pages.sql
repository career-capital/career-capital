/*
  # Seed All Site Pages
  
  This migration adds About, Services, Speaking, Testimonials, and Contact pages to the CMS.
  
  ## Pages Added
  - About Page - with problem statement, founder bio, values, and CTA
  - Services Page - with services overview and CTA
  - Speaking Page - with formats, topics, and booking CTA
  - Testimonials Page - with header and CTA (testimonials pulled dynamically from DB)
  - Contact Page - with contact info (form rendered separately)
  
  ## Structure
  Each page follows the pattern:
  1. Hero banner section
  2. Content sections (text, icon grids)
  3. CTA section
*/

DO $$
DECLARE
  v_about_page_id uuid;
  v_services_page_id uuid;
  v_speaking_page_id uuid;
  v_testimonials_page_id uuid;
  v_contact_page_id uuid;
  v_section_id uuid;
BEGIN
  
  -- ============================================================
  -- ABOUT PAGE
  -- ============================================================
  
  INSERT INTO pages (slug, title, meta_description, is_published, display_order)
  VALUES ('about', 'About', 'Learn about Career Capital and founder Nisaini Rexach - bridging human relationships and AI-ready communication.', true, 1)
  ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_about_page_id;
  
  -- About Hero Banner
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_about_page_id, 'hero_banner', 0, true, 'bg-navy', 'text-trueWhite', 'pt-20 pb-24')
  RETURNING id INTO v_section_id;
  
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_section_id, 'background_image', '/banner_about_desktop.webp', 0, '{}'::jsonb),
  (v_section_id, 'heading', 'About', 1, '{}'::jsonb),
  (v_section_id, 'subheading', 'Bridging human relationships and AI‑ready communication.', 2, '{}'::jsonb);
  
  -- Problem We Solve Section
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_about_page_id, 'text_only', 1, true, 'bg-surface', 'text-ink', 'py-16')
  RETURNING id INTO v_section_id;
  
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_section_id, 'section_heading', 'The Problem We Solve', 0, '{}'::jsonb),
  (v_section_id, 'paragraph', 'AI is reshaping work faster than most people and organizations can adapt.', 1, '{}'::jsonb),
  (v_section_id, 'paragraph', 'Teams are unsure what AI means for their roles. Leaders struggle to communicate change with empathy. Individuals feel pressure to stay relevant without a roadmap. Organizations want to modernize without losing their culture.', 2, '{}'::jsonb),
  (v_section_id, 'paragraph', 'Career Capital helps build the mindsets, relationships, and AI fluency needed to navigate this shift—without losing the human side of work.', 3, '{}'::jsonb);
  
  -- Meet the Founder Section
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_about_page_id, 'text_only', 2, true, 'bg-softWhite', 'text-ink', 'py-16')
  RETURNING id INTO v_section_id;
  
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_section_id, 'section_heading', 'Meet the Founder', 0, '{}'::jsonb),
  (v_section_id, 'paragraph', 'Nisaini Rexach is a strategic communicator, mentor, and main stage TEDxChicago speaker whose work sits at the intersection of relationship‑driven growth and AI‑ready communication. Her philosophy is rooted in the belief that careers accelerate when clarity, connection, and credibility work together—and she helps individuals and organizations build all three with intention.', 1, '{}'::jsonb),
  (v_section_id, 'paragraph', 'Her signature framework, Social Wealth, draws from lived experiences spanning Chicago''s public housing to Fortune 500 boardrooms. It''s a reminder that every encounter is an interview, every relationship is an asset, and every moment is an opportunity to shape how others experience you.', 2, '{}'::jsonb),
  (v_section_id, 'paragraph', 'Through Career Capital, Nisaini brings curiosity, structural agility, and relationship management to every engagement. She helps clients communicate with precision, strengthen their professional presence, and build the relational capital needed to thrive in an AI‑accelerating world.', 3, '{}'::jsonb),
  (v_section_id, 'paragraph', 'Whether she''s coaching emerging leaders, advising executives, or speaking on national stages, Nisaini is committed to one thing: helping people show up with clarity, confidence, and purpose—so their work, their voice, and their impact carry further.', 4, '{}'::jsonb);
  
  -- Core Values Section
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_about_page_id, 'icon_grid_3', 3, true, 'bg-surface', 'text-ink', 'py-20')
  RETURNING id INTO v_section_id;
  
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_section_id, 'section_heading', 'Core Values', 0, '{}'::jsonb),
  (v_section_id, 'icon_item', 'Technology serves people, not the other way around. We prioritize empathy, trust, and relationships in everything we do.', 1, '{"icon": "Heart", "title": "Human-Centered"}'::jsonb),
  (v_section_id, 'icon_item', 'Cut through the noise with practical frameworks and honest guidance that translates complexity into action.', 2, '{"icon": "Target", "title": "Clarity Over Hype"}'::jsonb),
  (v_section_id, 'icon_item', 'Build the mindsets and capabilities needed to navigate change with confidence and purpose.', 3, '{"icon": "Compass", "title": "Future-Ready"}'::jsonb);
  
  -- About CTA Section
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_about_page_id, 'cta', 4, true, 'bg-softWhite', 'text-ink', 'py-20')
  RETURNING id INTO v_section_id;
  
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_section_id, 'heading', 'Ready to Build Your Career Capital?', 0, '{}'::jsonb),
  (v_section_id, 'paragraph', 'Explore our services or get in touch to discuss how we can support your goals.', 1, '{}'::jsonb);
  
  INSERT INTO buttons (section_id, button_text, button_type, link_type, link_destination, is_external, display_order, style_variant) VALUES
  (v_section_id, 'Explore Services', 'primary', 'internal', '/services', false, 0, 'btn-primary'),
  (v_section_id, 'Get in Touch', 'secondary', 'internal', '/contact', false, 1, 'btn-secondary');
  
  -- ============================================================
  -- SERVICES PAGE
  -- ============================================================
  
  INSERT INTO pages (slug, title, meta_description, is_published, display_order)
  VALUES ('services', 'Services', 'Explore our AI enablement workshops, coaching, and strategic consulting services designed to help you thrive in an AI-driven world.', true, 2)
  ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_services_page_id;
  
  -- Services Hero Banner
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_services_page_id, 'hero_banner', 0, true, 'bg-navy', 'text-trueWhite', 'pt-20 pb-24')
  RETURNING id INTO v_section_id;
  
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_section_id, 'background_image', '/banner_services_desktop.webp', 0, '{}'::jsonb),
  (v_section_id, 'heading', 'Services', 1, '{}'::jsonb),
  (v_section_id, 'subheading', 'From AI enablement to relationship-driven leadership—services designed to help individuals and organizations thrive in an evolving world.', 2, '{}'::jsonb);
  
  -- Services Intro
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_services_page_id, 'text_only', 1, true, 'bg-softWhite', 'text-ink', 'py-16')
  RETURNING id INTO v_section_id;
  
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_section_id, 'section_heading', 'Build the Skills and Mindsets That Matter', 0, '{}'::jsonb),
  (v_section_id, 'paragraph', 'Career Capital offers practical, human-centered services that help you navigate AI transformation, strengthen relationships, and lead with clarity and confidence.', 1, '{}'::jsonb);
  
  -- Core Services
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_services_page_id, 'icon_grid_3', 2, true, 'bg-surface', 'text-ink', 'py-20')
  RETURNING id INTO v_section_id;
  
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_section_id, 'section_heading', 'Our Core Services', 0, '{}'::jsonb),
  (v_section_id, 'icon_item', 'Build team confidence and competence with AI through practical training designed for real-world application.', 1, '{"icon": "Lightbulb", "title": "AI Enablement & Adoption Workshops"}'::jsonb),
  (v_section_id, 'icon_item', 'Transform how your organization talks about AI—reducing anxiety and building trust during transitions.', 2, '{"icon": "MessageCircle", "title": "AI-Ready Communication Lab"}'::jsonb),
  (v_section_id, 'icon_item', 'Turn relationships into your most valuable career asset with a proven framework for building authentic influence.', 3, '{"icon": "Users", "title": "Social Wealth Workshops & Coaching"}'::jsonb),
  (v_section_id, 'icon_item', 'Move from inspiration to implementation with talks that energize and sessions that translate ideas into action.', 4, '{"icon": "Mic", "title": "Future-of-Work Keynotes"}'::jsonb),
  (v_section_id, 'icon_item', 'Personalized support to break through obstacles, clarify your path forward, and lead with confidence during uncertainty.', 5, '{"icon": "Target", "title": "Coaching for Individuals & Leaders"}'::jsonb),
  (v_section_id, 'icon_item', 'Tailored programs and advisory services designed to meet your specific organizational challenges.', 6, '{"icon": "Building2", "title": "Custom Solutions"}'::jsonb);
  
  -- Services CTA
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_services_page_id, 'cta', 3, true, 'bg-softWhite', 'text-ink', 'py-20')
  RETURNING id INTO v_section_id;
  
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_section_id, 'heading', 'Let''s Build Something Together', 0, '{}'::jsonb),
  (v_section_id, 'paragraph', 'Ready to explore how these services can support your team or organization? Get in touch to start the conversation.', 1, '{}'::jsonb);
  
  INSERT INTO buttons (section_id, button_text, button_type, link_type, link_destination, is_external, display_order, style_variant)
  VALUES (v_section_id, 'Contact Us', 'primary', 'internal', '/contact', false, 0, 'btn-primary');
  
  -- ============================================================
  -- SPEAKING PAGE
  -- ============================================================
  
  INSERT INTO pages (slug, title, meta_description, is_published, display_order)
  VALUES ('speaking', 'Speaking & Workshops', 'Book Nisaini Rexach for keynote speeches and workshops on AI fluency, social wealth, and relationship management.', true, 3)
  ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_speaking_page_id;
  
  -- Speaking Hero
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_speaking_page_id, 'hero_banner', 0, true, 'bg-navy', 'text-trueWhite', 'pt-20 pb-24')
  RETURNING id INTO v_section_id;
  
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_section_id, 'background_image', '/banner_speaking_desktop.webp', 0, '{}'::jsonb),
  (v_section_id, 'heading', 'Speaking & Workshops', 1, '{}'::jsonb),
  (v_section_id, 'subheading', 'Practical guidance and powerful frameworks for teams ready to build AI fluency, strengthen relationships, and lead through transformation with clarity and confidence.', 2, '{}'::jsonb);
  
  -- Engagement Formats
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_speaking_page_id, 'icon_grid_3', 1, true, 'bg-surface', 'text-ink', 'py-16')
  RETURNING id INTO v_section_id;
  
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_section_id, 'section_heading', 'Engagement Formats', 0, '{}'::jsonb),
  (v_section_id, 'icon_item', '45-60 minute presentations for conferences, leadership summits, and corporate events.', 1, '{"icon": "Mic", "title": "Keynote Speeches"}'::jsonb),
  (v_section_id, 'icon_item', 'Half-day or full-day interactive sessions for leadership teams and departments building AI capability.', 2, '{"icon": "Users", "title": "Workshops"}'::jsonb),
  (v_section_id, 'icon_item', 'Focused sessions that translate insights into actionable next steps for your organization.', 3, '{"icon": "Lightbulb", "title": "Strategy Sessions"}'::jsonb);
  
  -- Popular Topics
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_speaking_page_id, 'text_only', 2, true, 'bg-softWhite', 'text-ink', 'py-16')
  RETURNING id INTO v_section_id;
  
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_section_id, 'section_heading', 'Popular Speaking Topics', 0, '{}'::jsonb),
  (v_section_id, 'subheading', 'Social Wealth: Building Career Capital', 1, '{}'::jsonb),
  (v_section_id, 'paragraph', 'Your network underwrites your next move. Learn how intentional relationship-building creates opportunities traditional networking never could.', 2, '{}'::jsonb),
  (v_section_id, 'subheading', 'AI Fluency as Leadership Imperative', 3, '{}'::jsonb),
  (v_section_id, 'paragraph', 'Leaders must understand AI—not as technologists, but as strategic thinkers who can guide their teams through transformation.', 4, '{}'::jsonb),
  (v_section_id, 'subheading', 'Relationship Management in AI Age', 5, '{}'::jsonb),
  (v_section_id, 'paragraph', 'Human connection becomes more valuable as AI handles routine tasks. Strengthen collaboration as technology transforms the workplace.', 6, '{}'::jsonb),
  (v_section_id, 'subheading', 'Building AI Readiness With Humanity', 7, '{}'::jsonb),
  (v_section_id, 'paragraph', 'Create technical capability while maintaining your values. Practical roadmaps that balance quick wins with long-term organizational health.', 8, '{}'::jsonb);
  
  -- Speaking CTA
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_speaking_page_id, 'cta', 3, true, 'bg-navy', 'text-trueWhite', 'py-20')
  RETURNING id INTO v_section_id;
  
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_section_id, 'heading', 'Book Nisaini for Your Next Event', 0, '{}'::jsonb),
  (v_section_id, 'paragraph', 'Ready to bring practical insights and powerful frameworks to your team or conference? Let''s discuss how we can create an impactful experience together.', 1, '{}'::jsonb);
  
  INSERT INTO buttons (section_id, button_text, button_type, link_type, link_destination, is_external, display_order, style_variant)
  VALUES (v_section_id, 'Request Speaking Info', 'primary', 'internal', '/contact', false, 0, 'btn-primary-on-dark');
  
  -- ============================================================
  -- TESTIMONIALS PAGE
  -- ============================================================
  
  INSERT INTO pages (slug, title, meta_description, is_published, display_order)
  VALUES ('testimonials', 'Testimonials', 'Hear from clients and partners about their experience working with Career Capital.', true, 4)
  ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_testimonials_page_id;
  
  -- Testimonials Hero
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_testimonials_page_id, 'hero_banner', 0, true, 'bg-navy', 'text-trueWhite', 'pt-20 pb-24')
  RETURNING id INTO v_section_id;
  
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_section_id, 'background_image', '/banner_testimonials_desktop.webp', 0, '{}'::jsonb),
  (v_section_id, 'heading', 'Testimonials', 1, '{}'::jsonb),
  (v_section_id, 'subheading', 'Hear from clients and partners about their experience working with Career Capital.', 2, '{}'::jsonb);
  
  -- Testimonials Intro
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_testimonials_page_id, 'text_only', 1, true, 'bg-softWhite', 'text-ink', 'py-16')
  RETURNING id INTO v_section_id;
  
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_section_id, 'section_heading', 'What Clients Say', 0, '{}'::jsonb),
  (v_section_id, 'paragraph', 'Real feedback from professionals and organizations who have worked with Nisaini and the Career Capital team.', 1, '{}'::jsonb);
  
  -- Note: Testimonials are pulled dynamically from the testimonials table
  
  -- Testimonials CTA
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_testimonials_page_id, 'cta', 2, true, 'bg-surface', 'text-ink', 'py-20')
  RETURNING id INTO v_section_id;
  
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_section_id, 'heading', 'Ready to Build Your Career Capital?', 0, '{}'::jsonb),
  (v_section_id, 'paragraph', 'Join the professionals and organizations who are transforming their approach to work, relationships, and AI.', 1, '{}'::jsonb);
  
  INSERT INTO buttons (section_id, button_text, button_type, link_type, link_destination, is_external, display_order, style_variant)
  VALUES (v_section_id, 'Get Started', 'primary', 'internal', '/contact', false, 0, 'btn-primary');
  
  -- ============================================================
  -- CONTACT PAGE
  -- ============================================================
  
  INSERT INTO pages (slug, title, meta_description, is_published, display_order)
  VALUES ('contact', 'Contact', 'Get in touch with Career Capital to discuss speaking engagements, workshops, or coaching opportunities.', true, 5)
  ON CONFLICT (slug) DO UPDATE SET 
    title = EXCLUDED.title,
    meta_description = EXCLUDED.meta_description
  RETURNING id INTO v_contact_page_id;
  
  -- Contact Hero
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_contact_page_id, 'hero_banner', 0, true, 'bg-navy', 'text-trueWhite', 'pt-20 pb-24')
  RETURNING id INTO v_section_id;
  
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_section_id, 'background_image', '/banner_contact_desktop.webp', 0, '{}'::jsonb),
  (v_section_id, 'heading', 'Get in Touch', 1, '{}'::jsonb),
  (v_section_id, 'subheading', 'Ready to explore how Career Capital can support your goals? Let''s start the conversation.', 2, '{}'::jsonb);
  
  -- Contact Info
  INSERT INTO sections (page_id, section_type, display_order, is_published, background_color, text_color, padding)
  VALUES (v_contact_page_id, 'text_only', 1, true, 'bg-softWhite', 'text-ink', 'py-16')
  RETURNING id INTO v_section_id;
  
  INSERT INTO content_blocks (section_id, block_type, content, display_order, metadata) VALUES
  (v_section_id, 'section_heading', 'Let''s Connect', 0, '{}'::jsonb),
  (v_section_id, 'paragraph', 'Whether you''re interested in speaking engagements, workshops, coaching, or custom solutions, we''re here to help.', 1, '{}'::jsonb),
  (v_section_id, 'paragraph', 'Fill out the form below and we''ll get back to you within 1-2 business days.', 2, '{}'::jsonb);
  
  -- Note: Contact form is rendered separately in the Contact page component
  
END $$;
