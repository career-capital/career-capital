# Testimonials Management Guide

This guide explains how to add and manage testimonials in the Career Capital website, including how to add multiple engagement tags to a single testimonial.

## Accessing the Admin Panel

1. Navigate to `/login` on your website
2. Enter your admin credentials
3. You'll be redirected to the admin dashboard at `/admin`

## Adding a New Testimonial

1. In the Admin panel, make sure you're on the **Testimonials** tab
2. Click the **Add New Testimonial** button
3. Fill in the required fields:

### Required Fields

- **Quote**: The testimonial text
- **Author**: First name and last initial (e.g., "Gabriela S")
  - The period after the initial will be added automatically
- **Company**: The person's company or organization
- **Testimonial Type**:
  - **Client Testimonial**: For client feedback
  - **Professional Endorsement**: For colleague/peer recommendations

### Optional Fields

- **Display Order**: Position in the testimonial list (leave blank to add at the end)
- **Featured**: Check this to display on the home page
- **Active**: Uncheck to hide the testimonial without deleting it

## Adding Multiple Engagement Tags

Tags help organize and filter testimonials. There are two types of tags:

### 1. Engagement Type Tags (Primary - Blue)

These appear as **filterable options** on the Testimonials page. Select all that apply:

- **Keynote Speaking**: For testimonials related to speaking engagements
- **Workshop Facilitation**: For testimonials about workshops or training sessions
- **Executive Coaching**: For testimonials about one-on-one coaching
- **Strategy & Roadmap**: For testimonials about strategic planning work

**How to Add**: Simply click on any of the blue buttons under "Engagement Type" to select them. Click again to deselect.

### 2. Topic Tags (Secondary - Light Blue)

These provide additional context about the testimonial content:

- **AI Fluency**
- **Social Wealth**
- **Leadership Development**
- **Relationship Management**
- **Organizational Change**
- **Career Capital**
- **Mindset Shift**
- **AI Readiness**

**How to Add**: Click on any of the tags under "Topics & Keywords" to select them. You can also add custom tags using the input field.

### Example: Adding Multiple Tags to One Testimonial

Let's say you're adding a testimonial from Kelly F. about a keynote speaking engagement on social wealth and leadership:

1. Select **Engagement Type Tags**:
   - Click "Keynote Speaking" ✓

2. Select **Topic Tags**:
   - Click "Social Wealth" ✓
   - Click "Leadership Development" ✓

3. The final testimonial will have 3 tags total: `Keynote Speaking`, `Social Wealth`, `Leadership Development`

## Using the SQL Method (Advanced)

If you prefer to add testimonials directly to the database, you can use SQL commands:

```sql
INSERT INTO testimonials (author, company, quote, display_order, is_active, featured, testimonial_type, tags)
VALUES (
  'Jane D',
  'Acme Corp',
  'Your testimonial quote here...',
  1,
  true,
  true,
  'character_witness',
  ARRAY['Keynote Speaking', 'AI Fluency', 'Leadership Development']
);
```

### Adding Multiple Tags in SQL

The `tags` field accepts a PostgreSQL array. To add multiple tags:

```sql
-- Example with 2 engagement tags and 3 topic tags
ARRAY['Keynote Speaking', 'Workshop Facilitation', 'AI Fluency', 'Social Wealth', 'Mindset Shift']
```

### Updating Tags on Existing Testimonials

```sql
-- Add tags to an existing testimonial
UPDATE testimonials
SET tags = ARRAY['Executive Coaching', 'Career Capital', 'Social Wealth']
WHERE author = 'Gabriela S.';

-- Change the testimonial type
UPDATE testimonials
SET testimonial_type = 'character_witness'
WHERE author = 'Gabriela S.';
```

## Best Practices

1. **Be Consistent**: Use the predefined tags whenever possible for better organization
2. **Select Relevant Tags**: Choose 2-4 tags that truly represent the testimonial content
3. **Include at Least One Engagement Type**: This helps visitors filter testimonials by service type
4. **Use Professional Endorsements**: Set testimonial_type to 'character_witness' for peer recommendations
5. **Feature Important Testimonials**: Only feature 3-5 testimonials on the home page for maximum impact

## Tag Guidelines

### When to Use Each Engagement Type

- **Keynote Speaking**: Client attended or booked a speaking engagement
- **Workshop Facilitation**: Client participated in an interactive workshop or training
- **Executive Coaching**: One-on-one coaching relationship
- **Strategy & Roadmap**: Strategic planning, AI readiness assessment, or roadmap development

### When to Use Topic Tags

Add topic tags that clearly appear in the testimonial content:

- If they mention "AI" or "artificial intelligence" → Add **AI Fluency** or **AI Readiness**
- If they mention "relationships" or "network" → Add **Social Wealth** or **Relationship Management**
- If they mention "leadership" or "leading teams" → Add **Leadership Development**
- If they mention "transformation" or "change" → Add **Organizational Change** or **Mindset Shift**

## Troubleshooting

**Q: The period isn't being added after the last initial**
A: The period is added automatically by the database. If you see "Jane D", it will be saved as "Jane D."

**Q: My tags aren't showing up on the Testimonials page filters**
A: Only **Engagement Type Tags** (Keynote Speaking, Workshop Facilitation, Executive Coaching, Strategy & Roadmap) appear as filters. Topic tags help with categorization but don't create filter buttons.

**Q: Can I create custom engagement type tags?**
A: Custom engagement types need to be added to the code. Contact your developer if you need additional engagement type options.

## Need Help?

If you encounter any issues or need assistance, refer to the `ADMIN_ACCESS_GUIDE.md` for more information about managing the admin panel.
