// Script to check Supabase tables
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase URL or service key not found in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkTables() {
  console.log('Checking Supabase tables...');
  
  try {
    // Check user_profiles table
    console.log('\nChecking user_profiles table:');
    const { data: userProfilesData, error: userProfilesError } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(5);
    
    if (userProfilesError) {
      console.error('Error fetching user_profiles:', userProfilesError);
    } else {
      console.log(`Found ${userProfilesData.length} user profiles`);
      console.log('Sample user profile:', userProfilesData[0] || 'No user profiles found');
      
      // Check for partner user profiles
      const { data: partnerUserProfiles, error: partnerUserProfilesError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_type', 'partner')
        .limit(5);
      
      if (partnerUserProfilesError) {
        console.error('Error fetching partner user profiles:', partnerUserProfilesError);
      } else {
        console.log(`Found ${partnerUserProfiles.length} partner user profiles`);
        console.log('Sample partner user profile:', partnerUserProfiles[0] || 'No partner user profiles found');
      }
    }
    
    // Check partner_profiles table
    console.log('\nChecking partner_profiles table:');
    const { data: partnerProfilesData, error: partnerProfilesError } = await supabase
      .from('partner_profiles')
      .select('*')
      .limit(5);
    
    if (partnerProfilesError) {
      console.error('Error fetching partner_profiles:', partnerProfilesError);
      
      // Check if the table exists
      const { data: tablesData, error: tablesError } = await supabase
        .rpc('get_tables');
      
      if (tablesError) {
        console.error('Error checking tables:', tablesError);
      } else {
        console.log('Available tables:', tablesData);
      }
    } else {
      console.log(`Found ${partnerProfilesData.length} partner profiles`);
      console.log('Sample partner profile:', partnerProfilesData[0] || 'No partner profiles found');
    }
    
    // Check table structure
    console.log('\nChecking table structure:');
    const { data: userProfilesStructure, error: userProfilesStructureError } = await supabase
      .rpc('get_table_structure', { table_name: 'user_profiles' });
    
    if (userProfilesStructureError) {
      console.error('Error fetching user_profiles structure:', userProfilesStructureError);
    } else {
      console.log('user_profiles structure:', userProfilesStructure);
    }
    
    const { data: partnerProfilesStructure, error: partnerProfilesStructureError } = await supabase
      .rpc('get_table_structure', { table_name: 'partner_profiles' });
    
    if (partnerProfilesStructureError) {
      console.error('Error fetching partner_profiles structure:', partnerProfilesStructureError);
    } else {
      console.log('partner_profiles structure:', partnerProfilesStructure);
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkTables().catch(console.error); 