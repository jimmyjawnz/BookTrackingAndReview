import React from 'react'

export default function SigninForm1() {
    return (
        <div className="h-screen w-screen flex">
          {/* Left Side - Full Page Image */}
          <div
            className="w-1/2 h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/public/bookbg7.png')" }}
          ></div>
    
          {/* Right Side - Full Height Login Form */}
          <div className="w-1/2 h-full flex flex-col justify-center items-center ">
            <h2 className="text-4xl font-bold mb-6">Sign in</h2>
            <p className="text-lg mb-6">
              Don't have an account? <a href="#" className="text-blue-500 hover:underline">Register here</a>
            </p>
    
            {/* Email Field */}
            <div className="mb-4 w-2/3">
              <label className="block text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
    
            {/* Password Field */}
            <div className="mb-6 w-2/3">
              <label className="block text-lg font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
    
            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between mb-6 w-2/3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                />
                <label className="ml-2 text-lg text-gray-900">Remember me</label>
              </div>
              <a href="#" className="text-lg text-blue-500 hover:underline">Forgot Password?</a>
            </div>
    
            {/* Sign In Button */}
            <button className="w-2/3 bg-blue-500 text-white py-3 px-4 rounded-md text-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Sign in
            </button>
    
            {/* Divider */}
            <div className="flex items-center my-6 w-2/3">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-lg text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
    
            {/* Continue with Google */}
            <button className="w-2/3 flex items-center justify-center bg-white border border-gray-300 rounded-md py-3 px-4 text-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-6 h-6 mr-2"
              />
              Continue with Google
            </button>
          </div>
        </div>
      );
}
