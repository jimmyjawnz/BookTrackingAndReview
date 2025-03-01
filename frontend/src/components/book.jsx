import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios
import BookItem from './BookItem';

export default function Book() {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);  // Total pages state
  
    const fetchBooks = async () => {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
                params: {
                    q: 'the', // Search for books related to JavaScript
                    maxResults: 10,
                    startIndex: page * 10,
                    key: 'AIzaSyApPaekQl7Op8eJs1bT6PmldhWF1uMAHtI'
                }
            });

            const data = response.data;
            setBooks(data.items); // Assuming `items` contains the list of books

            // Calculate the total number of pages
            setTotalPages(Math.ceil(data.totalItems / 10)); // Total pages = total items / items per page
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };
  
    useEffect(() => {
        fetchBooks();
    }, [page]);

    // Create dynamic page buttons based on the current page
    const getPageButtons = () => {
        const buttons = [];
        const startPage = Math.floor(page / 5) * 5; // Calculate the start page for current block of 5
        for (let i = startPage; i < startPage + 5; i++) {
            if (i < totalPages) buttons.push(i); // Only add pages that exist
        }
        return buttons;
    };

    return (
        <section className="container mx-auto p-4 antialiased">
            {books.map((book) => {
                // Limit to 3 authors
                const authors = book.volumeInfo.authors?.slice(0, 2).join(', ') || 'Unknown Author';

                return (
                    <BookItem
                        key={book.id}
                        title={book.volumeInfo.title}
                        author={authors}
                        description={book.volumeInfo.description || 'No description available'}
                        imageUrl={book.volumeInfo.imageLinks?.thumbnail}
                        rating={book.volumeInfo.averageRating}
                        reviews={book.volumeInfo.ratingsCount || 0}
                    />
                );
            })}

            {/* Pagination section */}
            <div className="container mx-auto px-4">
                <nav className="flex flex-row flex-nowrap justify-between md:justify-center items-center" aria-label="Pagination">
                    {/* Previous Page Button */}
                    <a 
                        onClick={() => setPage(page - 1)} 
                        className={`flex w-10 h-10 mr-1 justify-center items-center rounded-full border ${page === 0 ? 'border-gray-200 cursor-not-allowed' : 'border-gray-200 hover:border-gray-300'}`} 
                        href="#" 
                        title="Previous Page" 
                        aria-disabled={page === 0}
                    >
                        <span className="sr-only">Previous Page</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="block w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </a>

                    {/* Page Buttons */}
                    {getPageButtons().map((buttonIndex) => (
                        <a
                            key={buttonIndex}
                            onClick={() => setPage(buttonIndex)}
                            className={`hidden md:flex w-10 h-10 mx-1 justify-center items-center rounded-full border ${page === buttonIndex ? 'border-black dark:border-white dark:bg-black dark:text-white pointer-events-none' : 'border-gray-200 bg-white dark:bg-gray-700 text-black dark:text-white hover:border-gray-300 dark:hover:border-gray-600'}`}
                            href="#"
                            title={`Page ${buttonIndex + 1}`}
                        >
                            {buttonIndex + 1}
                        </a>
                    ))}

                    {/* Next Page Button */}
                    <a 
                        onClick={() => setPage(page + 1)} 
                        className={`flex w-10 h-10 ml-1 justify-center items-center rounded-full border ${page === totalPages - 1 ? 'border-gray-200 cursor-not-allowed' : 'border-gray-200 hover:border-gray-300'}`} 
                        href="#" 
                        title="Next Page" 
                        aria-disabled={page === totalPages - 1}
                    >
                        <span className="sr-only">Next Page</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="block w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </a>
                </nav>
            </div>
        </section>
    );
}
