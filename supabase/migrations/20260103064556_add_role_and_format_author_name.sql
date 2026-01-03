/*
  # Add role field and author name formatting
  
  1. Changes
    - Add `role` field to testimonials table for job titles
    - Add trigger function to automatically format author names (First Name, Last Initial.)
    - Ensures last initial always has a period if not already present
    
  2. Security
    - No RLS changes needed (already enabled)
    
  3. Notes
    - Author name format: "First Name, Last Initial."
    - Function automatically adds period after single letter if missing
*/

-- Add role field to testimonials table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonials' AND column_name = 'role'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN role text DEFAULT '';
  END IF;
END $$;

-- Create function to format author name with period after last initial
CREATE OR REPLACE FUNCTION format_testimonial_author()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the author name ends with a single letter (last initial)
  -- If it does and doesn't have a period, add one
  IF NEW.author ~ '[A-Za-z]\s+[A-Za-z]$' THEN
    NEW.author := regexp_replace(NEW.author, '([A-Za-z])\s+([A-Za-z])$', '\1 \2.');
  ELSIF NEW.author ~ '[A-Za-z]\s+[A-Za-z]\s*$' THEN
    NEW.author := regexp_replace(NEW.author, '([A-Za-z])\s+([A-Za-z])\s*$', '\1 \2.');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to format author names on insert and update
DROP TRIGGER IF EXISTS format_author_name_trigger ON testimonials;
CREATE TRIGGER format_author_name_trigger
  BEFORE INSERT OR UPDATE OF author ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION format_testimonial_author();