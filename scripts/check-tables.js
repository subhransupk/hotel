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
    // List all tables
    console.log('\nListing all tables:');
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
    
    if (tablesError) {
      console.error('Error listing tables:', tablesError);
    } else {
      console.log('Tables:', tables.map(t => t.table_name));
      
      // Check if partner_profiles table exists
      const partnerProfilesTableExists = tables.some(t => t.table_name === 'partner_profiles');
      console.log('partner_profiles table exists:', partnerProfilesTableExists);
    }
    
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
      if (userProfilesData.length > 0) {
        console.log('Sample user profile:', userProfilesData[0]);
      }
    }
    
    // Try to create the partner_profiles table if it doesn't exist
    console.log('\nAttempting to check or create partner_profiles table:');
    const { error: createTableError } = await supabase.rpc('check_or_create_partner_profiles_table');
    
    if (createTableError) {
      console.error('Error creating partner_profiles table:', createTableError);
      
      // Try a direct query to create the table
      console.log('Attempting to create table directly...');
      const { error: directCreateError } = await supabase.rpc('execute_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS partner_profiles (
            id SERIAL PRIMARY KEY,
            user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
            partner_type TEXT NOT NULL,
            company_name TEXT NOT NULL,
            website TEXT,
            description TEXT,
            verified_by UUID,
            is_verified BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      });
      
      if (directCreateError) {
        console.error('Error creating table directly:', directCreateError);
      } else {
        console.log('Table created successfully');
      }
    } else {
      console.log('Partner profiles table check/creation successful');
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

checkTables().catch(console.error); 