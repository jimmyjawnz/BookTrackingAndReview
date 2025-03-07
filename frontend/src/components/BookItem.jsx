import React from 'react';
import { Link } from 'react-router-dom';

const BookItem = ({ title, author, description, imageUrl, rating, reviews, id, genres }) => {
  const truncatedDescription = description?.length > 100 
    ? description.slice(0, 100) + "..." 
    : description || 'No description available';

  // Display up to 3 genres
  const displayedGenres = genres?.slice(0, 3).join(', ') || 'No genres listed';

  return (
    <Link to={`/book/${id}`} className="block hover:opacity-90 transition-opacity">
      <article className="flex flex-wrap md:flex-nowrap shadow-lg mx-auto max-w-[600px] max-h-[220px] group cursor-pointer mb-3 bg-gray-800">
        <img
          className="w-[120px] h-[180px] object-cover rounded-md"
          src={imageUrl || "https://edit.org/images/cat/book-covers-big-2019101610.jpg"}
          alt="Book Cover"
        />
        <div className="flex flex-col justify-between p-3 w-full">
          <div>
            <h1 className="text-lg font-semibold text-white">{title}</h1>
            <p className="text-sm text-gray-300 mt-1 leading-tight">{truncatedDescription}</p>
          </div>
          <div className="bg-gray-700 p-2 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs text-gray-400">
                  <span className="font-bold text-white">Author:</span> {author}
                </div>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <svg 
                        key={index} 
                        className={`w-3 h-3 mx-px fill-current ${index < (rating || 0) ? 'text-yellow-400' : 'text-gray-600'}`}
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 14 14"
                      >
                        <path d="M7 0l2.16 4.38 4.84.7-3.5 3.41.83 4.83L7 10.9l-4.33 2.28.83-4.83L0 5.08l4.84-.7L7 0z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-300 ml-2 text-xs">
                    {reviews?.toLocaleString() || 0} reviews
                  </span>
                </div>
              </div>
              <button 
                className="py-1 px-3 bg-purple-800 hover:bg-purple-700 text-white text-xs font-bold rounded-md"
                onClick={(e) => e.preventDefault()} // Prevent navigation when clicking button
              >
                Add To List
              </button>
            </div>
            <div className="mt-1 text-gray-400 text-xs">
              Genre: {displayedGenres}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BookItem;