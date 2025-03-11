# Hotel Management System

A comprehensive hotel management system built with Next.js, Clerk for authentication, and Supabase for database storage.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project

### Environment Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Supabase credentials in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up the database:
   ```bash
   npm run fix-db
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Authentication System

The application uses Supabase Auth for authentication. Before using the system, you need to set up the required database tables.

### Database Setup

1. Run the database setup script:
   ```bash
   npm run fix-db
   ```

2. Verify the setup:
   ```bash
   npm run check-auth
   ```

If you encounter any issues, refer to the `DATABASE_FIX.md` file for detailed instructions.

### Authentication Flow

The application uses Clerk for authentication with three distinct user roles:

1. **Hotel Owner**
   - Can register publicly through the `/sign-up` page
   - Requires password confirmation during registration
   - Automatically assigned the `hotel_owner` role
   - Redirected to `/dashboard` after login
   - Can manage their hotel properties

2. **Partner**
   - Cannot register publicly
   - Registration is handled by admins through the `/admin/partners/create` page
   - Uses the same login flow as other users
   - Automatically assigned the `partner` role
   - Redirected to `/partner-dashboard` after login
   - Can access partner-specific features

3. **Admin**
   - No public registration
   - Pre-configured through the `ADMIN_EMAIL` environment variable
   - Uses the same login flow as other users
   - Automatically assigned the `admin` role
   - Redirected to `/admin` after login
   - Can manage the entire platform, including partner registration

### Role-Based Access Control

The middleware (`middleware.ts`) enforces role-based access control:
- Only hotel owners can access `/dashboard`
- Only partners can access `/partner-dashboard`
- Only admins can access `/admin`

### Webhook Integration

A Clerk webhook handler (`app/api/webhook/clerk/route.ts`) manages:
- Setting user roles based on registration type
- Creating corresponding profiles in Supabase
- Special handling for admin users

## Features

- User authentication and profile management
- Hotel profile management
- Dashboard with key metrics
- Booking management
- Room management
- Guest management
- Staff management
- Reports and analytics

## Troubleshooting

If you encounter authentication issues:

1. Check if the database tables are properly set up:
   ```bash
   npm run check-auth
   ```

2. Fix any missing tables or profiles:
   ```bash
   npm run fix-db
   ```

3. Ensure your environment variables are correctly set in `.env.local`

4. Check the browser console and server logs for error messages

## Documentation

- `DATABASE_FIX.md` - Instructions for fixing database issues
- `AUTHENTICATION.md` - Documentation for the authentication system

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Supabase Setup

This project uses [Supabase](https://supabase.com/) for the backend database and authentication. Follow these steps to set up Supabase locally:

### Prerequisites

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) for your operating system.
2. Make sure Docker is running.

### Local Development

1. Start the local Supabase instance:

```bash
npx supabase start
```

2. This will start all Supabase services locally and provide you with:
   - API URL: http://localhost:54321
   - Studio URL: http://localhost:54323
   - Inbucket URL: http://localhost:54324
   - JWT secret and anon key for authentication

3. Access the Supabase Studio at http://localhost:54323 to manage your database, authentication, and storage.

4. When you're done, you can stop the local Supabase instance:

```bash
npx supabase stop
```

### Using Supabase in the Application

The Supabase client is configured in `lib/supabase.ts`. You can import it in your components or API routes:

```typescript
import { supabase } from '@/lib/supabase';

// Example: Query data
const { data, error } = await supabase
  .from('your_table')
  .select('*');
```

For more information, check out the [Supabase documentation](https://supabase.com/docs).

## Environment Variables Setup

For the application to work correctly, you need to set up the following environment variables in a `.env.local` file at the root of your project:

### Required Environment Variables

```
# Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Clerk configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
CLERK_WEBHOOK_SECRET=your-clerk-webhook-secret

# Admin email (optional, but recommended)
ADMIN_EMAIL=admin@example.com

# Site URL (used for email verification links)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### How to Get These Values

1. **Supabase Configuration**:
   - Create a project on [Supabase](https://supabase.com/)
   - Go to Project Settings > API
   - Copy the URL, anon key, and service role key

2. **Clerk Configuration**:
   - Create a project on [Clerk](https://clerk.dev/)
   - Go to API Keys
   - Copy the publishable key and secret key
   - For the webhook secret, go to Webhooks and create a new webhook endpoint

3. **Admin Email**:
   - Set this to the email you want to use for the admin account
   - When a user signs up with this email, they will automatically be assigned the admin role

## Setting Up Clerk Webhooks

For the authentication system to work correctly, you need to set up a webhook in Clerk:

1. Go to your Clerk Dashboard
2. Navigate to Webhooks
3. Create a new webhook endpoint with the URL: `https://your-domain.com/api/webhook/clerk`
4. Select the following events:
   - `user.created`
   - `user.deleted`
5. Copy the signing secret and add it to your `.env.local` file as `CLERK_WEBHOOK_SECRET`

## Onboarding Flow

When a new hotel owner signs up:

1. They will be automatically assigned the "hotel_owner" role in Clerk
2. A user profile will be created in Supabase with "pending" status
3. They will be redirected to the onboarding page to complete their profile
4. After completing the onboarding form, their status will be updated to "active" and they will be redirected to the dashboard

## Troubleshooting

If you're experiencing issues with the authentication system:

1. **Users not being redirected to onboarding**:
   - Check that your environment variables are correctly set
   - Ensure the Clerk webhook is properly configured
   - Check the server logs for any errors

2. **Data not being saved in Supabase**:
   - Verify that your Supabase URL and service role key are correct
   - Check that the database tables have been created correctly
   - Look for any error messages in the server logs

3. **Webhook errors**:
   - Ensure your webhook URL is publicly accessible
   - Verify that the webhook secret is correctly set in your environment variables
   - Check the webhook logs in the Clerk dashboard

## Development

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Important: Database Schema Update for Clerk Integration

### Issue: UUID vs TEXT for Clerk User IDs

We've identified an issue with the database schema. Clerk uses a string format for user IDs (e.g., `user_2ttCLfzKdjx4ZUOkXky5IR230BJ`) which is not compatible with the UUID format in PostgreSQL. 

If you're seeing errors like:
```
invalid input syntax for type uuid: "user_2ttCLfzKdjx4ZUOkXky5IR230BJ"
```

You need to update your database schema to use TEXT type for user IDs instead of UUID.

### How to Fix

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy the contents of the `fix-database.sql` file in this repository
4. Paste it into the SQL Editor and run the script
5. This will recreate all tables with the correct data types

### Verifying the Fix

After applying the fix, you should be able to:
1. Sign up as a new user
2. Be redirected to the onboarding page
3. Complete the onboarding form
4. Access the dashboard

For more detailed instructions, see the `DATABASE_FIX.md` file.
