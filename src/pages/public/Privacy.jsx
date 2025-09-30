import React from "react";

const PrivacyPolicy = () => {
  document.title = "Privacy & Policy"
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-6">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website.
        </p>
        <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-2">Information We Collect</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Personal Information (name, email, etc.)</li>
          <li>Donation records and activity logs</li>
          <li>Cookies and usage data</li>
        </ul>
        <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-2">How We Use Your Information</h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>To provide and improve our services</li>
          <li>To send updates and notifications</li>
          <li>To analyze usage patterns for better user experience</li>
        </ul>
        <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-2">Data Protection</h2>
        <p className="text-gray-700 mb-4">
          We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
        </p>
        <h2 className="text-2xl font-semibold text-red-600 mt-6 mb-2">Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions regarding this Privacy Policy, please contact us at <span className="text-red-600 font-semibold">info@example.com</span>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
