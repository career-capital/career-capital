/*
  # Fix Remaining Function Search Paths

  ## Issues Fixed
  1. **normalize_testimonials_display_order**: Add secure search_path
  2. **insert_testimonial_at_position**: Add secure search_path
  
  ## Changes
  
  ### Security Settings
  - Add SECURITY INVOKER to run functions with caller privileges
  - Set search_path = public to prevent search_path manipulation attacks
  - Use schema-qualified references where appropriate
  
  ## Security Notes
  - Functions should have immutable search_paths to prevent security vulnerabilities
  - SECURITY INVOKER ensures functions run with privileges of the calling user
  - Schema-qualified table references prevent ambiguity
*/

-- Fix normalize_testimonials_display_order function
CREATE OR REPLACE FUNCTION normalize_testimonials_display_order()
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
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

-- Fix insert_testimonial_at_position function
CREATE OR REPLACE FUNCTION insert_testimonial_at_position(
  testimonial_id_param uuid,
  target_position integer
)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
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
