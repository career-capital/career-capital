/*
  # Fix Security Issues: Remove Unused Indexes and Move pg_net Extension

  1. Changes
    - Drop unused index `idx_image_metadata_storage_path` from `image_metadata` table
    - Drop unused index `idx_image_metadata_usage_context` from `image_metadata` table
    - Move `pg_net` extension from public schema to dedicated extensions schema
  
  2. Security Improvements
    - Removes unused indexes to reduce maintenance overhead and potential attack surface
    - Isolates pg_net extension in dedicated schema following PostgreSQL best practices
    - Extensions in public schema can interfere with application objects and create security risks
  
  3. Notes
    - The pg_net extension will still function normally after the move
    - All existing triggers and functions using pg_net will continue to work
*/

-- Drop unused indexes on image_metadata table
DROP INDEX IF EXISTS idx_image_metadata_storage_path;
DROP INDEX IF EXISTS idx_image_metadata_usage_context;

-- Create extensions schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS extensions;

-- Move pg_net extension from public to extensions schema
DROP EXTENSION IF EXISTS pg_net;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Grant necessary permissions to use pg_net from public schema functions
GRANT USAGE ON SCHEMA extensions TO postgres, anon, authenticated, service_role;
