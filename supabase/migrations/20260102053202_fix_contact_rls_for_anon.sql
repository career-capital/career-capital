/*
  # Fix Contact Submissions RLS for Anonymous Users

  1. Changes
    - Drop existing INSERT policy that uses 'public' role
    - Create new INSERT policy specifically for 'anon' and 'authenticated' roles
    - This allows unauthenticated users to submit the contact form

  2. Security
    - Anyone (anonymous or authenticated) can insert contact submissions
    - Only authenticated users can view, update, or delete submissions
*/

-- Drop the existing policy
DROP POLICY IF EXISTS "Allow all inserts" ON contact_submissions;

-- Create new policy for anon and authenticated roles
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
