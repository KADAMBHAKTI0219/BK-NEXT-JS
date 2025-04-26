// app/api/cache/products/route.js
import { NextResponse } from 'next/server';

// Initialize with sample data
let productsCache = {
  data: [
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
  ],
  lastUpdated: new Date().toISOString()
};

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      products: productsCache.data,
      lastUpdated: productsCache.lastUpdated
    });
  } catch (error) {
    // Fallback to sample data if error occurs
    return NextResponse.json({
      success: false,
      products: productsCache.data, // Return cached data even on error
      error: error.message
    });
  }
}

export async function POST(request) {
  try {
    const { products = [] } = await request.json();
    
    // Only update if we received products
    if (products.length > 0) {
      productsCache = {
        data: products,
        lastUpdated: new Date().toISOString()
      };
    }
    
    return NextResponse.json({ 
      success: true,
      productsCount: productsCache.data.length
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}