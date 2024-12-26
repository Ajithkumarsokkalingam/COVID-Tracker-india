import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CovidMap from './components/CovidMap';
import VaccinationCenter from './components/vaccination/VaccinationCenter';
import TravelAdvisory from './components/travel/TravelAdvisory';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/map" element={<CovidMap />} />
          <Route path="/vaccination" element={<VaccinationCenter />} />
          <Route path="/travel" element={<TravelAdvisory />} />
        </Routes>
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;