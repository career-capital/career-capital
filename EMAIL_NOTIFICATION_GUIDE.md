# Email Notification System Guide

## Overview

The contact form automatically sends notifications via Zapier whenever a new submission is received. This allows you to configure email notifications, Slack messages, or any other action supported by Zapier.

## How It Works

1. **Form Submission**: When someone submits the contact form on the website
2. **Database Insert**: The submission is saved to the `contact_submissions` table
3. **Automatic Trigger**: A database trigger fires automatically
4. **Zapier Webhook**: Contact data is sent to your Zapier webhook URL
5. **Zapier Action**: Zapier processes the webhook and performs your configured action (send email, Slack notification, etc.)

## Setting Up Email Notifications with Zapier

### Step 1: Create a Zapier Account

1. Go to https://zapier.com and sign up for a free account
2. Free tier includes 100 tasks per month (more than enough for most contact forms)

### Step 2: Create a New Zap

1. Click "Create Zap" in your Zapier dashboard
2. Name it something like "Career Capital Contact Form Notifications"

### Step 3: Set Up the Trigger (Webhook)

1. **App**: Search for and select "Webhooks by Zapier"
2. **Event**: Choose "Catch Hook"
3. **Webhook URL**: Copy the custom webhook URL Zapier provides
4. **Note**: Save this URL - you'll need it for the database configuration

### Step 4: Configure the Action (Send Email)

1. **App**: Search for and select "Email by Zapier" (or "Gmail" if you prefer)
2. **Event**: Choose "Send Outbound Email"
3. **Configure the email**:
   - **To**: info@careercapital.net (or your preferred email)
   - **From Name**: Career Capital Contact Form
   - **Subject**: Use dynamic data like "New {inquiry_type} inquiry from {name}"
   - **Body Type**: HTML
   - **Body**: Create a formatted email using the webhook data

### Example Email Template

```html
<h2>New Contact Form Submission</h2>

<p><strong>From:</strong> {name}</p>
<p><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
<p><strong>Organization:</strong> {organization}</p>
<p><strong>Inquiry Type:</strong> {inquiry_type}</p>

<h3>Message:</h3>
<p>{message}</p>

<hr>
<p><small>Submitted: {created_at}</small></p>
<p><a href="https://careercapital.net/admin">View in Admin Dashboard</a></p>

<p><em>To respond, simply reply to {email}</em></p>
```

### Step 5: Test the Integration

1. In Zapier, click "Test trigger" to make sure the webhook is working
2. Submit a test form on your website
3. Check that Zapier receives the data
4. Run the test action to send yourself an email
5. Verify the email looks correct

### Step 6: Turn On Your Zap

1. Click "Publish" to activate your Zap
2. Now all new contact submissions will trigger email notifications

## Webhook Data Structure

The webhook sends the following data for each submission:

```json
{
  "id": "unique-submission-id",
  "name": "Submitter Name",
  "email": "submitter@example.com",
  "organization": "Company Name",
  "inquiry_type": "consulting|speaking|workshop|other",
  "message": "Full message text",
  "status": "new",
  "created_at": "2024-01-01T12:00:00Z"
}
```

## Alternative Zapier Actions

Instead of email, you can configure other actions:

### Slack Notifications
- **App**: Slack
- **Action**: Send Channel Message
- Posts new submissions to a dedicated Slack channel

### Google Sheets
- **App**: Google Sheets
- **Action**: Create Spreadsheet Row
- Logs all submissions to a spreadsheet for tracking

### Multiple Actions
- Add multiple action steps to send email AND post to Slack
- Or use Zapier's filter feature to route different inquiry types to different people

## Archive System

The contact submissions system includes archive functionality to help manage submissions without losing data.

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

1. **Receive Notification**: Get notification via email (or Slack) with full details
2. **Quick Response**: Use the email address to respond directly
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

### Not Receiving Notifications

1. Check that your Zap is turned ON (not paused)
2. Check Zapier's Task History to see if webhook was received
3. Verify the webhook URL in your database migration matches your Zap
4. Check your email spam/junk folder
5. Test by submitting a form and watching Zapier's logs

### Testing the Webhook

To test without submitting through the website:

1. Go to your Zap's trigger step
2. Use "Test trigger" feature
3. Or manually send a POST request to your webhook URL with sample data

### Common Issues

- **Zap not triggering**: Verify webhook URL is correct in database migration
- **Wrong email format**: Edit your Zap's action step to adjust email template
- **Missing data**: Check that all fields are mapped correctly in Zapier
- **Reply not working**: Make sure to include the submitter's email in your template

## Technical Details

### Database Trigger

- **Function**: `notify_zapier_contact_submission()`
- **Trigger**: `trigger_notify_zapier`
- **Event**: AFTER INSERT on contact_submissions
- **Execution**: Asynchronous (doesn't block form submission)

### Security

- Webhook URL is stored in the database function
- Data is sent via HTTPS to Zapier
- No authentication required for webhook (Zapier generates unique URL)
- All sensitive processing happens on Zapier's secure servers

### Migration File

The Zapier webhook integration is defined in:
- `supabase/migrations/20260104022758_add_zapier_webhook_integration.sql`

To update the webhook URL, modify this migration file and update the `webhook_url` variable.

## Benefits of Using Zapier

- **Flexibility**: Change notification methods without code changes
- **No API Keys**: No need to manage email service API keys
- **Multiple Actions**: Send email, post to Slack, log to sheets - all from one submission
- **Easy Setup**: Visual interface, no coding required
- **Reliable**: Zapier handles retries and error handling
- **Free Tier**: 100 tasks/month is sufficient for most contact forms
