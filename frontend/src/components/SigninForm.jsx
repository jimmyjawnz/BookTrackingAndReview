import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom'; 

const SigninForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:8081/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({ email: email, password: password }),
      });
      
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        setSuccess('Login successful!');
        navigate('/');
      }else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.log('Error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="mt-8 flex items-center justify-center bg-gray-900">
      <div className="flex max-w-4xl w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div
          className="w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('/public/bookbg7.png')" }}
        ></div>

        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6 text-white">Sign in</h2>
          <p className="text-sm mb-6 text-gray-400">
            Don't have an account? <Link to="/register" className="text-purple-400 hover:underline">Register here</Link>
          </p>

          {error && <div className="text-red-400 mb-4">{error}</div>}
          {success && <div className="text-green-400 mb-4">{success}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-purple-500 focus:ring-purple-400 border-gray-600 rounded bg-gray-700"
                />
                <label className="ml-2 block text-sm text-gray-300">Remember me</label>
              </div>
              <a href="#" className="text-sm text-purple-400 hover:underline">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Sign in
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="mx-4 text-sm text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          <button className="w-full flex items-center justify-center bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-sm text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;