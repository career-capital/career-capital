/*
  # Add Archive Field to Contact Submissions

  1. Changes
    - Add `archived` boolean field to contact_submissions table (default false)

  2. New Fields
    - `contact_submissions.archived` (boolean, default false)
      - Allows soft deletion of submissions
      - Archived submissions can be filtered out but remain in database
      - Maintains historical record of all inquiries

  3. Benefits
    - No data loss when managing submissions
    - Easy restoration if needed
    - Cleaner admin interface with separate active/archived views

  4. Performance
    - Added index on archived field for faster queries

  Note: Email notifications are handled by the existing Zapier webhook integration
  (see migration 20260104022758_add_zapier_webhook_integration.sql)
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

-- Create index on archived field for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_archived
  ON contact_submissions(archived)
  WHERE archived = false;
