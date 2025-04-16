'use client';

import { langContextt } from '@/context/langContext';
import { deleteProduct, getProducts } from '@/lib/productApi';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort,setSort] = useState('asc')
  const {getLocalized,selectLang,setSelectLang} = useContext(langContextt)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts(selectLang,sort);
        setProducts(productsData || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectLang,sort]);

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
    <div className="text-center px-4 py-6 ">
    <div className='flex justify-between items-center mb-10 max-w-7xl mx-auto'>
    <h1 className="text-4xl font-bold mb-6 text-gray-800">Products</h1>
    <select
    onChange={(e) => setSelectLang(e.target.value)}
    className="bg-gray-100 p-3 rounded-lg  text-center  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <option value="en">English</option>
    <option value="hi-IN">Hindi</option>
  </select>

  <select name="" id="" onChange={(e) => setSort(e.target.value)} className="bg-gray-100 p-3 rounded-lg  text-center  shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
      <option value="asc" >Sort By</option>
      <option value="asc" >Low To High</option>
      <option value="desc" >High To Low</option>
    </select>
  <Link
    href="/addproduct"
    className=" bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
  >
    Add Product
  </Link>

   

    </div>

    <div className="flex justify-center gap-6 flex-wrap mt-14">
      {loading ? (
        <p className="text-lg text-gray-600">Loading products...</p>
      ) : products.length > 0 ? (
        products.map((item) => (
          <div
            key={item.id}
            className="border border-gray-300 p-4 w-full sm:w-[48%] md:w-[30%] rounded-xl  shadow-md hover:shadow-lg transition duration-300 bg-gray-100"
          >
            <div className="flex justify-center mb-4">
              <img
                src={`http://localhost:1337${item.image[0].url}`}
                alt={item.image.name || "Product Image"}
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
  
            <h2 className="text-xl font-semibold text-gray-900">
              <Link href={`/productDetails/${item?.documentId}`}>
                {getLocalized(item, 'name')}
              </Link>
            </h2>
  
            <p className="text-gray-700 text-base mt-1">
              Price: <span className="font-medium">{getLocalized(item, 'price')}</span>
            </p>
  
            <div className="mt-4 flex gap-4 justify-center">
              <Link
                href={`/put/${item.documentId}`}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition w-full"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(item.documentId)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition w-full"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-lg text-gray-600">No products found.</p>
      )}
    </div>
  </div>
  
  );
};

export default Product;