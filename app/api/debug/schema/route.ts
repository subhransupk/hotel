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
    
    // Get table information for user_profiles
    const { data: userProfilesInfo, error: userProfilesError } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .limit(1)

    // Get table information for hotel_profiles
    const { data: hotelProfilesInfo, error: hotelProfilesError } = await supabaseAdmin
      .from('hotel_profiles')
      .select('*')
      .limit(1)

    // Get schema information using RPC
    const { data: schemaInfo, error: schemaError } = await supabaseAdmin.rpc('get_schema_info')

    return NextResponse.json({
      userProfilesInfo: {
        data: userProfilesInfo,
        error: userProfilesError ? {
          message: userProfilesError.message,
          code: userProfilesError.code,
          details: userProfilesError.details,
        } : null,
      },
      hotelProfilesInfo: {
        data: hotelProfilesInfo,
        error: hotelProfilesError ? {
          message: hotelProfilesError.message,
          code: hotelProfilesError.code,
          details: hotelProfilesError.details,
        } : null,
      },
      schemaInfo: {
        data: schemaInfo,
        error: schemaError ? {
          message: schemaError.message,
          code: schemaError.code,
          details: schemaError.details,
        } : null,
      },
      tables: {
        userProfiles: userProfilesError ? null : Object.keys(userProfilesInfo?.[0] || {}),
        hotelProfiles: hotelProfilesError ? null : Object.keys(hotelProfilesInfo?.[0] || {}),
      }
    })
  } catch (error: any) {
    console.error('Schema debug error:', error)
    return NextResponse.json(
      { 
        error: 'An error occurred while fetching schema information',
        details: error.message
      },
      { status: 500 }
    )
  }
} 