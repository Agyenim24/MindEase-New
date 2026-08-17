import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://xkakuhjwqrzkgkiremzt.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrYWt1aGp3cXJ6a2draXJlbXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxODk3NTIsImV4cCI6MjEwMTc2NTc1Mn0.33Iu2CMqLpodbwzRNHsYHyfl7xWC0EaR86pWRlFi6qU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
