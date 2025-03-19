import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiArrowUp } from 'react-icons/fi';

const Footer = () => {
  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 to-black pointer-events-none"></div>
      
      {/* Divider with glowing effect */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-blue-500 blur-sm"></div>
      </div>
      
      {/* Scroll to top button */}
      <div className="relative z-10 flex justify-center -mt-6">
        <motion.button
          onClick={scrollToTop}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full shadow-lg shadow-blue-600/20"
        >
          <FiArrowUp className="text-white text-xl" />
        </motion.button>
      </div>
      
      <div className="container mx-auto px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Karim Dev
            </h3>
            <p className="text-gray-400">
              Full stack developer passionate about creating beautiful, functional, and performant web experiences.
            </p>
            
            <div className="flex space-x-4 mt-4">
              <motion.a 
                href="https://github.com/karim" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: '#4FD1C5' }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiGithub size={20} />
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/karim" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: '#4FD1C5' }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiLinkedin size={20} />
              </motion.a>
              <motion.a 
                href="https://twitter.com/karim" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: '#4FD1C5' }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiTwitter size={20} />
              </motion.a>
              <motion.a 
                href="https://instagram.com/karim" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: '#4FD1C5' }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiInstagram size={20} />
              </motion.a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-400">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <motion.a 
                    href={`#${link.toLowerCase()}`}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span className="text-xs text-blue-500">▹</span> {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-400">Contact</h3>
            <div className="space-y-3">
              <motion.a 
                href="mailto:contact@karim.dev"
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <FiMail className="text-blue-500" /> contact@karim.dev
              </motion.a>
              <motion.a 
                href="tel:+212600000000"
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
              >
                <FiPhone className="text-blue-500" /> +212 600-000000
              </motion.a>
              <p className="text-gray-500 mt-4 text-sm">
                Based in Morocco <br />
                Available Worldwide
              </p>
            </div>
          </div>
        </div>        
        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-blue-900/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Karim Dev. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-gray-500 text-sm">
              <motion.li whileHover={{ color: '#fff' }} className="hover:cursor-pointer">
                Privacy Policy
              </motion.li>
              <motion.li whileHover={{ color: '#fff' }} className="hover:cursor-pointer">
                Terms of Service
              </motion.li>
              <motion.li whileHover={{ color: '#fff' }} className="hover:cursor-pointer">
                Cookies
              </motion.li>
            </ul>
          </div>
        </div>
      </div>
      
     </footer>
  );
};

export default Footer;