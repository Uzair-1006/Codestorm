"use client"
import { motion } from "framer-motion";
import { FaArrowRight, FaBriefcase, FaUser } from "react-icons/fa";

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-teal-400 to-green-600 h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Parallax effect on background */}
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-40 transform translate-z-0" style={{ backgroundImage: 'url("/path-to-your-image.jpg")' }}></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center p-6 md:p-12">
        {/* Headline with staggered entrance */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold leading-tight mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Empowering Your Job Search with TrueHire
        </motion.h1>

        {/* Subheading with elegant animation */}
        <motion.p
          className="text-lg md:text-xl mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Discover verified job opportunities, apply with confidence, and take control of your career today. Join us in transforming your professional journey.
        </motion.p>

        {/* Action buttons with hover effects and subtle animations */}
        <motion.div
          className="flex justify-center gap-8 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="#get-started"
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-10 rounded-full text-lg transition duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <FaArrowRight /> Get Started
          </a>
          <a
            href="#learn-more"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white py-3 px-10 rounded-full text-lg transition duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <FaArrowRight /> Learn More
          </a>
        </motion.div>

        {/* Info buttons with interactive hover effects */}
        <motion.div
          className="flex justify-center gap-10 mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex items-center gap-3 cursor-pointer transition-transform transform hover:scale-110 hover:text-yellow-400">
            <FaBriefcase className="text-2xl" />
            <span className="text-lg">For Employers</span>
          </div>
          <div className="flex items-center gap-3 cursor-pointer transition-transform transform hover:scale-110 hover:text-yellow-400">
            <FaUser className="text-2xl" />
            <span className="text-lg">For Job Seekers</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
