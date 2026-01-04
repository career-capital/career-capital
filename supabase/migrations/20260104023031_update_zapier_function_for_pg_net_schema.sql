/*
  # Update Zapier Webhook Function to Use pg_net from Extensions Schema

  1. Changes
    - Update `notify_zapier_contact_submission` function to reference pg_net from extensions schema
    - Explicitly use `extensions.net.http_post` instead of `net.http_post`
  
  2. Notes
    - This ensures the function works correctly after pg_net was moved to extensions schema
    - The function will continue to trigger automatically on contact form submissions
*/

-- Recreate function with correct schema reference
CREATE OR REPLACE FUNCTION notify_zapier_contact_submission()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  webhook_url text := 'https://hooks.zapier.com/hooks/catch/25914157/uwrh0uo/';
  payload jsonb;
BEGIN
  -- Build the payload with all form data
  payload := jsonb_build_object(
    'id', NEW.id,
    'name', NEW.name,
    'email', NEW.email,
    'organization', NEW.organization,
    'inquiry_type', NEW.inquiry_type,
    'message', NEW.message,
    'status', NEW.status,
    'created_at', NEW.created_at
  );

  -- Make async HTTP POST request to Zapier webhook using extensions schema
  PERFORM extensions.net.http_post(
    url := webhook_url,
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := payload
  );

  RETURN NEW;
END;
$$;
