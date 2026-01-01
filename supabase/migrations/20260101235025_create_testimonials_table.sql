/*
  # Create testimonials table for CMS

  1. New Tables
    - `testimonials`
      - `id` (uuid, primary key) - Unique identifier for each testimonial
      - `quote` (text) - The testimonial quote/content
      - `author` (text) - Name of the person providing the testimonial
      - `company` (text) - Company or organization name
      - `display_order` (integer) - Order in which testimonials should be displayed
      - `is_active` (boolean) - Whether the testimonial should be displayed on the site
      - `created_at` (timestamptz) - When the testimonial was added
      - `updated_at` (timestamptz) - When the testimonial was last updated
      - `tags` (text[]) - Array of tags for filtering testimonials
      - `testimonial_type` (text) - Type of testimonial: 'client' or 'character_witness'
      - `featured` (boolean) - Mark up to 5 testimonials to display on home page
  
  2. Security
    - Enable RLS on `testimonials` table
    - Public can view active testimonials
    - Authenticated users can manage all testimonials
  
  3. Indexes
    - Index on `display_order` for efficient sorting
    - Index on `is_active` for filtering active testimonials
*/

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote text NOT NULL,
  author text NOT NULL,
  company text NOT NULL,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  tags text[] DEFAULT '{}',
  testimonial_type text DEFAULT 'client',
  featured boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public can view active testimonials, authenticated users can view all
-- SECURITY FIX: Using (SELECT auth.role()) instead of auth.role() for better performance
CREATE POLICY "Public view active, authenticated view all testimonials"
  ON testimonials
  FOR SELECT
  USING (
    CASE 
      WHEN (SELECT auth.role()) = 'authenticated' THEN true
      ELSE is_active = true
    END
  );

-- Authenticated users can insert testimonials
CREATE POLICY "Authenticated users can insert testimonials"
  ON testimonials
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update testimonials
CREATE POLICY "Authenticated users can update testimonials"
  ON testimonials
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete testimonials
CREATE POLICY "Authenticated users can delete testimonials"
  ON testimonials
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_testimonials_display_order ON testimonials(display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_active ON testimonials(is_active);

-- Create function to update updated_at timestamp
-- SECURITY FIX: Added SET search_path = '' for security
CREATE OR REPLACE FUNCTION update_testimonials_updated_at()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = ''
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create trigger to automatically update updated_at
CREATE TRIGGER testimonials_updated_at_trigger
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_testimonials_updated_at();