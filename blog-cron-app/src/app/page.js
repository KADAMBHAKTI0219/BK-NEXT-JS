// app/page.js
import ProductCard from '@/components/ProductCard';

async function fetchProducts() {
  try {
    // First try to get fresh data
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cache/products`, {
      next: { 
        tags: ['products'],
        revalidate: 60 // 1 minute fallback revalidation
      }
    });
    
    if (!response.ok) throw new Error('Cache fetch failed');
    
    const data = await response.json();
    
    // If empty or invalid, trigger immediate revalidation
    if (!data.products || data.products.length === 0) {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.CRON_SECRET}`
        }
      });
      
      // Try again after revalidation
      const retryResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cache/products`);
      const retryData = await retryResponse.json();
      return retryData.products || [];
    }
    
    return data.products;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

export default async function Home() {
  const products = await fetchProducts();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Product Catalog
        {products.length > 0 && (
          <span className="block text-sm font-normal text-gray-500 mt-2">
            Showing {products.length} products
          </span>
        )}
      </h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="mx-auto w-24 h-24 mb-4 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No Products Available</h2>
          <p className="text-gray-500 mb-4">We're currently updating our product listings.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}