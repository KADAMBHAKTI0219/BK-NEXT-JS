import React from 'react'

const VisaCard = ({ visa, country }) => {
    if (!visa) return <div className="text-gray-500">No visa data available</div>;
    
    return (
      <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold">
          {visa.type} for {country}
        </h3>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <p className="text-sm text-gray-600">Cost</p>
            <p>${visa.cost || "N/A"} USD</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Duration</p>
            <p>{visa.duration || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Validity</p>
            <p>{visa.validity || "N/A"}</p>
          </div>
        </div>
        {visa.notes && (
          <div className="mt-3">
            <p className="text-sm text-gray-600">Notes</p>
            <p className="text-sm">{visa.notes}</p>
          </div>
        )}
      </div>
    );
  };

export default VisaCard
