import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Float, 
  MeshTransmissionMaterial,
  MeshDistortMaterial,
  Environment,
  Sphere,
  Box,
  Torus,
  Cloud,
  Stars,
  Trail,
  EffectComposer,
  Bloom,
  ChromaticAberration,
  GodRays
} from '@react-three/drei';
import * as THREE from 'three';

// Server rack component with enhanced details
const ServerRack = ({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const rackLights = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    
    // Animate server lights
    if (rackLights.current) {
      rackLights.current.children.forEach((light, i) => {
        // Random blinking effect
        if (Math.random() > 0.995) {
          light.material.emissiveIntensity = Math.random() * 3 + 1;
          setTimeout(() => {
            if (light.material) light.material.emissiveIntensity = 2;
          }, 100);
        }
      });
    }
  });

  return (
    <group position={position as [number, number, number]} rotation={rotation as [number, number, number]} scale={scale}>
      <mesh ref={mesh} castShadow receiveShadow>
        <boxGeometry args={[1, 2, 0.5]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        
        {/* Server details */}
        <mesh position={[0, 0, 0.26]}>
          <boxGeometry args={[0.9, 1.9, 0.01]} />
          <meshStandardMaterial color="#111111" metalness={0.7} roughness={0.2} />
        </mesh>
        
        {/* Server lights */}
        <group ref={rackLights}>
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={i} position={[0, 0.7 - i * 0.2, 0.26]}>
              <boxGeometry args={[0.8, 0.05, 0.01]} />
              <meshStandardMaterial 
                color={Math.random() > 0.7 ? "#10b981" : "#2563eb"} 
                emissive={Math.random() > 0.7 ? "#10b981" : "#2563eb"} 
                emissiveIntensity={2}
              />
            </mesh>
          ))}
        </group>
      </mesh>
    </group>
  );
};

// Enhanced Globe component with particle effects
const Globe = ({ position = [0, 0, 0], scale = 1 }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.Points>(null!);
  
  // Create particles around the globe
  const particles = useMemo(() => {
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.2 + Math.random() * 0.3;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    return positions;
  }, []);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += 0.003;
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= 0.001;
      particlesRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <group position={position as [number, number, number]} scale={scale}>
      <mesh ref={mesh} castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial 
          backside={false}
          samples={8}
          thickness={0.5}
          roughness={0.05}
          transmission={0.95}
          clearcoat={0.3}
          clearcoatRoughness={0.1}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.2}
          temporalDistortion={0.1}
          color="#2563eb"
        />
      </mesh>
      
      {/* Network lines around the globe */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} position={[0, 0, 0]} rotation={[0, Math.PI / 6 * i, Math.random() * Math.PI]}>
          <torusGeometry args={[1.02, 0.01, 16, 100, Math.PI * 2]} />
          <meshStandardMaterial 
            color="#10b981" 
            emissive="#10b981" 
            emissiveIntensity={3} 
            transparent 
            opacity={0.7} 
          />
        </mesh>
      ))}
      
      {/* Particles around the globe */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#10b981"
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>
    </group>
  );
};

// Enhanced data packets with trails
const DataPacket = ({ startPosition, endPosition, speed = 1, color = "#10b981" }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  const [progress, setProgress] = useState(0);
  
  useFrame(() => {
    setProgress((prev) => {
      const newProgress = prev + 0.01 * speed;
      return newProgress > 1 ? 0 : newProgress;
    });
  });

  const position = [
    startPosition[0] + (endPosition[0] - startPosition[0]) * progress,
    startPosition[1] + (endPosition[1] - startPosition[1]) * progress,
    startPosition[2] + (endPosition[2] - startPosition[2]) * progress,
  ];

  return (
    <Trail
      width={0.2}
      length={8}
      color={color}
      attenuation={(t) => t * t}
      opacity={0.6}
    >
      <mesh ref={mesh} position={position as [number, number, number]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={3} 
        />
      </mesh>
    </Trail>
  );
};

// Enhanced cloud server with more details
const CloudServer = ({ position = [0, 0, 0], scale = 1 }) => {
  return (
    <group position={position as [number, number, number]} scale={scale}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Cloud 
          opacity={0.6}
          speed={0.4}
          width={3}
          depth={1.5}
          segments={20}
          color="#f0f0f0"
        />
        
        {/* Server in the cloud */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial 
            color="#2563eb" 
            metalness={0.7} 
            roughness={0.2}
            emissive="#2563eb"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Connection points */}
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (Math.PI * 2 / 4) * i;
          const x = Math.cos(angle) * 0.8;
          const z = Math.sin(angle) * 0.8;
          
          return (
            <mesh key={i} position={[x, 0, z]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial 
                color="#10b981" 
                emissive="#10b981" 
                emissiveIntensity={2} 
              />
            </mesh>
          );
        })}
      </Float>
    </group>
  );
};

