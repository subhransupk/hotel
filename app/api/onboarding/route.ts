import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Form schema
const onboardingSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  hotelName: z.string().min(2, 'Hotel name is required'),
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().optional(),
  country: z.string().min(2, 'Country is required'),
  postalCode: z.string().optional(),
  email: z.string().email().optional(),
});

export async function POST(req: Request) {
  console.log('Onboarding API called');
  
  try {
    // Check if the user is authenticated
    const authResult = await auth();
    const userId = authResult.userId;
    console.log('Authenticated user ID:', userId);
    
    if (!userId) {
      console.error('Unauthorized access attempt');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    // Validate Supabase environment variables
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables:', { 
        supabaseUrl: !!supabaseUrl, 
        supabaseServiceKey: !!supabaseServiceKey 
      });
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }
    
    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Parse and validate the request body
    let body;
    try {
      body = await req.json();
      console.log('Request body received:', JSON.stringify(body));
    } catch (error) {
      console.error('Invalid JSON payload:', error);
      return NextResponse.json({ message: 'Invalid JSON payload' }, { status: 400 });
    }
    
    const validationResult = onboardingSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.error('Validation errors:', validationResult.error.errors);
      return NextResponse.json(
        { message: 'Invalid request data', errors: validationResult.error.errors },
        { status: 400 }
      );
    }
    
    const { 
      firstName, 
      lastName, 
      hotelName, 
      phoneNumber, 
      address, 
      city, 
      state, 
      country, 
      postalCode,
      email
    } = validationResult.data;
    
    // Verify that the authenticated user matches the user ID in the request
    if (userId !== body.userId) {
      console.error('User ID mismatch:', { authUserId: userId, requestUserId: body.userId });
      return NextResponse.json({ message: 'User ID mismatch' }, { status: 403 });
    }
    
    // Track changes for potential rollback
    let clerkUpdated = false;
    let profileUpdated = false;
    
    try {
      // First check if user profile exists
      console.log('Checking if user profile exists');
      const { data: existingProfile, error: profileCheckError } = await supabase
        .from('user_profiles')
        .select('id, onboarding_status')
        .eq('id', userId)
        .single();
        
      if (profileCheckError && profileCheckError.code !== 'PGRST116') { // PGRST116 is "not found"
        console.error('Error checking user profile:', profileCheckError);
        throw new Error(`Failed to check user profile: ${profileCheckError.message}`);
      }
      
      console.log('Existing profile check result:', existingProfile);
      
      // Update user profile in Clerk
      console.log('Updating user in Clerk');
      const clerk = await clerkClient();
      await clerk.users.updateUser(userId, {
        firstName,
        lastName,
      });
      clerkUpdated = true;
      console.log('Clerk user updated successfully');
      
      if (existingProfile) {
        // Update existing user profile in Supabase
        console.log('Updating existing user profile in Supabase');
        const { data: updatedProfile, error: profileError } = await supabase
          .from('user_profiles')
          .update({
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            email: email || '',
            status: 'active',
            onboarding_status: 'completed',
          })
          .eq('id', userId)
          .select();
        
        if (profileError) {
          console.error('Error updating user profile:', profileError);
          throw new Error(`Failed to update user profile: ${profileError.message}`);
        }
        
        console.log('User profile updated successfully:', updatedProfile);
        profileUpdated = true;
      } else {
        // Create new user profile in Supabase
        console.log('Creating new user profile in Supabase');
        const { data: newProfile, error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: userId,
            user_type: 'hotel',
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            email: email || '',
            status: 'active',
            onboarding_status: 'completed',
          })
          .select();
        
        if (profileError) {
          console.error('Error creating user profile:', profileError);
          throw new Error(`Failed to create user profile: ${profileError.message}`);
        }
        
        console.log('User profile created successfully:', newProfile);
        profileUpdated = true;
      }
      
      // Create hotel profile in Supabase
      console.log('Creating hotel profile in Supabase');
      const { data: hotel, error: hotelError } = await supabase
        .from('hotel_profiles')
        .insert({
          owner_id: userId,
          hotel_name: hotelName,
          email: email || '',
          phone: phoneNumber,
          address,
          city,
          state: state || null,
          country,
          postal_code: postalCode || null,
        })
        .select()
        .single();
      
      if (hotelError) {
        console.error('Error creating hotel profile:', hotelError);
        throw new Error(`Failed to create hotel profile: ${hotelError.message}`);
      }
      
      console.log('Hotel profile created successfully:', hotel);
      console.log(`Onboarding completed successfully for user ${userId}`);
      
      return NextResponse.json({ 
        message: 'Onboarding completed successfully',
        hotelId: hotel.id
      }, { status: 200 });
      
    } catch (error) {
      console.error('Error during onboarding process:', error);
      
      // Attempt to rollback changes if needed
      try {
        if (profileUpdated) {
          // Revert profile update in Supabase
          await supabase
            .from('user_profiles')
            .update({
              status: 'pending',
              onboarding_status: 'pending',
            })
            .eq('id', userId);
          console.log('Successfully rolled back Supabase profile update');
        }
      } catch (rollbackError) {
        console.error('Error during rollback:', rollbackError);
      }
      
      return NextResponse.json({ 
        message: 'Failed to complete onboarding',
        error: error instanceof Error ? error.message : String(error)
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('Unexpected error during onboarding:', error);
    return NextResponse.json({ 
      message: 'An unexpected error occurred',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 