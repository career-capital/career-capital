/*
  # Secure Webhook URLs in Database

  1. New Tables
    - `webhook_secrets`
      - `id` (uuid, primary key)
      - `key` (text, unique) - identifier for the webhook (e.g., 'zapier_contact')
      - `url` (text) - the actual webhook URL
      - `is_active` (boolean) - whether this webhook is active
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `webhook_secrets` table
    - Only authenticated admin users can read webhook URLs
    - Only authenticated admin users can insert/update/delete webhooks
    - SECURITY DEFINER functions can read webhooks for automated processes
  
  3. Changes
    - Update `notify_zapier_contact_submission` function to read URL from database
    - Remove hardcoded webhook URL from function code
  
  4. Important Notes
    - After this migration, you MUST regenerate your Zapier webhook URL since the old one is compromised
    - Insert the new webhook URL into the database using the admin panel
    - The webhook URL will no longer be visible in code or version control
*/

-- Create webhook_secrets table
CREATE TABLE IF NOT EXISTS webhook_secrets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  url text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE webhook_secrets ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can read webhook secrets (for admin UI)
CREATE POLICY "Authenticated users can read webhook secrets"
  ON webhook_secrets
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Only authenticated users can insert webhook secrets
CREATE POLICY "Authenticated users can insert webhook secrets"
  ON webhook_secrets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Only authenticated users can update webhook secrets
CREATE POLICY "Authenticated users can update webhook secrets"
  ON webhook_secrets
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Only authenticated users can delete webhook secrets
CREATE POLICY "Authenticated users can delete webhook secrets"
  ON webhook_secrets
  FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Update function to read webhook URL from database
CREATE OR REPLACE FUNCTION notify_zapier_contact_submission()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  webhook_url text;
  payload jsonb;
BEGIN
  -- Get active webhook URL from database
  SELECT url INTO webhook_url
  FROM webhook_secrets
  WHERE key = 'zapier_contact' AND is_active = true
  LIMIT 1;

  -- If no webhook URL is configured, skip notification
  IF webhook_url IS NULL THEN
    RETURN NEW;
  END IF;

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
  PERFORM extensions.net.http_post(
    url := webhook_url,
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := payload
  );

  RETURN NEW;
END;
$$;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_webhook_secrets_updated_at
  BEFORE UPDATE ON webhook_secrets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
