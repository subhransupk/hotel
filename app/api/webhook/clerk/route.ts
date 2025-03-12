import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Admin email from environment variable
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// Check if we're in build/SSG mode
const isSSG = process.env.NEXT_RUNTIME === 'nodejs' && process.env.NODE_ENV === 'production';

export async function POST(req: Request) {
  // If we're in SSG mode, return a 200 response to prevent build errors
  if (isSSG) {
    console.log('Skipping webhook processing during SSG build');
    return new NextResponse('Skipping webhook processing during SSG build', { status: 200 });
  }
  
  console.log('Webhook received from Clerk');
  
  // Check if Clerk is configured
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
    console.warn("Clerk is not initialized due to missing environment variables");
    return new NextResponse('Clerk is not initialized due to missing environment variables', { status: 200 });
  }
  
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing svix headers');
    return new NextResponse('Error: Missing svix headers', { status: 400 });
  }

  // Validate Supabase environment variables
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables:', { 
      supabaseUrl: !!supabaseUrl, 
      supabaseServiceKey: !!supabaseServiceKey 
    });
    return new NextResponse('Error: Missing Supabase configuration', { status: 500 });
  }

  // Get the body
  let payload;
  try {
    payload = await req.json();
    console.log('Webhook payload type:', payload.type);
  } catch (error) {
    console.error('Error parsing request body:', error);
    return new NextResponse('Error: Invalid JSON payload', { status: 400 });
  }
  
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    console.error('Missing webhook secret');
    return new NextResponse('Error: Missing webhook secret', { status: 500 });
  }

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(webhookSecret);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new NextResponse('Error verifying webhook', { status: 400 });
  }

  // Initialize Supabase client
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Handle the webhook event
  const eventType = evt.type;
  console.log('Processing webhook event type:', eventType);

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data;
    console.log('User created with ID:', id);
    
    if (!id || !email_addresses || email_addresses.length === 0) {
      console.error('Missing required user data in webhook payload');
      return new NextResponse('Error: Missing required user data', { status: 400 });
    }
    
    const email = email_addresses[0]?.email_address;

    if (!email) {
      console.error('User has no email address');
      return new NextResponse('Error: User has no email address', { status: 400 });
    }

    console.log('Processing user with email:', email);

    try {
      let clerkRoleSet = false;
      let role = 'hotel_owner';
      let userType = 'hotel';
      let status = 'pending';
      let onboardingStatus = 'pending';
      
      // Check if this is the admin email
      if (ADMIN_EMAIL && email === ADMIN_EMAIL) {
        console.log('Admin user detected');
        role = 'admin';
        userType = 'admin';
        status = 'active';
        onboardingStatus = 'completed';
      } else {
        console.log('Setting user as hotel owner');
      }
      
      // Set role in Clerk
      try {
        await clerkClient.users.updateUser(id, {
          publicMetadata: {
            role,
          },
        });
        clerkRoleSet = true;
        console.log(`Role set in Clerk: ${role}`);
      } catch (error) {
        console.error('Error updating Clerk user metadata:', error);
        return new NextResponse('Error updating user metadata in Clerk', { status: 500 });
      }

      // Create profile in Supabase
      try {
        console.log('Creating user profile in Supabase:', {
          id,
          userType,
          firstName: first_name || '',
          lastName: last_name || '',
          status,
          onboardingStatus
        });
        
        const { data, error } = await supabase.from('user_profiles').insert({
          id,
          user_type: userType,
          first_name: first_name || '',
          last_name: last_name || '',
          email: email,
          status,
          onboarding_status: onboardingStatus,
        }).select();

        if (error) {
          console.error(`Error creating ${role} profile:`, error);
          
          // Roll back Clerk changes if Supabase operation fails
          if (clerkRoleSet) {
            try {
              await clerkClient.users.updateUser(id, {
                publicMetadata: {},
              });
              console.log('Successfully rolled back Clerk metadata after Supabase failure');
            } catch (rollbackError) {
              console.error('Failed to roll back Clerk metadata:', rollbackError);
            }
          }
          
          return new NextResponse('Error creating user profile in database', { status: 500 });
        }
        
        console.log('User profile created successfully:', data);
      } catch (error) {
        console.error('Unexpected error creating user profile in Supabase:', error);
        
        // Roll back Clerk changes if Supabase operation fails
        if (clerkRoleSet) {
          try {
            await clerkClient.users.updateUser(id, {
              publicMetadata: {},
            });
            console.log('Successfully rolled back Clerk metadata after Supabase failure');
          } catch (rollbackError) {
            console.error('Failed to roll back Clerk metadata:', rollbackError);
          }
        }
        
        return new NextResponse('Error creating user profile in database', { status: 500 });
      }
      
      console.log(`Successfully created ${role} profile for user ${id}`);
    } catch (error) {
      console.error('Unexpected error in webhook handler:', error);
      return new NextResponse('Internal server error', { status: 500 });
    }
  } else if (eventType === 'user.deleted') {
    // Handle user deletion by removing the corresponding profile from Supabase
    try {
      const { id } = evt.data;
      
      if (!id) {
        console.error('Missing user ID in deletion webhook');
        return new NextResponse('Error: Missing user ID', { status: 400 });
      }
      
      const { error } = await supabase
        .from('user_profiles')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error('Error deleting user profile from Supabase:', error);
        return new NextResponse('Error deleting user profile from database', { status: 500 });
      }
      
      console.log(`Successfully deleted profile for user ${id}`);
    } catch (error) {
      console.error('Error handling user deletion:', error);
      return new NextResponse('Error handling user deletion', { status: 500 });
    }
  }

  return new NextResponse('Webhook processed successfully', { status: 200 });
}

export async function GET() {
  // If we're in SSG mode, return a 200 response to prevent build errors
  if (isSSG) {
    console.log('Skipping webhook processing during SSG build');
    return new NextResponse('Skipping webhook processing during SSG build', { status: 200 });
  }
  
  // Check if Clerk is configured
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
    console.warn("Clerk is not initialized due to missing environment variables");
    return new NextResponse('Clerk is not initialized due to missing environment variables', { status: 200 });
  }
  
  return new NextResponse('Webhook endpoint is working', { status: 200 });
}