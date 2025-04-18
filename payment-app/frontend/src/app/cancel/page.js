'use client'
import Link from 'next/link';

export default function Cancel() {
  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-50 to-gray-50 min-h-screen text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Payment Cancelled</h1>
      <p className="text-lg text-gray-600 mb-8">Your payment was not processed.</p>
      <Link
        href="/"
        className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
      >
        Back to Products
      </Link>
    </div>
  );
}