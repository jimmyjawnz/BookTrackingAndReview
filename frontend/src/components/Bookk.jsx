import React from 'react';

export default function Book() {
  return (
    <section className="container mx-auto p-4 antialiased">
      <article className="flex flex-wrap md:flex-nowrap shadow-lg mx-auto max-w-[600px] max-h-[220px] group cursor-pointer transform duration-500 hover:-translate-y-1">
        <img 
          className="w-[120px] h-[180px] object-cover rounded-md" 
          src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" 
          alt="Book Cover" 
        />
        <div className="flex flex-col justify-between p-3 w-full">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">The Great Adventure</h1>
            <p className="text-sm text-gray-600 mt-1 leading-tight">
              A thrilling journey through the unknown.
            </p>
          </div>
          <div className="bg-blue-50 p-2 rounded-md">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs text-gray-700">
                  <span className="font-bold text-gray-900">Author:</span> John Doe
                </div>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <svg key={index} className="w-3 h-3 mx-px fill-current text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                        <path d="M7 0l2.16 4.38 4.84.7-3.5 3.41.83 4.83L7 10.9l-4.33 2.28.83-4.83L0 5.08l4.84-.7L7 0z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2 text-xs">120 reviews</span>
                </div>
              </div>
              <button className="py-1 px-3 bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold rounded-md">
                Add To List
              </button>
            </div>
            <div className="mt-1 text-gray-600 text-xs">*Genre: Fantasy, Adventure</div>
          </div>
        </div>
      </article>
    </section>
  );
}
