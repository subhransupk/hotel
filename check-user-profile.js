// Script to check if a user profile exists in Supabase
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Get the user ID from command line arguments
const userId = process.argv[2];

if (!userId) {
  console.error('Please provide a user ID as an argument');
  console.error('Usage: node check-user-profile.js USER_ID');
  process.exit(1);
}

async function checkUserProfile() {
  // Initialize Supabase client with service role key for admin access
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
  }

  console.log('Initializing Supabase client with service role key');
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // Check if user profile exists
    console.log(`Checking user profile for user ID: ${userId}`);
    const { data: userProfile, error: userProfileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (userProfileError) {
      console.error('Error checking user profile:', userProfileError);
      process.exit(1);
    }

    if (!userProfile) {
      console.log('User profile not found in Supabase');
      
      // Create a new user profile
      console.log('Creating a new user profile...');
      const { data: newProfile, error: createError } = await supabase
        .from('user_profiles')
        .insert({
          id: userId,
          user_type: 'hotel',
          first_name: 'User',
          last_name: 'Name',
          status: 'active',
          onboarding_status: 'completed',
        })
        .select();

      if (createError) {
        console.error('Error creating user profile:', createError);
        process.exit(1);
      }

      console.log('User profile created successfully:', newProfile);
    } else {
      console.log('User profile found:', userProfile);
      
      // Update the onboarding status if needed
      if (userProfile.onboarding_status !== 'completed') {
        console.log('Updating onboarding status to completed...');
        const { data: updatedProfile, error: updateError } = await supabase
          .from('user_profiles')
          .update({ onboarding_status: 'completed' })
          .eq('id', userId)
          .select();

        if (updateError) {
          console.error('Error updating user profile:', updateError);
          process.exit(1);
        }

        console.log('User profile updated successfully:', updatedProfile);
      }
    }

    // Check if hotel profile exists
    console.log(`Checking hotel profile for user ID: ${userId}`);
    const { data: hotelProfile, error: hotelProfileError } = await supabase
      .from('hotel_profiles')
      .select('*')
      .eq('owner_id', userId)
      .maybeSingle();

    if (hotelProfileError) {
      console.error('Error checking hotel profile:', hotelProfileError);
      process.exit(1);
    }

    if (!hotelProfile) {
      console.log('Hotel profile not found in Supabase');
      
      // Create a new hotel profile
      console.log('Creating a new hotel profile...');
      const { data: newHotel, error: createHotelError } = await supabase
        .from('hotel_profiles')
        .insert({
          owner_id: userId,
          hotel_name: 'Default Hotel',
          email: 'example@example.com',
          phone: '1234567890',
          address: 'Default Address',
          city: 'Default City',
          country: 'Default Country',
        })
        .select();

      if (createHotelError) {
        console.error('Error creating hotel profile:', createHotelError);
        process.exit(1);
      }

      console.log('Hotel profile created successfully:', newHotel);
    } else {
      console.log('Hotel profile found:', hotelProfile);
    }

  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

checkUserProfile(); 