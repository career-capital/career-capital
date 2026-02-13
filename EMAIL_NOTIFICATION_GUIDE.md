# Email Notification System Guide

## Overview

The contact form now automatically sends email notifications to the admin email address (info@careercapital.net) whenever a new submission is received. The email includes all submission details and allows direct reply to the sender.

## How It Works

1. **Form Submission**: When someone submits the contact form on the website
2. **Database Insert**: The submission is saved to the `contact_submissions` table
3. **Automatic Trigger**: A database trigger fires automatically
4. **Email Sent**: An edge function sends a formatted email notification via Resend
5. **Admin Receives**: The admin receives an email with full submission details

## Email Contents

Each notification email includes:

- **From**: The submitter's name
- **Email**: The submitter's email (clickable mailto link)
- **Organization**: If provided
- **Inquiry Type**: Consulting, Speaking, Workshop, or Other
- **Message**: Full message content
- **Timestamp**: When the submission was received
- **Quick Actions**:
  - Reply directly to the email (reply-to is set to submitter's email)
  - View in admin dashboard (link provided)

## Email Configuration

### Required Environment Variables

The system requires two environment variables to be configured in your Supabase project:

1. **RESEND_API_KEY**: Your Resend API key for sending emails
   - Get your API key from: https://resend.com/api-keys
   - Add this in Supabase Dashboard → Edge Functions → Manage Secrets

2. **ADMIN_EMAIL**: The email address that receives notifications
   - Default: info@careercapital.net
   - Change this if you want notifications sent to a different address

3. **SITE_URL**: Your website URL (for admin dashboard link)
   - Default: https://careercapital.net
   - Should match your production domain

### Setting Up Resend

1. Create a free account at https://resend.com
2. Add and verify your domain (careercapital.net)
3. Generate an API key
4. Add the API key to Supabase Edge Function secrets

### Configuring Edge Function Secrets

To add the required environment variables:

1. Go to your Supabase Dashboard
2. Navigate to Edge Functions
3. Click "Manage Secrets"
4. Add the following secrets:
   - `RESEND_API_KEY`: Your Resend API key
   - `ADMIN_EMAIL`: info@careercapital.net (or your preferred email)
   - `SITE_URL`: https://careercapital.net (or your production URL)

## Archive System

The contact submissions system now includes archive functionality to help manage submissions without losing data.

### Archive vs Delete

- **Archive**: Soft delete - submission remains in database but hidden from active view
  - Preserved in database for record-keeping
  - Can be restored if needed
  - Moves to "Archived" tab
  - Status automatically set to "archived"

- **Delete**: Permanent deletion - submission removed from database forever
  - Cannot be undone
  - Should only be used for spam or invalid submissions

### Using Archives

1. **Archive a Submission**:
   - Click the Archive icon (box with down arrow)
   - Submission moves to archived tab
   - Status changes to "archived"

2. **View Archived Submissions**:
   - Click "Archived" tab in Contact Submissions
   - Shows count of archived items
   - All archived submissions displayed with "ARCHIVED" badge

3. **Restore from Archive**:
   - In Archived tab, click the Restore icon (box with up arrow)
   - Submission returns to active tab
   - Status changes to "read"

4. **Delete Permanently**:
   - Click the Trash icon
   - Confirmation dialog appears with warning
   - Options presented:
     - **Archive Instead** (recommended) - soft delete
     - **Delete Forever** - permanent deletion
     - **Cancel** - cancel operation
   - After deletion, confirmation message shown

### Best Practices

- **Archive First**: Always archive submissions before considering permanent deletion
- **Regular Review**: Periodically review archived items to decide if permanent deletion is needed
- **Respond Before Archiving**: Mark submissions as "Responded" before archiving for better tracking
- **Spam Management**: Use permanent delete only for obvious spam

## Admin Workflow

### Recommended Process

1. **Receive Email**: Get notification in your inbox with full details
2. **Quick Response**: Reply directly to the email if urgent
3. **Update Status**: Log in to admin dashboard and update status
   - "New" → "Read" (when reviewing)
   - "Read" → "Responded" (after replying)
4. **Archive**: Once conversation is complete, archive the submission
5. **Track**: Use archived submissions as a record of past inquiries

### Status Meanings

- **New**: Just received, not yet reviewed
- **Read**: Admin has viewed the submission
- **Responded**: Admin has replied to the inquiry
- **Archived**: Conversation complete, moved to archive

## Troubleshooting

### Email Not Received

1. Check spam/junk folder
2. Verify RESEND_API_KEY is configured in Supabase
3. Verify ADMIN_EMAIL is set correctly
4. Check Resend dashboard for delivery status
5. Verify domain is verified in Resend

### Testing Emails

To test the email system:

1. Submit a test contact form on your website
2. Check the admin email inbox
3. Verify email formatting and reply-to functionality
4. Test clicking the admin dashboard link

### Common Issues

- **No email received**: Check Resend API key configuration
- **Wrong recipient**: Update ADMIN_EMAIL environment variable
- **Broken links**: Verify SITE_URL is set correctly
- **Can't reply**: Ensure reply-to header is set (automatic in our implementation)

## Technical Details

### Edge Function

- **Name**: `send-contact-notification`
- **Trigger**: Automatic on new contact submission
- **Service**: Resend API
- **Reply-To**: Set to submitter's email for easy responses

### Database Trigger

- **Function**: `send_contact_notification()`
- **Trigger**: `trigger_send_contact_notification`
- **Event**: AFTER INSERT on contact_submissions
- **Execution**: Asynchronous (doesn't block form submission)

### Security

- Edge function uses Supabase authentication
- Environment variables stored securely in Supabase
- Email sending happens server-side only
- No sensitive data exposed to client

## Migration from Zapier

This system replaces the previous Zapier webhook integration with a native email solution:

- **Before**: Contact submissions → Zapier → Manual email setup
- **Now**: Contact submissions → Edge function → Resend → Email

Benefits:
- Faster delivery
- Better formatting
- Direct reply capability
- Lower cost (Resend has generous free tier)
- More control over email content
