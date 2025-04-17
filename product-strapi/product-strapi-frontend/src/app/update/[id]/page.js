'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import EditCategory from '@/components/category/EditCategory';
import UpdateProducts from '@/components/products/UpdateProducts';

function UpdateContent({ params }) {
  const { id } = params;
  const searchParams = useSearchParams();
  const type = searchParams.get('type')?.toLowerCase();

  console.log('ID from params:', id, 'Type from searchParams:', type);

  if (!type || !['product', 'category'].includes(type)) {
    return (
      <div className="text-center text-red-600">
        Invalid or missing type. Please specify{' '}
        <a href={`/update/${id}?type=product`} className="underline">
          product
        </a>{' '}
        or{' '}
        <a href={`/update/${id}?type=category`} className="underline">
          category
        </a>.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      {type === 'product' ? (
        <UpdateProducts id={id} />
      ) : (
        <EditCategory id={id} />
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