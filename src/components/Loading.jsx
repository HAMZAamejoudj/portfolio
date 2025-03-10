import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Cosmic Loading Component
const Loading = () => {
  const [dots, setDots] = useState('');

  // Animate dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 300);
    return () => clearInterval(interval);
  }, []);

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
      className="h-screen flex items-center justify-center bg-gradient-to-b from-[#080C24] to-[#0A0E29] overflow-hidden"
    >
      <div className="relative flex flex-col items-center">
        {/* Pulsing Orb */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 20px rgba(79, 209, 197, 0.5)",
              "0 0 30px rgba(79, 209, 197, 0.8)",
              "0 0 20px rgba(79, 209, 197, 0.5)"
            ]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 relative z-10"
        >
          {/* Orbiting Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={particleVariants}
              animate="animate"
              className="absolute w-3 h-3 rounded-full bg-cyan-200"
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

        {/* Loading Text */}
        <motion.div
          className="mt-8 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-200 via-cyan-300 to-blue-300"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Loading{dots}
        </motion.div>

        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      </div>
    </motion.div>
  );
};

export default Loading;