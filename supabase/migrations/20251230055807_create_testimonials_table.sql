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
  
  2. Security
    - Enable RLS on `testimonials` table
    - Add policy for public read access (only active testimonials)
    - Add policy for authenticated users to manage all testimonials
  
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
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public can view active testimonials
CREATE POLICY "Anyone can view active testimonials"
  ON testimonials
  FOR SELECT
  USING (is_active = true);

-- Authenticated users can view all testimonials
CREATE POLICY "Authenticated users can view all testimonials"
  ON testimonials
  FOR SELECT
  TO authenticated
  USING (true);

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
CREATE OR REPLACE FUNCTION update_testimonials_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'testimonials_updated_at_trigger'
  ) THEN
    CREATE TRIGGER testimonials_updated_at_trigger
      BEFORE UPDATE ON testimonials
      FOR EACH ROW
      EXECUTE FUNCTION update_testimonials_updated_at();
  END IF;
END $$;