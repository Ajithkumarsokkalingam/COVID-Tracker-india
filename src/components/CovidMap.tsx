import React from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const stateCoordinates = {
  "Maharashtra": [19.7515, 75.7139],
  "Kerala": [10.8505, 76.2711],
  // Add more state coordinates
};

const getCircleColor = (cases: number) => {
  if (cases > 10000) return "#EF4444";
  if (cases > 5000) return "#F59E0B";
  return "#10B981";
};

const CovidMap = () => {
  return (
    <div className="h-screen max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">COVID-19 Map</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="h-[600px]">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {Object.entries(stateCoordinates).map(([state, coords]: [string, any]) => (
              <Circle
                key={state}
                center={coords}
                radius={30000}
                pathOptions={{
                  color: getCircleColor(15000),
                  fillColor: getCircleColor(15000),
                  fillOpacity: 0.7
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold">{state}</h3>
                    <p>Active Cases: 15,000</p>
                    <p>Recovered: 125,678</p>
                    <p>Deaths: 3,456</p>
                  </div>
                </Popup>
              </Circle>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default CovidMap;