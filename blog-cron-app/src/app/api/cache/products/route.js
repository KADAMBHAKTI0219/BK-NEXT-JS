// app/api/cache/products/route.js
import { NextResponse } from 'next/server';

// In-memory cache (replace with Redis in production)
let productsCache = {
  data: [],
  lastUpdated: null
};

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      products: productsCache.data,
      lastUpdated: productsCache.lastUpdated
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      products: [],
      error: error.message
    });
  }
}

export async function POST(request) {
  try {
    const { products = [] } = await request.json();
    productsCache = {
      data: products,
      lastUpdated: new Date().toISOString()
    };
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}