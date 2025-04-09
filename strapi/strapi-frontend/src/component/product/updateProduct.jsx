'use client';
import { getProductById, updateProduct } from "@/lib/productApi";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { langContextt } from "@/context/langContext";

const UpdateProduct = ({ id }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const router = useRouter();
  const { selectLang, getLocalized } = useContext(langContextt);
  const token = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(id);
        setName(getLocalized(product, "name") || "");
        setDescription(getLocalized(product, "description") || "");
        setPrice(product?.price || "");

        const existingImages = product?.image?.map((img) => ({
          type: "existing",
          id: img.id,
          url: `http://localhost:1337${img.url}`,
        })) || [];

        setImages(existingImages);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) fetchProduct();
  }, [id, selectLang]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImgs = files.map((file) => ({
      type: "new",
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImgs]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const existingImageIds = images.filter(img => img.type === "existing").map(img => img.id);
      const newImages = images.filter(img => img.type === "new");
      let newImageIds = [];
  
      if (newImages.length > 0) {
        const formData = new FormData();
        newImages.forEach(img => formData.append("files", img.file));
  
        const uploadRes = await axios.post("http://localhost:1337/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
  
        newImageIds = uploadRes.data.map(file => file.id);
      }
  
      const finalImageIds = [...existingImageIds, ...newImageIds];
  
      const updateData = {
        name,
        description,
        price: Number(price),
        image: finalImageIds,
      };
  
      await updateProduct(id, { data: updateData }, selectLang);
      console.log("Product updated:", updateData);
      router.push("/product");
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
    }
  };
  
  return (
    <div className="my-24">
      <h2 className="text-center text-3xl py-10">Update Product</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 text-black"
      >
        <label htmlFor="name" className="block text-gray-700 font-medium">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product name"
        />

        <label htmlFor="description" className="block text-gray-700 font-medium">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product description"
          required
        />

        <label htmlFor="price" className="block text-gray-700 font-medium">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product price"
          required
        />

        <label className="block text-gray-700 font-medium">Images:</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img.url}
                  alt="preview"
                  className="w-full h-24 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xl"
                >
                  ×
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

export default UpdateProduct;
