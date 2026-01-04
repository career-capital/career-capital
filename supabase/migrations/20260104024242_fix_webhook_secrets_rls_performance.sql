/*
  # Fix Security Issues in webhook_secrets Table and Functions

  ## Changes
  1. RLS Policy Optimization
     - Drop and recreate all 4 webhook_secrets policies
     - Replace `auth.uid()` with `(select auth.uid())` for better performance
     - Prevents re-evaluation of auth functions for each row
  
  2. Function Security
     - Fix `update_updated_at_column` function search_path
     - Set explicit search_path to prevent malicious function hijacking

  ## Security Improvements
  - Optimized query performance for RLS policies at scale
  - Protected against search_path manipulation attacks
*/

-- Drop existing RLS policies
DROP POLICY IF EXISTS "Authenticated users can read webhook secrets" ON webhook_secrets;
DROP POLICY IF EXISTS "Authenticated users can insert webhook secrets" ON webhook_secrets;
DROP POLICY IF EXISTS "Authenticated users can update webhook secrets" ON webhook_secrets;
DROP POLICY IF EXISTS "Authenticated users can delete webhook secrets" ON webhook_secrets;

-- Recreate policies with optimized auth function calls
CREATE POLICY "Authenticated users can read webhook secrets"
  ON webhook_secrets
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated users can insert webhook secrets"
  ON webhook_secrets
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated users can update webhook secrets"
  ON webhook_secrets
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL)
  WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Authenticated users can delete webhook secrets"
  ON webhook_secrets
  FOR DELETE
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

-- Fix function search_path security issue
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;