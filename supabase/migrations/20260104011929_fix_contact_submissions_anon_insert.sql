/*
  # Fix Contact Submissions Anonymous Insert Issue

  1. Changes
    - Drop and recreate the INSERT policy with proper syntax
    - Ensure anonymous users can insert without authentication
    - Fix any policy conflicts

  2. Security
    - Allow anonymous (anon) and authenticated users to submit forms
    - Only authenticated users can view, update, or delete submissions
*/

-- Drop existing INSERT policy
DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_submissions;

-- Recreate with explicit policy that allows inserts for anon role
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- Grant explicit insert permission to anon role (in case it's missing)
GRANT INSERT ON contact_submissions TO anon;
GRANT INSERT ON contact_submissions TO authenticated;
