import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Initialize Supabase Admin client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  throw new Error('Missing required environment variables for Supabase')
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export async function GET(request: NextRequest) {
  try {
    // Try to create a test user profile with minimal fields
    const testUserId = 'test-user-id-' + Date.now();
    const { error: userProfileError } = await supabaseAdmin
      .from('user_profiles')
      .insert({
        id: testUserId,
        first_name: 'Test',
        last_name: 'User',
      })
      .select()
      .single();

    // Try to create a test hotel profile with minimal fields
    const { error: hotelProfileError } = await supabaseAdmin
      .from('hotel_profiles')
      .insert({
        owner_id: testUserId,
        hotel_name: 'Test Hotel',
      })
      .select()
      .single();

    return NextResponse.json({
      userProfileError: userProfileError ? {
        message: userProfileError.message,
        code: userProfileError.code,
        details: userProfileError.details,
      } : null,
      hotelProfileError: hotelProfileError ? {
        message: hotelProfileError.message,
        code: hotelProfileError.code,
        details: hotelProfileError.details,
      } : null,
    });
  } catch (error: any) {
    console.error('Debug error:', error)
    return NextResponse.json(
      { 
        error: 'An error occurred while testing table structure',
        details: error.message
      },
      { status: 500 }
    )
  }
} 