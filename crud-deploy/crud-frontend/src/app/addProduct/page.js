"use client"
import AddProduct from "@/components/product/AddProduct";
import { createProduct } from "@/lib/ProductApi";
import { useRouter } from "next/navigation";


export default function AddProductPage() {
  const router = useRouter();

  const handleSave = async (formData) => {
    try {
      await createProduct(formData);
      router.push('/');
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  return <AddProduct onSave={handleSave} onCancel={() => router.push('/')} />;
}