// Grid lines
const GridLines = () => {
  const { scene } = useThree();
  
  useEffect(() => {
    const size = 40;
    const divisions = 40;
    const gridHelper = new THREE.GridHelper(size, divisions, 0x2563eb, 0x2563eb);
    gridHelper.position.y = -5;
    gridHelper.material.opacity = 0.15;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);
    
    return () => {
      scene.remove(gridHelper);
    };
  }, [scene]);
  
  return null;
};

// Main component with enhanced effects
const HostingBackground3D = ({ style = {} }: { style?: React.CSSProperties }) => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, ...style }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} shadows>
        <fog attach="fog" args={['#f0f0f0', 15, 35]} />
        <color attach="background" args={['#f8fafc']} />
        
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow shadow-mapSize={2048} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <pointLight position={[0, 5, 0]} intensity={0.8} color="#10b981" />
        <pointLight position={[-5, -2, 0]} intensity={0.5} color="#2563eb" />
        
        <GridLines />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        
        {/* Server racks */}
        <ServerRack position={[-5, -2, 0]} scale={1.2} />
        <ServerRack position={[-6, -2, 1]} scale={1} />
        <ServerRack position={[-4, -2, 1]} scale={1.1} />
        
        {/* Globe representing global network */}
        <Globe position={[5, 0, -2]} scale={2} />
        
        {/* Cloud servers */}
        <CloudServer position={[0, 3, 0]} scale={1} />
        <CloudServer position={[2, 4, -2]} scale={0.8} />
        <CloudServer position={[-2, 3.5, -1]} scale={0.7} />
        
        {/* Data packets moving across the network */}
        <DataPacket startPosition={[-5, -1, 0]} endPosition={[0, 3, 0]} speed={0.8} color="#2563eb" />
        <DataPacket startPosition={[0, 3, 0]} endPosition={[5, 0, -2]} speed={1.2} color="#10b981" />
        <DataPacket startPosition={[5, 0, -2]} endPosition={[-5, -1, 0]} speed={1} color="#8b5cf6" />
        <DataPacket startPosition={[-4, -2, 1]} endPosition={[2, 4, -2]} speed={0.9} color="#2563eb" />
        <DataPacket startPosition={[2, 4, -2]} endPosition={[-2, 3.5, -1]} speed={1.1} color="#10b981" />
        <DataPacket startPosition={[-6, -1, 1]} endPosition={[5, 1, -2]} speed={1.3} color="#f59e0b" />
        
        {/* Floating elements */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Torus position={[-8, 4, -5]} args={[1, 0.2, 16, 32]}>
            <MeshDistortMaterial color="#8b5cf6" speed={2} distort={0.3} />
          </Torus>
        </Float>
        
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
          <Box position={[8, 3, -6]} args={[1, 1, 1]}>
            <MeshDistortMaterial color="#2563eb" speed={1.5} distort={0.2} />
          </Box>
        </Float>
        
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4}>
          <Sphere position={[-7, -3, -4]} args={[0.7, 32, 32]}>
            <MeshDistortMaterial color="#10b981" speed={1.8} distort={0.4} />
          </Sphere>
        </Float>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
        
        <Environment preset="city" />
        
        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            intensity={0.8}
          />
          <ChromaticAberration offset={[0.0005, 0.0005]} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default HostingBackground3D;
