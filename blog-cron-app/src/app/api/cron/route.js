// app/api/cron/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  // Secure the cron job
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Trigger revalidation
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CRON_SECRET}`
      }
    });

    if (!response.ok) throw new Error('Revalidation failed');
    
    const data = await response.json();
    return NextResponse.json({ 
      message: 'Cron job executed successfully',
      ...data
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json({ 
      error: 'Cron job failed',
      details: error.message 
    }, { status: 500 });
  }
}