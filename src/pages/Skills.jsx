import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BiLogoVisualStudio } from 'react-icons/bi';
import { SiIntellijidea } from "react-icons/si";
import { SiEclipseide } from "react-icons/si";
import { SiPrestashop } from "react-icons/si";
import { SiJoomla } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { 
  SiReact, SiVuedotjs, SiTailwindcss,
  SiBootstrap, SiHtml5, SiCss3, SiJavascript,
  SiNodedotjs, SiLaravel, SiExpress, SiDjango,
  SiMysql, SiMongodb, SiOracle, SiRedis,
  SiWordpress, SiShopify, SiWix,
  SiFigma, SiAdobephotoshop, SiAdobeillustrator,
  SiBlender, SiGreensock, SiFramer,
  SiApachecassandra,
  SiCanva,
  SiPython, SiPhp
   

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
      { name: 'Bootstrap', icon: SiBootstrap, level: 70 },
      { name: 'HTML5', icon: SiHtml5, level: 95 },
      { name: 'CSS3', icon: SiCss3, level: 95 },
      { name: 'JavaScript', icon: SiJavascript, level: 90 }
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
      { name: 'Django', icon: SiDjango, level: 45 },
      { name: 'Python', icon: SiPython, level: 75 },
      { name: 'PHP', icon: SiPhp, level: 85 },
      { name: 'JAVA', icon: FaJava , level: 69 },


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
      { name:'Oracle', icon: SiOracle, level: 70}
    ]
  },
  {
    name: 'CMS Development',
    mainIcon: SiWordpress,
    level: 85,
    color: '#21759B',
    bgColor: 'rgba(33, 117, 155, 0.1)',
    borderColor: 'rgba(33, 117, 155, 0.4)',
    technologies: [
      { name: 'WordPress', icon: SiWordpress, level: 90 },
      { name: 'Shopify', icon: SiShopify, level: 80 },
      { name: 'Wix', icon: SiWix, level: 90 },
      { name: 'Prestashop', icon: SiPrestashop  , level: 90 },
      { name: 'Joomla', icon: SiJoomla , level: 90 }


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
    name: 'Development Environments',
    mainIcon: BiLogoVisualStudio,
    level: 80,
    color: '#F5792A',
    bgColor: 'rgba(245, 121, 42, 0.1)',
    borderColor: 'rgba(245, 121, 42, 0.4)',
    technologies: [
      { name: 'VisualStudioCode', icon: BiLogoVisualStudio, level: 50 },
      { name: 'IntelliJ IDEA', icon: SiIntellijidea, level: 50 },
      { name: 'Eclipse', icon: SiEclipseide, level: 60 },
      { name: 'XAAMP', level: 80 },


    ]
  }
];

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
                {tech.icon && <tech.icon />}
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
    <section id='skills' className="min-h-screen w-full relative overflow-hidden py-20">
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Skills & Expertise
          </h2>
          <p className="text-white mt-4 text-lg">
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