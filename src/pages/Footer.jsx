import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiTwitter, FiArrowUp, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Function for smooth scrolling to sections without changing URL
  const scrollToSection = (sectionId) => (event) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-16 bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      
      {/* Scroll to top button */}
      <div className="relative z-10 flex justify-center -mt-6">
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-full shadow-lg shadow-blue-600/30"
        >
          <FiArrowUp className="text-white text-xl" />
        </motion.button>
      </div>
      
      <div className="container mx-auto px-6 pt-12 pb-8">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Logo & About */}
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="">
              <img onClick={scrollToTop} src="/logo.png" alt="hamza Dev Logo" className="h-32 hover:cursor-pointer hover:scale-105 duration-200 transition-all" />
            </div>

            
            <div className="flex space-x-5">
              <motion.a 
                href="https://github.com/HAMZAamejoudj" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: '#4FD1C5' }}
                className="text-gray-300 hover:text-cyan-300 transition-colors"
              >
                <FiGithub size={20} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/hamza-amejoudj-22714b273/" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: '#4FD1C5' }}
                className="text-gray-300 hover:text-cyan-300 transition-colors"
              >
                <FiLinkedin size={20} />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/ha_mza202_/" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: '#4FD1C5' }}
                className="text-gray-300 hover:text-cyan-300 transition-colors"
              >
                <FiInstagram size={20} />
              </motion.a>
            </div>
          </div>
          
          {/* Middle Column with Quick Links */}
          <div className="md:w-1/3">
            <h3 className="text-lg font-semibold text-cyan-300 mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'home', name: 'Home' },
                { id: 'about', name: 'About' },
                { id: 'skills', name: 'Skills' },
                { id: 'services', name: 'Services' },
                { id: 'projects', name: 'Projects' },
                { id: 'testimonials', name: 'Testimonials' },
                { id: 'contact', name: 'Contact' }
              ].map((link) => (
                <motion.button 
                  key={link.name}
                  onClick={scrollToSection(link.id)}
                  whileHover={{ x: 3 }}
                  className="text-left text-gray-300 hover:text-white transition-all flex items-center gap-2 text-sm group"
                >
                  <span className="text-xs text-cyan-400 transform transition-transform group-hover:scale-110">▹</span> 
                  <span className="group-hover:text-cyan-50">{link.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="md:w-1/3">
            <h3 className="text-lg font-semibold text-cyan-300 mb-4">Contact</h3>
            <div className="space-y-3">
              <motion.a 
                href="mailto:karimouiaboubob@gmail.com"
                whileHover={{ x: 3 }}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-sm"
              >
                <FiMail className="text-cyan-400" />hamzaamgouj054@gmail.com
              </motion.a>
              <motion.a 
                href="tel:+212602030438"
                whileHover={{ x: 3 }}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-sm"
              >
                <FiPhone className="text-cyan-400" /> +212 602-030438
              </motion.a>
              <p className="text-gray-400 mt-4 text-sm">
                Based in Morocco • Available Worldwide
              </p>
            </div>
          </div>
        </div>        
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-blue-700/30">
          <p className="text-gray-400 text-center  text-sm">
            © {currentYear} HAMZA AMEJOUD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;