# Contact Page Versions

This document tracks the different versions of the Contact page.

## MVP Version (Current)
**File:** `src/pages/Contact.tsx`

A simplified contact page that directs visitors to email directly at `info@careercapital.io`.

Features:
- Email CTA with clear mailto link
- ExternalLink icon indicating it opens in email client
- Helper text clarifying the action
- "What to expect" section retained
- Services CTA retained
- No form or database interactions

## Form Version (Saved for Future)
**File:** `src/pages/ContactWithForm.tsx`

The full-featured contact form with database integration.

Features:
- Multi-field contact form
- Supabase database integration
- Zapier webhook automation
- Form validation and error handling
- Success/error states
- All fields: name, email, organization, inquiry type, message

### To Revert to Form Version:
1. Rename current `Contact.tsx` to something else (e.g., `ContactMVP.tsx`)
2. Copy `ContactWithForm.tsx` to `Contact.tsx`
3. Rebuild the project

## Decision Notes

The MVP version was chosen for initial launch to:
- Simplify the user experience
- Reduce technical complexity
- Maintain direct communication channel
- Easy to switch back to form version when ready
