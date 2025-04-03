// Script to check a user's current role
// Usage: node check-user-role.js YOUR_USER_ID

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const clerk = require('@clerk/clerk-sdk-node');

// Initialize Clerk client
const clerkApiKey = process.env.CLERK_SECRET_KEY;

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkUserRole(userId) {
  if (!userId) {
    console.error('Error: User ID is required');
    console.log('Usage: node check-user-role.js YOUR_USER_ID');
    process.exit(1);
  }

  console.log(`Checking role for user ${userId}...`);

  try {
    // 1. Check user role in Clerk
    console.log('\nChecking user role in Clerk...');
    const user = await clerk.users.getUser(userId);
    console.log('Clerk User Details:');
    console.log('- Email:', user.emailAddresses[0]?.emailAddress);
    console.log('- Role:', user.publicMetadata.role || 'No role set');
    console.log('- Public Metadata:', JSON.stringify(user.publicMetadata, null, 2));

    // 2. Check user profile in Supabase
    console.log('\nChecking user profile in Supabase...');
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile from Supabase:', error);
    } else if (!data) {
      console.log('No user profile found in Supabase');
    } else {
      console.log('Supabase User Profile:');
      console.log('- User Type:', data.user_type);
      console.log('- Status:', data.status);
      console.log('- Onboarding Status:', data.onboarding_status);
      console.log('- Full Profile:', JSON.stringify(data, null, 2));
    }

    // 3. Check environment variables
    console.log('\nEnvironment Variables:');
    console.log('- ADMIN_EMAIL:', process.env.ADMIN_EMAIL || 'Not set');
    
  } catch (error) {
    console.error('Error checking user role:', error);
    process.exit(1);
  }
}

// Get user ID from command line arguments
const userId = process.argv[2];
checkUserRole(userId); 