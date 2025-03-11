import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Initialize Supabase Admin client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
}

// Create Supabase client only if environment variables are available
const supabaseAdmin = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

export async function GET(request: NextRequest) {
  try {
    // Check if Supabase client is initialized
    if (!supabaseAdmin) {
      console.error('Supabase client is not initialized due to missing environment variables');
      return NextResponse.json({ 
        message: 'Server configuration error: Database connection not available',
        details: 'Missing required environment variables for Supabase'
      }, { status: 500 });
    }
    
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