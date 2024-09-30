import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">EduHUB</h3>
              <p className="text-gray-400">Empowering learners worldwide</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <nav className="flex flex-col space-y-2">
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors duration-300">Features</a>
                <a href="#courses" className="text-gray-400 hover:text-white transition-colors duration-300">Courses</a>
                <a href="#instructors" className="text-gray-400 hover:text-white transition-colors duration-300">Instructors</a>
              </nav>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400">Email: info@eduhub.com</p>
              <p className="text-gray-400">Phone: +123 456 7890</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; {new Date().getFullYear()} EduHUB. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
