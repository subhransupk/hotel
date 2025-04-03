const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase URL or Service Role Key is missing. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Define the SQL files to run
const sqlFiles = [
  'sql/website_content_tables.sql',
  'sql/website_content_rls.sql',
  'sql/website_content_functions.sql'
];

// Function to run SQL from a file
async function runSqlFile(filePath) {
  try {
    console.log(`Running SQL file: ${filePath}`);
    const sql = fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');
    
    // Split the SQL into statements
    const statements = sql.split(';').filter(stmt => stmt.trim() !== '');
    
    for (const statement of statements) {
      const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' });
      
      if (error) {
        console.error(`Error executing SQL statement: ${error.message}`);
        console.error(`Statement: ${statement}`);
      }
    }
    
    console.log(`Successfully executed SQL file: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`Error running SQL file ${filePath}:`, error);
    return false;
  }
}

// Function to create a default tenant
async function createDefaultTenant() {
  try {
    console.log('Creating default tenant...');
    
    // Check if the tenants table exists
    const { data: tableExists, error: tableError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_name', 'tenants')
      .single();
    
    if (tableError || !tableExists) {
      console.error('Tenants table does not exist. Please run the SQL setup first.');
      return false;
    }
    
    // Check if a tenant already exists
    const { data: existingTenant, error: tenantError } = await supabase
      .from('tenants')
      .select('id')
      .limit(1)
      .single();
    
    if (!tenantError && existingTenant) {
      console.log('Tenant already exists with ID:', existingTenant.id);
      return true;
    }
    
    // Create a default tenant
    const { data, error } = await supabase
      .from('tenants')
      .insert({
        name: 'Default Hotel',
        domain: 'default-hotel.com',
        status: 'active'
      })
      .select('id')
      .single();
    
    if (error) {
      console.error('Error creating default tenant:', error);
      return false;
    }
    
    console.log('Default tenant created with ID:', data.id);
    return true;
  } catch (error) {
    console.error('Error creating default tenant:', error);
    return false;
  }
}

// Main function to run the setup
async function setupDatabase() {
  console.log('Starting database setup...');
  
  // Run SQL files
  for (const sqlFile of sqlFiles) {
    const success = await runSqlFile(sqlFile);
    if (!success) {
      console.error(`Failed to run SQL file: ${sqlFile}`);
      process.exit(1);
    }
  }
  
  // Create default tenant
  const tenantCreated = await createDefaultTenant();
  if (!tenantCreated) {
    console.warn('Failed to create default tenant. You may need to create one manually.');
  }
  
  console.log('Database setup completed successfully!');
  
  // Create image directories
  require('./create-image-directories');
}

// Run the setup
setupDatabase().catch(error => {
  console.error('Error setting up database:', error);
  process.exit(1);
}); 