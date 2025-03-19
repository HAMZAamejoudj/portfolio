import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeJSBackground = () => {
  const mountRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000b24, 0.0015); // Deeper blue fog, slightly denser
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15; // Moved closer for more immersive feel
    camera.position.y = 0; // Centered vertically
    camera.lookAt(0, 0, 0);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance' // Better performance
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000518, 1); // Deeper, more dramatic blue
    
    // Append the renderer's DOM element
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }
    
    // Lights - simplified but more dramatic
    const ambientLight = new THREE.AmbientLight(0x0a1a4a, 0.3); // Dimmer ambient light
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x4d88ff, 1.5); // Brighter directional light
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x00c6ff, 3, 100); // More intense point light
    pointLight.position.set(-10, 15, 10);
    scene.add(pointLight);
    
    // Create particles - more of them for a denser effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 8000; // Increased from 5000
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      // Random positions in a sphere with concentration toward center
      posArray[i] = (Math.random() - 0.5) * 100 * (0.5 + Math.random() * 0.5);
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Materials with more vibrant blue hues for particles
    const particlesMaterial1 = new THREE.PointsMaterial({
      size: 0.15, // Slightly larger
      color: 0x4fb8ff, // Brighter blue
      transparent: true,
      opacity: 0.9, // More visible
      blending: THREE.AdditiveBlending
    });
    
    const particlesMaterial2 = new THREE.PointsMaterial({
      size: 0.25, // Larger points
      color: 0x0a84ff,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    
    // Create particle systems
    const particlesMesh1 = new THREE.Points(particlesGeometry, particlesMaterial1);
    const particlesMesh2 = new THREE.Points(particlesGeometry.clone(), particlesMaterial2);
    
    particlesMesh2.position.set(10, -10, 10);
    
    scene.add(particlesMesh1);
    scene.add(particlesMesh2);
    
    // ADD STARS
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 2000;
    
    const starsPositions = new Float32Array(starsCount * 3);
    const starsSizes = new Float32Array(starsCount);
    
    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      // Place stars further away in a sphere
      const radius = 80 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      starsPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      starsPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starsPositions[i3 + 2] = radius * Math.cos(phi);
      
      // Vary star sizes
      starsSizes[i] = Math.random() * 1.5 + 0.5;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(starsSizes, 1));
    
    // Star shader material for more realistic stars
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
    
    // Create more stunning glowing orbs
    const createGlowingOrb = (color, radius, position) => {
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.8, // More glow
        transparent: true,
        opacity: 0.8, // More visible
        shininess: 50 // More shine
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(...position);
      scene.add(sphere);
      
      // Add a subtle pulse effect
      sphere.userData = { 
        pulseSpeed: 0.2 + Math.random() * 0.3,
        pulseMin: 0.7,
        pulseMax: 1.0
      };
      
      return sphere;
    };
    
    // Create fewer but more impactful orbs
    const orb1 = createGlowingOrb(0x0a47b8, 2, [-12, 5, -10]);
    const orb2 = createGlowingOrb(0x00a3ff, 1.2, [12, -3, -5]);
    const orb3 = createGlowingOrb(0x00c6ff, 1.5, [8, 8, -15]);
    
    // Create a network of lines connecting some particles - more dramatic
    const linesMaterial = new THREE.LineBasicMaterial({ 
      color: 0x4a88ff,
      transparent: true,
      opacity: 0.25, // More visible
      linewidth: 1
    });
    
    // Generate random lines - more structured pattern
    const createNetworkLines = () => {
      const linesGroup = new THREE.Group();
      
      // Create a more structured network
      for (let i = 0; i < 30; i++) {
        const lineGeometry = new THREE.BufferGeometry();
        const points = [];
        
        // Create a central point
        const centerX = (Math.random() - 0.5) * 30;
        const centerY = (Math.random() - 0.5) * 30;
        const centerZ = (Math.random() - 0.5) * 30;
        
        // Create 3-5 points branching from the center
        const branches = 3 + Math.floor(Math.random() * 3);
        
        for (let j = 0; j < branches; j++) {
          const endX = centerX + (Math.random() - 0.5) * 25;
          const endY = centerY + (Math.random() - 0.5) * 25;
          const endZ = centerZ + (Math.random() - 0.5) * 25;
          
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
    
    // Mouse movement handler
    const handleMouseMove = (event) => {
      // Calculate normalized device coordinates (-1 to +1)
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // For touch devices
    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        mousePosition.current = {
          x: (event.touches[0].clientX / window.innerWidth) * 2 - 1,
          y: -(event.touches[0].clientY / window.innerHeight) * 2 + 1
        };
      }
    };
    
    window.addEventListener('touchmove', handleTouchMove);
    
    // Animation loop with more dynamic movement
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate particle systems - slightly faster
      particlesMesh1.rotation.x += 0.0008;
      particlesMesh1.rotation.y += 0.0005;
      
      particlesMesh2.rotation.x -= 0.0005;
      particlesMesh2.rotation.y -= 0.0008;
      
      // Stars gentle rotation
      starsMesh.rotation.y += 0.0001;
      starsMesh.rotation.x += 0.00005;
      
      // Move orbs in more dynamic patterns
      const time = Date.now() * 0.001;
      
      // More dramatic orb movement
      orb1.position.y = 5 + Math.sin(time * 0.5) * 3;
      orb2.position.x = 12 + Math.cos(time * 0.4) * 4;
      orb3.position.z = -15 + Math.sin(time * 0.3) * 3;
      
      // Pulse effect for orbs
      [orb1, orb2, orb3].forEach(orb => {
        const pulse = orb.userData;
        const scale = pulse.pulseMin + (Math.sin(time * pulse.pulseSpeed) * 0.5 + 0.5) * 
                      (pulse.pulseMax - pulse.pulseMin);
        orb.scale.set(scale, scale, scale);
        
        // Also pulse the emissive intensity
        orb.material.emissiveIntensity = 0.5 + Math.sin(time * pulse.pulseSpeed) * 0.3;
      });
      
      // More dynamic network rotation
      networkLines.rotation.y += 0.0005;
      networkLines.rotation.x += 0.0002;
      
      // Mouse-driven camera and scene adjustments
      const targetX = mousePosition.current.x * 3;
      const targetY = mousePosition.current.y * 2;
      
      // Smooth camera movement towards mouse position
      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (targetY - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      
      // Particles follow mouse with a delay
      particlesMesh1.rotation.x += (targetY * 0.0005);
      particlesMesh1.rotation.y += (targetX * 0.0005);
      
      particlesMesh2.rotation.x -= (targetY * 0.0003);
      particlesMesh2.rotation.y -= (targetX * 0.0003);
      
      // Network lines follow mouse
      networkLines.rotation.x += (targetY * 0.0001);
      networkLines.rotation.y += (targetX * 0.0001);
      
      // Render scene
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of geometries and materials
      particlesGeometry.dispose();
      particlesMaterial1.dispose();
      particlesMaterial2.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
    };
  }, []);
  
  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden', // Prevent scrollbars
        cursor: 'default' // Use default cursor to encourage movement
      }}
    />
  );
};

export default ThreeJSBackground;