/*
  # Fix Security Issues
  
  ## Changes
  
  1. **RLS Policy Optimization**
     - Replace `auth.role()` with `(SELECT auth.role())` in RLS policy
     - This prevents re-evaluation of auth function for each row
     - Significantly improves query performance at scale
  
  2. **Function Search Path Security**
     - Add `SET search_path = ''` to `normalize_testimonials_display_order()` function
     - Add `SET search_path = ''` to `insert_testimonial_at_position()` function
     - Prevents SQL injection attacks via search_path manipulation
  
  ## Security Benefits
  - Improved query performance for RLS policies
  - Protection against search_path-based security vulnerabilities
  - Functions now use fully qualified table names for security
*/

-- Drop and recreate the RLS policy with optimized auth function call
DROP POLICY IF EXISTS "Public view active, authenticated view all testimonials" ON testimonials;

CREATE POLICY "Public view active, authenticated view all testimonials"
  ON testimonials
  FOR SELECT
  USING (
    CASE 
      WHEN (SELECT auth.role()) = 'authenticated' THEN true
      ELSE is_active = true
    END
  );

-- Recreate normalize_testimonials_display_order function with secure search_path
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

-- Recreate insert_testimonial_at_position function with secure search_path
CREATE OR REPLACE FUNCTION insert_testimonial_at_position(
  testimonial_id_param uuid,
  target_position integer
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  current_position integer;
BEGIN
  -- Get the current position of the testimonial
  SELECT display_order INTO current_position
  FROM public.testimonials
  WHERE id = testimonial_id_param;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Testimonial with id % not found', testimonial_id_param;
  END IF;

  -- If moving to a later position, shift items between current and target backward
  IF target_position > current_position THEN
    UPDATE public.testimonials
    SET display_order = display_order - 1
    WHERE display_order > current_position
      AND display_order <= target_position;
  
  -- If moving to an earlier position, shift items between target and current forward
  ELSIF target_position < current_position THEN
    UPDATE public.testimonials
    SET display_order = display_order + 1
    WHERE display_order >= target_position
      AND display_order < current_position;
  END IF;

  -- Set the testimonial to the target position
  UPDATE public.testimonials
  SET display_order = target_position
  WHERE id = testimonial_id_param;
END;
$$;