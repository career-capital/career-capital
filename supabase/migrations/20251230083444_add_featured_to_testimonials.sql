/*
  # Add featured flag to testimonials

  1. Changes
    - Add `featured` column to `testimonials` table
      - Type: boolean
      - Default: false
      - Purpose: Mark up to 5 testimonials to display on home page
  
  2. Notes
    - Existing testimonials will default to featured = false
    - Admin interface will enforce 5-featured limit
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonials' AND column_name = 'featured'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN featured boolean DEFAULT false NOT NULL;
  END IF;
END $$;