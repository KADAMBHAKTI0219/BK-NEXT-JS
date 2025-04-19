export default async function ProductsPage() {
    // Fetch products from fake store API
    const res = await fetch('https://fakestoreapi.com/products', {
      cache: 'force-cache', // Ensure Turbopack caches the API response
    });
    const products = await res.json();
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h2 className="text-lg font-semibold mb-2 truncate">{product.title}</h2>
              <p className="text-gray-600 mb-2">
                Price: {product.price}
              </p>
              <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }