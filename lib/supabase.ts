// This file demonstrates how to initialize Supabase clients for both client-side and server-side operations.
// You would replace the mock data in `lib/data.ts` with actual Supabase queries.

import { createClient } from "@supabase/supabase-js"

// Ensure these environment variables are set in your Vercel project settings.
// For client-side, they must be prefixed with NEXT_PUBLIC_.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY // For server-side only

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables are not set. Mock data will be used.")
}

// Client-side Supabase client (for use in browser components)
// Using a singleton pattern to prevent multiple client instances
let supabaseClient: ReturnType<typeof createClient> | null = null

export function getClientSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set.")
    return null // Or throw an error, depending on desired behavior
  }
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}

// Server-side Supabase client (for use in Server Components, Route Handlers, Server Actions)
export function getServerSupabaseClient() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set.")
    return null // Or throw an error
  }
  return createClient(supabaseUrl, supabaseServiceRoleKey)
}

// Example of how you might fetch data using Supabase (not implemented in this project's UI yet)
/*
import { getClientSupabaseClient } from './supabase';

async function fetchProvidersFromSupabase() {
  const supabase = getClientSupabaseClient();
  if (!supabase) {
    console.error("Supabase client not initialized.");
    return [];
  }
  const { data, error } = await supabase.from('providers').select('*');
  if (error) {
    console.error('Error fetching providers:', error);
    return [];
  }
  return data;
}
*/
