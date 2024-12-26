import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Activity, Map, Syringe, Plane } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "-100%",
      transition: {
        duration: 0.3
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-indigo-600 z-50"
          >
            <div className="flex flex-col p-4">
              <div className="flex justify-between items-center mb-8">
                <span className="text-white text-xl font-bold">COVID Tracker</span>
                <button onClick={() => setIsOpen(false)} className="text-white">
                  <X size={24} />
                </button>
              </div>

              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-4 text-white ${
                    isActive ? 'bg-indigo-700' : ''
                  } rounded-lg mb-2`
                }
                onClick={() => setIsOpen(false)}
              >
                <Activity size={20} />
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="/map"
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-4 text-white ${
                    isActive ? 'bg-indigo-700' : ''
                  } rounded-lg mb-2`
                }
                onClick={() => setIsOpen(false)}
              >
                <Map size={20} />
                <span>Map</span>
              </NavLink>

              <NavLink
                to="/vaccination"
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-4 text-white ${
                    isActive ? 'bg-indigo-700' : ''
                  } rounded-lg mb-2`
                }
                onClick={() => setIsOpen(false)}
              >
                <Syringe size={20} />
                <span>Vaccination</span>
              </NavLink>

              <NavLink
                to="/travel"
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-4 text-white ${
                    isActive ? 'bg-indigo-700' : ''
                  } rounded-lg mb-2`
                }
                onClick={() => setIsOpen(false)}
              >
                <Plane size={20} />
                <span>Travel</span>
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavbar;