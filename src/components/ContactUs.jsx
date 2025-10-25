import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Contact form submitted');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="py-20 bg-red-50 mb-5 mt-20 rounded-3xl">
      <div className="md:px-20">
        <h2 className="text-4xl font-bold text-center text-red-600 mb-12">
          Contact Us
        </h2>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Contact Form */}
          <div className="flex-1">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-lg shadow-md space-y-4"
            >
              <div>
                <label className="block mb-1 font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="textarea textarea-bordered w-full h-32"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex-1 flex flex-col justify-center space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-red-600 text-lg font-bold">+880 1234 567890</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-700 text-lg font-medium">
                support@blooddonation.com
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-gray-700 text-lg font-medium">
                123 Blood Donation St, Dhaka, Bangladesh
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
