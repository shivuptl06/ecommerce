import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FlipCard = () => {
  const [isSignup, setIsSignup] = useState(true);

  const handleFlip = () => setIsSignup(!isSignup);

  return (
    <div className="flex justify-center items-center h-screen min-w-screen bg-gray-100">
      <motion.div
        className="mx-2 w-full h-2/3 md:w-2/3 xl:w-2/6 relative transform-style-3d border border-red-500 rounded-lg shadow-lg overflow-hidden"
        animate={{ rotateX: isSignup ? 0 : 360 }}
        transition={{ duration: 1.2 }}
      >
        <AnimatePresence mode="wait">
          {isSignup ? (
            <motion.div
              key="signup"
              className="absolute w-full h-full bg-white flex flex-col items-center justify-center backface-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-2xl font-semibold mb-8">Signup</h2>
              <form className="flex flex-col space-y-4 w-3/4">
                <input
                  type="text"
                  placeholder="Name"
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <button
                  type="submit"
                  className="border border-gray-400 rounded-lg p-2 bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Signup
                </button>
              </form>
              <button
                onClick={handleFlip}
                className="mt-6 px-4 py-2 text-blue-600 hover:underline transition"
              >
                Already have an account? Log In
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="login"
              className="absolute w-full h-full bg-gray-200 flex flex-col items-center justify-center transform rotate-y-180 backface-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Login</h2>
              <form className="flex flex-col space-y-4 w-3/4">
                <input
                  type="email"
                  placeholder="Email"
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <button
                  type="submit"
                  className="border border-gray-400 rounded-lg p-2 bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Login
                </button>
                <a
                  href="/"
                  className="text-center pt-1 text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  Forgot Password
                </a>
              </form>
              <button
                onClick={handleFlip}
                className="mt-6 px-4 py-2 text-blue-600 hover:underline transition"
              >
                Need an account? Sign Up
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FlipCard;
