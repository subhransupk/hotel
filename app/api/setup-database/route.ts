import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Mock: Setting up database (no actual database operations performed)');
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Database setup completed successfully (mock implementation)' 
    });
  } catch (error) {
    console.error('Error in mock setup:', error);
    return NextResponse.json(
      { error: 'Failed to set up database (mock implementation)' },
      { status: 500 }
    );
  }
} 