import React from 'react';

const SigninForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="flex max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/public/bookbg7.png')" }}>
          {/* You can replace the URL with your actual image */}
        </div>

        {/* Right Side - Login Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-6">Sign in</h2>
          <p className="text-sm mb-6">
            Don't have an account? <a href="#" className="text-blue-500 hover:underline">Register here</a>
          </p>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>
            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
          </div>

          {/* Sign In Button */}
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Sign in
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Continue with Google */}
          <button className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-md py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
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