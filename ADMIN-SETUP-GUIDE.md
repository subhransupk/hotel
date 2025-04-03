# Admin Access Setup Guide

This guide provides multiple methods to set up admin access for your application.

## Method 1: Update Supabase Database Directly (Recommended)

This method updates your user profile in Supabase directly, then guides you to update your role in Clerk manually.

### Step 1: Install Required Packages

```bash
npm install @supabase/supabase-js dotenv
```

### Step 2: Run the Supabase Update Script

```bash
node update-supabase-admin.js YOUR_USER_ID
```

Replace `YOUR_USER_ID` with your Clerk user ID (e.g., `user_2ttjVbf9hcEVEq0xROpbXwfyIxF`).

### Step 3: Update Your Role in Clerk Dashboard

1. Go to the [Clerk Dashboard](https://dashboard.clerk.com/)
2. Select your application
3. Navigate to the "Users" section
4. Find and click on your user
5. Go to the "Metadata" tab
6. Add or update the "Public metadata" with:
   ```json
   {
     "role": "admin"
   }
   ```
7. Save the changes

### Step 4: Sign Out and Sign Back In

Sign out of your application and sign back in to refresh your session with the new role.

## Method 2: Use the SQL Script

If you have direct access to your Supabase database, you can run the SQL script.

1. Edit the `make-admin.sql` file to replace `YOUR_USER_ID` with your actual user ID
2. Connect to your Supabase database and run the script:
   ```bash
   psql -h YOUR_SUPABASE_HOST -U postgres -d postgres -f make-admin.sql
   ```
3. Then follow Steps 3-4 from Method 1 to update your role in Clerk

## Method 3: Register a New Admin User

If you prefer to create a new admin user:

1. Make sure your `.env.local` file has the `ADMIN_EMAIL` variable set to the email you want to use
2. Restart your development server
3. Register a new user with that exact email
4. The webhook should automatically set the user as admin

## Verifying Admin Access

After setting up admin access:

1. Navigate to `/redirect` in your application
2. It should automatically redirect you to the admin dashboard if your role is set correctly
3. You can also directly access `/admin` to check if you have access

## Troubleshooting

If you're still having issues:

1. **Check your current role**:
   ```bash
   npm install @supabase/supabase-js dotenv
   node check-user-role.js YOUR_USER_ID
   ```

2. **Verify environment variables**:
   Make sure `ADMIN_EMAIL` is set correctly in your `.env.local` file

3. **Check browser console and server logs**:
   Look for any errors related to authentication or authorization

4. **Clear browser cache and cookies**:
   Sometimes cached session data can prevent role changes from taking effect

5. **Verify middleware behavior**:
   Check the console logs to see if the middleware is correctly identifying your role 