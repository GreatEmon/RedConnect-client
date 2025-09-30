import React from "react";

const TermsOfService = () => {
  document.title = "Terms of Services"
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-6">Terms of Service</h1>
        <p className="text-gray-700 mb-4">
          By accessing or using our website, you agree to comply with and be bound by the following Terms of Service. Please read them carefully.
        </p>
        <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-2">User Responsibilities</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Provide accurate and up-to-date information</li>
          <li>Respect other users and their data</li>
          <li>Not engage in fraudulent or harmful activity</li>
        </ul>
        <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-2">Donation Guidelines</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>All donation requests must be legitimate</li>
          <li>Donors must follow instructions and visit the provided location</li>
          <li>Admin reserves the right to block users violating rules</li>
        </ul>
        <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-2">Account Termination</h2>
        <p className="text-gray-700 mb-4">
          We reserve the right to suspend or terminate accounts for violations of these Terms of Service or any applicable laws.
        </p>
        <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-2">Contact Us</h2>
        <p className="text-gray-700">
          For any questions regarding these Terms of Service, please contact us at <span className="text-red-600 font-semibold">info@example.com</span>.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
