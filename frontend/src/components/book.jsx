import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookItem from './BookItem';

export default function Book() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
        params: {
          q: 'most popular books', 
          maxResults: 10,
          startIndex: page * 10,
          key: ''
        }
      });

      const data = response.data;
      setBooks(data.items);
      setTotalPages(Math.ceil(data.totalItems / 10));
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page]);

  const getPageButtons = () => {
    const buttons = [];
    const startPage = Math.floor(page / 5) * 5;
    for (let i = startPage; i < startPage + 5; i++) {
      if (i < totalPages) buttons.push(i);
    }
    return buttons;
  };

  return (
    <section className="container mx-auto p-4 antialiased bg-gray-900 text-white min-h-screen">
      {books.map((book) => {
        const authors = book.volumeInfo.authors?.slice(0, 2).join(', ') || 'Unknown Author';
        const genres = book.volumeInfo.categories || []; // Extract genres from API

        return (
          <BookItem
            key={book.id}
            id={book.id}
            title={book.volumeInfo.title}
            author={authors}
            description={book.volumeInfo.description || 'No description available'}
            imageUrl={book.volumeInfo.imageLinks?.thumbnail}
            rating={book.volumeInfo.averageRating}
            reviews={book.volumeInfo.ratingsCount || 0}
            genres={genres} // Pass genres as a prop
          />
        );
      })}

      {/* Pagination */}
      <div className="container mx-auto px-4 mt-6">
        <nav className="flex flex-row flex-nowrap justify-between md:justify-center items-center" aria-label="Pagination">
          <a 
            onClick={() => page > 0 && setPage(page - 1)} 
            className={`flex w-10 h-10 mr-1 justify-center items-center rounded-full border ${page === 0 ? 'border-gray-600 cursor-not-allowed' : 'border-gray-600 hover:border-gray-500'}`} 
            href="#"
            title="Previous Page"
            aria-disabled={page === 0}
          >
            <span className="sr-only">Previous Page</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="block w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </a>

          {getPageButtons().map((buttonIndex) => (
            <a
              key={buttonIndex}
              onClick={() => setPage(buttonIndex)}
              className={`hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border ${page === buttonIndex ? 'border-white bg-gray-800 text-white pointer-events-none' : 'border-gray-600 bg-gray-800 text-white hover:border-gray-500'}`}
              href="#"
              title={`Page ${buttonIndex + 1}`}
            >
              {buttonIndex + 1}
            </a>
          ))}

          <a 
            onClick={() => page < totalPages - 1 && setPage(page + 1)} 
            className={`flex w-10 h-10 ml-1 justify-center items-center rounded-full border ${page === totalPages - 1 ? 'border-gray-600 cursor-not-allowed' : 'border-gray-600 hover:border-gray-500'}`} 
            href="#"
            title="Next Page"
            aria-disabled={page === totalPages - 1}
          >
            <span className="sr-only">Next Page</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="block w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </a>
        </nav>
      </div>
    </section>
  );
}