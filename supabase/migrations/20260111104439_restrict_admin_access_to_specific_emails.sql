/*
  # Restrict Admin Access to Specific Email Addresses

  This migration secures all management operations by restricting them to only authorized admin email addresses.

  ## Security Changes

  ### Contact Submissions Table
  - ✅ Keep: Anonymous users can submit contact forms (public access)
  - 🔒 Restrict: Only admins can view, update, or delete submissions
  
  ### Testimonials Table
  - ✅ Keep: Public can view published testimonials
  - 🔒 Restrict: Only admins can insert, update, or delete testimonials
  
  ### Image Storage & Metadata
  - ✅ Keep: Public can view images
  - 🔒 Restrict: Only admins can upload, update, or delete images
  
  ### Webhook Secrets Table
  - 🔒 Restrict: Only admins can read, insert, update, or delete webhook secrets

  ## Authorized Admin Emails
  - nisrexach@gmail.com
  - nisaini@careercapital.io
  - info@careercapital.io
  - jay@jayfox.design

  ## Important Notes
  1. The public contact form remains fully functional for anonymous users
  2. All management operations now require authentication with one of the authorized emails
  3. This prevents any random authenticated user from accessing or modifying data
*/

-- Helper function to check if user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT auth.jwt()->>'email' IN (
    'nisrexach@gmail.com',
    'nisaini@careercapital.io',
    'info@careercapital.io',
    'jay@jayfox.design'
  );
$$;

-- ============================================================================
-- CONTACT SUBMISSIONS: Restrict viewing/editing to admins only
-- ============================================================================

DROP POLICY IF EXISTS "Authenticated users can view all submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can update submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can delete submissions" ON contact_submissions;

-- Only admins can view submissions
CREATE POLICY "Only admins can view submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Only admins can update submissions
CREATE POLICY "Only admins can update submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Only admins can delete submissions
CREATE POLICY "Only admins can delete submissions"
  ON contact_submissions
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ============================================================================
-- TESTIMONIALS: Restrict management to admins only
-- ============================================================================

DROP POLICY IF EXISTS "Authenticated users can insert testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can update testimonials" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users can delete testimonials" ON testimonials;

-- Only admins can insert testimonials
CREATE POLICY "Only admins can insert testimonials"
  ON testimonials
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- Only admins can update testimonials
CREATE POLICY "Only admins can update testimonials"
  ON testimonials
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Only admins can delete testimonials
CREATE POLICY "Only admins can delete testimonials"
  ON testimonials
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ============================================================================
-- IMAGE STORAGE: Restrict upload/update/delete to admins only
-- ============================================================================

DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

-- Only admins can upload images
CREATE POLICY "Only admins can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'testimonial-images' AND
    public.is_admin()
  );

-- Only admins can update images
CREATE POLICY "Only admins can update images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'testimonial-images' AND
    public.is_admin()
  );

-- Only admins can delete images
CREATE POLICY "Only admins can delete images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'testimonial-images' AND
    public.is_admin()
  );

-- ============================================================================
-- IMAGE METADATA: Restrict management to admins only
-- ============================================================================

DROP POLICY IF EXISTS "Authenticated users can insert image metadata" ON image_metadata;
DROP POLICY IF EXISTS "Authenticated users can update image metadata" ON image_metadata;
DROP POLICY IF EXISTS "Authenticated users can delete image metadata" ON image_metadata;

-- Only admins can insert image metadata
CREATE POLICY "Only admins can insert image metadata"
  ON image_metadata
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- Only admins can update image metadata
CREATE POLICY "Only admins can update image metadata"
  ON image_metadata
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Only admins can delete image metadata
CREATE POLICY "Only admins can delete image metadata"
  ON image_metadata
  FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ============================================================================
-- WEBHOOK SECRETS: Restrict all access to admins only
-- ============================================================================

DROP POLICY IF EXISTS "Authenticated users can read webhook secrets" ON webhook_secrets;
DROP POLICY IF EXISTS "Authenticated users can insert webhook secrets" ON webhook_secrets;
DROP POLICY IF EXISTS "Authenticated users can update webhook secrets" ON webhook_secrets;
DROP POLICY IF EXISTS "Authenticated users can delete webhook secrets" ON webhook_secrets;

-- Only admins can read webhook secrets
CREATE POLICY "Only admins can read webhook secrets"
  ON webhook_secrets
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Only admins can insert webhook secrets
CREATE POLICY "Only admins can insert webhook secrets"
  ON webhook_secrets
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- Only admins can update webhook secrets
CREATE POLICY "Only admins can update webhook secrets"
  ON webhook_secrets
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Only admins can delete webhook secrets
CREATE POLICY "Only admins can delete webhook secrets"
  ON webhook_secrets
  FOR DELETE
  TO authenticated
  USING (public.is_admin());
