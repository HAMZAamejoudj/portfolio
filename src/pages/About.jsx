import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Stars } from "@react-three/drei";
import { motion } from "framer-motion";

// Enhanced 3D Scene Component
const Scene = () => {
  const meshRef = useRef();
  const particlesRef = useRef();


  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05;
      particlesRef.current.rotation.x = time * 0.03;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#3B82F6" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#60A5FA" />

      {/* Enhanced stars effect */}
      <group ref={particlesRef}>
        <Stars
          radius={50}
          depth={50}
          count={3000}
          factor={6}
          saturation={1}
          fade
          speed={0.5}
        />
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
    </>
  );
};

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
    link.href = "/cv.pdf";
    link.download = "karim_ouiaboub_cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const education = [
    {
      period: "2024 - Present",
      degree: "Excellence Bachelor's in Information Systems and Artificial Intelligence",
      institution: "Multidisciplinary Faculty of Khouribga",
      description: "Advanced studies in information systems and artificial intelligence.",
    },
    {
      period: "2022 - 2024",
      degree: "Advanced Technician Diploma in Multimedia and Web Design",
      institution: "Preparatory Class for Advanced Technician Certificate, Errachidia",
      description: "Specialized in multimedia, web development, and UI/UX design.",
    },
    {
      period: "2020 - 2022",
      degree: "High School Diploma in IT Maintenance and Networks",
      institution: "Hassan II High School, Midelt",
      description: "Focused on computer maintenance, networking, and troubleshooting.",
    },
  ];


  const experience = [
    {
      period: "2024 - Present",
      role: "Full-Stack Developer",
      company: "Charming Tours to Morocco",
      description: "Developed a trip reservation platform where users can browse and book tours. Implemented an admin dashboard for managing reservations and tour details.",
    },
    {
      period: "2024",
      role: "Backend Intern",
      company: "Nichan Labs",
      description: "Developing and optimizing backend services using Laravel and MySQL. Collaborating on API integrations and system performance improvements.",
    },
    {
      period: "2023",
      role: "Web Developer Intern",
      company: "Errawassi",
      description: "Worked on developing and maintaining the company's website, improving UI/UX, and enhancing performance using modern web technologies.",
    },
    {
      period: "2022 - Present",
      role: "Full-Stack Developer",
      company: "Freelance",
      description: "Designed and developed scalable web applications using Laravel, React, and MySQL. Integrated RESTful APIs and optimized performance for various projects.",
    },
  ];


  return (
    <section id="about" className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0A0E29] to-black shadow-2xl  text-white pb-20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black/50 to-blue-900/20 animate-gradient-shift" />
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-8"
          />
          <h2 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 mb-6">
            About Me
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
            I'm a passionate full-stack developer with a love for creating beautiful and functional web applications.
          </p>
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