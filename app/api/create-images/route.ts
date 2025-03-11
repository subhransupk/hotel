import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Mock: Creating image directories (no actual file operations performed)');
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Image directories and placeholder images created successfully (mock implementation)' 
    });
  } catch (error) {
    console.error('Error in mock image creation:', error);
    return NextResponse.json(
      { error: 'Failed to create image directories (mock implementation)' },
      { status: 500 }
    );
  }
} 