/*
  # Fix Security Issues - Unused Index and Mutable Search Path

  ## Changes Made
  
  1. **Drop Unused Index**
     - Remove `idx_testimonials_is_active` index as it's not being used
     - This reduces storage overhead and improves write performance
  
  2. **Fix Function Search Path**
     - Recreate `update_contact_submissions_updated_at` function with secure search_path
     - Set `search_path = ''` to prevent search_path hijacking attacks
     - Use schema-qualified function references for security
  
  ## Security Impact
     - Prevents potential privilege escalation via search_path manipulation
     - Removes unnecessary database objects
*/

-- Drop unused index on testimonials table
DROP INDEX IF EXISTS idx_testimonials_is_active;

-- Recreate function with secure search_path to prevent hijacking
CREATE OR REPLACE FUNCTION update_contact_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = '';

-- Note: The trigger already exists and references this function,
-- so it will automatically use the updated function definition