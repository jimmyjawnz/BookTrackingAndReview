import { useEffect, useState } from 'react';
import BookListModal from '../components/BookListModal';



function UserProfile() {
  const [showFriends, setShowFriends] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showBookListModal, setShowBookListModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);


const [form, setForm] = useState(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  return {
    userName: storedUser?.userName || "",
    email: storedUser?.email || "",
  };
});


  const [bookLists, setBookLists] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [bookData, setBookData] = useState({});
  const [friends, setFriends] = useState([]);
  const [reviews, setReviews] = useState([]);


//   useEffect(() => {
//       fetch(`http://localhost:8081/api/friends/get/user/1`)
//       .then(res => res.json())
//       .then((data) =>
//       {const followedUsers = data.map(f => f.friend);
//           setFriends(followedUsers);
//           })
//       .catch(err => console.error("Failed to fetch friends:", err));
//   }, []);

// useEffect(() => {
//   fetch("/api/reviews/user/1")
//     .then((res) => res.json())
//     .then((data) => setReviews(data))
//     .catch((err) => console.error("Failed to load reviews", err));
// }, []);
//
//
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };


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
        <div className="w-64 bg-white text-black flex flex-col justify-screen border-r-4 border-[#2B58EC] p-4">
          {/* Friends Section */}
          <div>
            <h2 className="text-lg font-bold mb-2">Friends</h2>
            <input type="text" placeholder="Search friends..." className="w-full border px-2 py-1 rounded mb-2" />
            <ul className="space-y-1 text-sm">
               {friends.map((friend) => (
                  <li key={friend.id}>
                    <a href={`/user/${friend.id}`} className="text-blue-500 hover:underline">
                      {friend.userName}
                    </a>
                  </li>
              ))}
            </ul>
          </div>
          {/* Recent Reviews */}
          <div className="mt-[20vh]">
            <h2 className="text-lg font-bold mb-2">Recent Reviews</h2>
            <ul className="space-y-2 text-sm">
              {reviews.map((review) => (
                <li key={review.id} className="bg-[#2d3148] p-3 rounded-xl shadow text-white">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{review.book.title}</span>
                    <span className="text-yellow-400">{review.rating} ⭐</span>
                  </div>
                  <p className="text-gray-300 mt-1 text-sm italic">"{review.content}"</p>
                </li>
              ))}
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

          {showBookListModal && (
            <BookListModal
              onClose={() => setShowBookListModal(false)}
              newCategory={newCategory}
              setNewCategory={setNewCategory}
              bookLists={bookLists}
              setBookLists={setBookLists}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              bookData={bookData}
              setBookData={setBookData}
            />
          )}

        </div>
      </div>
    );
  }

  export default UserProfile;
