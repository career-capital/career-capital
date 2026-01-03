/*
  # Remove role field from testimonials
  
  1. Changes
    - Drop `role` column from testimonials table
    - Testimonials will now only show author name and company
    
  2. Notes
    - This simplifies the testimonial structure
    - Existing data in role column will be removed
*/

-- Drop role column from testimonials table
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonials' AND column_name = 'role'
  ) THEN
    ALTER TABLE testimonials DROP COLUMN role;
  END IF;
END $$;