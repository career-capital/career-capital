/*
  # Fix Security Issues
  
  1. Remove Unused Indexes
    - Drop `idx_testimonials_tags` - GIN index not being used in current queries
    - Drop `idx_testimonials_type` - index not being used in current queries
  
  2. Fix Multiple Permissive Policies
    - Drop overlapping SELECT policies
    - Create single consolidated policy that:
      - Allows public (anon) to view only active testimonials
      - Allows authenticated users to view all testimonials
  
  3. Fix Function Search Path
    - Recreate `update_testimonials_updated_at` function with stable search_path
    - This prevents potential security issues from search_path manipulation
  
  4. Notes
    - Auth DB Connection Strategy must be changed in Supabase dashboard settings
      (Database → Settings → Connection Pooling → Change to percentage-based)
*/

-- Drop unused indexes
DROP INDEX IF EXISTS idx_testimonials_tags;
DROP INDEX IF EXISTS idx_testimonials_type;

-- Drop overlapping SELECT policies
DROP POLICY IF EXISTS "Anyone can view active testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can view all testimonials" ON testimonials;

-- Create consolidated SELECT policy
-- Public users can only see active testimonials
-- Authenticated users can see all testimonials (for admin purposes)
CREATE POLICY "Public view active, authenticated view all testimonials"
  ON testimonials
  FOR SELECT
  USING (
    CASE 
      WHEN auth.role() = 'authenticated' THEN true
      ELSE is_active = true
    END
  );

-- Drop trigger before recreating function
DROP TRIGGER IF EXISTS testimonials_updated_at_trigger ON testimonials;

-- Drop and recreate function with stable search_path
DROP FUNCTION IF EXISTS update_testimonials_updated_at();

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

-- Recreate trigger
CREATE TRIGGER testimonials_updated_at_trigger
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_testimonials_updated_at();
