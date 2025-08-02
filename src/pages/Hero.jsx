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
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-200 via-cyan-300 to-blue-300" style={{ fontFamily: 'Arial, sans-serif' }}>
             Hello, I'm Hamza Amejoudj
            </h1>
              <p className="text-xl sm:text-2xl text-cyan-200 mb-8">
                Full Stack Developer
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl shadow-lg hover:cursor-pointer hover:shadow-cyan-500/50 transition-all duration-300"
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
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8 }}
  className="flex flex-col items-center"
>
  <div className="relative mb-6 group">
    <div className="w-52 h-52 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-teal-200 shadow-2xl hover:shadow-teal-300/50 transition-all duration-500 hover:border-teal-500">
      <img
        src="/img.jpg"
        alt="Hamza Amejoudj"
        className="w-full h-full object-contain group-hover:brightness-110 group-hover:scale-110 transition-all duration-500"
      />
    </div>
  </div>
</motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;