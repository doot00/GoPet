"use client";
import { useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleopenNav = () => setIsOpen(prev => !prev);
  const closeNav = () => setIsOpen(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white z-50 transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          className="absolute top-4 right-4 text-3xl text-white"
          onClick={closeNav}
        >
          &times;
        </button>
        <nav className="pt-16 px-6 space-y-4">
          <a href="#" className="block text-lg text-gray-400 hover:text-white">
            About
          </a>
          <a href="#" className="block text-lg text-gray-400 hover:text-white">
            Services
          </a>
          <a href="#" className="block text-lg text-gray-400 hover:text-white">
            Clients
          </a>
          <a href="#" className="block text-lg text-gray-400 hover:text-white">
            Contact
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-500 ${
          isOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        <button
          className="m-4 px-4 py-2 bg-gray-900 text-white hover:bg-gray-700 rounded"
          onClick={toggleopenNav}
        >
          ☰
        </button>
        <div className="p-4">
          {/* Main content here */}
          <h1 className="text-2xl font-bold">Welcome to the Main Area</h1>
        </div>
      </div>
    </div>
  );
}
