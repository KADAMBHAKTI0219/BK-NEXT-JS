'use client';
import { getProductById, updateProduct } from "@/lib/productApi";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const UpdateProduct = ({ id }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getSingleData = async () => {
      try {
        const product = await getProductById(id);
        setName(product?.Name || "");
        // optional: setImage for preview if needed
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) getSingleData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

      let imageIds = [];

      if (image.length > 0) {
        const formData = new FormData();
        image.forEach((img) => formData.append("files", img));

        const uploadRes = await axios.post("http://localhost:1337/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        imageIds = uploadRes.data.map((file) => file.id);
      }

      const updated = await updateProduct(id, {
        data: {
          Name: name,
          ...(imageIds.length > 0 && { image: imageIds }),
        },
      });

      if (updated) {
        console.log("Product updated:", updated);
        router.push("/product");
      }
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="my-24">
      <h2 className="text-center text-3xl py-10">Update Product</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 text-black">
        <label htmlFor="name" className="block text-gray-700 font-medium">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product name"
        />

        <label htmlFor="image" className="block text-gray-700 font-medium">Image:</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          multiple
          onChange={(e) => setImage(Array.from(e.target.files))}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
