import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeJSLoading = () => {
  const mountRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [textPhase, setTextPhase] = useState(0); // 0: HAMZA, 1: AMEJOUDJ, 2: DÉVELOPPEUR FULL STACK
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const texts = ['HAMZA', 'AMEJOUDJ', 'FULL STACK DEVELOPER'];
  const phases = [
    "System initialization",
    "Secure connection",
    "Loading modules", 
    "Finalization",
    "Ready"
  ];

  // Typewriter effect for text animation
  useEffect(() => {
    const currentText = texts[textPhase];
    
    if (isTyping) {
      if (displayText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        // Text fully typed, wait then start erasing
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        // Text fully erased, move to next text
        setTextPhase((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, textPhase, texts]);

  // Progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 2.5 + 0.5;
        
        if (newProgress >= 100) {
          setIsComplete(true);
          clearInterval(interval);
          return 100;
        }
        
        const newPhase = Math.floor((newProgress / 100) * (phases.length - 1));
        setPhase(newPhase);
        
        return newProgress;
      });
    }, 80);
    
    return () => clearInterval(interval);
  }, []);

  // Reset after completion
  useEffect(() => {
    if (isComplete) {
      const resetTimeout = setTimeout(() => {
        setProgress(0);
        setPhase(0);
        setIsComplete(false);
      }, 2000);
      return () => clearTimeout(resetTimeout);
    }
  }, [isComplete]);

  // Three.js background effect
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000b24, 0.0015);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    camera.position.y = 0;
    camera.lookAt(0, 0, 0);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000518, 1);
    
    mountRef.current.appendChild(renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0x0a1a4a, 0.3);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x4d88ff, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x00c6ff, 3, 100);
    pointLight.position.set(-10, 15, 10);
    scene.add(pointLight);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 6000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 80 * (0.5 + Math.random() * 0.5);
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial1 = new THREE.PointsMaterial({
      size: 0.12,
      color: 0x4fb8ff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMaterial2 = new THREE.PointsMaterial({
      size: 0.2,
      color: 0x0a84ff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh1 = new THREE.Points(particlesGeometry, particlesMaterial1);
    const particlesMesh2 = new THREE.Points(particlesGeometry.clone(), particlesMaterial2);
    
    particlesMesh2.position.set(8, -8, 8);
    
    scene.add(particlesMesh1);
    scene.add(particlesMesh2);
    
    // Stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1500;
    
    const starsPositions = new Float32Array(starsCount * 3);
    const starsSizes = new Float32Array(starsCount);
    
    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      const radius = 60 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      starsPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      starsPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starsPositions[i3 + 2] = radius * Math.cos(phi);
      
      starsSizes[i] = Math.random() * 1.2 + 0.4;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(starsSizes, 1));
    
    const starsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: null }
      },
      vertexShader: `
        attribute float size;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        void main() {
          float distance = length(gl_PointCoord - vec2(0.5, 0.5));
          if (distance > 0.5) discard;
          float brightness = 1.0 - smoothstep(0.1, 0.5, distance);
          gl_FragColor = vec4(1.0, 1.0, 1.0, brightness);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    
    const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsMesh);
    
    // Glowing orbs
    const createGlowingOrb = (color, radius, position) => {
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.7,
        transparent: true,
        opacity: 0.7,
        shininess: 50
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(...position);
      scene.add(sphere);
      
      sphere.userData = { 
        pulseSpeed: 0.15 + Math.random() * 0.25,
        pulseMin: 0.8,
        pulseMax: 1.1
      };
      
      return sphere;
    };
    
    const orb1 = createGlowingOrb(0x0a47b8, 1.5, [-10, 4, -8]);
    const orb2 = createGlowingOrb(0x00a3ff, 1, [10, -2, -4]);
    const orb3 = createGlowingOrb(0x00c6ff, 1.2, [6, 6, -12]);
    
    // Network lines
    const linesMaterial = new THREE.LineBasicMaterial({ 
      color: 0x4a88ff,
      transparent: true,
      opacity: 0.2,
      linewidth: 1
    });
    
    const createNetworkLines = () => {
      const linesGroup = new THREE.Group();
      
      for (let i = 0; i < 20; i++) {
        const lineGeometry = new THREE.BufferGeometry();
        const points = [];
        
        const centerX = (Math.random() - 0.5) * 25;
        const centerY = (Math.random() - 0.5) * 25;
        const centerZ = (Math.random() - 0.5) * 25;
        
        const branches = 2 + Math.floor(Math.random() * 3);
        
        for (let j = 0; j < branches; j++) {
          const endX = centerX + (Math.random() - 0.5) * 20;
          const endY = centerY + (Math.random() - 0.5) * 20;
          const endZ = centerZ + (Math.random() - 0.5) * 20;
          
          points.push(new THREE.Vector3(centerX, centerY, centerZ));
          points.push(new THREE.Vector3(endX, endY, endZ));
        }
        
        lineGeometry.setFromPoints(points);
        const line = new THREE.Line(lineGeometry, linesMaterial);
        linesGroup.add(line);
      }
      
      return linesGroup;
    };
    
    const networkLines = createNetworkLines();
    scene.add(networkLines);
    
    // Mouse handlers
    const handleMouseMove = (event) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        mousePosition.current = {
          x: (event.touches[0].clientX / window.innerWidth) * 2 - 1,
          y: -(event.touches[0].clientY / window.innerHeight) * 2 + 1
        };
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Particle rotations
      particlesMesh1.rotation.x += 0.0006;
      particlesMesh1.rotation.y += 0.0004;
      
      particlesMesh2.rotation.x -= 0.0004;
      particlesMesh2.rotation.y -= 0.0006;
      
      // Stars rotation
      starsMesh.rotation.y += 0.0001;
      starsMesh.rotation.x += 0.00005;
      
      // Orb animations
      const time = Date.now() * 0.001;
      
      orb1.position.y = 4 + Math.sin(time * 0.4) * 2;
      orb2.position.x = 10 + Math.cos(time * 0.3) * 3;
      orb3.position.z = -12 + Math.sin(time * 0.25) * 2;
      
      [orb1, orb2, orb3].forEach(orb => {
        const pulse = orb.userData;
        const scale = pulse.pulseMin + (Math.sin(time * pulse.pulseSpeed) * 0.5 + 0.5) * 
                      (pulse.pulseMax - pulse.pulseMin);
        orb.scale.set(scale, scale, scale);
        orb.material.emissiveIntensity = 0.4 + Math.sin(time * pulse.pulseSpeed) * 0.3;
      });
      
      // Network rotation
      networkLines.rotation.y += 0.0003;
      networkLines.rotation.x += 0.0001;
      
      // Mouse interaction
      const targetX = mousePosition.current.x * 2;
      const targetY = mousePosition.current.y * 1.5;
      
      camera.position.x += (targetX - camera.position.x) * 0.015;
      camera.position.y += (targetY - camera.position.y) * 0.015;
      camera.lookAt(scene.position);
      
      particlesMesh1.rotation.x += (targetY * 0.0003);
      particlesMesh1.rotation.y += (targetX * 0.0003);
      
      particlesMesh2.rotation.x -= (targetY * 0.0002);
      particlesMesh2.rotation.y -= (targetX * 0.0002);
      
      networkLines.rotation.x += (targetY * 0.00008);
      networkLines.rotation.y += (targetX * 0.00008);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Resize handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      particlesGeometry.dispose();
      particlesMaterial1.dispose();
      particlesMaterial2.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Three.js Background */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0"
        style={{ cursor: 'default' }}
      />
      
      {/* Loading Interface Overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center relative">
          
          {/* Central Loading Ring */}
          <div className="relative mb-16">
            <div className="relative">
              {/* Outer rotating ring */}
              <div 
                className="w-32 h-32 border-2 border-blue-400/30 rounded-full animate-spin"
                style={{ animationDuration: '4s' }}
              >
                <div className="absolute top-0 left-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-transparent transform -translate-x-1/2 -translate-y-1" />
                <div className="absolute bottom-0 left-1/2 w-1 h-8 bg-gradient-to-t from-blue-400 to-transparent transform -translate-x-1/2 translate-y-1" />
              </div>
              
              {/* Inner pulsing ring */}
              <div className="absolute inset-4 border border-cyan-400/50 rounded-full animate-pulse" />
              
              {/* Center logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 backdrop-blur-sm">
                  <span className="text-3xl font-bold text-white drop-shadow-lg">H</span>
                </div>
              </div>
              
              {/* Orbital particles */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: '0 0',
                    transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateX(70px)`,
                    animation: `orbit ${6 + i * 0.3}s linear infinite`
                  }}
                />
              ))}
            </div>
          </div>

          {/* HAMZA Text with Typewriter Effect */}
          <div className="mb-12 h-20 flex items-center justify-center">
            <div className="relative">
              <h1 className={`text-7xl font-extrabold text-transparent bg-clip-text tracking-widest drop-shadow-2xl min-h-[1.2em] flex items-center justify-center transition-all duration-500 ${
                textPhase === 0 
                  ? 'bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-400' // HAMZA - vert/teal
                  : textPhase === 1 
                  ? 'bg-gradient-to-r from-purple-300 via-violet-300 to-indigo-400' // AMEJOUDJ - violet/purple
                  : 'bg-gradient-to-r from-orange-300 via-amber-300 to-yellow-400' // DÉVELOPPEUR - orange/jaune
              }`}>
                {displayText}
                <span 
                  className={`ml-1 w-1 animate-pulse ${
                    textPhase === 0 
                      ? 'bg-teal-400' 
                      : textPhase === 1 
                      ? 'bg-violet-400' 
                      : 'bg-amber-400'
                  }`}
                  style={{ 
                    height: '0.8em',
                    opacity: isTyping || displayText.length === 0 ? 1 : 0,
                    transition: 'opacity 0.3s'
                  }}
                />
              </h1>
              
              {/* Subtle glow effect behind text */}
              <div 
                className={`absolute inset-0 text-7xl font-extrabold tracking-widest blur-sm transition-all duration-500 ${
                  textPhase === 0 
                    ? 'text-teal-400/20' 
                    : textPhase === 1 
                    ? 'text-violet-400/20' 
                    : 'text-amber-400/20'
                }`}
                style={{ 
                  zIndex: -1,
                  transform: 'scale(1.05)'
                }}
              >
                {displayText}
              </div>
            </div>
            
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4">
              <div className={`h-px w-48 bg-gradient-to-r from-transparent to-transparent opacity-60 transition-all duration-500 ${
                textPhase === 0 
                  ? 'via-teal-400' 
                  : textPhase === 1 
                  ? 'via-violet-400' 
                  : 'via-amber-400'
              }`} />
            </div>
          </div>

          {/* Modern Progress Section */}
          <div className="w-96 max-w-sm mx-auto mb-10">
            <div className="flex justify-between text-sm text-blue-200/80 mb-4 font-medium">
              <span>{phases[phase]}</span>
              <span className="font-mono text-cyan-300">{Math.round(progress)}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="relative">
              <div className="h-2 bg-slate-800/50 backdrop-blur-sm rounded-full overflow-hidden border border-blue-500/20">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-full transition-all duration-300 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                  <div 
                    className="absolute right-0 top-1/2 w-4 h-4 bg-cyan-400 rounded-full transform -translate-y-1/2 translate-x-2 shadow-lg shadow-cyan-400/50"
                    style={{ 
                      opacity: progress > 0 ? 1 : 0,
                      animation: 'pulse 2s ease-in-out infinite'
                    }}
                  />
                </div>
              </div>
              
              {/* Progress Markers */}
              <div className="flex justify-between absolute -top-2 w-full">
                {[0, 25, 50, 75, 100].map((point, i) => (
                  <div 
                    key={i}
                    className={`w-1.5 h-6 rounded-full transition-all duration-500 ${
                      progress >= point 
                        ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' 
                        : 'bg-slate-600/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>



          {/* Completion Message */}
          {isComplete && (
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="px-6 py-3 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl">
                <div className="flex items-center space-x-3 text-green-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Developer profile loaded successfully</span>
                </div>
              </div>
            </div>
          )}

          {/* Text Indicator Dots */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {texts.map((_, i) => (
              <div key={i} className="flex flex-col items-center space-y-2">
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    i === textPhase 
                      ? i === 0 
                        ? 'bg-teal-400 shadow-lg shadow-teal-400/50 animate-pulse' 
                        : i === 1 
                        ? 'bg-violet-400 shadow-lg shadow-violet-400/50 animate-pulse' 
                        : 'bg-amber-400 shadow-lg shadow-amber-400/50 animate-pulse'
                      : 'bg-slate-600/50'
                  }`}
                />
                <span className={`text-xs transition-all duration-300 ${
                  i === textPhase 
                    ? i === 0 
                      ? 'text-teal-300' 
                      : i === 1 
                      ? 'text-violet-300' 
                      : 'text-amber-300'
                    : 'text-slate-500'
                }`}>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(70px); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(70px); }
        }
      `}</style>
    </div>
  );
};

export default ThreeJSLoading;