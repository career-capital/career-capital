/*
  # Create Image Storage Infrastructure

  1. Storage Buckets
    - `site-images` - For all website images (hero, profile, gallery, etc.)
    - Public access enabled for direct browser loading
    - File size limit: 10MB per file
    - Allowed MIME types: images only

  2. Storage Policies
    - Public read access (anyone can view images)
    - Authenticated users can upload/update/delete (for admin)

  3. Images metadata table
    - Track image details, alt text, usage context
*/

-- Create storage bucket for site images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-images',
  'site-images',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access to site images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

-- Allow public read access to images
CREATE POLICY "Public read access to site images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'site-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'site-images');

-- Allow authenticated users to update images
CREATE POLICY "Authenticated users can update images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'site-images')
  WITH CHECK (bucket_id = 'site-images');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'site-images');

-- Create metadata table to track image information
CREATE TABLE IF NOT EXISTS image_metadata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path text NOT NULL UNIQUE,
  alt_text text DEFAULT '',
  usage_context text DEFAULT '',
  width integer,
  height integer,
  file_size integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE image_metadata ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access to image metadata" ON image_metadata;
DROP POLICY IF EXISTS "Authenticated users can insert image metadata" ON image_metadata;
DROP POLICY IF EXISTS "Authenticated users can update image metadata" ON image_metadata;
DROP POLICY IF EXISTS "Authenticated users can delete image metadata" ON image_metadata;

-- Public can read image metadata
CREATE POLICY "Public read access to image metadata"
  ON image_metadata
  FOR SELECT
  TO public
  USING (true);

-- Authenticated users can manage metadata
CREATE POLICY "Authenticated users can insert image metadata"
  ON image_metadata
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update image metadata"
  ON image_metadata
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete image metadata"
  ON image_metadata
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_image_metadata_storage_path ON image_metadata(storage_path);
CREATE INDEX IF NOT EXISTS idx_image_metadata_usage_context ON image_metadata(usage_context);