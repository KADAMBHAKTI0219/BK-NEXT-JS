'use client';

import { deleteProduct, getProductById, getProducts } from '@/lib/productApi';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const isDeleted = await deleteProduct(productId);
      if (!isDeleted) {
        const updatedProducts = await getProducts();
        setProducts(updatedProducts || []);
      }
       else {
        console.error('Failed to delete product:', productId);
        alert('Failed to delete product. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('An error occurred while deleting the product.');
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl mb-4">Products</h1>
      <Link href='/addproduct'>Add Product</Link>
      <div className="flex justify-center gap-4 flex-wrap">
        {loading ? (
          <p>Loading products...</p>
        ) : products.length > 0 ? (
          products.map((item) => (
            <div
              key={item.id}
              className="border m-2 p-2 w-1/3 mx-auto space-y-2"
            >
  <div className="flex flex-wrap justify-center gap-3 mb-4">
      {item.image && Array.isArray(item.image) ? (
        item.image.map((img, imgIndex) => {
          const imageUrl =
            img?.formats?.medium?.url ||
            img?.formats?.small?.url ||
            img?.formats?.thumbnail?.url ||
            img?.url;

          return (
            <img
              key={imgIndex}
              src={`http://localhost:1337${imageUrl}`} 
              alt={img.name || "Product Image"}
              className="w-32 h-32 object-cover rounded border"
            />
          );
        })
      ) : (
        <div className="text-gray-400">No images</div>
      )}
    </div>


              <h2 className="text-2xl">{item?.Name}</h2>
              <div className="space-x-4">
                <Link
                  href={`/put/${item.documentId}`}
                  className="bg-blue-600 text-white p-3 rounded-lg"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.documentId)}
                  className="bg-red-500 text-white p-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Product;