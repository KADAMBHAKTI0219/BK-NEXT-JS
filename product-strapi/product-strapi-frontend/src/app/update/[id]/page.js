'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import EditCategory from '@/components/category/EditCategory';
import UpdateProducts from '@/components/products/UpdateProducts';

function UpdateContent({ params }) {
  const { id } = params;
  console.log('ID from params:', id);
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      {type === 'product' ? (
        <UpdateProducts id={id} />
      ) : type === 'category' ? (
        <EditCategory id={id} />
      ) : (
        <div className="text-center text-red-600">
          Invalid Type Specified
        </div>
      )}
    </div>
  );
}

export default function UpdatePage({ params }) {
  return (
    <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
      <UpdateContent params={params} />
    </Suspense>
  );
}