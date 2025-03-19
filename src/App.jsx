import React, { lazy, Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from './components/Loading';
import './App.css';
import { NavbarContext } from './pages/Projects'; // Import context from Projects
import Footer from './pages/Footer';
import ThreeJSBackground from './components/ThreeJSBackground'; // Import the 3D background component

const Navbar = lazy(() => import('./pages/Navbar'));
const Hero = lazy(() => import('./pages/Hero'));
const About = lazy(() => import('./pages/About'));
const Skills = lazy(() => import('./pages/Skills'));
const Projects = lazy(() => import('./pages/Projects'));
const HireMeSection = lazy(() => import('./pages/Contact'));
const ServicesSection = lazy(() => import('./pages/ServicesSection'));
const TestimonialsSystem = lazy(() => import('./pages/TestimonialsSystem'));

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      <NavbarContext.Provider value={setIsNavbarVisible}>
        <div className={`app min-h-screen text-white transition-colors duration-300`}>
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Loading />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Add the 3D background component */}
              <ThreeJSBackground />

              <Suspense fallback={<Loading />}>
                {isNavbarVisible && <Navbar />}
                <main className="relative z-10">
                  <Hero />
                  <About />
                  <Skills />
                  <ServicesSection />
                  <Projects />
                  <TestimonialsSystem />
                  <HireMeSection />
                </main>
                <Footer />
              </Suspense>
            </motion.div>
          )}
        </div>
      </NavbarContext.Provider>
    </AnimatePresence>
  );
};

export default App;