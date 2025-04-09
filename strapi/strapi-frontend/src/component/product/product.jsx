'use client';

import { langContextt } from '@/context/langContext';
import { deleteProduct, getProducts } from '@/lib/productApi';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {getLocalized,selectLang,setSelectLang} = useContext(langContextt)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts(selectLang);
        setProducts(productsData || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectLang]);

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
      <select name="" id="" onChange={(e) => setSelectLang(e.target.value)} className='bg-gray-200 p-2 rounded-lg block text-center mx-auto my-4'>
        <option value="en">English</option>
        <option value="hi-IN">Hindi</option>
      </select>
      <div className="flex justify-center gap-4 flex-wrap">
        {loading ? (
          <p>Loading products...</p>
        ) : products.length > 0 ? (
          products.map((item) => (
            <div
              key={item.id}
              className="border m-2 p-2 w-1/3 mx-auto space-y-2 rounded-lg bg-black"
            >
  <div className="flex flex-wrap justify-center gap-3 mb-4 drop-shadow-whi-100 drop-shadow-lg">

            <img
              key={item.id}
              src={`http://localhost:1337${item.image[0].url}`} 
              alt={item.image.name || "Product Image"}
              className="w-full h-32 object-cover rounded-xl "
            />
    </div>


              <h2 className="text-2xl text-white font-semibold"><Link href={`/productDetails/${item?.documentId}`}>{getLocalized(item, 'name')}
              </Link></h2>
              <p className="text-gray-400 text-lg font-semibold">Price:{getLocalized(item, 'price')}</p>
              <p className="text-gray-400 text-lg font-semibold">{getLocalized(item,'category')}</p>
              <div className="space-x-4 flex justify-center">
                <Link
                  href={`/put/${item.documentId}`}
                  className="bg-blue-600 text-white p-2 rounded-lg w-1/3"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.documentId)}
                  className="bg-red-500 text-white p-2 rounded-lg w-1/3"
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