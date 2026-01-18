import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a placeholder client if environment variables are missing
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key');

console.log('Supabase client initialized:', {
  url: supabaseUrl ? 'configured' : 'missing',
  key: supabaseAnonKey ? 'configured' : 'missing'
});

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  display_order: number;
  is_active: boolean;
  featured: boolean;
  tags: string[];
  testimonial_type: 'client' | 'professional_endorsement';
  created_at: string;
  updated_at: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  meta_description: string;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Section {
  id: string;
  page_id: string;
  section_type: string;
  display_order: number;
  is_published: boolean;
  background_color: string;
  text_color: string;
  padding: string;
  created_at: string;
  updated_at: string;
}

export interface ContentBlock {
  id: string;
  section_id: string;
  block_type: string;
  content: string;
  display_order: number;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Button {
  id: string;
  section_id: string;
  button_text: string;
  button_type: string;
  link_type: string;
  link_destination: string;
  is_external: boolean;
  display_order: number;
  style_variant: string;
  created_at: string;
  updated_at: string;
}

export interface SectionTemplate {
  id: string;
  name: string;
  section_type: string;
  description: string;
  default_config: Record<string, any>;
  preview_image: string;
  created_at: string;
}

export interface SectionWithContent extends Section {
  content_blocks: ContentBlock[];
  buttons: Button[];
}
