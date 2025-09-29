import React from 'react';
import { Link } from 'react-router'; // react-router, not react-router-dom
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-5">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-3">Blood Donation</h2>
          <p className="text-sm">
            A community-driven platform to connect donors and recipients,
            promote awareness, and save lives through blood donation.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer-title">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/donation-requests">Donation Requests</Link></li>
            <li><Link to="/search">Find Donors</Link></li>
            <li><Link to="/funding">Funding</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="footer-title">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="footer-title">Follow Us</h3>
          <div className="flex gap-4 mt-2 text-2xl">
            <Link to="https://facebook.com" target="_blank">
              <FaFacebookF />
            </Link>
            <Link to="https://twitter.com" target="_blank">
              <FaTwitter />
            </Link>
            <Link to="https://instagram.com" target="_blank">
              <FaInstagram />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-base-300 text-center py-4 text-sm">
        © {new Date().getFullYear()} Blood Donation App — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
