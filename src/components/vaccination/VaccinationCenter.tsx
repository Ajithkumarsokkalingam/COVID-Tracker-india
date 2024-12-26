import React, { useState } from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';
import { stateData } from '../../data/covidData';
import VaccinationSlots from './VaccinationSlots';
import SearchBar from '../common/SearchBar';

const VaccinationCenter = () => {
  const [selectedState, setSelectedState] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const allCenters = Object.entries(stateData).reduce((acc: any[], [state, data]) => {
    return [...acc, ...(data.centers || []).map(center => ({ ...center, state }))];
  }, []);

  const filteredCenters = allCenters.filter(center => 
    (selectedState ? center.state === selectedState : true) &&
    (searchQuery ? center.name.toLowerCase().includes(searchQuery.toLowerCase()) : true)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Vaccination Centers</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search centers..."
            icon={Search}
          />
          
          <select
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">All States</option>
            {Object.keys(stateData).map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCenters.map((center, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">{center.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin size={16} className="mr-2" />
                  <p>{center.address}</p>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar size={16} className="mr-2" />
                  <p>{center.slots} slots available</p>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Available Vaccines:</h4>
              <div className="flex flex-wrap gap-2">
                {center.vaccines.map((vaccine, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                  >
                    {vaccine}
                  </span>
                ))}
              </div>
            </div>
            
            <button
              className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Book Slot
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VaccinationCenter;