'use client';
import { visaDocumentData } from '@/data/VisaDocument';
import { visaEligibleForm } from '@/data/VisaEligibleForm';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const VisaEligibleForm = () => {
  const router = useRouter();

  // State to manage form data
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    Country: '',
    VisaType: '',
  });

  // Handle input changes for text inputs and dropdowns
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!visaDocumentData[formData.Country] || !visaDocumentData[formData.Country][formData.VisaType]) {
      alert('Invalid country or visa type selected.');
      return;
    }
    router.push(
      `/visaDocument?email=${encodeURIComponent(formData.Email)}&country=${encodeURIComponent(
        formData.Country
      )}&visaType=${encodeURIComponent(formData.VisaType)}`
    );
  };

  // Mapping of countries to flag-inspired Tailwind CSS background classes
  const countryFlagStyles = {
    usa: 'bg-gradient-to-r from-blue-700 via-white to-red-600',
    uk: 'bg-gradient-to-b from-blue-800 to-red-600',
    canada: 'bg-gradient-to-r from-red-600 via-white to-red-600', 
    australia: 'bg-blue-900',
    schengen: 'bg-blue-600',
    japan: 'bg-gradient-to-r from-white to-red-600', 
    india: 'bg-gradient-to-b from-orange-500 via-white to-green-600', 
    germany: 'bg-gradient-to-b from-black via-red-600 to-yellow-400',
    turkey: 'bg-red-600',
    france: 'bg-gradient-to-r from-blue-600 via-white to-red-600',
    china: 'bg-red-600', 
    brazil: 'bg-gradient-to-b from-green-600 via-yellow-400 to-blue-600',
    south_africa: 'bg-gradient-to-r from-green-600 via-yellow-400 to-red-600',
    new_zealand: 'bg-blue-900',
    russia: 'bg-gradient-to-b from-white via-blue-600 to-red-600',
    thailand: 'bg-gradient-to-b from-red-600 via-white to-blue-600',
    mexico: 'bg-gradient-to-r from-green-600 via-white to-red-600',
    south_korea: 'bg-gradient-to-r from-white to-red-600',
    uae: 'bg-gradient-to-r from-green-600 via-white to-black',
    default: 'bg-gray-100', 
  };

  // Determine the background class based on selected country
  const backgroundClass = formData.Country ? countryFlagStyles[formData.Country] : countryFlagStyles.default;

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${backgroundClass}`}>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900">Check Your Eligibility</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {visaEligibleForm.map((formItem, index) => (
            <div key={index} className="space-y-2">
              {formItem.options ? (
                <select
                  name={formItem.name}
                  value={formData[formItem.name] || ''}
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm invalid:border-red-500 text-lg"
                >
                  <option value="" disabled>
                    {formItem.placeholder}
                  </option>
                  {formItem.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name={formItem.name}
                  placeholder={formItem.placeholder}
                  value={formData[formItem.name] || ''}
                  onChange={handleChange}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm invalid:border-red-500 text-lg"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Check Eligibility
          </button>
        </form>
      </div>
    </div>
  );
};

export default VisaEligibleForm;