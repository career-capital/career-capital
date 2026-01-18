/*
  # Fix Section Templates RLS for Viewing
  
  Allow all authenticated users to view section templates.
  Viewing templates is safe - they're just layout options.
  Only creation/editing/deletion still requires admin email.
*/

-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Admins can view section templates" ON section_templates;

-- Create new policy that allows all authenticated users to view templates
CREATE POLICY "Authenticated users can view section templates"
  ON section_templates FOR SELECT
  TO authenticated
  USING (true);

-- Keep admin-only policies for modifications
-- (insert, update, delete policies already exist and remain admin-only)
