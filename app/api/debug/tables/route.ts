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
    // Get information about the user_profiles table
    const { data: userProfilesData, error: userProfilesError } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .limit(1)

    // Get information about the hotel_profiles table
    const { data: hotelProfilesData, error: hotelProfilesError } = await supabaseAdmin
      .from('hotel_profiles')
      .select('*')
      .limit(1)

    // Get all tables in the public schema
    let tablesData = null;
    let tablesError = null;
    try {
      const result = await supabaseAdmin
        .rpc('get_tables')
        .select('*');
      tablesData = result.data;
      tablesError = result.error;
    } catch (error: any) {
      tablesError = { message: 'Function get_tables not available' };
    }

    // Try to get table information directly from PostgreSQL information_schema
    let schemaData = null;
    let schemaError = null;
    try {
      const result = await supabaseAdmin
        .from('information_schema.columns')
        .select('table_name, column_name, data_type')
        .in('table_name', ['user_profiles', 'hotel_profiles']);
      schemaData = result.data;
      schemaError = result.error;
    } catch (error: any) {
      schemaError = { message: 'Cannot access information_schema' };
    }

    return NextResponse.json({
      userProfiles: {
        data: userProfilesData,
        error: userProfilesError,
        columns: userProfilesData && userProfilesData.length > 0 
          ? Object.keys(userProfilesData[0]) 
          : []
      },
      hotelProfiles: {
        data: hotelProfilesData,
        error: hotelProfilesError,
        columns: hotelProfilesData && hotelProfilesData.length > 0 
          ? Object.keys(hotelProfilesData[0]) 
          : []
      },
      tables: {
        data: tablesData,
        error: tablesError
      },
      schema: {
        data: schemaData,
        error: schemaError
      }
    })
  } catch (error: any) {
    console.error('Debug error:', error)
    return NextResponse.json(
      { 
        error: 'An error occurred while fetching table information',
        details: error.message
      },
      { status: 500 }
    )
  }
} 