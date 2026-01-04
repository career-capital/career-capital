/*
  # Add Zapier Webhook Integration for Contact Form Submissions

  1. Changes
    - Enable pg_net extension for making HTTP requests from database
    - Create a function to send contact form data to Zapier webhook
    - Create a trigger to automatically call Zapier when new submissions are created
    - Store the Zapier webhook URL securely

  2. How it Works
    - When a new row is inserted into contact_submissions table
    - A trigger fires automatically
    - The trigger calls the Zapier webhook with the form data
    - This happens asynchronously so it doesn't block the form submission

  3. Security
    - Uses pg_net for secure HTTP requests
    - Webhook URL is stored in the function (can be moved to vault if needed)
*/

-- Enable pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create function to send data to Zapier webhook
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

  -- Make async HTTP POST request to Zapier webhook
  PERFORM net.http_post(
    url := webhook_url,
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := payload
  );

  RETURN NEW;
END;
$$;

-- Create trigger to fire after insert on contact_submissions
DROP TRIGGER IF EXISTS trigger_notify_zapier ON contact_submissions;

CREATE TRIGGER trigger_notify_zapier
  AFTER INSERT ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION notify_zapier_contact_submission();
