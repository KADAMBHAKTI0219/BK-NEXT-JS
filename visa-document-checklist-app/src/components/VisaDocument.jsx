'use client'
import { visaDocumentData } from '@/data/VisaDocument';
import { useSearchParams } from 'next/navigation';
import React from 'react';


const VisaDocument = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const country = searchParams.get('country');
  const visaType = searchParams.get('visaType');

  // Get document requirements based on country and visaType
  const documents = country && visaType && visaDocumentData[country]?.[visaType];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full space-y-8 ">
        <h1 className="text-3xl font-bold text-center text-gray-900">Visa Document Requirements</h1>
        <div className="mt-8 space-y-4 bg-white p-6 rounded-lg shadow-md ">
          <p className="text-base text-gray-600">
            <strong>Email:</strong> {email || 'Not provided'}
          </p>
          <p className="text-base text-gray-600">
            <strong>Country:</strong> {country || 'Not provided'}
          </p>
          <p className="text-base text-gray-600">
            <strong>Visa Type:</strong> {visaType || 'Not provided'}
          </p>
          <hr className="my-4" />
          <h2 className="text-xl font-semibold text-gray-900">Required Documents</h2>
          {documents ? (
            <ul className="list-disc pl-5 space-y-2 text-base text-gray-600 ">
              {documents.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-red-600">
              Unable to find document requirements. Please ensure the selected country and visa type are valid.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisaDocument;