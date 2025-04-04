import React, { useState } from 'react';

function UserProfile() {
  const [showFriends, setShowFriends] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showBookListModal, setShowBookListModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);


  const [form, setForm] = useState({
    userName: 'JoeAnderson',
    email: 'JoeAnd@gmail.com',
  });

  const [bookLists, setBookLists] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [bookData, setBookData] = useState({});
  const friends = Array(9).fill("Friend Username");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


// save profile edit
  const handleSave = () => {
    console.log("Saved changes:", form);
    setShowEdit(false);
  };

// An event that targets users files
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };


  return (
      <div className="min-h-screen bg-gray-900 text-white flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-white text-black flex flex-col justify-between border-r-4 border-[#2B58EC] p-4">
          {/* Friends Section */}
          <div>
            <h2 className="text-lg font-bold mb-2">Friends</h2>
            <input type="text" placeholder="Search friends..." className="w-full border px-2 py-1 rounded mb-2" />
            <ul className="space-y-1 text-sm">
              {friends.map((friend, i) => (
                <li key={i}>{friend}</li>
              ))}
            </ul>
          </div>
          {/* Recent Reviews */}
          <div className="mt-4">
            <h2 className="text-lg font-bold mb-2">Recent Reviews</h2>
            <ul className="text-sm space-y-1">
              <li>"Loved this!" - Book A</li>
              <li>"Not bad." - Book B</li>
              <li>"Amazing plot!" - Book C</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-10 py-6">
          <div className="flex flex-col items-center mb-6">
            <div className="w-28 h-28 rounded-full border-4 border-purple-500 overflow-hidden shadow-md">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-sm text-gray-600">No Image</div>
              )}
            </div>
            <label className="mt-2 text-sm text-white cursor-pointer underline">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              Upload Image
            </label>
            <h1 className="text-3xl font-semibold mt-4">Welcome, {form.userName}</h1>
          </div>

          {/* Buttons vertically stacked */}
          <div className="flex flex-col items-center space-y-2 mb-6">
            <button onClick={() => setShowEdit(true)} className="bg-purple-500 hover:bg-purple-600 px-4 py-1 rounded-lg">
              Edit Profile
            </button>
            <button onClick={() => setShowBookListModal(true)} className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-lg">
              Manage Book Lists
            </button>
          </div>

          {/* Stats Box */}
          <div className="flex items-center justify-center">
            <div className="bg-gray-800 w-3/4 max-w-4xl p-10 rounded-2xl shadow-lg flex justify-around text-center">
              {[
                { label: 'Books Reviewed', value: 8 },
                { label: 'Friends', value: 10 },
                { label: 'Books on Wishlist', value: 18 },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="bg-purple-400 text-black text-3xl font-bold rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Edit profile Modal */}
          {showEdit && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white text-black p-6 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Username:</label>
                  <input name="userName" value={form.userName} onChange={handleChange} className="w-full mt-1 p-2 rounded border" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Email:</label>
                  <input name="email" value={form.email} onChange={handleChange} className="w-full mt-1 p-2 rounded border" />
                </div>
                <div className="flex justify-end gap-4">
                  <button onClick={() => setShowEdit(false)} className="bg-[#1E2939] text-white px-4 py-2 rounded">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="bg-[#C575F4] text-white px-4 py-2 rounded">
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Book List Modal */}
          {showBookListModal && (
            <div className="fixed inset-0 bg-grey bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white text-black p-6 rounded-xl shadow-md w-full max-w-4xl flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Your Book Lists</h2>
                  <button onClick={() => setShowBookListModal(false)} className="text-sm text-gray-500">
                    Close
                  </button>
                </div>
                <div className="flex gap-2">
                  <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="New list name..." className="border px-3 py-2 rounded w-full" />
                  <button onClick={() => { if (!newCategory) return; setBookLists([...bookLists, newCategory]); setBookData({ ...bookData, [newCategory]: [] }); setNewCategory(''); }} className="bg-purple-500 text-white px-3 py-2 rounded">
                    Add Category
                  </button>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/3 bg-gray-100 rounded p-4 h-64 overflow-y-auto">
                    {bookLists.map((list, i) => (
                      <div key={i} onClick={() => setSelectedCategory(list)} className={`cursor-pointer mb-2 p-2 rounded ${selectedCategory === list ? 'bg-purple-200' : 'hover:bg-gray-200'}`}>
                        {list}
                      </div>
                    ))}
                  </div>
                  <div className="w-2/3 bg-gray-50 rounded p-4 h-64 overflow-y-auto">
                    <h3 className="text-lg font-medium mb-2">{selectedCategory || 'Select a list'}</h3>
                    {selectedCategory && (
                      <ul className="list-disc pl-5">
                        {(bookData[selectedCategory] || []).map((book, i) => <li key={i}>{book}</li>)}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  export default UserProfile;
