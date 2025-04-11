"use client";
import { createProduct } from "@/lib/productApi";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { langContextt } from "@/context/langContext";

const AddProduct = () => {
  const { selectLang } = useContext(langContextt);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);

  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages((prev) => [...prev, ...selectedFiles]);
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !desc.trim() || !price || images.length === 0) {
      alert("Please fill in all fields and upload at least one image.");
      return;
    }

    try {
      // 1. Upload images
      const formData = new FormData();
      images.forEach((img) => formData.append("files", img));

      const uploadRes = await axios.post("http://localhost:1337/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const imageIds = uploadRes.data.map((file) => file.id);

      const addProductData = {
        name,
        description: desc,
        price,
        image: imageIds
      }

      // 2. Create product
      const newProduct = await createProduct(addProductData,selectLang);

      // If the product is created successfully, reset the form and redirect
      if (newProduct) {
        setName("");
        setDesc("");
        setPrice("");
        setImages([]);
        router.push("/product");
      }
    } catch (error) {
      console.error("Error creating product:", error.response?.data || error.message);
    }
  };

  return (
    <div className="my-24">
      <h1 className="text-center text-3xl py-10">
        Add Product ({selectLang === "en" ? "English" : "Hindi"})
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 text-black"
        encType="multipart/form-data"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={`Name (${selectLang})`}
          className="input"
          required
        />
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder={`Description (${selectLang})`}
          className="input"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder={`Price (${selectLang})`}
          className="input"
          required
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="input"
        />

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
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
