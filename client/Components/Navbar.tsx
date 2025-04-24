"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`fixed w-full z-50 ${
        hasScrolled ? 'bg-white shadow-lg text-black' : 'bg-transparent text-white'
      } transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo with animation */}
          <div className="text-3xl font-bold cursor-pointer transition-transform transform hover:scale-110 hover:text-green-600">
            <Link href="/">TrueHire</Link>
          </div>

          {/* Desktop Menu with hover effect */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-gray-800 transition duration-300">Home</Link>
            <Link href="/login" className="hover:text-gray-800 transition duration-300">Login</Link>
            <Link href="/register" className="hover:text-gray-800 transition duration-300">Register</Link>
            <Link href="/about" className="hover:text-gray-800 transition duration-300">About</Link>
          </div>

          {/* Mobile Menu Button with animated transition */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-3xl transition-all duration-300">
              {isOpen ? '✖' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with sliding transition */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 text-white py-6 transform transition-all duration-300 ease-in-out">
          <div className="flex flex-col items-center">
            <Link href="/" onClick={() => setIsOpen(false)} className="mb-4 text-lg font-semibold">Home</Link>
            <Link href="/login" onClick={() => setIsOpen(false)} className="mb-4 text-lg font-semibold">Login</Link>
            <Link href="/register" onClick={() => setIsOpen(false)} className="mb-4 text-lg font-semibold">Register</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="mb-4 text-lg font-semibold">About</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
