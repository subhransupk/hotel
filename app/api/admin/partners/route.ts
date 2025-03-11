import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables for Supabase');
}

// Create Supabase client only if environment variables are available
const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export async function GET(req: Request) {
  console.log('=== GET PARTNERS API CALLED ===');
  
  try {
    // Check if Supabase client is initialized
    if (!supabase) {
      console.error('Supabase client is not initialized due to missing environment variables');
      return NextResponse.json({ 
        message: 'Server configuration error: Database connection not available',
        details: 'Missing required environment variables for Supabase'
      }, { status: 500 });
    }
    
    // Check if the user is authenticated and is an admin
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    const userRole = user.publicMetadata.role as string;
    
    if (userRole !== 'admin') {
      return NextResponse.json({ message: 'Forbidden: Admin access required' }, { status: 403 });
    }
    
    // Get query parameters
    const url = new URL(req.url);
    const status = url.searchParams.get('status');
    const type = url.searchParams.get('type');
    const search = url.searchParams.get('search');
    
    // Start building the query
    let query = supabase
      .from('user_profiles')
      .select(`
        id,
        first_name,
        last_name,
        email,
        status,
        created_at,
        partner_profiles (
          partner_type,
          company_name,
          website,
          description,
          is_verified
        )
      `)
      .eq('user_type', 'partner');
    
    // Add filters if provided
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }
    
    // Execute the query
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching partners:', error);
      return NextResponse.json({ message: 'Failed to fetch partners' }, { status: 500 });
    }
    
    // Format the response
    const partners = data.map(user => {
      const partnerProfile = user.partner_profiles[0] || {};
      
      return {
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        companyName: partnerProfile.company_name || 'N/A',
        partnerType: partnerProfile.partner_type || 'others',
        status: user.status,
        joinedDate: user.created_at,
        isVerified: partnerProfile.is_verified || false,
        website: partnerProfile.website || null,
        description: partnerProfile.description || null,
      };
    });
    
    // Apply additional filters that couldn't be done at the database level
    let filteredPartners = partners;
    
    // Filter by partner type if provided
    if (type && type !== 'all') {
      filteredPartners = filteredPartners.filter(partner => 
        partner.partnerType === type
      );
    }
    
    // Filter by search term if provided
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPartners = filteredPartners.filter(partner => 
        partner.name.toLowerCase().includes(searchLower) ||
        partner.email.toLowerCase().includes(searchLower) ||
        partner.companyName.toLowerCase().includes(searchLower)
      );
    }
    
    return NextResponse.json({ partners: filteredPartners });
    
  } catch (error) {
    console.error('Error in partners API:', error);
    return NextResponse.json({ 
      message: 'An unexpected error occurred',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 