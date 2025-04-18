'use client';

import AddProducts from '@/components/products/AddProducts';
import AddCategory from '@/components/category/AddCategory';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function CreateContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      {type === 'product' ? (
        <AddProducts />
      ) : type === 'category' ? (
        <AddCategory />
      ) : (
        <div className="text-center text-gray-500">
          Please select an option: <br />
          <Link href="/create?type=product" className="text-blue-600 hover:text-blue-800 mr-4">
            Add Product
          </Link>
          <Link href="/create?type=category" className="text-blue-600 hover:text-blue-800">
            Add Category
          </Link>
        </div>
      )}
    </div>
  );
}

export default function CreatePage() {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <CreateContent />
    </Suspense>
  );
}