"use client";
import { createProduct } from "@/lib/productApi";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddProduct = () => {
  const [nameEN, setNameEN] = useState("");
  const [descEN, setDescEN] = useState("");
  const [priceEN, setPriceEN] = useState("");

  const [nameHI, setNameHI] = useState("");
  const [descHI, setDescHI] = useState("");
  const [priceHI, setPriceHI] = useState("");

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
  
    if (!nameEN.trim() || images.length === 0) {
      alert("Please enter product name and image.");
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
  
      // 2. Create English product
      const englishProduct = await createProduct({
        data: {
          Name: nameEN,
          description: descEN,
          price: priceEN,
          image: imageIds,
          locale: "en",
        },
      });
  
      const englishProductId = englishProduct?.data?.id;
  
      // 3. Create Hindi localization (linked to English)
      await createProduct({
        data: {
          Name: nameHI || nameEN,
          description: descHI || descEN,
          price: Number(priceHI || priceEN),
          image: imageIds,
          locale: "hi-IN",
          localizations: [englishProductId], 
        },
      });
  
      // 4. Reset form
      setNameEN(""); setDescEN(""); setPriceEN("");
      setNameHI(""); setDescHI(""); setPriceHI("");
      setImages([]);
  
      router.push("/product");
    } catch (error) {
      console.error("Error creating product:", error.response?.data || error.message);
    }
  };
  

  return (
    <div className="my-24">
      <h1 className="text-center text-3xl py-10">Add Product (Multi-language)</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 text-black"
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-bold">English</h2>
        <input value={nameEN} onChange={(e) => setNameEN(e.target.value)} placeholder="Name (EN)" className="input" required />
        <input value={descEN} onChange={(e) => setDescEN(e.target.value)} placeholder="Description (EN)" className="input" required />
        <input type="number" value={priceEN} onChange={(e) => setPriceEN(e.target.value)} placeholder="Price (EN)" className="input" required />

        <h2 className="text-xl font-bold mt-6">Hindi</h2>
        <input value={nameHI} onChange={(e) => setNameHI(e.target.value)} placeholder="Name (HI)" className="input" />
        <input value={descHI} onChange={(e) => setDescHI(e.target.value)} placeholder="Description (HI)" className="input" />
        <input type="number" value={priceHI} onChange={(e) => setPriceHI(e.target.value)} placeholder="Price (HI)" className="input" />

        <input type="file" multiple accept="image/*" onChange={handleFileChange} className="input" />
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img src={URL.createObjectURL(img)} alt={`preview-${index}`} className="w-full h-24 object-cover rounded-md" />
                <button type="button" onClick={() => removeImage(index)} className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center z-50 text-xl">x</button>
              </div>
            ))}
          </div>
        )}
        <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
