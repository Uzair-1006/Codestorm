// pages/registerSteps.tsx
"use client";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const RegisterSteps: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 flex flex-col items-center py-16 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Step-by-Step Registration
        </h2>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-1/5 flex justify-center items-center ${
                  currentStep >= step ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-10 h-10 flex justify-center items-center rounded-full border-2 ${
                    currentStep >= step ? "border-blue-600" : "border-gray-300"
                  } transition-all duration-300 ease-in-out`}
                >
                  {currentStep >= step ? (
                    <FaCheckCircle className="text-lg" />
                  ) : (
                    <span className="text-xl font-semibold">{step}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="h-1 bg-gray-300">
            <div
              className="h-full bg-blue-600"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="transition-all duration-300 ease-in-out">
          {currentStep === 1 && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Step 1: Create an Account
              </h3>
              <p className="text-gray-600 mb-6">
                Enter your name, email, and a secure password to get started.
              </p>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Step 2: Personalize Your Profile
              </h3>
              <p className="text-gray-600 mb-6">
                Tell us about yourself so we can tailor the experience to your
                needs.
              </p>
              <input
                type="text"
                placeholder="Short Bio"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <input
                type="file"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Step 3: Upload Your Resume
              </h3>
              <p className="text-gray-600 mb-6">
                Upload a PDF or DOC file of your latest resume.
              </p>
              <input
                type="file"
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Step 4: Choose Your Preferences
              </h3>
              <p className="text-gray-600 mb-6">
                Select the types of jobs you are interested in.
              </p>
              <select className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Freelance</option>
              </select>
              <select className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
                <option>Tech</option>
                <option>Finance</option>
                <option>Healthcare</option>
              </select>
            </div>
          )}

          {currentStep === 5 && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Step 5: Review & Complete
              </h3>
              <p className="text-gray-600 mb-6">
                Review your information before final submission.
              </p>
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                Submit
              </button>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            className="bg-gray-300 text-gray-700 p-3 rounded-lg w-32 shadow-md hover:bg-gray-400 disabled:opacity-50 transition duration-300"
            disabled={currentStep === 1}
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            className="bg-blue-600 text-white p-3 rounded-lg w-32 shadow-md hover:bg-blue-700 transition duration-300"
          >
            {currentStep === 5 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default RegisterSteps;
