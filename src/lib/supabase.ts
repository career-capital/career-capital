import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
