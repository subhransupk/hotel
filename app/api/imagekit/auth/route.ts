import { NextResponse } from 'next/server';
import { imagekitServer } from '@/lib/imagekit';

export async function GET() {
  try {
    // Check if ImageKit server is initialized
    if (!imagekitServer) {
      console.error('ImageKit server is not initialized due to missing environment variables');
      return NextResponse.json(
        { 
          error: 'Server configuration error', 
          message: 'ImageKit is not properly configured'
        },
        { status: 500 }
      );
    }
    
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