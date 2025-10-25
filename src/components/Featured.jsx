import React from 'react';
import { FaHeartbeat, FaUsers, FaHandsHelping, FaHospital } from 'react-icons/fa';

const features = [
  {
    icon: <FaHeartbeat className="text-red-600 text-4xl" />,
    title: 'Life-Saving Donations',
    description: 'Connect donors with recipients to save lives through timely blood donations.',
  },
  {
    icon: <FaUsers className="text-red-600 text-4xl" />,
    title: 'Community Driven',
    description: 'Join a community of compassionate donors and volunteers across your area.',
  },
  {
    icon: <FaHandsHelping className="text-red-600 text-4xl" />,
    title: 'Volunteer Support',
    description: 'Volunteers can create and manage donation requests to help those in need.',
  },
  {
    icon: <FaHospital className="text-red-600 text-4xl" />,
    title: 'Hospital Partnerships',
    description: 'Partnered hospitals receive quick access to available donors in critical times.',
  },
];

const Featured = () => {
  return (
    <section className="pt-10 bg-base-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-10 text-red-600">Why Join Our Platform?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
