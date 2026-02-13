/*
  # Add Archive Field and Update Notification System

  1. Changes
    - Add `archived` boolean field to contact_submissions table (default false)
    - Replace Zapier webhook with new email notification edge function
    - Update trigger to call edge function for email notifications

  2. New Fields
    - `contact_submissions.archived` (boolean, default false)
      - Allows soft deletion of submissions
      - Archived submissions can be filtered out but remain in database

  3. Notification System
    - Replaces Zapier webhook with Resend email service
    - Sends formatted email to admin with submission details
    - Email includes reply-to header for direct responses
    - Links to admin dashboard for management

  4. Security
    - Function uses SECURITY DEFINER with explicit search_path
    - Edge function handles authentication via Supabase
*/

-- Add archived field to contact_submissions
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'archived'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN archived boolean DEFAULT false NOT NULL;
  END IF;
END $$;

-- Create function to call edge function for email notification
CREATE OR REPLACE FUNCTION send_contact_notification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  supabase_url text := current_setting('app.settings.supabase_url', true);
  supabase_anon_key text := current_setting('app.settings.supabase_anon_key', true);
  function_url text;
  payload jsonb;
BEGIN
  -- Build the edge function URL
  function_url := supabase_url || '/functions/v1/send-contact-notification';
  
  -- Build the payload with all form data
  payload := jsonb_build_object(
    'id', NEW.id,
    'name', NEW.name,
    'email', NEW.email,
    'organization', NEW.organization,
    'inquiry_type', NEW.inquiry_type,
    'message', NEW.message,
    'created_at', NEW.created_at
  );

  -- Make async HTTP POST request to edge function
  PERFORM net.http_post(
    url := function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || supabase_anon_key
    ),
    body := payload
  );

  RETURN NEW;
END;
$$;

-- Drop old Zapier trigger if it exists
DROP TRIGGER IF EXISTS trigger_notify_zapier ON contact_submissions;

-- Create new trigger for email notifications
DROP TRIGGER IF EXISTS trigger_send_contact_notification ON contact_submissions;

CREATE TRIGGER trigger_send_contact_notification
  AFTER INSERT ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION send_contact_notification();

-- Create index on archived field for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_archived 
  ON contact_submissions(archived) 
  WHERE archived = false;
