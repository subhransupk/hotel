import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables for Supabase');
}

// Create Supabase client only if environment variables are available
const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Form schema
const partnerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  companyName: z.string().min(2, 'Company name is required'),
  partnerType: z.enum(['technology', 'hospitality_consultant', 'enterprise_chains', 'others']),
  website: z.string().url('Valid URL is required').optional().or(z.literal('')),
  description: z.string().optional(),
});

export async function POST(req: Request) {
  console.log('=== CREATE PARTNER API CALLED ===');
  
  try {
    // Check if the user is authenticated
    const user = await currentUser();
    console.log('Current user:', user ? `ID: ${user.id}, Email: ${user.emailAddresses[0]?.emailAddress}` : 'No user found');
    
    if (!user) {
      console.log('Unauthorized: No user found');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    // Check if Supabase client is initialized
    if (!supabase) {
      console.error('Supabase client is not initialized due to missing environment variables');
      return NextResponse.json({ 
        message: 'Server configuration error: Database connection not available',
        details: 'Missing required environment variables for Supabase'
      }, { status: 500 });
    }
    
    // Parse and validate the request body
    let body;
    try {
      body = await req.json();
      console.log('Request body:', JSON.stringify(body));
    } catch (error) {
      console.error('Error parsing request body:', error);
      return NextResponse.json({ message: 'Invalid JSON in request body' }, { status: 400 });
    }
    
    const validationResult = partnerSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.log('Validation errors:', validationResult.error.errors);
      return NextResponse.json(
        { message: 'Invalid request data', errors: validationResult.error.errors },
        { status: 400 }
      );
    }
    
    const { firstName, lastName, email, companyName, partnerType, website, description } = validationResult.data;
    console.log('Validated data:', { firstName, lastName, email, companyName, partnerType, website, description });
    
    // Generate a unique ID for the partner
    const newUserId = `partner_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    console.log('Generated partner ID:', newUserId);
    
    // Check if Supabase connection is working
    try {
      const { data: healthCheck, error: healthError } = await supabase.from('user_profiles').select('count').limit(1);
      if (healthError) {
        console.error('Supabase health check failed:', healthError);
        return NextResponse.json({ message: 'Database connection error', error: healthError.message }, { status: 500 });
      }
      console.log('Supabase health check passed:', healthCheck);
    } catch (healthCheckError) {
      console.error('Error during Supabase health check:', healthCheckError);
      return NextResponse.json({ message: 'Database connection error' }, { status: 500 });
    }
    
    // Create partner profile in Supabase user_profiles table with partner metadata
    console.log('Creating partner profile in user_profiles table...');
    const { data: userProfileData, error: userProfileError } = await supabase
      .from('user_profiles')
      .insert({
        id: newUserId,
        user_type: 'partner',
        first_name: firstName,
        last_name: lastName,
        email: email,
        status: 'active',
        onboarding_status: 'completed',
        created_at: new Date().toISOString(),
        metadata: {
          partner_type: partnerType,
          company_name: companyName,
          website: website || null,
          description: description || null,
          verified_by: user.id,
          is_verified: true
        }
      })
      .select();
    
    if (userProfileError) {
      console.error('Error creating user profile:', userProfileError);
      return NextResponse.json({ 
        message: 'Failed to create partner profile', 
        error: userProfileError.message,
        details: userProfileError
      }, { status: 500 });
    }
    
    console.log('Partner profile created successfully:', userProfileData);
    
    // Return success response
    console.log('=== PARTNER CREATION COMPLETED SUCCESSFULLY ===');
    return NextResponse.json({ 
      message: 'Partner created successfully',
      partnerId: newUserId,
      partnerProfile: userProfileData
    }, { status: 201 });
    
  } catch (error) {
    console.error('Unexpected error creating partner:', error);
    return NextResponse.json({ 
      message: 'An unexpected error occurred',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 