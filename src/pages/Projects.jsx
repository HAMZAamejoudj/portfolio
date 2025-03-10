import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiFolder, FiX } from 'react-icons/fi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { projects } from './projectsData';

export const NavbarContext = React.createContext();

const ProjectScene = () => {
  const particlesRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05;
      particlesRef.current.rotation.x = time * 0.03;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#3B82F6" />
      <group ref={particlesRef}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </group>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
};
const ProjectDetails = ({ project, onClose }) => {
  const setNavbarVisible = React.useContext(NavbarContext);
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // Hide navbar when component mounts
    setNavbarVisible(false);
    
    return () => {
      document.body.style.overflow = 'auto';
      // Show navbar when component unmounts
      setNavbarVisible(true);
    };
  }, [setNavbarVisible]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100] overflow-y-auto custom-scrollbar"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="w-2/3 mx-auto my-8 bg-gradient-to-b from-gray-900/50 to-black rounded-2xl border border-white/10 overflow-hidden relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-blue-500/5 background-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-transparent" />
        
        <div className="relative z-10">
          <div className="h-[80vh] relative group">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              src={project.images.main}
              alt={project.title}
              className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-6 right-6 bg-black/30 backdrop-blur-sm p-3 rounded-full text-white/80 hover:text-white transition-all duration-300 border border-white/10 hover:border-white/30"
            >
              <FiX size={24} />
            </motion.button>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-8 left-8 right-8"
            >
              <h2 className="text-5xl font-bold py-2 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-purple-400">
                {project.title}
              </h2>
              <p className="text-xl text-blue-100/80">{project.shortDescription}</p>
            </motion.div>
          </div>

          <div className="p-8">
            <Tabs defaultValue="overview" className="w-full">
              <div className="sticky top-0 bg-black/50 backdrop-blur-sm py-2 z-20">
                <TabsList className="grid w-full grid-cols-4 bg-white/5 rounded-2xl p-1.5 border border-white/10">
                  {["overview", "technical", "gallery", "team"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="p-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-400 data-[state=active]:text-white transition-all duration-300"
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="mt-8">
                <TabsContent value="overview" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <p className="text-gray-400">{project.concept.overview}</p>

                    <div className="space-y-4">
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-blue-400 mb-2">Problem</h4>
                        <p className="text-gray-300">{project.concept.problem}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-blue-400 mb-2">Solution</h4>
                        <p className="text-gray-300">{project.concept.solution}</p>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-blue-400 mb-2">Key Features</h4>
                      <ul className="space-y-2">
                        {project.concept.keyFeatures.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-gray-300">
                            <span className="w-2 h-2 bg-blue-400 rounded-full" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="technical" className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-blue-400 mb-2">Architecture</h4>
                      <p className="text-gray-300">{project.technical.architecture}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.technologies.map((tech, index) => (
                        <div key={index} className="bg-white/5 rounded-lg p-4">
                          <h4 className="text-lg font-semibold text-blue-400">{tech.name}</h4>
                          <p className="text-sm text-gray-400">Version: {tech.version}</p>
                          <p className="text-gray-300 mt-2">{tech.usage}</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-blue-400 mb-2">Performance Metrics</h4>
                        <ul className="space-y-2">
                          {project.performance.metrics.map((metric, index) => (
                            <li key={index} className="flex items-center space-x-2 text-gray-300">
                              <span className="w-2 h-2 bg-blue-400 rounded-full" />
                              <span>{metric}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-blue-400 mb-2">Optimizations</h4>
                        <ul className="space-y-2">
                          {project.performance.optimizations.map((opt, index) => (
                            <li key={index} className="flex items-center space-x-2 text-gray-300">
                              <span className="w-2 h-2 bg-blue-400 rounded-full" />
                              <span>{opt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="gallery" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images.screenshots.map((screenshot, index) => (
                      <div key={index} className="relative group rounded-lg overflow-hidden">
                        <img
                          src={screenshot.url}
                          alt={screenshot.caption}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <p className="text-white text-sm">{screenshot.caption}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                </div>
            </Tabs>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <motion.span
                    key={tech.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-blue-400 rounded-xl border border-blue-600/20 hover:border-blue-400/40 transition-colors duration-300"
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </div>
              
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all duration-300 flex items-center gap-2 border border-white/10 hover:border-white/20"
                >
                  <FiGithub className="text-xl" />
                  <span>GitHub</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-2"
                >
                  <FiExternalLink className="text-xl" />
                  <span>Live Demo</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
const ProjectCard = ({ project, index }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative group cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />

        <div className="relative backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={project.images.main}
              alt={project.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center"
            >
              <FiFolder className="text-2xl text-blue-400" />
              <div className="flex space-x-3">
                <motion.a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiGithub className="text-xl text-white hover:text-blue-400 transition-colors" />
                </motion.a>
                <motion.a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiExternalLink className="text-xl text-white hover:text-blue-400 transition-colors" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 mb-4 line-clamp-2">{project.shortDescription}</p>

            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech.name}
                  className="px-3 py-1 text-sm bg-blue-600/10 text-blue-400 rounded-full border border-blue-600/20"
                >
                  {tech.name}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-3 py-1 text-sm bg-blue-600/10 text-blue-400 rounded-full border border-blue-600/20">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showDetails && (
          <ProjectDetails project={project} onClose={() => setShowDetails(false)} />
        )}
      </AnimatePresence>
    </>
  );
};
const Projects = () => {
  return (
    <section id='projects' className="min-h-screen relative bg-black overflow-hidden py-20">
      
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Suspense fallback={null}>
            <ProjectScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Featured Projects
          </h2>
          <p className="text-blue-300 mt-4 text-lg">
            Explore some of my recent work
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;