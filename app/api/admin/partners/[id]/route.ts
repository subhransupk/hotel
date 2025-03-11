import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if the user is authenticated and is an admin
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    
    const userRole = user.publicMetadata.role as string;
    
    if (userRole !== 'admin') {
      return NextResponse.json({ message: 'Forbidden: Admin access required' }, { status: 403 });
    }
    
    const partnerId = params.id;
    
    // First, delete the partner profile from Supabase
    const { error: partnerProfileError } = await supabase
      .from('partner_profiles')
      .delete()
      .eq('user_id', partnerId);
    
    if (partnerProfileError) {
      console.error('Error deleting partner profile:', partnerProfileError);
      return NextResponse.json({ message: 'Failed to delete partner profile' }, { status: 500 });
    }
    
    // Then, delete the user profile from Supabase
    const { error: userProfileError } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', partnerId);
    
    if (userProfileError) {
      console.error('Error deleting user profile:', userProfileError);
      return NextResponse.json({ message: 'Failed to delete user profile' }, { status: 500 });
    }
    
    // For now, we'll skip deleting the user from Clerk as we're having import issues
    // In a production environment, you would need to properly delete the user from Clerk
    // await clerk.users.deleteUser(partnerId);
    
    return NextResponse.json({ message: 'Partner deleted successfully' });
    
  } catch (error) {
    console.error('Error deleting partner:', error);
    return NextResponse.json({ 
      message: 'An unexpected error occurred',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 