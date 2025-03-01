import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const winners = await query(`
      SELECT w.id, w.prize_amount, w.prize_tier, w.claimed, w.claim_date, 
             u.name, u.email, d.draw_name, d.draw_date, t.ticket_number
      FROM winners w
      JOIN users u ON w.user_id = u.id
      JOIN draws d ON w.draw_id = d.id
      JOIN tickets t ON w.ticket_id = t.id
      ORDER BY w.created_at DESC
      LIMIT 10
    `);
    
    return NextResponse.json({ winners });
  } catch (error) {
    console.error('Error fetching winners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lottery winners' },
      { status: 500 }
    );
  }
}