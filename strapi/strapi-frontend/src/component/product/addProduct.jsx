'use client';
import { createProduct } from "@/lib/productApi";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages((prev) => [...prev, ...selectedFiles]);
  };

  // Remove image by index
  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || images.length === 0) {
      alert("Please enter a product name and select at least one image.");
      return;
    }

    try {
      const formData = new FormData();
      images.forEach((img) => formData.append("files", img));

      const uploadRes = await axios.post("http://localhost:1337/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const uploadData = uploadRes.data;
      const imageIds = uploadData.map((file) => file.id);
      if (!imageIds || imageIds.length === 0) throw new Error("Image upload failed.");

      await createProduct({
        data: {
          Name: name,
          image: imageIds,
        },
      });

      setName("");
      setImages([]);
      router.push("/product");
    } catch (error) {
      console.error("Error creating product:", error.response?.data || error.message);
    }
  };

  return (
    <div className="my-24">
      <h1 className="text-center text-3xl py-10">Add Product</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 text-black"
        encType="multipart/form-data"
      >
        <label htmlFor="name" className="block text-gray-700 font-medium">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product name"
          required
        />

        <label htmlFor="image" className="block text-gray-700 font-medium">
          Image:
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Preview Selected Images */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`preview-${index}`}
                  className="w-full h-24 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center z-50 text-xl"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}

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
