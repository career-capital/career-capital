/*
  # Add tags support to testimonials table

  1. Changes
    - Add `tags` column to testimonials table as text array
    - Add `testimonial_type` column to distinguish between client testimonials and professional endorsements

  2. New Columns
    - `tags` (text[]) - Array of tags for filtering testimonials
    - `testimonial_type` (text) - Type of testimonial: 'client' or 'character_witness'
      Default: 'client'
      Note: 'character_witness' is displayed as 'Professional Endorsement' in the UI

  3. Indexes
    - Add GIN index on tags column for efficient tag-based filtering

  4. Notes
    - Tags can be added by admins manually or automatically from survey responses
    - Common tags: "AI Fluency", "Social Wealth", "Leadership Development", "Executive Coaching",
      "Strategy & Roadmap", "Keynote Speaking", "Workshop Facilitation", "Relationship Management",
      "Organizational Change", "Career Capital", "Mindset Shift", "AI Readiness"
*/

-- Add tags column as text array
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonials' AND column_name = 'tags'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN tags text[] DEFAULT '{}';
  END IF;
END $$;

-- Add testimonial_type column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonials' AND column_name = 'testimonial_type'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN testimonial_type text DEFAULT 'client';
  END IF;
END $$;

-- Create GIN index for efficient tag searches
CREATE INDEX IF NOT EXISTS idx_testimonials_tags ON testimonials USING GIN(tags);

-- Create index on testimonial_type for filtering
CREATE INDEX IF NOT EXISTS idx_testimonials_type ON testimonials(testimonial_type);