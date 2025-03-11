// Script to run SQL migration
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase URL or service key not found in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  console.log('Running SQL migration...');
  
  try {
    // Read the SQL file
    const sqlFilePath = path.join(__dirname, 'create-partner-profiles-table.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    
    console.log('SQL to execute:');
    console.log(sql);
    
    // Execute the SQL
    const { data, error } = await supabase.rpc('execute_sql', { sql });
    
    if (error) {
      console.error('Error executing SQL:', error);
      
      // Try a different approach if the RPC method doesn't exist
      console.log('Trying alternative approach...');
      
      // Check if the table already exists
      const { data: tables, error: tablesError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .eq('table_name', 'partner_profiles');
      
      if (tablesError) {
        console.error('Error checking if table exists:', tablesError);
      } else if (tables && tables.length > 0) {
        console.log('Table partner_profiles already exists');
      } else {
        console.log('Table partner_profiles does not exist, creating it manually...');
        
        // Create the table using raw SQL
        const { error: createError } = await supabase.from('partner_profiles').insert({
          user_id: 'temp_user_id',
          partner_type: 'temp_type',
          company_name: 'Temporary Company'
        });
        
        if (createError) {
          console.error('Error creating table manually:', createError);
        } else {
          console.log('Table created successfully');
          
          // Clean up the temporary record
          await supabase.from('partner_profiles').delete().eq('user_id', 'temp_user_id');
        }
      }
    } else {
      console.log('SQL executed successfully');
    }
    
    // Verify the table exists
    const { data: verifyData, error: verifyError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'partner_profiles');
    
    if (verifyError) {
      console.error('Error verifying table:', verifyError);
    } else {
      console.log('Table verification result:', verifyData);
      console.log('Table exists:', verifyData && verifyData.length > 0);
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

runMigration().catch(console.error); 