"use client"
import { motion } from "framer-motion";
import { FaSearch, FaRegHandshake, FaCheckCircle, FaUserShield } from "react-icons/fa";

const Features: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="text-3xl font-extrabold text-gray-900 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Features That Empower Your Job Search
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transform transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-4xl text-teal-500 mb-4">
              <FaSearch />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Job Search</h3>
            <p className="text-gray-600 leading-relaxed">
              Find verified job listings in various industries. Apply with confidence and take control of your career path.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transform transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-4xl text-teal-500 mb-4">
              <FaRegHandshake />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Employer Partnerships</h3>
            <p className="text-gray-600 leading-relaxed">
              Employers can connect with top talent through our platform, streamlining the hiring process with ease.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transform transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-4xl text-teal-500 mb-4">
              <FaCheckCircle />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Opportunities</h3>
            <p className="text-gray-600 leading-relaxed">
              Every job listing is verified, ensuring genuine opportunities and reducing job search uncertainty.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transform transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-4xl text-teal-500 mb-4">
              <FaUserShield />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Security & Privacy</h3>
            <p className="text-gray-600 leading-relaxed">
              We prioritize your privacy. With secure job applications and confidential profiles, your data is safe with us.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
