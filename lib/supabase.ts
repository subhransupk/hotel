'use client'

import { createClient } from '@supabase/supabase-js'

// For local development with Supabase CLI
// These environment variables will be set when you run 'npx supabase start'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  throw new Error('Missing required environment variables for Supabase')
}

// Create a single supabase client for interacting with your database
// No authentication - we'll use Clerk for that
export const supabase = createClient(supabaseUrl, supabaseAnonKey) 