"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, deleteProduct, fetchProducts, updateProduct } from "../redux/slices/product/productThunks";
import {changeTheme} from "../redux/slices/themeSwitcher/themeSlice"

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const [newProduct, setNewProduct] = useState({ title: "", price: 0 ,description:""});
  const theme = useSelector((state)=>state.theme.mode)


  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(changeTheme(theme == "light" ? "Dark" : "Light"))
  }, [dispatch]);

  const handleCreate = () => {
    if (newProduct.title) {
      dispatch(createProduct(newProduct));
      setNewProduct({ title: "", price: 0 ,description:""});
    }
  };

  const handleUpdate = (id) => {
    if (!id) {
      console.error("Product ID is undefined!");
      return;
    }
    
    const updatedData = { title: "Updated Title", price: 100, description: "Updated Description" };
    dispatch(updateProduct({ id, data: updatedData }));
    dispatch(fetchProducts())
  };
  

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return  (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl my-20 text-black dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center dark:text-white">Product List</h1>
      
      <div className="flex flex-col gap-3 mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newProduct.title}  
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          className="border p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 "
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="border p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="border p-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </div>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product._id} className="p-4 bg-gray-100 rounded-md flex justify-between items-center shadow">
            <div>
              <p className="text-lg font-semibold">{product.title}</p>
              <p className="text-gray-700">${product.price}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleUpdate(product._id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}