import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Updated hardcoded reviews with mock avatars
  const hardcodedReviews = [
    { 
      id: 1, 
      user: 'SarahJohnson', 
      rating: 4, 
      comment: 'This book completely changed my perspective on tech entrepreneurship!',
      date: '2023-01-15',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    { 
      id: 2, 
      user: 'MikeChen', 
      rating: 5, 
      comment: 'An absolute must-read for anyone interested in business innovation.',
      date: '2023-02-20',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
  ];

  // Function to safely render HTML content
  const renderDescription = (description) => {
    return { __html: description };
  };

  // Function to strip HTML and truncate text
  const getPreviewText = (html, wordLimit = 50) => {
    if (!html) return 'No description available';
    
    // Strip HTML tags
    const plainText = html.replace(/<[^>]+>/g, ' ');
    // Truncate to word limit
    const words = plainText.trim().split(/\s+/);
    return words.length > wordLimit 
      ? words.slice(0, wordLimit).join(' ') + '...'
      : plainText;
  };

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (!book) return <div className="text-center mt-8">Book not found</div>;

  // Use higher-quality image if available
  const imageUrl = 
                  
                   book.volumeInfo.imageLinks?.thumbnail ||
                   "https://edit.org/images/cat/book-covers-big-2019101610.jpg";

  return (
    
    <div className="container mx-auto p-4 bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Book Details Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <img
            src={imageUrl}
            alt="Book cover"
            className="w-64 h-96 object-contain rounded-lg shadow-lg"
          />
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{book.volumeInfo.title}</h1>
            <p className="text-gray-300 mb-2">
              by {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
            </p>
            
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>
                      {i < (book.volumeInfo.averageRating || 0) ? '★' : '☆'}
                    </span>
                  ))}
                </span>
                <span className="text-gray-400">
                  ({book.volumeInfo.ratingsCount || 0} ratings)
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <p><strong>Publisher:</strong> {book.volumeInfo.publisher}</p>
                <p><strong>Published:</strong> {book.volumeInfo.publishedDate}</p>
                <p><strong>Pages:</strong> {book.volumeInfo.pageCount}</p>
                <p><strong>Categories:</strong> {book.volumeInfo.categories?.join(', ')}</p>
              </div>
            </div>
            <div>
              <button 
                className="py-2 px-5  mb-3 bg-purple-800 hover:bg-purple-700 text-white text-xs font-bold rounded-md"
                onClick={(e) => e.preventDefault()} // Prevent navigation when clicking button
              >
                Add To List
              </button></div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <div className="text-gray-300">
                {isExpanded ? (
                  <div dangerouslySetInnerHTML={renderDescription(book.volumeInfo.description)} />
                ) : (
                  <p>{getPreviewText(book.volumeInfo.description)}</p>
                )}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-purple-400 hover:text-purple-300 mt-2 text-sm"
                >
                  {isExpanded ? '▲ Show Less' : '▼ Read More'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Community Reviews</h2>
            <button 
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
              onClick={() => console.log('Add review clicked')}
            >
              Add Your Review
            </button>
          </div>

          <div className="space-y-6">
            {hardcodedReviews.map(review => (
              <div key={review.id} className="bg-gray-700 p-6 rounded-lg hover:bg-gray-600/50 transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12 border-2 border-purple-500">
                    <AvatarImage src={review.avatar} />
                    <AvatarFallback className="bg-gray-800 text-purple-400">
                      {review.user.slice(0,2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{review.user}</h3>
                        <p className="text-sm text-gray-400">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-lg">{review.rating}.0</span>
                        <svg 
                          className="w-5 h-5 text-yellow-400" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>

                    <p className="text-gray-300 leading-relaxed">
                      {review.comment}
                    </p>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;