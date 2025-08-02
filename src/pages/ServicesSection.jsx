import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiServer, FiLayout, FiDatabase, FiSmartphone, FiShoppingBag } from 'react-icons/fi';

// Import shadcn components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { IoShareSocialSharp } from "react-icons/io5";
import { TbSeo } from "react-icons/tb";



// Service data structure with detailed information
const servicesData = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: FiLayout,
    color: 'from-blue-500 to-cyan-400',
    shortDesc: 'Create beautiful, responsive user interfaces',
    fullDesc: 'Expert frontend development using modern frameworks like React, Vue.js, and Angular. I build responsive, intuitive interfaces with a focus on performance and accessibility.',
    technologies: ['React.js', 'Vue.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'Next.js'],
    deliverables: ['Responsive web interfaces', 'Interactive UI components', 'Animation systems', 'Cross-browser compatibility']
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: FiServer,
    color: 'from-purple-500 to-indigo-500',
    shortDesc: 'Robust server-side solutions and APIs',
    fullDesc: 'Scalable backend systems that power your applications. I design RESTful APIs, optimize database performance, and implement secure authentication systems.',
    technologies: ['Node.js', 'Express', 'Django', 'Ruby on Rails', 'PostgreSQL', 'MongoDB'],
    deliverables: ['RESTful APIs', 'Database architecture', 'Server configuration', 'Authentication systems']
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    icon: FiCode,
    color: 'from-green-500 to-teal-400',
    shortDesc: 'End-to-end web application development',
    fullDesc: 'Complete web application development from concept to deployment. I handle everything from database design to frontend implementation, creating cohesive, efficient systems.',
    technologies: ['MERN Stack', 'LAMP Stack', 'GraphQL', 'Docker', 'AWS', 'Firebase'],
    deliverables: ['Complete web applications', 'System architecture', 'CI/CD pipelines', 'Deployment strategies']
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Solutions',
    icon: FiShoppingBag,
    color: 'from-red-500 to-pink-500',
    shortDesc: 'Custom online store development',
    fullDesc: 'Custom e-commerce solutions tailored to your business needs. From product catalogs to payment processing, I build online stores that drive conversions and provide excellent user experiences.',
    technologies: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'Inventory management', 'CMS integration'],
    deliverables: ['Online storefronts', 'Payment gateways', 'Product management', 'Order processing systems']
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    icon: FiSmartphone,
    color: 'from-orange-500 to-yellow-400',
    shortDesc: 'Cross-platform mobile applications',
    fullDesc: 'Native and cross-platform mobile applications for iOS and Android. I create intuitive, high-performance apps that deliver exceptional user experiences across all devices.',
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'App Store optimization'],
    deliverables: ['Native mobile apps', 'Cross-platform applications', 'Push notification systems', 'Offline functionality']
  },
  {
    id: 'database',
    title: 'Database Design',
    icon: FiDatabase,
    color: 'from-blue-600 to-blue-800',
    shortDesc: 'Efficient data structure and optimization',
    fullDesc: 'Optimized database solutions that ensure data integrity and performance. I design efficient schemas, implement caching strategies, and optimize queries for speed and reliability.',
    technologies: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Elasticsearch'],
    deliverables: ['Database schema', 'Migration strategies', 'Query optimization', 'Data security protocols']
  },
   {
    id: 'SEO',
    title: 'SEO',
    icon: TbSeo,
    color: 'from-blue-600 to-blue-800',
    shortDesc: 'Search Engine Optimization',
    fullDesc: 'Search Engine Optimization (SEO) is a digital marketing service focused on improving a website’s visibility on search engine results pages (SERPs) like Google, Bing, and Yahoo. The goal is to increase organic (non-paid) traffic by optimizing various elements of a website and its content to rank higher for relevant search queries.',
    technologies: ['Google Analytics', 'Google Search Console', 'SEMrush', 'Ahrefs', 'Screaming Frog SEO Spidek'],
    deliverables: ['SEO Audit Report', 'Keyword Research Report', 'Backlink Profile Repor', 'Performance Analytics Report']
  },
  {
    id: 'Social Media',
    title: 'Social Media Management',
    icon: IoShareSocialSharp,
    color: 'from-blue-600 to-blue-800',
    shortDesc: 'Social media management',
    fullDesc: 'Social media management involves strategically planning, creating, scheduling, and posting content on platforms like Instagram, Facebook, X, LinkedIn, and TikTok to build brand awareness and engage audiences.',
    technologies: ['Instagram', 'Facebook', 'LinkedIn', 'X', 'TikTok', 'Snapchat'],
    deliverables: ['Social Media Strategy Plan', 'Content Calendar', 'Engaging Content Assets', 'Performance Analytics Report']
  }
   

];

// Individual Service Card Component
const ServiceCard = ({ service, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => onSelect(service)}
    >
      <Card className="cursor-pointer bg-gradient-to-br from-gray-900/80 to-black/80 border border-blue-500/20 overflow-hidden backdrop-blur-sm h-full">
        <div className={`h-2 w-full bg-gradient-to-r ${service.color}`} />
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-3">
            <div className={`p-3 bg-gradient-to-r ${service.color} rounded-lg`}>
              <service.icon className="text-white text-xl" />
            </div>
            <CardTitle className="text-xl text-white">{service.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-400">{service.shortDesc}</CardDescription>
        </CardContent>
        <CardFooter className="pt-2 border-t border-gray-700/30">
          <motion.div 
            whileHover={{ x: 5 }}
            className="flex items-center justify-between text-sm w-full"
          >
            <span className="text-blue-400 font-medium">View Details</span>
            <motion.span 
              animate={{ x: [0, 5, 0] }} 
              transition={{ repeat: Infinity, repeatDelay: 1.5, duration: 1 }}
            >
              →
            </motion.span>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Main Services Component
const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectService = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  

  return (
    <section id='services' className="relative min-h-screen flex flex-col justify-center items-center p-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4"
          >
            My Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-white max-w-2xl mx-auto"
          >
            Professional development services tailored to your project needs
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={handleSelectService}
            />
          ))}
        </div>
      </div>
      
      {selectedService && (
        <Dialog open={modalOpen} onOpenChange={handleCloseModal}>
          <DialogContent className="bg-gradient-to-b from-gray-900 to-black border border-blue-500/20 text-white max-w-4xl">
            <DialogHeader>
              <div className={`p-4 -mt-6 -mx-6 mb-4 bg-gradient-to-r ${selectedService.color} rounded-t-lg`}>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                    <selectedService.icon className="text-white text-2xl" />
                  </div>
                  <DialogTitle className="text-2xl font-bold text-white">{selectedService.title}</DialogTitle>
                </div>
              </div>
              <DialogDescription className="text-gray-300 text-base">
                {selectedService.fullDesc}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="outline" 
                      className="bg-blue-900/40 border-blue-500/30 text-blue-300"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Separator className="bg-gray-700/30" />
              
              <div>
                <h4 className="text-lg font-semibold text-blue-400 mb-3">What You'll Get</h4>
                <ul className="space-y-2">
                  {selectedService.deliverables.map((item) => (
                    <li key={item} className="flex items-start space-x-2 text-gray-300">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default ServicesSection;