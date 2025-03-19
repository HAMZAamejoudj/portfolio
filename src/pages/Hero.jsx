import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id='home' className="h-screen w-full relative bg-transparent overflow-hidden">
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="md:w-1/2 text-left px-4 sm:px-0"
          >
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-200 via-cyan-300 to-blue-300">
                Hello, I'm Karim Ouiaboub
              </h1>
              <p className="text-xl sm:text-2xl text-cyan-200 mb-8">
                Full Stack Developer
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                onClick={() => {
                  const projectsSection = document.getElementById('projects'); 
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View My Work
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="md:w-1/2 mt-10 md:mt-0 relative px-4 sm:px-0"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto relative group"
            >
              <div className="absolute inset-0 bg-cyan-500 rounded-full opacity-20 blur-3xl group-hover:blur-4xl transition-all duration-300"></div>
              <div className="absolute inset-4 bg-blue-400 rounded-full opacity-20 blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
              <img
                src="/profile.png"
                alt="Karim Ouiaboub"
                className="w-full h-full object-cover rounded-full border-8 border-cyan-500 transform transition-all duration-500 hover:border-blue-400 relative z-10 shadow-2xl"
              />

              <div className="absolute inset-0 border-8 border-cyan-400 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute -inset-2 border-4 border-blue-300 rounded-full opacity-30 animate-ping"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;