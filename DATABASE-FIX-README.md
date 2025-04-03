# Database Fix Instructions

This document provides instructions for fixing the database schema to ensure compatibility with Clerk's user IDs.

## Issue

The current database schema uses UUID data type for user IDs, but Clerk provides string-based IDs. This mismatch causes errors when trying to insert Clerk user IDs into UUID columns.

## Solution Options

You have three options to fix this issue:

### Option 1: Complete Database Reset with Type Casting Fix (Recommended)

Use the `fix-database-clean-cascade-fixed.sql` script to drop all existing tables and recreate them with the correct data types. This script:
- Uses the CASCADE option to handle dependencies like RLS policies
- Includes proper type casting in RLS policies to avoid type mismatch errors

```bash
# Connect to your Supabase database and run the script
psql -h YOUR_SUPABASE_HOST -U postgres -d postgres -f fix-database-clean-cascade-fixed.sql
```

**Note**: This will delete all existing data in the affected tables and drop all related objects like RLS policies.

### Option 2: Complete Database Reset with CASCADE

Use the `fix-database-clean-cascade.sql` script to drop all existing tables and recreate them with the correct data types. This script uses the CASCADE option to handle dependencies like RLS policies.

```bash
# Connect to your Supabase database and run the script
psql -h YOUR_SUPABASE_HOST -U postgres -d postgres -f fix-database-clean-cascade.sql
```

**Note**: This script may encounter type mismatch errors in RLS policies.

### Option 3: Complete Database Reset (Alternative)

If you prefer to handle dependencies manually, you can use the `fix-database-clean.sql` script. However, you may need to manually drop RLS policies first.

```bash
# Connect to your Supabase database and run the script
psql -h YOUR_SUPABASE_HOST -U postgres -d postgres -f fix-database-clean.sql
```

**Note**: This will delete all existing data in the affected tables.

### Option 4: Alter Existing Tables (For Production with Existing Data)

Use the `alter-tables.sql` script to modify the existing tables without dropping them.

```bash
# Connect to your Supabase database and run the script
psql -h YOUR_SUPABASE_HOST -U postgres -d postgres -f alter-tables.sql
```

This approach:
1. Drops existing foreign key constraints
2. Changes the data type of the ID columns from UUID to TEXT
3. Recreates the foreign key constraints

**Warning**: If you already have UUID data in these columns, you may need to manually convert them to match Clerk's ID format.

## Type Casting in RLS Policies

The error `operator does not exist: uuid = text` occurs because RLS policies try to compare UUID values with TEXT values. The fixed script addresses this by explicitly casting `auth.uid()` to TEXT in all policy definitions:

```sql
-- Example of proper type casting in RLS policy
CREATE POLICY "Users can view their own profile"
    ON user_profiles
    FOR SELECT
    USING (id = auth.uid()::TEXT);
```

## Handling RLS Policies

If you encounter errors related to RLS policies when running the scripts, you can manually drop them first:

```sql
-- List all policies
SELECT * FROM pg_policies;

-- Drop a specific policy
DROP POLICY IF EXISTS "Policy Name" ON table_name;
```

## Verification

After applying any of the fixes, verify that:

1. The webhook handler can successfully create user profiles in Supabase
2. The onboarding process works correctly for hotel owners
3. User authentication flows properly between Clerk and Supabase

## Additional Notes

- The Clerk webhook handler in `app/api/webhook/clerk/route.ts` should now work correctly with the TEXT data type
- Make sure your environment variables are correctly set for both Clerk and Supabase
- If you encounter any issues, check the application logs for specific error messages 