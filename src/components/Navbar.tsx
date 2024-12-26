import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, Map, Syringe, Plane, Bell } from 'lucide-react';
import NotificationCenter from './notifications/NotificationCenter';
import MobileNavbar from './mobile/MobileNavbar';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <NavLink to="/" className="flex items-center space-x-2 font-bold text-xl">
              <Activity size={24} />
              <span>COVID Tracker</span>
            </NavLink>
            
            <div className="hidden md:flex space-x-4">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center space-x-1 px-3 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${
                    isActive ? 'bg-indigo-700' : 'hover:bg-indigo-700'
                  }`
                }
              >
                <Activity size={18} />
                <span>Dashboard</span>
              </NavLink>
              
              <NavLink
                to="/map"
                className={({ isActive }) =>
                  `flex items-center space-x-1 px-3 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${
                    isActive ? 'bg-indigo-700' : 'hover:bg-indigo-700'
                  }`
                }
              >
                <Map size={18} />
                <span>Map</span>
              </NavLink>
              
              <NavLink
                to="/vaccination"
                className={({ isActive }) =>
                  `flex items-center space-x-1 px-3 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${
                    isActive ? 'bg-indigo-700' : 'hover:bg-indigo-700'
                  }`
                }
              >
                <Syringe size={18} />
                <span>Vaccination</span>
              </NavLink>
              
              <NavLink
                to="/travel"
                className={({ isActive }) =>
                  `flex items-center space-x-1 px-3 py-2 rounded-md transition-all duration-300 transform hover:scale-105 ${
                    isActive ? 'bg-indigo-700' : 'hover:bg-indigo-700'
                  }`
                }
              >
                <Plane size={18} />
                <span>Travel</span>
              </NavLink>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <NotificationCenter />
            <MobileNavbar />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;