import React from "react";
import { Link } from "react-router";

const RestrictedAccess = () => {
  document.title = "Restricted Access"
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-6">
      <h1 className="text-8xl font-bold text-yellow-600 mb-4">🚫</h1>
      <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-800">
        Access Restricted
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        You do not have permission to view this page. If you believe this is a mistake,
        please contact the administrator or try logging in with appropriate credentials.
      </p>
      <Link
        to="/"
        className="btn px-6 py-3 rounded-full bg-red-700 hover:bg-red-300 transition-colors text-white"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default RestrictedAccess;
