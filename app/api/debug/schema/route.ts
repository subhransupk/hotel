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