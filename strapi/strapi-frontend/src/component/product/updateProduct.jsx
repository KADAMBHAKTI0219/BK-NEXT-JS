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
      const response = await updateProduct(id, { data:  { Name: name } });
      if (response) {
        console.log("Product updated successfully:", response);
        router.push("/"); 
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label><br />
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
