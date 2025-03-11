import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/clerk-sdk-node';
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
      console.error('Missing Supabase environment variables');
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
      // Check if user profile already exists
      console.log('Checking if user profile already exists');
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
      await clerkClient.users.updateUser(userId, {
        firstName,
        lastName,
      });
      clerkUpdated = true;
      console.log('Clerk user updated successfully');
      
      // Update user profile in Supabase
      console.log('Updating user profile in Supabase');
      const { data: updateProfileData, error: updateProfileError } = await supabase
        .from('user_profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          email,
          onboarding_status: 'completed'
        })
        .eq('id', userId);
      
      if (updateProfileError) {
        console.error('Error updating user profile in Supabase:', updateProfileError);
        throw new Error(`Failed to update user profile in Supabase: ${updateProfileError.message}`);
      }
      
      profileUpdated = true;
      console.log('User profile updated successfully');
      
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
      console.error('Error completing user onboarding:', error);
      throw error;
    } finally {
      if (!clerkUpdated && !profileUpdated) {
        console.error('Rollback: Neither Clerk nor Supabase user profile was updated');
      }
    }
  } catch (error) {
    console.error('Error completing user onboarding:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}