import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiChevronDown } from 'react-icons/fi';

const DevSkills = () => {
  return (
    <div className="space-y-6">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="mt-8 p-5 bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-xl backdrop-blur-md"
      >
        <h4 className="text-xl font-bold text-blue-300 mb-2">Available for Remote Work & Relocation</h4>
        <p className="text-gray-300">Currently accepting new projects and collaboration opportunities</p>
      </motion.div>
    </div>
  );
};

const ContactLinks = () => {
  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Jhonwal', label: 'GitHub', color: 'from-gray-600 to-gray-800' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/karim-ouiaboub-136178283/', label: 'LinkedIn', color: 'from-blue-600 to-blue-800' },
    { icon: FiTwitter, href: 'https://twitter.com/karim', label: 'Twitter', color: 'from-blue-400 to-blue-600' },
    { icon: FiInstagram, href: 'https://instagram.com/wag.uer', label: 'Instagram', color: 'from-pink-500 to-purple-600' }
  ];

  return (
    <div className="mt-12 space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-blue-400 mb-6">Contact Me Directly</h3>
        <div className="space-y-4">
          <motion.div
            whileHover={{ x: 10 }}
            className="flex items-center space-x-4 text-gray-200"
          >
            <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg">
              <FiMail className="text-white text-xl" />
            </div>
            <a href="mailto:contact@karim.dev" className="hover:text-blue-400 transition-colors">
              karimouiaboubob@gmail.com
            </a>
          </motion.div>
          <motion.div
            whileHover={{ x: 10 }}
            className="flex items-center space-x-4 text-gray-200"
          >
            <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg">
              <FiPhone className="text-white text-xl" />
            </div>
            <a href="tel:+212600000000" className="hover:text-blue-400 transition-colors">
              +212 613-821525
            </a>
          </motion.div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-blue-400 mb-6">Connect With Me</h3>
        <div className="grid grid-cols-2 gap-4">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-3 p-4 bg-gradient-to-r ${social.color} rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all`}
            >
              <social.icon className="text-white text-xl" />
              <span className="text-white font-medium">{social.label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

const CustomSelect = ({ value, onChange, options, placeholder, required }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.div
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.01 }}
        className="w-full px-4 py-3 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg 
                 text-white cursor-pointer flex justify-between items-center"
      >
        <span className={value ? "text-white" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FiChevronDown />
        </motion.div>
      </motion.div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute z-50 w-full mt-1 bg-gradient-to-b from-blue-900/90 to-purple-900/90 border border-blue-500/30 
                   rounded-lg overflow-hidden shadow-lg backdrop-blur-md max-h-60 overflow-y-auto"
        >
          {options.map((option) => (
            <motion.div
              key={option}
              onClick={() => {
                onChange({ target: { value: option } });
                setIsOpen(false);
              }}
              whileHover={{ backgroundColor: "rgba(79, 209, 197, 0.2)" }}
              className="px-4 py-3 cursor-pointer hover:text-blue-300 transition-colors"
            >
              {option}
            </motion.div>
          ))}
        </motion.div>
      )}

      {required && !value && (
        <input
          tabIndex={-1}
          autoComplete="off"
          style={{
            opacity: 0,
            width: "100%",
            height: 0,
            position: "absolute"
          }}
          value={value}
          onChange={() => { }}
          required
        />
      )}
    </div>
  );
};

const HireMeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    timeline: '',
    message: ''
  });
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const services = [
    "Full Stack Development",
    "Frontend Development",
    "Backend Development",
    "E-commerce Website",
    "Web Application",
    "UI/UX Design",
    "API Integration",
    "Database Design",
    "Performance Optimization",
    "Other (Please Specify)"
  ];

  const timelineOptions = [
    "Less than 1 month",
    "1-3 months",
    "3-6 months",
    "6+ months",
    "Ongoing"
  ];

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
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="space-y-6 bg-gradient-to-b from-blue-900/30 to-black/80 p-8 rounded-2xl border border-blue-500/20 backdrop-blur-sm shadow-xl"
    >
      <h3 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300 mb-8">
        Hire Me For Your Project
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Name
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors text-white"
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
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors text-white"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Service Required
        </label>
        <CustomSelect
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          options={services}
          placeholder="Select a service"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Timeline
        </label>
        <CustomSelect
          value={formData.timeline}
          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          options={timelineOptions}
          placeholder="Select timeline"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Project Details
        </label>
        <motion.textarea
          whileFocus={{ scale: 1.01 }}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows="4"
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors text-white"
          required
          placeholder="Describe your project requirements, goals, and any additional details..."
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all"
      >
        Send Inquiry
      </motion.button>
    </motion.form>
  );
};

const HireMeSection = () => {
  return (
    <section id='contact' className="relative min-h-screen flex flex-col justify-center items-center p-8 overflow-hidden">
      <div className="relative z-10 max-w-6xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Hire Me
          </h2>
          <p className="text-white mt-4 text-lg">
            Let's build something amazing together. Open for freelance and full-time opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-12">
            <DevSkills />
            <ContactLinks />
          </div>
          <div>
            <HireMeForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HireMeSection;