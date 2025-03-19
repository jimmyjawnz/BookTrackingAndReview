import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookItem from './BookItem';
import Filter from './Filter';
import { useSearchParams } from 'react-router-dom';

export default function Book() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [searchParams] = useSearchParams();
  // Use the "q" parameter or default to "most popular books"
  const searchQuery = searchParams.get('q') || 'most popular books';

  // Full list of categories
  const categories = [
    "ARCHITECTURE",
    "LITERARY CRITICISM",
    "ART",
    "MATHEMATICS",
    "BIBLES",
    "MEDICAL",
    "BIOGRAPHY & AUTOBIOGRAPHY",
    "MUSIC",
    "NATURE",
    "BUSINESS & ECONOMICS",
    "PERFORMING ARTS",
    "PETS",
    "COMPUTERS",
    "PHILOSOPHY",
    "COOKING",
    "PHOTOGRAPHY",
    "POETRY",
    "DESIGN",
    "DRAMA",
    "PSYCHOLOGY",
    "EDUCATION",
    "RELIGION",
    "FICTION",
    "SCIENCE",
    "GAMES & ACTIVITIES",
    "SELF-HELP",
    "GARDENING",
    "HEALTH & FITNESS",
    "SPORTS & RECREATION",
    "HISTORY",
    "TECHNOLOGY & ENGINEERING",
    "HUMOR",
    "TRANSPORTATION",
    "TRAVEL",
   
    "LAW"
  ];

  const fetchBooks = async () => {
    try {
      // Combine search query and category (if one is selected) using the subject syntax
      let query = searchQuery;
      if (selectedCategory) {
        query += `+subject:${selectedCategory}`;
      }

      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: query,
          maxResults: 10,
          startIndex: page * 10,
          key: '' // Add your API key here if needed
        }
      });

      const data = response.data;
      setBooks(data.items || []);
      setTotalPages(Math.ceil(data.totalItems / 10));
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, searchQuery, selectedCategory]);

  const getPageButtons = () => {
    const buttons = [];
    const startPage = Math.floor(page / 5) * 5;
    for (let i = startPage; i < startPage + 5; i++) {
      if (i < totalPages) buttons.push(i);
    }
    return buttons;
  };

  return (
    <section className="container mx-auto  antialiased bg-gray-900 text-white min-h-screen">
      {/* Filter Component */}
      <Filter
        categories={categories}
        selectedCategory={selectedCategory}
        onChange={(newCategory) => {
          setSelectedCategory(newCategory);
          setPage(0); // Reset to first page on filter change
        }}
      />
<br />
      {/* List of Books */}
      {books.map((book) => {
        const authors = book.volumeInfo.authors?.slice(0, 2).join(', ') || 'Unknown Author';
        const genres = book.volumeInfo.categories || [];

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
            genres={genres}
            
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
