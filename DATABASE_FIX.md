# Database Fix Guide

This guide will help you fix database issues related to the authentication system.

## Issue: UUID vs TEXT for Clerk User IDs

Clerk uses a string format for user IDs (e.g., `user_2ttCLfzKdjx4ZUOkXky5IR230BJ`) which is not compatible with the UUID format in PostgreSQL. We need to use TEXT type for user IDs in the database.

## How to Fix

### Option 1: Reset the Database (Recommended for Development)

This will reset your database and apply the correct schema:

```bash
npm run fix-db
```

This command runs:
- `npx supabase db reset` - Resets the database
- `npx supabase db push` - Pushes the updated schema

### Option 2: Alter Existing Tables (For Production)

If you can't reset your database, you can run these SQL commands to alter the existing tables:

```sql
-- First, drop existing foreign key constraints
ALTER TABLE hotel_profiles DROP CONSTRAINT IF EXISTS hotel_profiles_owner_id_fkey;
ALTER TABLE hotel_staff DROP CONSTRAINT IF EXISTS hotel_staff_user_id_fkey;
ALTER TABLE partner_profiles DROP CONSTRAINT IF EXISTS partner_profiles_user_id_fkey;
ALTER TABLE partner_profiles DROP CONSTRAINT IF EXISTS partner_profiles_verified_by_fkey;

-- Change the data type of the id column in user_profiles
ALTER TABLE user_profiles ALTER COLUMN id TYPE TEXT;

-- Change the data type of columns referencing user_profiles.id
ALTER TABLE hotel_profiles ALTER COLUMN owner_id TYPE TEXT;
ALTER TABLE hotel_staff ALTER COLUMN user_id TYPE TEXT;
ALTER TABLE partner_profiles ALTER COLUMN user_id TYPE TEXT;
ALTER TABLE partner_profiles ALTER COLUMN verified_by TYPE TEXT;

-- Recreate the foreign key constraints
ALTER TABLE hotel_profiles ADD CONSTRAINT hotel_profiles_owner_id_fkey 
    FOREIGN KEY (owner_id) REFERENCES user_profiles(id) ON DELETE CASCADE;
ALTER TABLE hotel_staff ADD CONSTRAINT hotel_staff_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE;
ALTER TABLE partner_profiles ADD CONSTRAINT partner_profiles_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE;
ALTER TABLE partner_profiles ADD CONSTRAINT partner_profiles_verified_by_fkey 
    FOREIGN KEY (verified_by) REFERENCES user_profiles(id);
```

## Verifying the Fix

After applying the fix, you can verify that the database is correctly set up:

```bash
npm run check-auth
```

This will show the first 5 records in the user_profiles table.

## Common Errors

### "invalid input syntax for type uuid"

This error occurs when trying to insert a Clerk user ID (which is a string) into a UUID column. The fix is to change the column type from UUID to TEXT.

### "relation user_profiles does not exist"

This error means the user_profiles table hasn't been created. Run the database migration to create all required tables:

```bash
npm run fix-db
```

### "permission denied for table user_profiles"

This error indicates a permissions issue. Make sure the service role has the necessary permissions:

```sql
GRANT ALL ON user_profiles TO service_role;
```

## Environment Variables

Make sure your environment variables are correctly set in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

## Need More Help?

If you're still experiencing issues, check the server logs for more detailed error messages or contact support. 