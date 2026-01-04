/*
  # Update Testimonial Type and Add Tag Guidance

  1. Changes
    - Update all existing testimonials from 'character_witness' to 'professional_endorsement'
    - Add database comment on tags column to document the 4 valid engagement type options
    - Add database comment on testimonial_type column to document valid types
  
  2. Engagement Type Tags (for reference)
    The following are the valid engagement type tags to use:
    - 'Public Speaking'
    - 'Workshop Facilitation'
    - 'Executive Coaching'
    - 'Strategy & Roadmap'
  
  3. Notes
    - This ensures consistency with the frontend "Professional Endorsements" label
    - Helper text will be visible in database tools for future contributors
    - No data is lost; only the type name changes
*/

-- Update existing testimonials from character_witness to professional_endorsement
UPDATE testimonials
SET testimonial_type = 'professional_endorsement',
    updated_at = now()
WHERE testimonial_type = 'character_witness';

-- Add helpful comment on the tags column
COMMENT ON COLUMN testimonials.tags IS 
'Array of tags for the testimonial. For engagement types, use one of these 4 options: "Public Speaking", "Workshop Facilitation", "Executive Coaching", or "Strategy & Roadmap". Additional custom tags are allowed for other categorization needs.';

-- Add helpful comment on the testimonial_type column
COMMENT ON COLUMN testimonials.testimonial_type IS 
'Type of testimonial. Valid options: "client" (default) or "professional_endorsement" (for endorsements and recommendations from colleagues, peers, and professional contacts).';