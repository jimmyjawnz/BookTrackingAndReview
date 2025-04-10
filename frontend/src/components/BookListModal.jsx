import React from "react";






const BookListModal = ({
  onClose,
  newCategory,
  setNewCategory,
  bookLists,
  setBookLists,
  selectedCategory,
  setSelectedCategory,
  bookData,
  setBookData
}) => {



const currentUser = JSON.parse(localStorage.getItem('user'));

const handleAddCategory = async () => {
  if (!newCategory || !currentUser) return;

  try {
    const response = await fetch('http://localhost:8081/api/bookLists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        name: newCategory,
        visibility: 1, // make this dynamic later if you want
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
                onClick={() => setSelectedCategory(list)}
                className={`cursor-pointer mb-2 p-2 rounded ${selectedCategory?.id === list.id ? 'bg-purple-200' : 'hover:bg-gray-200'}`}
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
                {(bookData[selectedCategory] || []).map((book, i) => (
                  <li key={i}>{book}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookListModal;
