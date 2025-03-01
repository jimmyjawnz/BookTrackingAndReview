import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // ✅ Import FontAwesomeIcon
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"; // ✅ Import the specific icon

export default function Navbar() {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between max-w-full md:max-w-6xl px-4 md:px-6 py-6 mx-auto">
      {/* Logo */}
      <a href="/" className="text-indigo-900 z-10">
        <h1 className="text-2xl font-extrabold tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
          Cover To Cover
        </h1>
      </a>

      {/* Navigation Links, Search Bar & Account Icon */}
      <div className="flex items-center space-x-6 mt-4 md:mt-0">
        <nav>
          <ul className="flex space-x-6 text-lg">
            <li>
              <a href="/blog" className="hover:text-indigo-600">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600">Browse</a>
            </li>
            {/* <li>
              <a href="#" className="hover:text-indigo-600">Account</a>
            </li>
          */}
          </ul>
        </nav>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="absolute right-3 top-2.5 text-gray-500 hover:text-indigo-600">
            🔍
          </button>
        </div>

        {/* Account Icon */}
        <FontAwesomeIcon icon={faCircleUser} flip="horizontal" size="2xl" className="text-indigo-900 text-2xl" />
        
      </div>
    </header>
  );
}
