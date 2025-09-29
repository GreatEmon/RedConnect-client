import React from "react";

const teamMembers = [
  { name: "MD Emon", role: "Founder & CEO", avatar: "/avatars/emon.jpg" },
  { name: "Rohan Hasan", role: "Lead Developer", avatar: "/avatars/rohan.jpg" },
  { name: "Sara Khan", role: "UI/UX Designer", avatar: "/avatars/sara.jpg" },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          We are dedicated to connecting donors with those in need, saving lives, 
          and empowering our community through technology and compassion.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-red-600">Our Mission</h2>
          <p className="text-gray-700">
            To bridge the gap between blood donors and recipients efficiently 
            while promoting awareness and timely donations across the country.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-red-600">Our Vision</h2>
          <p className="text-gray-700">
            A world where no patient suffers due to lack of blood and every 
            donation makes a meaningful impact on someone's life.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-red-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Join Us in Making a Difference</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Whether you are a donor, volunteer, or supporter, your contribution 
          can save lives. Together we can build a healthier and stronger community.
        </p>
        <button className="btn btn-primary px-6 py-3 rounded-full hover:bg-red-700 transition-colors">
          Become a Donor
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
