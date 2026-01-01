/*
  # Add smart position insertion function

  1. New Function
    - `insert_testimonial_at_position(testimonial_id, target_position)`
    - Automatically shifts testimonials at or after target position forward by 1
    - Places the specified testimonial at the desired position
    - Prevents duplicate positions and maintains sequential order
  
  2. Use Cases
    - User wants to insert a testimonial at position 7
    - Current position 7, 8, 9... automatically become 8, 9, 10...
    - The testimonial is placed at position 7
  
  3. Benefits
    - No need to manually reorder multiple testimonials
    - Protects against position conflicts
    - Maintains clean sequential ordering
*/

-- Function to insert a testimonial at a specific position, shifting others forward
CREATE OR REPLACE FUNCTION insert_testimonial_at_position(
  testimonial_id_param uuid,
  target_position integer
)
RETURNS void
LANGUAGE plpgsql
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
