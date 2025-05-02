// app/api/revalidate/route.js
import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch from external API
    const apiResponse = await fetch('https://fakestoreapi.com/products');
    if (!apiResponse.ok) throw new Error('Failed to fetch products');
    
    const products = await apiResponse.json();
    
    // Validate products - FIXED THIS LINE
    if (!Array.isArray(products)) throw new Error('Invalid products format');
    if (products.length === 0) throw new Error('No products received');

    // Update cache
    const cacheResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cache/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products })
    });

    if (!cacheResponse.ok) throw new Error('Cache update failed');

    // Revalidate
    revalidatePath('/');
    revalidateTag('products');
    
    return NextResponse.json({ 
      success: true,
      productsCount: products.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    
    // Get current cache state for debugging
    const cacheState = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cache/products`);
    const cacheData = await cacheState.json();
    
    return NextResponse.json({ 
      success: false,
      error: error.message,
      currentCache: cacheData
    }, { status: 500 });
  }
}