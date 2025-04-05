'use client';
import { createProduct, getProducts } from "@/lib/productApi";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a product name.");
      return;
    }
  
    try {
      await createProduct({ data: { Name: name } }); 
      console.log("Product created successfully");
      setName(""); 
      router.push('/product');
      const products = await getProducts();
      console.log("Fetched products:", products);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="my-24">
      <h1 className="text-center text-3xl py-10">Add Product</h1>
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 text-black">
  <label htmlFor="name" className="block text-gray-700 font-medium">Name:</label>
  <input
    type="text"
    id="name"
    name="name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
    placeholder="Enter product name"
  />
  <button
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
  >
    Submit
  </button>
    </form>

    </div>
  );
};

export default AddProduct;
