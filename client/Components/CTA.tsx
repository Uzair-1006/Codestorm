// components/CTA.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const CTA: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-bold leading-tight mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Take Control of Your Career Today
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Browse job opportunities, create your profile, and get hired faster with TrueHire.
        </motion.p>

        <motion.div
          className="flex justify-center gap-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href="/jobs"
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-full text-lg transition duration-300 flex items-center gap-2"
          >
            Explore Jobs
          </Link>
          <Link
            href="/register"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white py-3 px-8 rounded-full text-lg transition duration-300 flex items-center gap-2"
          >
            Create Your Profile
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
