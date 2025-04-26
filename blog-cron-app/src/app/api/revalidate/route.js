// app/api/revalidate/route.js
import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

const MIN_PRODUCTS = 2; // Minimum products to consider update valid

export async function POST(request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 1. Fetch from external API with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    
    const apiResponse = await fetch('https://fakestoreapi.com/products', {
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!apiResponse.ok) {
      throw new Error(`API responded with ${apiResponse.status}`);
    }
    
    let products = await apiResponse.json();
    
    // 2. Validate we got sufficient products
    if (!Array.isArray(products)) {
      throw new Error('Invalid products data format');
    }
    
    if (products.length < MIN_PRODUCTS) {
      throw new Error(`Insufficient products received (${products.length})`);
    }

    // 3. Update cache
    const cacheResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cache/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products })
    });

    if (!cacheResponse.ok) {
      throw new Error('Failed to update cache');
    }

    // 4. Revalidate
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
      success: false,
      error: error.message,
      cacheStatus: await getCacheStatus()
    }, { status: 500 });
  }
}

async function getCacheStatus() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cache/products`);
    if (response.ok) {
      return await response.json();
    }
    return { error: 'Cache status check failed' };
  } catch (error) {
    return { error: error.message };
  }
}