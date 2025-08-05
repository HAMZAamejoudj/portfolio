import React from "react";
import { motion } from "framer-motion";

const TimelineItem = ({ data, index, type }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2 }}
    className="relative pl-8 pb-8"
  >
    <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-blue-600 to-blue-400" />
    <div className="absolute w-4 h-4 -left-[7px] top-2 bg-blue-600 rounded-full">
      <div className="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-75" />
    </div>
    <motion.div
      whileHover={{ scale: 1.02, x: 5 }}
      className="bg-blue-900/20 backdrop-blur-sm rounded-lg p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
    >
      <p className="text-blue-400 font-medium">{data.period}</p>
      <h4 className="text-white font-semibold mt-2 text-xl">
        {type === 'education' ? data.degree : data.role}
      </h4>
      <p className="text-blue-300 mt-1">
        {type === 'education' ? data.institution : data.company}
      </p>
      <p className="text-gray-400 mt-2">{data.description}</p>
    </motion.div>
  </motion.div>
);

const About = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/CVHAMZA_Amejoudj.pdf";
    link.download = "CVHAMZA_Amejoudj.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const education = [
   
    {
      period: "2022 - 2024",
      degree: "Higher Technician in Web Development",
      institution: "Miage Salé School",
      description: "Specialized in web development, and UI/UX design.",
    },
    {
      period: "2021 - 2022",
      degree: "Baccalaureate in IT Maintenance and Networks",
      institution: "Hassan II High School, Midelt",
      description: "Focused on computer maintenance, networking, and troubleshooting.",
    },
  ];

  const experience = [
      {
      period: "2025 - Present",
      role: "Full-Stack Developer",
      company: "Freelance",
      description: "Designed and developed scalable web applications using Laravel, React, and MySQL. Integrated RESTful APIs and optimized performance for various projects.",
    },
    {
      period: "2024 - 2025",
      role: "Full-Stack Developer",
      company: " Everestos Kénitra",
      description: "As a web developer at Everestos, I design and develop dynamic, user-centric web solutions. I create responsive front-end interfaces using Next.js and build robust back-end functionality with Laravel. I optimize MySQL databases for efficient data management and analyze client requirements to deliver tailored solutions. My role involves rigorous testing, debugging, and performance optimization to ensure a seamless user experience. I collaborate effectively with teams, manage project timelines, and coordinate with stakeholders. Additionally, I develop and customize websites on platforms such as WordPress, Joomla, PrestaShop, and Wix, while enhancing site visibility through SEO audits, speed optimization, and best practices.",
    },
    {
      period: "2024",
      role: "Web Developer Intern",
      company: "indigo-solution",
      description: "Worked on developing and maintaining the company's website, improving UI/UX, and enhancing performance using modern web technologies.",
    },
  
  ];

  return (
    <section id="about" className="relative min-h-screen w-full overflow-hidden shadow-2xl text-white pb-20">
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            About Me
          </h2>
          <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed">
           I'm a dedicated full-stack developer with a strong focus on building elegant, high-performing web applications that seamlessly blend functionality with exceptional user experience.          </p>
        </motion.div>

        {/* Education & Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-2"
          >
            <h3 className="text-3xl font-semibold text-blue-400 mb-8">Education Journey</h3>
            {education.map((edu, index) => (
              <TimelineItem key={index} data={edu} index={index} type="education" />
            ))}
          </motion.div>

          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-2"
          >
            <h3 className="text-3xl font-semibold text-blue-400 mb-8">My Experience</h3>
            {experience.map((exp, index) => (
              <TimelineItem key={index} data={exp} index={index} type="experience" />
            ))}
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg text-xl overflow-hidden hover:cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">Download CV</span>
            <div className="absolute inset-0 rounded-lg border border-blue-400 opacity-50 animate-pulse" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;