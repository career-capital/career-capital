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
  testimonial_type: 'client' | 'character_witness';
  created_at: string;
  updated_at: string;
}
