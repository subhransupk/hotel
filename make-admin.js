// Script to manually set a user as admin
// Usage: node make-admin.js YOUR_USER_ID

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const clerk = require('@clerk/clerk-sdk-node');

// Initialize Clerk client
const clerkApiKey = process.env.CLERK_SECRET_KEY;

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function makeUserAdmin(userId) {
  if (!userId) {
    console.error('Error: User ID is required');
    console.log('Usage: node make-admin.js YOUR_USER_ID');
    process.exit(1);
  }

  console.log(`Setting user ${userId} as admin...`);

  try {
    // 1. Update user role in Clerk
    console.log('Updating user role in Clerk...');
    await clerk.users.updateUser(userId, {
      publicMetadata: {
        role: 'admin',
      },
    });
    console.log('✅ Successfully updated user role in Clerk');

    // 2. Update user profile in Supabase
    console.log('Updating user profile in Supabase...');
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        user_type: 'admin',
        status: 'active',
        onboarding_status: 'completed',
      })
      .eq('id', userId);

    if (error) {
      console.error('❌ Error updating user profile in Supabase:', error);
      process.exit(1);
    }

    console.log('✅ Successfully updated user profile in Supabase');
    console.log('\nUser is now an admin! Please sign out and sign back in to apply changes.');
  } catch (error) {
    console.error('❌ Error making user admin:', error);
    process.exit(1);
  }
}

// Get user ID from command line arguments
const userId = process.argv[2];
makeUserAdmin(userId); 