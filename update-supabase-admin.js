// Script to update a user to admin in Supabase only
// Usage: node update-supabase-admin.js YOUR_USER_ID

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function makeUserAdminInSupabase(userId) {
  if (!userId) {
    console.error('Error: User ID is required');
    console.log('Usage: node update-supabase-admin.js YOUR_USER_ID');
    process.exit(1);
  }

  console.log(`Setting user ${userId} as admin in Supabase...`);

  try {
    // Update user profile in Supabase
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        user_type: 'admin',
        status: 'active',
        onboarding_status: 'completed',
      })
      .eq('id', userId)
      .select();

    if (error) {
      console.error('❌ Error updating user profile in Supabase:', error);
      process.exit(1);
    }

    console.log('✅ Successfully updated user profile in Supabase:', data);
    console.log('\nIMPORTANT: You still need to update the role in Clerk!');
    console.log('Go to the Clerk Dashboard, find your user, and add this to Public Metadata:');
    console.log('{\n  "role": "admin"\n}');
  } catch (error) {
    console.error('❌ Error making user admin in Supabase:', error);
    process.exit(1);
  }
}

// Get user ID from command line arguments
const userId = process.argv[2];
makeUserAdminInSupabase(userId); 