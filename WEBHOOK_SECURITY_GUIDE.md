# Webhook Security Guide

## ⚠️ Important: Your Zapier Webhook URL Has Been Compromised

Since your webhook URL was exposed in the GitHub repository, anyone who saw it could potentially send fake data to your Zapier workflow.

## Steps to Secure Your Webhook

### 1. Regenerate Your Zapier Webhook URL

**IMPORTANT: Do this first!**

1. Log into your Zapier account
2. Go to your Zap that receives contact form submissions
3. Find the "Catch Hook" trigger step
4. Click to view the webhook URL
5. Look for an option to "Regenerate" or "Create New" webhook URL
6. Copy the new webhook URL

**Note:** The old URL (`https://hooks.zapier.com/hooks/catch/25914157/uwrh0uo/`) should be considered compromised and should no longer be used.

### 2. Add the New Webhook URL to Your Database

1. Log into your admin panel at: `https://your-site.com/admin`
2. Navigate to the webhook configuration section (you may need to add this feature to your admin panel)
3. Or, you can add it directly via Supabase SQL Editor:

```sql
INSERT INTO webhook_secrets (key, url, is_active)
VALUES ('zapier_contact', 'YOUR_NEW_WEBHOOK_URL_HERE', true);
```

Replace `YOUR_NEW_WEBHOOK_URL_HERE` with your new Zapier webhook URL.

### 3. Verify It's Working

1. Submit a test contact form on your website
2. Check that it appears in your Zapier workflow
3. If it doesn't work, verify:
   - The webhook URL in the database is correct
   - The `is_active` flag is set to `true`
   - Your Zapier workflow is turned on

## What Changed?

✅ **Before:** Webhook URL was hardcoded in database function (visible in Git)
✅ **After:** Webhook URL is stored securely in database (not in version control)

## Security Benefits

1. **No more exposure in Git:** The webhook URL is now stored in your database, not in code
2. **Easy to rotate:** You can change the webhook URL anytime without deploying code
3. **Access controlled:** Only authenticated admin users can view/edit webhook URLs
4. **Audit trail:** The table tracks when webhooks were created and updated

## Managing Webhook URLs

### View All Webhooks
```sql
SELECT key, is_active, created_at, updated_at
FROM webhook_secrets;
```

### Update a Webhook URL
```sql
UPDATE webhook_secrets
SET url = 'new_webhook_url_here', updated_at = now()
WHERE key = 'zapier_contact';
```

### Disable a Webhook (without deleting)
```sql
UPDATE webhook_secrets
SET is_active = false
WHERE key = 'zapier_contact';
```

### Delete a Webhook
```sql
DELETE FROM webhook_secrets
WHERE key = 'zapier_contact';
```

## Future Webhooks

When you need to add more webhooks in the future, simply insert them into the `webhook_secrets` table with a unique key:

```sql
INSERT INTO webhook_secrets (key, url, is_active)
VALUES ('new_webhook_name', 'https://example.com/webhook', true);
```

Then reference them in your functions using the key.

## Questions?

If you need help setting this up or have questions about webhook security, please reach out.
