import React from "react";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import bloodDonationAnimation from "../assets/Donaciones.json"; // ✅ Add your Lottie file here

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-red-100 py-20 my-10 rounded-3xl">
      <div className="mx-10 flex flex-col-reverse md:flex-row items-center md:px-12 gap-10 justify-evenly">
        
        {/* --- LEFT: Text Content --- */}
        <div className="text-center md:text-left md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-red-600 leading-tight">
            Save Lives. <br className="hidden md:block" /> Donate Blood Today.
          </h1>

          <p className="text-lg md:text-xl text-gray-700">
            Join our community of donors or find a donor near you. Every drop
            counts and can bring hope to someone in need.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-center md:justify-start gap-4 pt-4">
            <button
              onClick={() => navigate("/register")}
              className="btn btn-primary btn-lg w-full md:w-auto"
            >
              Join as a Donor
            </button>
            <button
              onClick={() => navigate("/search")}
              className="btn btn-outline btn-lg text-red-600 border-red-600 hover:bg-red-600 hover:text-white w-full md:w-auto"
            >
              Search Donors
            </button>
          </div>
        </div>

        {/* --- RIGHT: Lottie Animation --- */}
        <div className="md:w-1/2 flex justify-end">
          <Lottie
            animationData={bloodDonationAnimation}
            loop={true}
            className="w-80 md:w-96"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
