/*
  # Fix Security Issues - RLS and Function Search Path

  ## Issues Fixed
  1. **RLS on contact_submissions**: Ensure RLS is enabled on the contact_submissions table
  2. **Function Search Path**: Fix mutable search_path on format_testimonial_author function
  
  ## Changes
  
  ### 1. RLS on contact_submissions
  - Explicitly enable RLS on contact_submissions table
  - This ensures the existing policies are enforced
  
  ### 2. Function Security
  - Recreate format_testimonial_author with SECURITY INVOKER and fixed search_path
  - This prevents SQL injection and search_path manipulation attacks
  
  ## Security Notes
  - RLS must be enabled for policies to take effect
  - Functions should have immutable search_paths to prevent security vulnerabilities
  - SECURITY INVOKER ensures function runs with privileges of the calling user
*/

-- Ensure RLS is enabled on contact_submissions
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Recreate the format_testimonial_author function with proper security settings
CREATE OR REPLACE FUNCTION format_testimonial_author()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  -- Check if the author name ends with a single letter (last initial)
  -- If it does and doesn't have a period, add one
  IF NEW.author ~ '[A-Za-z]\s+[A-Za-z]$' THEN
    NEW.author := regexp_replace(NEW.author, '([A-Za-z])\s+([A-Za-z])$', '\1 \2.');
  ELSIF NEW.author ~ '[A-Za-z]\s+[A-Za-z]\s*$' THEN
    NEW.author := regexp_replace(NEW.author, '([A-Za-z])\s+([A-Za-z])\s*$', '\1 \2.');
  END IF;
  
  RETURN NEW;
END;
$$;
