import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code, Briefcase, FolderOpen, MessageSquare, Phone } from 'lucide-react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Define your navigation sections with icons
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'contact', label: 'Hire Me', icon: Phone }
  ];

  // Handle smooth scrolling when clicking on nav items
  const handleScroll = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScrollPosition = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      // Add scrolled state for background opacity change
      setScrolled(window.scrollY > 20);
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollPosition);
    // Initial check
    handleScrollPosition();

    return () => window.removeEventListener('scroll', handleScrollPosition);
  }, []);

  return (
    <>
      {/* Desktop Navbar - Top */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${
          scrolled 
            ? 'bg-black/50 backdrop-blur-lg border-b border-white/10 py-2' 
            : 'bg-black/20 backdrop-blur-sm py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="z-10"
            >
              <img src='logob.png' alt="Logo" className='w-20'/>
            </motion.div>

            <ul className="flex space-x-6">
              {navItems.map(item => (
                <li key={item.id}>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleScroll(item.id)}
                    className={`relative px-2 py-1 transition-colors duration-300 ${
                      activeSection === item.id ? 'text-blue-400 font-medium' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navbar - Bottom Icons */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/50 backdrop-blur-lg border-t border-white/10"
      >
        <div className="container mx-auto px-2">
          <div className="flex justify-around items-center">
            {navItems.map(item => {
              const IconComponent = item.icon;
              return (
                <motion.button
                  key={item.id}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleScroll(item.id)}
                  className={`flex flex-col items-center justify-center p-2 ${
                    activeSection === item.id ? 'text-blue-400' : 'text-white/70'
                  }`}
                >
                  <IconComponent size={20} className="mb-1" />
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeMobileSection"
                      className="absolute -top-1 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;