import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";



export default function Navbar() {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between max-w-full md:max-w-6xl px-4 md:px-6 py-6 mx-auto bg-gray-900">
      {/* Logo */}
      <Link to="/" className="text-white z-10 flex items-center space-x-2">
        <FontAwesomeIcon icon={faBookOpen} className="text-2xl relative top-[1px] text-purple-400" />
        <h1 className="text-2xl font-extrabold tracking-wide leading-none" style={{ fontFamily: "'Roxborough CF', serif" }}>
          Cover To Cover
        </h1>

      </Link>

      {/* Navigation Links, Search Bar & Account Icon */}
      <div className="flex items-center space-x-6 mt-4 md:mt-0">
        <nav>
          <ul className="flex space-x-6 text-lg">
            <li>
              <Link to="/blog" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-300">Browse</Link>
            </li>
          </ul>
        </nav>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-800 text-white"
          />
          <button className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-300">
            🔍
          </button>
        </div>

        {/* Account Icon */}
        <Link to="/user">
          <FontAwesomeIcon icon={faCircleUser} flip="horizontal" size="2xl" className="text-purple-400 text-2xl" cursor="pointer" />
        </Link>
      </div>
    </header>
  );
}
