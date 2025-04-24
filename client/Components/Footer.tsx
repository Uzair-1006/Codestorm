// components/Footer.tsx
"use client"
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-600 text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="flex flex-col items-center sm:flex-row justify-between">
          <div className="text-center sm:text-left mb-6 sm:mb-0">
            <h3 className="text-3xl font-bold mb-2">TrueHire</h3>
            <p className="text-lg">Your career partner. Helping you find verified job opportunities with ease.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-6 sm:mb-0">
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul>
                <li><a href="/" className="hover:text-teal-300 transition">Home</a></li>
                <li><a href="/about" className="hover:text-teal-300 transition">About</a></li>
                <li><a href="/register" className="hover:text-teal-300 transition">Register</a></li>
                <li><a href="/login" className="hover:text-teal-300 transition">Login</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-teal-300 transition">
                  <FaFacebook />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-teal-300 transition">
                  <FaTwitter />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-teal-300 transition">
                  <FaLinkedin />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-teal-300 transition">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm">&copy; {new Date().getFullYear()} TrueHire. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
