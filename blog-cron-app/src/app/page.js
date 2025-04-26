// app/page.js
import ProductCard from '@/components/ProductCard';

async function fetchProducts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cache/products`, {
      next: { tags: ['products'] }
    });
    
    if (!response.ok) {
      console.error('Cache fetch failed, trying to revalidate...');
      // Trigger revalidation if cache is empty
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.CRON_SECRET}`
        }
      });
      
      // Try fetching again
      const retryResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cache/products`);
      if (!retryResponse.ok) throw new Error('Failed after revalidation attempt');
      
      const retryData = await retryResponse.json();
      return retryData.products || [];
    }
    
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Fetch products error:', error);
    return []; // Return empty array as fallback
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
            Last updated: {new Date().toLocaleString()}
          </span>
        )}
      </h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="mx-auto w-24 h-24 mb-4 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Catalog Update in Progress</h2>
          <p className="text-gray-500 mb-6">We're refreshing our product listings. This usually takes less than a minute.</p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Refresh Page
            </button>
            <a 
              href="/contact" 
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Contact Support
            </a>
          </div>
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