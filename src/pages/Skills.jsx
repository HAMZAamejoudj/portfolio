import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  SiReact, SiVuedotjs, SiTailwindcss, SiThreedotjs,
  SiNodedotjs, SiLaravel, SiExpress, SiDjango,
  SiMysql, SiMongodb, SiRedis,
  SiDocker, SiAmazonwebservices, SiGithubactions,
  SiFigma, SiAdobephotoshop, SiAdobeillustrator,
  SiBlender, SiGreensock, SiFramer,
  SiApachecassandra,
  SiCanva
} from 'react-icons/si';

const skills = [
  {
    name: 'Frontend Development',
    mainIcon: SiReact,
    level: 90,
    color: '#61DAFB',
    bgColor: 'rgba(97, 218, 251, 0.1)',
    borderColor: 'rgba(97, 218, 251, 0.4)',
    technologies: [
      { name: 'React', icon: SiReact, level: 95 },
      { name: 'Vue.js', icon: SiVuedotjs, level: 80 },
      { name: 'TailwindCSS', icon: SiTailwindcss, level: 90 },
      { name: 'Three.js', icon: SiThreedotjs, level: 70 }
    ]
  },
  {
    name: 'Backend Development',
    mainIcon: SiLaravel,
    level: 85,
    color: '#d10202',
    bgColor: 'rgba(145, 83, 83, 0.1)',
    borderColor: 'rgba(160, 100, 99, 0.4)',
    technologies: [
      { name: 'Node.js', icon: SiNodedotjs, level: 70 },
      { name: 'Laravel', icon: SiLaravel, level: 95 },
      { name: 'Express', icon: SiExpress, level: 70 },
      { name: 'Django', icon: SiDjango, level: 45 },
    ]
  },
  {
    name: 'Database Management',
    mainIcon: SiMysql,
    level: 85,
    color: '#4479A1',
    bgColor: 'rgba(68, 121, 161, 0.1)',
    borderColor: 'rgba(68, 121, 161, 0.4)',
    technologies: [
      { name: 'MySQL', icon: SiMysql, level: 95 },
      { name: 'MongoDB', icon: SiMongodb, level: 80 },
      { name: 'Redis', icon: SiRedis, level: 75 },
      { name: 'Cassandra', icon: SiApachecassandra, level: 65 },
    ]
  },
  {
    name: 'DevOps & Cloud',
    mainIcon: SiDocker,
    level: 80,
    color: '#2496ED',
    bgColor: 'rgba(36, 150, 237, 0.1)',
    borderColor: 'rgba(36, 150, 237, 0.4)',
    technologies: [
      { name: 'Docker', icon: SiDocker, level: 85 },
      { name: 'AWS', icon: SiAmazonwebservices, level: 80 },
      { name: 'CI/CD', icon: SiGithubactions, level: 75 }
    ]
  },
  {
    name: 'UI/UX Design',
    mainIcon: SiFigma,
    level: 70,
    color: '#F24E1E',
    bgColor: 'rgba(242, 78, 30, 0.1)',
    borderColor: 'rgba(242, 78, 30, 0.4)',
    technologies: [
      { name: 'Figma', icon: SiFigma, level: 70 },
      { name: 'Canva', icon: SiCanva, level: 85 },
      { name: 'Photoshop', icon: SiAdobephotoshop, level: 65 },
      { name: 'Illustrator', icon: SiAdobeillustrator, level: 50 }
    ]
  },
  {
    name: '3D & Animation',
    mainIcon: SiBlender,
    level: 35,
    color: '#F5792A',
    bgColor: 'rgba(245, 121, 42, 0.1)',
    borderColor: 'rgba(245, 121, 42, 0.4)',
    technologies: [
      { name: 'Three.js', icon: SiThreedotjs, level: 70 },
      { name: 'GSAP', icon: SiGreensock, level: 65 },
      { name: 'Framer', icon: SiFramer, level: 60 },
    ]
  }
];


const Scene = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />

      {/* Stars for background effect */}
      <Stars radius={100} depth={50} count={5000} factor={6} saturation={0} fade speed={1} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
};

const SkillCard = ({ skill, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const Icon = skill.mainIcon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
      <div 
        className="absolute inset-0 blur-xl rounded-xl transition-all duration-300"
        style={{ backgroundColor: skill.bgColor }}
      />
      <motion.div
        whileHover={{ scale: 1.02, rotateY: 10 }}
        className="relative bg-black/20 backdrop-blur-xl p-6 rounded-xl shadow-lg transition-all duration-300"
        style={{ borderColor: skill.borderColor, borderWidth: '1px' }}
      >
        <div className="text-4xl mb-4" style={{ color: skill.color }}>
          <Icon />
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{skill.name}</h3>
        
        {/* Main Progress Bar */}
        <div className="w-full bg-blue-100 rounded-full h-2.5 mb-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : {}}
            transition={{ duration: 1, delay: index * 0.2 }}
            className="h-2.5 rounded-full relative"
            style={{ 
              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
            }}
          >
            <div className="absolute inset-0 bg-white/10 animate-pulse" />
          </motion.div>
        </div>

        {/* Nested Skill Levels */}
        <div className="space-y-2">
          {skill.technologies.map((tech, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-sm text-white">
                <span>{tech.name}</span>
                <tech.icon />
              </div>
              <div className="w-full bg-blue-900 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${tech.level}%` } : {}}
                  transition={{ duration: 1, delay: i * 0.2 }}
                  className="h-2 rounded-full"
                  style={{ 
                    background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id='skills' className="min-h-screen w-full relative bg-black overflow-hidden py-20">
      
      {/* Background 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Skills & Expertise
          </h2>
          <p className="text-blue-300 mt-4 text-lg">
            Crafting digital experiences with modern technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;