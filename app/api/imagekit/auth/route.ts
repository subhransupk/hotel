import { NextResponse } from 'next/server';
import { imagekitServer } from '@/lib/imagekit';

export async function GET() {
  try {
    // Generate authentication parameters
    const authenticationParameters = imagekitServer.getAuthenticationParameters();
    
    // Return the authentication parameters
    return NextResponse.json(authenticationParameters);
  } catch (error) {
    console.error('Error generating ImageKit authentication parameters:', error);
    return NextResponse.json(
      { error: 'Failed to generate authentication parameters' },
      { status: 500 }
    );
  }
} 