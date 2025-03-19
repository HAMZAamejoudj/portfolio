import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO at TechCorp",
    image: "/testimonials/sarah.jpg",
    content: "Working with Karim was an exceptional experience. His attention to detail and innovative solutions transformed our project.",
    rating: 5,
  },
  {
    id: 2,
    name: "John Doe",
    role: "CTO at TechCorp",
    image: "/testimonials/john.jpg",
    content: "Karim's expertise in UI/UX design was invaluable. His ability to understand our vision and bring it to life was impressive.",
    rating: 5,
  },
  {
    id: 2,
    name: "John Doe",
    role: "CTO at TechCorp",
    image: "/testimonials/john.jpg",
    content: "Karim's expertise in UI/UX design was invaluable. His ability to understand our vision and bring it to life was impressive.",
    rating: 5,
  },
  {
    id: 2,
    name: "John Doe",
    role: "CTO at TechCorp",
    image: "/testimonials/john.jpg",
    content: "Karim's expertise in UI/UX design was invaluable. His ability to understand our vision and bring it to life was impressive.",
    rating: 5,
  },
  {
    id: 2,
    name: "John Doe",
    role: "CTO at TechCorp",
    image: "/testimonials/john.jpg",
    content: "Karim's expertise in UI/UX design was invaluable. His ability to understand our vision and bring it to life was impressive.",
    rating: 5,
  },
  {
    id: 2,
    name: "John Doe",
    role: "CTO at TechCorp",
    image: "/testimonials/john.jpg",
    content: "Karim's expertise in UI/UX design was invaluable. His ability to understand our vision and bring it to life was impressive.",
    rating: 5,
  },
  {
    id: 2,
    name: "John Doe",
    role: "CTO at TechCorp",
    image: "/testimonials/john.jpg",
    content: "Karim's expertise in UI/UX design was invaluable. His ability to understand our vision and bring it to life was impressive.",
    rating: 5,
  },
  {
    id: 2,
    name: "John Doe",
    role: "CTO at TechCorp",
    image: "/testimonials/john.jpg",
    content: "Karim's expertise in UI/UX design was invaluable. His ability to understand our vision and bring it to life was impressive.",
    rating: 5,
  },

  // Add more testimonials...
];

const TestimonialCard = ({ testimonial }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="bg-gradient-to-b from-white/5 to-transparent backdrop-blur-lg rounded-2xl p-8 border border-white/10 h-full"
  >
    <div className="flex flex-col items-center text-center gap-6">
      <div className="relative group">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img 
            src={testimonial.image} 
            alt={testimonial.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-sm group-hover:blur-md transition-all duration-300" />
        <motion.div 
          className="absolute -inset-2 rounded-full border-2 border-blue-400/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <FiStar
                size={20}
                className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
              />
            </motion.div>
          ))}
        </div>

        <blockquote>
          <p className="text-gray-300 text-lg leading-relaxed italic">"{testimonial.content}"</p>
        </blockquote>

        <div>
          <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            {testimonial.name}
          </h3>
          <p className="text-blue-400/80">{testimonial.role}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      (prev + 1) % testimonials.length
    );
  };

  return (
    <section id='testimonials' className="min-h-screen relative bg-black py-20 flex items-center">
      <div className="absolute inset-0 bg-blue-500/5 background-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Testimonials
          </h2>
          <p className="text-xl text-blue-300/80 mt-4">
            What clients say about my work
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            className="absolute -left-8 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm p-4 rounded-full text-white/80 hover:text-white transition-all duration-300 border border-white/10 hover:border-white/30"
          >
            <FiChevronLeft size={28} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="absolute -right-8 top-1/2 -translate-y-1/2 z-10 bg-black/50 backdrop-blur-sm p-4 rounded-full text-white/80 hover:text-white transition-all duration-300 border border-white/10 hover:border-white/30"
          >
            <FiChevronRight size={28} />
          </motion.button>

          <div className="relative h-[500px]">
            <AnimatePresence mode="wait">
              <div className="absolute inset-0" key={currentIndex}>
                <TestimonialCard testimonial={testimonials[currentIndex]} />
              </div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-blue-500 w-6" 
                    : "bg-blue-500/20 hover:bg-blue-500/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


