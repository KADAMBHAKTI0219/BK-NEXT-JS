// app/api/cache/products/route.js
import { NextResponse } from 'next/server';

// Persistent cache using Map (better for serverless environments)
const productsCache = new Map();
productsCache.set('data', [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    price: 199.99,
    category: "electronics",
    description: "High-quality wireless headphones with noise cancellation"
  },
  {
    id: 2,
    title: "Organic Cotton T-Shirt",
    price: 29.99,
    category: "clothing",
    description: "Comfortable organic cotton t-shirt"
  }
]);
productsCache.set('lastUpdated', new Date().toISOString());

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      products: productsCache.get('data'),
      lastUpdated: productsCache.get('lastUpdated')
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      products: productsCache.get('data'), // Fallback to cached data
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { products = [] } = await request.json();
    
    if (products.length > 0) {
      productsCache.set('data', products);
      productsCache.set('lastUpdated', new Date().toISOString());
    }
    
    return NextResponse.json({ 
      success: true,
      productsCount: productsCache.get('data').length,
      lastUpdated: productsCache.get('lastUpdated')
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}