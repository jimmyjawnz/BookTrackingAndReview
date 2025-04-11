import React, { useState } from 'react';

// Handles user registration
const RegisterForm = () => {
  // State hooks for managing form inputs and status messages
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handles the form submission for registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Checks for matching passwords during registration
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Makes a POST request to the backend to register the user into the DB
      const response = await fetch('http://localhost:8081/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, email, password }), // Sends user data in the request body
      });

      if (response.ok) { // If registration is successful
        setSuccess('Registration successful! You can now log in.');
        // Reset form fields after a successful registration
        setUserName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else { // If registration fails
        const text = await response.text();
        setError(text || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    // The main container for the registration form
    <div className="mt-8 flex items-center justify-center bg-gray-900 min-h-screen">
      <div className="max-w-md w-full bg-gray-800 shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-white">Register</h2>

        {/* Display error and success messages if any */}
        {error && <div className="text-red-400 mb-4">{error}</div>}
        {success && <div className="text-green-400 mb-4">{success}</div>}

        {/* Registration Form */}
        <form onSubmit={handleRegister}>
          {/* Username input field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)} // Update state on user input
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-purple-500"
              required
            />
          </div>

          {/* Email input field */}
          <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state on user input
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-purple-500"
                required
              />
            </div>

          {/* Password input field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on user input
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-purple-500"
              required
            />
          </div>

          {/* Confirm password input field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // Update state on user input
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-purple-500"
              required
            />
          </div>

          {/* Submit button for user registration */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
