'use client';

import UpdateProduct from "@/components/product/UpdateProduct";
import { updateProduct } from "@/lib/ProductApi";
import { useParams, useRouter } from "next/navigation";



export default function UpdateProductPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const handleSave = async (id, formData) => {
    try {
      await updateProduct(id, formData);
      router.push('/');
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return <UpdateProduct id={id} onSave={handleSave} onCancel={() => router.push('/')} />;
}