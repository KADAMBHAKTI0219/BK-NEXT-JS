"use client"
import AddProduct from '@/components/product/AddProduct';
import ProductCard from '@/components/product/ProductCard';
import { createProduct, deleteProduct, getProducts } from '@/lib/ProductApi';
import { useEffect, useState } from 'react';


export default function Home() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p._id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/update/${id}`;
  };

  const handleSave = async (formData) => {
    try {
      const created = await createProduct(formData);
      setProducts([...products, created.data]);
      setShowForm(false);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Management</h1>
      <button onClick={() => setShowForm(true)} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Product</button>
      {showForm && <AddProduct onSave={handleSave} onCancel={() => setShowForm(false)} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product._id} product={product} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
}