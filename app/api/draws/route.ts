import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const draws = await query(
      'SELECT * FROM draws ORDER BY draw_date DESC LIMIT 10'
    );
    
    return NextResponse.json({ draws });
  } catch (error) {
    console.error('Error fetching draws:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lottery draws' },
      { status: 500 }
    );
  }
}