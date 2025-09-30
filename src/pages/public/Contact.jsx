import React, { useState } from "react";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  document.title = "Contact - RedConnect"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Add API call to send contact message
    Swal.fire("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-6">Contact Us</h1>
        <p className="text-center text-gray-600 mb-12">
          Have a question, suggestion, or feedback? We’d love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <label className="block mb-1 font-semibold">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
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
                  className="textarea textarea-bordered w-full"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-red-600 mb-4">Our Office</h2>
              <p className="text-gray-700">123, Main Street, Dhaka, Bangladesh</p>
              <p className="text-gray-700">Email: info@example.com</p>
              <p className="text-gray-700">Phone: +880 123 456 789</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg h-82 flex items-center justify-center text-gray-400">
              {/* Map Placeholder */}
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.903423453223!2d90.39124731536273!3d23.75088589460021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf595c2d3f07%3A0x8c5f7b78e2f7efb5!2sDhaka%20University!5e0!3m2!1sen!2sbd!4v1695809184309!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
