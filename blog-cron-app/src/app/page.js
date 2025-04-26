// app/page.js

import ProductCard from "@/components/ProductCard";


async function fetchProducts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cache/products`, {
    next: { tags: ['products'] }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  const data = await response.json();
  return data.products || [];
}

export default async function Home() {
  let products;
  try {
    products = await fetchProducts();
  } catch (error) {
    console.error('Fetch error:', error);
    products = [];
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Product Catalog
      </h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 mb-4 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No Products Available</h2>
          <p className="text-gray-500 mb-4">We're currently updating our catalog.</p>
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