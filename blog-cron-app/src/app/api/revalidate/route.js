// app/api/revalidate/route.js
import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request) {
  // Verify authorization
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 1. Fetch fresh data from external API
    const apiResponse = await fetch('https://fakestoreapi.com/products');
    if (!apiResponse.ok) throw new Error('Failed to fetch products');
    const products = await apiResponse.json();

    // 2. Update cache
    const cacheResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cache/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products })
    });
    if (!cacheResponse.ok) throw new Error('Failed to update cache');

    // 3. Revalidate
    revalidatePath('/');
    revalidateTag('products');
    
    return NextResponse.json({ 
      success: true,
      productsCount: products.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ 
      error: 'Revalidation failed',
      details: error.message 
    }, { status: 500 });
  }
}