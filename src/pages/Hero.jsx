import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Cloud } from '@react-three/drei';
import { motion } from 'framer-motion';

const Particles = () => {
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

  const auroraParticles = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      position: [
        Math.sin(i / 10) * 20,
        Math.cos(i / 10) * 5 + 10,
        Math.cos(i / 10) * 20
      ],
      scale: Math.random() * 2 + 1
    }));
  }, []);

  return (
    <>
      <group ref={particlesRef}>
        <Stars
          radius={100}
          depth={50}
          count={10000}
          factor={4}
          saturation={1}
          fade
          speed={0.5}
        />

        <Stars
          radius={50}
          depth={50}
          count={5000}
          factor={6}
          saturation={0}
          fade
          speed={1}
        />
      </group>

      <group ref={auroraRef}>
        {auroraParticles.map((particle, i) => (
          <mesh key={i} position={particle.position} scale={particle.scale}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "#4FD1C5" : "#90CDF4"}
              transparent
              opacity={0.3}
            />
          </mesh>
        ))}
      </group>
    </>
  );
};

const Scene = () => {
  const cloudRefs = useRef([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    cloudRefs.current.forEach((cloud, i) => {
      if (cloud) {
        cloud.position.x = Math.sin(time * 0.1 + i) * 10;
        cloud.position.z = Math.cos(time * 0.1 + i) * 10;
      }
    });
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#90CDF4" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4FD1C5" />

      <fog attach="fog" args={['#080C24', 5, 30]} />

      <Particles />

      {Array.from({ length: 5 }).map((_, i) => (
        <group
          key={i}
          position={[Math.sin(i) * 10, Math.cos(i) * 2 + 5, -10]}
          ref={el => cloudRefs.current[i] = el}
        >
          <Cloud
            opacity={0.5}
            speed={0.1}
            width={10}
            depth={1.5}
            segments={20}
          />
        </group>
      ))}

      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
};

const Hero = () => {
  return (
    <section id='home' className="h-screen w-full relative bg-gradient-to-b from-[#080C24] to-[#0A0E29] overflow-hidden">
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="md:w-1/2 text-left px-4 sm:px-0"
          >
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-200 via-cyan-300 to-blue-300">
                Hello, I'm karim ouiaboub
              </h1>
              <p className="text-xl sm:text-2xl text-cyan-200 mb-8">
                Full Stack Developer
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                onClick={() => {
                  const projectsSection = document.getElementById('projects'); 
                  if (projectsSection) {
                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View My Work
              </motion.button>

            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="md:w-1/2 mt-10 md:mt-0 relative px-4 sm:px-0"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto relative group"
            >
              <div className="absolute inset-0 bg-cyan-500 rounded-full opacity-20 blur-3xl group-hover:blur-4xl transition-all duration-300"></div>
              <div className="absolute inset-4 bg-blue-400 rounded-full opacity-20 blur-2xl group-hover:blur-3xl transition-all duration-300"></div>
              <img
                src="/profile.png"
                alt="Karim Ouiaboub"
                className="w-full h-full object-cover rounded-full border-8 border-cyan-500 transform transition-all duration-500 hover:border-blue-400 relative z-10 shadow-2xl"
              />

              <div className="absolute inset-0 border-8 border-cyan-400 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute -inset-2 border-4 border-blue-300 rounded-full opacity-30 animate-ping"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>

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


    </section>
  );
};

export default Hero;

