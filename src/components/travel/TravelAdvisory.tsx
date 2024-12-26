import React, { useState } from 'react';
import { MapPin, AlertTriangle } from 'lucide-react';
import { stateData } from '../../data/covidData';
import SearchBar from '../common/SearchBar';

const TravelAdvisory = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const getRiskLevel = (stateName: string) => {
    const state = stateData[stateName];
    if (!state) return 'unknown';
    
    const activeCases = state.active;
    if (activeCases > 10000) return 'high';
    if (activeCases > 5000) return 'medium';
    return 'low';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Travel Advisory</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Origin State
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            >
              <option value="">Select origin state</option>
              {Object.keys(stateData).map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination State
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="">Select destination state</option>
              {Object.keys(stateData).map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        {origin && destination && (
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Travel Risk Assessment</h2>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${getRiskColor(getRiskLevel(origin))}`}>
                <h3 className="font-medium mb-2">Origin: {origin}</h3>
                <p>Active Cases: {stateData[origin]?.active.toLocaleString()}</p>
                <p>Risk Level: {getRiskLevel(origin).toUpperCase()}</p>
              </div>

              <div className={`p-4 rounded-lg ${getRiskColor(getRiskLevel(destination))}`}>
                <h3 className="font-medium mb-2">Destination: {destination}</h3>
                <p>Active Cases: {stateData[destination]?.active.toLocaleString()}</p>
                <p>Risk Level: {getRiskLevel(destination).toUpperCase()}</p>
              </div>

              {getRiskLevel(destination) === 'high' && (
                <div className="flex items-start p-4 bg-red-50 rounded-lg">
                  <AlertTriangle className="text-red-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium text-red-800">Travel Advisory</h4>
                    <p className="text-red-700">Travel to this destination is not recommended due to high COVID-19 cases.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Travel Guidelines</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Required Documents</h3>
            <ul className="list-disc list-inside text-blue-700 space-y-1">
              <li>Vaccination Certificate</li>
              <li>RT-PCR Test Report (not older than 72 hours)</li>
              <li>State e-Pass (if applicable)</li>
            </ul>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-800 mb-2">Safety Measures</h3>
            <ul className="list-disc list-inside text-green-700 space-y-1">
              <li>Wear masks in public places</li>
              <li>Maintain social distancing</li>
              <li>Carry sanitizers and follow hygiene protocols</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelAdvisory;