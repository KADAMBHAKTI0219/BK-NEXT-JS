import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  // Secure the endpoint with a secret token
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret token' }, { status: 401 });
  }

  try {
    // Revalidate the homepage
    revalidatePath('/');
    return NextResponse.json({ revalidated: true, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json({ message: 'Revalidation failed', error: err.message }, { status: 500 });
  }
}