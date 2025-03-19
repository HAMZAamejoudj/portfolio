import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Enhanced Cosmic Loading Component
const Loading = () => {
  const [letterIndex, setLetterIndex] = useState(-1);
  const text = "KARIM";
  
  // Animate letters appearing one by one
  useEffect(() => {
    if (letterIndex < text.length) {
      const timeout = setTimeout(() => {
        setLetterIndex(prev => prev + 1);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [letterIndex]);
  
  // Reset animation after displaying full text
  useEffect(() => {
    if (letterIndex === text.length) {
      const resetTimeout = setTimeout(() => {
        setLetterIndex(-1);
      }, 2000);
      return () => clearTimeout(resetTimeout);
    }
  }, [letterIndex]);

  // Particle variants for orbiting effect
  const particleVariants = {
    animate: i => ({
      rotate: 360,
      scale: [1, 1.2, 1],
      transition: {
        duration: 2 + i * 0.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="h-screen flex items-center justify-center bg-gradient-to-b from-[#050A20] to-[#071335] overflow-hidden"
    >
      <div className="relative flex flex-col items-center">
        {/* Pulsing Orb */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 20px rgba(65, 105, 225, 0.5)",
              "0 0 30px rgba(65, 105, 225, 0.8)",
              "0 0 20px rgba(65, 105, 225, 0.5)"
            ]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-700 to-blue-400 relative z-10"
        >
          {/* Orbiting Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={particleVariants}
              animate="animate"
              className="absolute w-3 h-3 rounded-full bg-blue-200"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                orbit: `${40 + i * 10}px`
              }}
              initial={{
                x: Math.cos(i * Math.PI / 3) * (40 + i * 10),
                y: Math.sin(i * Math.PI / 3) * (40 + i * 10)
              }}
            />
          ))}
        </motion.div>

        {/* KARIM Text with letters appearing one by one */}
        <div className="mt-8 flex space-x-2">
          {text.split('').map((letter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: index <= letterIndex ? 1 : 0, 
                y: index <= letterIndex ? 0 : 20 
              }}
              transition={{ 
                duration: 0.3,
                ease: "easeOut"
              }}
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-200 to-indigo-300"
            >
              {letter}
            </motion.div>
          ))}
        </div>

        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
      </div>
    </motion.div>
  );
};

export default Loading;