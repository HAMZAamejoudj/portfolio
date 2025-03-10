import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';

const ContactScene = () => {
  const particlesRef = useRef();
  const auroraRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0002;
      particlesRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }
    
    if (auroraRef.current) {
      auroraRef.current.position.y = Math.sin(time * 0.2) * 2;
      auroraRef.current.rotation.z = time * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#90CDF4" />
      
      <group ref={particlesRef}>
        <Stars 
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </group>
      
      <group ref={auroraRef}>
        {Array.from({ length: 50 }).map((_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.sin(i / 10) * 20,
              Math.cos(i / 10) * 5 + 10,
              Math.cos(i / 10) * 20
            ]}
            scale={Math.random() * 2 + 1}
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial 
              color={i % 2 === 0 ? "#4FD1C5" : "#90CDF4"} 
              transparent
              opacity={0.3}
            />
          </mesh>
        ))}
      </group>

      <OrbitControls 
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};
const ContactInfo = () => {
  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/karim', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com/in/karim', label: 'LinkedIn' },
    { icon: FiTwitter, href: 'https://twitter.com/karim', label: 'Twitter' },
    { icon: FiInstagram, href: 'https://instagram.com/karim', label: 'Instagram' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-blue-400 mb-6">Contact Information</h3>
        <div className="space-y-4">
          <motion.div
            whileHover={{ x: 10 }}
            className="flex items-center space-x-4 text-gray-300"
          >
            <FiMail className="text-blue-400 text-xl" />
            <a href="mailto:contact@karim.dev" className="hover:text-blue-400 transition-colors">
              contact@karim.dev
            </a>
          </motion.div>
          <motion.div
            whileHover={{ x: 10 }}
            className="flex items-center space-x-4 text-gray-300"
          >
            <FiPhone className="text-blue-400 text-xl" />
            <a href="tel:+212600000000" className="hover:text-blue-400 transition-colors">
              +212 600-000000
            </a>
          </motion.div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-blue-400 mb-6">Social Media</h3>
        <div className="grid grid-cols-2 gap-4">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <social.icon className="text-blue-400 text-xl" />
              <span className="text-gray-300">{social.label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <motion.form
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Name
        </label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email
        </label>
        <motion.input
          whileFocus={{ scale: 1.01 }}
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Message
        </label>
        <motion.textarea
          whileFocus={{ scale: 1.01 }}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows="4"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors text-white"
          required
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all"
      >
        Send Message
      </motion.button>
    </motion.form>
  );
};

const Contact = () => {
  return (
    <section id='contact' className="min-h-screen relative bg-black overflow-hidden py-20">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Suspense fallback={null}>
            <ContactScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Get in Touch
          </h2>
          <p className="text-blue-300 mt-4">
            Let's discuss your next project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;