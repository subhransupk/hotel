import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(req: Request) {
  console.log('Check Profile API called');
  
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
    
    // Initialize Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get user data from Clerk
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    
    // Check if user profile exists
    console.log('Checking if user profile exists');
    const { data: existingProfile, error: profileCheckError } = await supabase
      .from('user_profiles')
      .select('id, onboarding_status')
      .eq('id', userId)
      .single();
      
    if (profileCheckError && profileCheckError.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error checking user profile:', profileCheckError);
      return NextResponse.json({ 
        message: 'Failed to check user profile',
        error: profileCheckError.message
      }, { status: 500 });
    }
    
    console.log('Existing profile check result:', existingProfile);
    
    let profileCreated = false;
    let hotelCreated = false;
    
    // If profile doesn't exist, create one
    if (!existingProfile) {
      console.log('Creating new user profile in Supabase');
      const { data: newProfile, error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: userId,
          user_type: 'hotel',
          first_name: user.firstName || 'User',
          last_name: user.lastName || 'Name',
          email: user.emailAddresses[0]?.emailAddress || '',
          status: 'active',
          onboarding_status: 'completed',
        })
        .select();
      
      if (profileError) {
        console.error('Error creating user profile:', profileError);
        return NextResponse.json({ 
          message: 'Failed to create user profile',
          error: profileError.message
        }, { status: 500 });
      }
      
      console.log('User profile created successfully:', newProfile);
      profileCreated = true;
    } else if (existingProfile.onboarding_status !== 'completed') {
      // Update existing profile if onboarding is not completed
      console.log('Updating existing user profile in Supabase');
      const { data: updatedProfile, error: profileError } = await supabase
        .from('user_profiles')
        .update({
          onboarding_status: 'completed',
        })
        .eq('id', userId)
        .select();
      
      if (profileError) {
        console.error('Error updating user profile:', profileError);
        return NextResponse.json({ 
          message: 'Failed to update user profile',
          error: profileError.message
        }, { status: 500 });
      }
      
      console.log('User profile updated successfully:', updatedProfile);
      profileCreated = true;
    } else {
      profileCreated = true;
    }
    
    // Check if hotel profile exists
    console.log('Checking if hotel profile exists');
    const { data: existingHotel, error: hotelCheckError } = await supabase
      .from('hotel_profiles')
      .select('id')
      .eq('owner_id', userId)
      .single();
      
    if (hotelCheckError && hotelCheckError.code !== 'PGRST116') {
      console.error('Error checking hotel profile:', hotelCheckError);
      return NextResponse.json({ 
        message: 'Failed to check hotel profile',
        error: hotelCheckError.message
      }, { status: 500 });
    }
    
    console.log('Existing hotel check result:', existingHotel);
    
    // If hotel doesn't exist, create one
    if (!existingHotel) {
      console.log('Creating default hotel profile in Supabase');
      const { data: newHotel, error: hotelError } = await supabase
        .from('hotel_profiles')
        .insert({
          owner_id: userId,
          hotel_name: 'Default Hotel',
          email: user.emailAddresses[0]?.emailAddress || 'example@example.com',
          phone: '1234567890',
          address: 'Default Address',
          city: 'Default City',
          country: 'Default Country',
        })
        .select();
      
      if (hotelError) {
        console.error('Error creating hotel profile:', hotelError);
        return NextResponse.json({ 
          message: 'Failed to create hotel profile',
          error: hotelError.message
        }, { status: 500 });
      }
      
      console.log('Hotel profile created successfully:', newHotel);
      hotelCreated = true;
    } else {
      hotelCreated = true;
    }
    
    return NextResponse.json({ 
      message: 'Profile check completed',
      profileExists: !!existingProfile,
      profileCreated,
      hotelExists: !!existingHotel,
      hotelCreated,
      onboardingCompleted: existingProfile?.onboarding_status === 'completed' || profileCreated
    }, { status: 200 });
    
  } catch (error) {
    console.error('Unexpected error during profile check:', error);
    return NextResponse.json({ 
      message: 'An unexpected error occurred',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 