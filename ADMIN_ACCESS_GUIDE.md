# Admin Access Guide

## Overview

Your Career Capital website now has a secure admin panel where you can manage testimonials and view contact form submissions. The admin panel is accessed at a hidden URL that is not linked anywhere on the public website.

## Accessing the Admin Panel

**Admin URL:** `https://yourdomain.com/admin`

Simply navigate to `/admin` on your website to access the login page.

## Creating Your Admin Account

You need to create an admin user account in Supabase before you can log in:

### Step 1: Go to Supabase Dashboard
1. Visit [supabase.com](https://supabase.com)
2. Sign in to your Supabase account
3. Select your Career Capital project

### Step 2: Create Admin User
1. In the left sidebar, click on **Authentication**
2. Click on **Users** tab
3. Click the **Add user** button (green button in top right)
4. Select **Create new user**
5. Enter your email address
6. Enter a secure password
7. Leave "Auto Confirm User" **checked** (this is important!)
8. Click **Create user**

### Step 3: Log In
1. Go to `https://yourdomain.com/admin`
2. Enter the email and password you just created
3. Click **Sign In**

You're now logged in and can manage your content!

## Admin Panel Features

### Testimonials Tab
- **Add New Testimonial:** Click the "Add New" button to create a testimonial
- **Edit Testimonial:** Click the edit icon on any testimonial
- **Reorder Testimonials:** Use the up/down arrows to change display order
- **Toggle Visibility:** Show or hide testimonials from the public website
- **Feature on Home:** Mark up to 5 testimonials to display on the home page
- **Tags:** Add engagement types and topic tags to categorize testimonials
- **Delete:** Remove testimonials you no longer need

### Contact Submissions Tab
- **View All Submissions:** See all contact form submissions in one place
- **Status Management:** Update submission status (New → Read → Responded → Archived)
- **Email Links:** Click any email address to open your email client and reply
- **Badge Notification:** See how many new (unread) submissions you have
- **Delete:** Remove old submissions after handling them

## Logging Out

Always click the **Logout** button in the top right when you're done managing your content. This ensures your admin session is properly closed.

## Security Best Practices

1. **Use a Strong Password:** Use a unique, complex password for your admin account
2. **Don't Share Credentials:** Keep your admin login information private
3. **Log Out:** Always log out when done, especially on shared computers
4. **Update Password:** Consider changing your password periodically in the Supabase dashboard
5. **Keep URL Private:** Don't share the `/admin` URL publicly

## Troubleshooting

**Can't log in?**
- Double-check your email and password
- Make sure you confirmed your user in Supabase (Auto Confirm User was checked)
- Try resetting your password in the Supabase dashboard

**Page shows "Loading..." forever?**
- Check your internet connection
- Refresh the page
- Clear your browser cache

**Changes not appearing on the website?**
- Make sure testimonials are marked as "Active" to display publicly
- Check that featured testimonials are marked with the star icon
- Refresh the public website to see changes

## Need Help?

If you encounter any issues accessing or using the admin panel, contact your web developer for assistance.

---

**Remember:** The `/admin` route is completely hidden from the public. Only people who know the URL and have login credentials can access it.
