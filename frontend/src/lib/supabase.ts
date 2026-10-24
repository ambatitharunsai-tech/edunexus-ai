// EduNexus AI — browser Supabase client. Only the public publishable/anon key belongs here.
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabasePublicKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = (): boolean =>
  Boolean(
    supabaseUrl.startsWith('https://') &&
    supabasePublicKey &&
    !supabaseUrl.toLowerCase().includes('placeholder') &&
    !supabasePublicKey.toLowerCase().includes('placeholder')
  );

// Keep module import safe in local builds without credentials; real sign-in refuses this fallback.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabasePublicKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
