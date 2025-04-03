# Database Setup for Hotel Management Application

This guide will help you set up the necessary database tables and functions for the hotel management application using the Supabase Table Editor.

## Prerequisites

- A Supabase account and project
- Access to the Supabase Dashboard for your project

## Setup Instructions

### 1. Access the SQL Editor

1. Log in to your Supabase dashboard
2. Select your project
3. Navigate to the "SQL Editor" section in the left sidebar
4. Click "New Query" to create a new SQL query

### 2. Create the Database Tables and Functions

1. Copy the entire SQL script from the `scripts/create-tables.sql` file in this repository
2. Paste it into the SQL Editor
3. Click "Run" to execute the script

This script will:
- Create the `user_profiles` table
- Create the `hotel_profiles` table
- Set up Row Level Security (RLS) policies for both tables
- Create triggers and functions to automatically create profiles when users register
- Create a utility function to fix any missing profiles

The script is designed to be idempotent, meaning you can run it multiple times without causing errors. It checks if tables, policies, and triggers already exist before attempting to create them.

### 3. Verify the Setup

After running the script, you should see the following tables in your Supabase dashboard under the "Table Editor" section:

- `user_profiles`
- `hotel_profiles`

You can also verify that the RLS policies are in place by checking the "Authentication" > "Policies" section.

## Table Structure

### user_profiles

| Column Name   | Type        | Description                           |
|---------------|-------------|---------------------------------------|
| id            | UUID        | Primary key, references auth.users(id) |
| user_type     | TEXT        | Type of user (e.g., 'hotel', 'admin') |
| first_name    | VARCHAR(100)| User's first name                     |
| last_name     | VARCHAR(100)| User's last name                      |
| phone_number  | VARCHAR(20) | User's phone number (optional)        |
| status        | TEXT        | User status (default: 'active')       |
| created_at    | TIMESTAMPTZ | Creation timestamp                    |
| updated_at    | TIMESTAMPTZ | Last update timestamp                 |
| last_login    | TIMESTAMPTZ | Last login timestamp (optional)       |

### hotel_profiles

| Column Name       | Type        | Description                           |
|-------------------|-------------|---------------------------------------|
| id                | UUID        | Primary key                           |
| owner_id          | UUID        | References auth.users(id)             |
| hotel_name        | VARCHAR(200)| Name of the hotel                     |
| subscription_plan | TEXT        | Subscription plan (default: 'basic')  |
| email             | VARCHAR(255)| Contact email                         |
| phone             | VARCHAR(20) | Contact phone (optional)              |
| address           | TEXT        | Hotel address (optional)              |
| city              | VARCHAR(100)| City (optional)                       |
| state             | VARCHAR(100)| State/Province (optional)             |
| country           | VARCHAR(100)| Country (optional)                    |
| postal_code       | VARCHAR(20) | Postal code (optional)                |
| is_verified       | BOOLEAN     | Verification status (default: false)  |
| created_at        | TIMESTAMPTZ | Creation timestamp                    |
| updated_at        | TIMESTAMPTZ | Last update timestamp                 |

## Fixing Missing Profiles

If you already have users in your system who don't have profiles, you can run this SQL command in the SQL Editor:

```sql
SELECT * FROM fix_missing_profiles();
```

This will create profiles for any existing users and return a list of the users that were fixed.

## Troubleshooting

### Error: "relation does not exist"

If you see an error like "relation 'public.user_profiles' does not exist" when trying to register users, it means the database tables haven't been created yet. Follow the steps above to create the tables.

### Error: "policy already exists"

If you see an error like "policy 'Users can view their own profile' for table 'user_profiles' already exists", it means you're trying to create policies that already exist. The updated script in this repository checks if policies exist before creating them, so you shouldn't encounter this error. If you do, you can safely ignore it as it means the policies are already set up correctly.

### Error: "column reference is ambiguous"

If you encounter an error like "column reference 'email' is ambiguous" when running the `fix_missing_profiles()` function, it means there's a naming conflict. Try running the updated version of the function from the `scripts/create-tables.sql` file.

### Error: "permission denied"

If you see a "permission denied" error, make sure you're using the service role key in your application, not the anon key, when performing administrative operations like creating users or profiles. 