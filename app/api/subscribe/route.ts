import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Check if the email already exists in the subscribers table
    const existingSubscribers = await query(
      'SELECT * FROM subscribers WHERE email = ?',
      [email]
    ) as any[];
    
    if (existingSubscribers.length > 0) {
      return NextResponse.json(
        { message: 'You are already subscribed' },
        { status: 200 }
      );
    }
    
    // Insert the new subscriber
    await query(
      'INSERT INTO subscribers (email) VALUES (?)',
      [email]
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed to lottery updates' 
    });
  } catch (error) {
    console.error('Error subscribing:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}