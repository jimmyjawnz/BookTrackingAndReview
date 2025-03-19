import React from "react";

const Filter = ({ categories, selectedCategory, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-gray-900 rounded-lg ">
      {/* "All" button to reset filter */}
      <button
        onClick={() => onChange("")}
        className={`px-4 py-2 text-sm rounded-full  transition ${
          selectedCategory === "" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        All Categories
      </button>

      {/* Category buttons */}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`px-4 py-2 text-sm rounded-full transition ${
            selectedCategory === category ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Filter;
