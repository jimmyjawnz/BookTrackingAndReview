import React from "react";
import { useEffect, useState } from "react";

const BookListModal = ({
  onClose,
  book,
  newCategory,
  setNewCategory,
//   bookLists,
//   setBookLists,
  selectedCategory,
  setSelectedCategory,
  bookData,
  setBookData
}) => {

//keeps track of the state of user and books
const [bookLists, setBookLists] = useState([]);
const currentUser = JSON.parse(localStorage.getItem('user'));

//create new category
const handleAddCategory = async () => {
  if (!newCategory || !currentUser) return;

  try {
    const response = await fetch('http://localhost:8081/api/bookLists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: newCategory,
        visibility: 1,
        user: { id: currentUser.id }
      })
    });

    if (response.ok) {
      const createdList = await response.json();
      setBookLists(prev => [...prev, createdList]);
      setNewCategory('');
    } else {
      const text = await response.text();
      console.error('Failed to save category:', text);
    }
  } catch (err) {
    console.error("Error saving category:", err);
  }
};

//gets book lists
useEffect(() => {
  const fetchBookLists = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/bookLists");
      const data = await response.json();
      setBookLists(data);
    } catch (err) {
      console.error("Failed to fetch book lists:", err);
    }
  };

  fetchBookLists();
}, []);

//takes the selected category and fetches books within it
const handleSelectCategory = async (category) => {
  setSelectedCategory(category);

  try {
    const response = await fetch(`http://localhost:8081/api/booksInList/${category.id}`);
    const booksInList = await response.json();

    setBookData(prev => ({
      ...prev,
      [category.id]: booksInList
    }));
  } catch (err) {
    console.error("Failed to fetch books for category:", err);
  }
};



  return (
    <div className="fixed inset-0 bg-grey bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-xl shadow-md w-full max-w-4xl flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Your Book Lists</h2>
          <button onClick={onClose} className="text-sm text-gray-500">Close</button>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New list name..."
            className="border px-3 py-2 rounded w-full"
          />
          <button onClick={handleAddCategory}

            className="bg-purple-500 text-white px-3 py-2 rounded"
          >
            Add Category
          </button>
        </div>

        <div className="flex gap-4">
          <div className="w-1/3 bg-gray-100 rounded p-4 h-64 overflow-y-auto">
            {bookLists.map((list) => (
              <div
                key={list.id}
                onClick={() => handleSelectCategory(list)}
                 className={`cursor-pointer mb-2 p-2 rounded ${
                   selectedCategory?.id === list.id ? 'bg-purple-200' : 'hover:bg-gray-200'
                 }`}
              >
                {list.name}
              </div>
            ))}
          </div>
          <div className="w-2/3 bg-gray-50 rounded p-4 h-64 overflow-y-auto">
            <h3 className="text-lg font-medium mb-2">
              {selectedCategory?.name || "Select a list"}
            </h3>
            {selectedCategory && (
              <ul className="list-disc pl-5">
                {(bookData[selectedCategory.id] || []).map((book, i) => (
                  <li key={i}>{book.title}</li>
                ))}
              </ul>

            )}

          </div>

          {selectedCategory && (
            <div className="pt-4 border-t border-gray-300">
              <button
                onClick={async () => {
                  try {
                    // Save the book to database first
                    const savedBookRes = await fetch(`http://localhost:8081/api/books`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      credentials: 'include',
                      body: JSON.stringify({
                        title: book.volumeInfo.title,
                        rating: Math.round(book.volumeInfo.averageRating) || 0
                      })
                    });

                    //Then to list
                    const savedBook = await savedBookRes.json();
                    console.log("✅ Saved book:", savedBook);
                    await fetch(`http://localhost:8081/api/booksInList/${selectedCategory.id}`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      credentials: 'include',
                      body: JSON.stringify(savedBook)
                    });

                    onClose();
                  } catch (err) {
                    console.error("Failed to save book to list:", err);
                  }
                }}


                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
              >
                Save to "{selectedCategory.name}"
              </button>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default BookListModal;
