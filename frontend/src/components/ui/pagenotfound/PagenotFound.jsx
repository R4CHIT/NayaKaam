import React from "react";

import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
    const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Alert Icon */}
      <svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-24 h-24 text-red-500"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
>
  <circle cx="12" cy="12" r="10" />
  <line x1="12" y1="5" x2="12" y2="14" />
  <circle cx="12" cy="17" r="0.3" />

</svg>

      {/* 404 Text */}
      <h1 className="text-7xl font-bold text-gray-800 mb-4">404</h1>
      
      {/* Error Message */}
      <p className="text-2xl text-gray-600 mb-2 text-center">Oops! Page not found.</p>
      <p className="text-lg text-gray-500 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleGoHome}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Go Home
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
        >
          Go Back
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="mt-16 text-center">
        <div className="flex justify-center space-x-2 text-gray-400">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;