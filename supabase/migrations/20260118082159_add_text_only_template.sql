/*
  # Add Text Only Template
  
  Adds the text_only section template that was used in the seeded pages but missing from templates.
*/

INSERT INTO section_templates (name, section_type, description, default_config)
VALUES (
  'Text Only (Multiple Paragraphs)',
  'text_only',
  'Simple text section with heading and multiple paragraphs - no maximum width constraint',
  '{
    "background_color": "bg-softWhite",
    "text_color": "text-ink",
    "padding": "py-16",
    "content_structure": {
      "section_heading": true,
      "paragraphs": true
    }
  }'::jsonb
)
ON CONFLICT DO NOTHING;
