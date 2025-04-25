"use client"
import { VisaFinderTool } from '@/data/visaFinderTools';
import React, { useState } from 'react';
import VisaCard from './VisaCard';

const VisaFinder = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [viewMode, setViewMode] = useState(''); // 'types' or 'duration'
  const [selectedType, setSelectedType] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setViewMode('');
    setSelectedType('');
    setSelectedDuration('');
  };

  const handleViewMode = (mode) => {
    setViewMode(mode);
    setSelectedType('');
    setSelectedDuration('');
  };

  const countryData = VisaFinderTool.find((item) => item.country === selectedCountry);
  const visaTypes = countryData ? [...new Set(countryData.visas.map((visa) => visa.type))] : [];
  const visaDurations = countryData ? [...new Set(countryData.visas.map((visa) => visa.duration))] : [];

  // Filter visas based on selected type or duration
  const filteredVisas = countryData?.visas.filter((visa) => {
    if (viewMode === 'types' && selectedType) return visa.type === selectedType;
    if (viewMode === 'duration' && selectedDuration) return visa.duration === selectedDuration;
    return true;
  }) || [];

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Visa Finder Tool</h1>

      {/* Country Dropdown */}
      <div className="mb-6">
        <label htmlFor="country" className="block mb-2 font-medium">Select Country:</label>
        <select 
          id="country" 
          value={selectedCountry} 
          onChange={handleCountryChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a Country </option>
          {VisaFinderTool.map((item) => (
            <option key={item.country} value={item.country}>
              {item.country}
            </option>
          ))}
        </select>   
      </div>

      {/* Display general country information */}
      {selectedCountry && countryData && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Visa Information for {selectedCountry}</h2>
        </div>
      )}

      {/* Buttons for View Mode */}
      {selectedCountry && (
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => handleViewMode('types')}
            className={`px-4 py-2 rounded-md ${viewMode === 'types' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Show by Types
          </button>
          <button
            onClick={() => handleViewMode('duration')}
            className={`px-4 py-2 rounded-md ${viewMode === 'duration' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Show by Duration
          </button>
        </div>
      )}

      {/* Display Visa Types dropdown */}
      {viewMode === 'types' && (
        <div className="mb-6">
          <label htmlFor="visaType" className="block mb-2 font-medium">Select Visa Type:</label>
          <select
            id="visaType"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value=""> All Visa Types </option>
            {visaTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Display Visa Durations dropdown */}
      {viewMode === 'duration' && (
        <div className="mb-6">
          <label htmlFor="visaDuration" className="block mb-2 font-medium">Select Duration:</label>
          <select
            id="visaDuration"
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Durations</option>
            {visaDurations.map((duration) => (
              <option key={duration} value={duration}>
                {duration}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Display Visa Cards */}
      {(selectedCountry && (viewMode === '' || filteredVisas.length > 0)) && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {viewMode === 'types' && selectedType 
              ? `${selectedType} Visas` 
              : viewMode === 'duration' && selectedDuration 
                ? `${selectedDuration} Visas` 
                : 'All Visa Options'}
          </h3>
          
          {filteredVisas.length > 0 ? (
            filteredVisas.map((visa, index) => (
              <VisaCard key={index} visa={visa} country={selectedCountry} />
            ))
          ) : (
            <p className="text-gray-500">No visas match your selected criteria.</p>
          )}
        </div>
      )}
    </div>
  );
};


export default VisaFinder