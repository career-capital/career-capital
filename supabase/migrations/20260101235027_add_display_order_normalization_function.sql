/*
  # Add display_order normalization function (safe, no auto-triggers)

  1. Changes
    - Add function to normalize display_order on demand (removes gaps, fixes duplicates)
    - This ensures display_order remains sequential (1, 2, 3, 4...) with no gaps or duplicates
    - Function can be called manually or by the application after deletions
  
  2. Benefits
    - Protects against human error when manually entering testimonials
    - Fixes gaps when testimonials are deleted
    - Prevents duplicate display_order values
    - No risk of infinite loops (no automatic triggers)
  
  3. Security
    - Function uses SECURITY DEFINER with SET search_path = '' to prevent SQL injection
  
  4. Usage
    - Call `SELECT normalize_testimonials_display_order();` after deleting testimonials
    - Can be integrated into admin interface
    - Run manually in database if needed
*/

-- Function to normalize display_order to ensure sequential ordering without gaps
-- SECURITY FIX: Added SECURITY DEFINER and SET search_path = ''
CREATE OR REPLACE FUNCTION normalize_testimonials_display_order()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Renumber all testimonials sequentially based on their current order
  WITH ordered_testimonials AS (
    SELECT id, ROW_NUMBER() OVER (ORDER BY display_order, created_at) as new_order
    FROM public.testimonials
  )
  UPDATE public.testimonials
  SET display_order = ordered_testimonials.new_order
  FROM ordered_testimonials
  WHERE public.testimonials.id = ordered_testimonials.id;
END;
$$;

-- Run normalization once to ensure current data is clean
SELECT normalize_testimonials_display_order();