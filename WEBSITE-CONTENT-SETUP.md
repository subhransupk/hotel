# Website Content Setup Guide

This guide will help you set up the website content feature in the white labeling panel.

## Prerequisites

- Node.js installed
- Supabase project set up
- `.env.local` file with Supabase credentials

## Setup Steps

### 1. Install Dependencies

Make sure you have all the required dependencies installed:

```bash
npm install
```

### 2. Create Image Directories

Run the following command to create the necessary image directories and placeholder images:

```bash
npm run create-images
```

This will create the following directories:
- `public/images`
- `public/images/testimonials`
- `public/images/features`
- `public/images/team`
- `public/images/partners`

And add placeholder images for testimonials and the hero background.

### 3. Set Up the Database

#### Option 1: Using the Node.js Script (Recommended)

Run the following command to set up the database tables, RLS policies, and functions:

```bash
npm run setup-db
```

This script will:
1. Create all the necessary tables
2. Set up Row Level Security policies
3. Create helper functions
4. Create a default tenant
5. Create image directories and placeholder images

#### Option 2: Using the SQL Editor in Supabase

1. Log in to your Supabase project
2. Go to the SQL Editor
3. Run the following SQL files in order:
   - `sql/exec_sql_function.sql` (if you want to use the Node.js script)
   - `sql/website_content_tables.sql`
   - `sql/website_content_rls.sql`
   - `sql/website_content_functions.sql`

### 4. Verify the Setup

1. Start the development server:

```bash
npm run dev
```

2. Navigate to the white labeling panel at `/white-labeling/website`
3. Try saving some content and verify that it's saved to the database

## Troubleshooting

### Missing Images

If you see 404 errors for images, run the image creation script:

```bash
npm run create-images
```

### Database Connection Issues

If you see database connection issues:

1. Check your `.env.local` file to ensure it has the correct Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   ```

2. Make sure your Supabase project is running and accessible

### No Tenant Found

If you see "No tenant found" errors:

1. Run the setup script to create a default tenant:
   ```bash
   npm run setup-db
   ```

2. Or manually create a tenant in the Supabase dashboard:
   - Go to the Table Editor
   - Select the `tenants` table
   - Click "Insert row" and add a new tenant with:
     - `name`: "Default Hotel"
     - `domain`: "default-hotel.com"
     - `status`: "active"

## Additional Information

- The website content is stored in multiple tables in the database
- Only admin users can modify the website content
- Public users can view the website content
- The content is associated with a tenant, which allows for multi-tenant support 