'use client';
import { getProductById, updateProduct } from "@/lib/productApi";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const UpdateProduct = ({ id }) => {
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getSingleData = async () => {
      try {
        const product = await getProductById(id);
        console.log("Fetched product:", product);
        setName(product?.Name || ""); 
      } catch (error) {
        console.error(" Error fetching product:", error);
      }
    };

    if (id) getSingleData();
  }, [id]);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateProduct(id, { data: { Name: name } });
      if (updated) {
        console.log("Product updated:", updated);
        router.push("/product");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };
  

  return (
    <div className="my-24">
      <h2 className="text-center text-3xl py-10">Update Product</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 text-black my-24">
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

export default UpdateProduct;
