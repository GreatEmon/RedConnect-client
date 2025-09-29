import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-6">
      <h1 className="text-9xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-800">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="btn btn-primary px-6 py-3 rounded-full hover:bg-red-700 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
