import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
        {/* Optional loading text */}
        <p className="mt-4 text-lg font-semibold text-red-600">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
