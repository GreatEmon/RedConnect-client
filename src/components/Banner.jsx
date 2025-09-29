import React from 'react';
import { useNavigate } from 'react-router';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-red-100 py-40 my-10 rounded-3xl">
      <div className="container mx-auto text-center px-4">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-6">
          Save Lives. Donate Blood Today.
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Join our community of donors or find a donor near you.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() => navigate('/register')}
            className="btn btn-primary btn-lg"
          >
            Join as a Donor
          </button>
          <button
            onClick={() => navigate('/search')}
            className="btn btn-outline btn-lg text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
          >
            Search Donors
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
