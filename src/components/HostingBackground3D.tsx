import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  Stars,
  Cloud,
  Trail,
  Float,
  Sphere,
  Grid,
  Text,
  Line,
  MeshTransmissionMaterial,
  MeshDistortMaterial,
  Billboard
} from '@react-three/drei';
import * as THREE from 'three';

// Server Rack Component
const ServerRack = ({ position = [0, 0, 0], scale = 1 }) => {
  const rackRef = useRef<THREE.Group>(null!);
  const [blinkingLights] = useState(() => 
    Array(8).fill(0).map(() => ({
      position: [
        (Math.random() - 0.5) * 0.8, 
        (Math.random() - 0.5) * 1.8, 
        0.26
      ],
      color: Math.random() > 0.5 ? '#00ff00' : '#ff9900',
      blinkSpeed: 0.5 + Math.random() * 2
    }))
  );
  
  useFrame(({ clock }) => {
    if (rackRef.current) {
      blinkingLights.forEach((light, index) => {
        const led = rackRef.current.children[index + 1];
        if (led && 'material' in led) {
          const material = (led as THREE.Mesh).material as THREE.MeshStandardMaterial;
          const blinkState = Math.sin(clock.getElapsedTime() * light.blinkSpeed) > 0;
          material.emissive = new THREE.Color(blinkState ? light.color : '#333333');
          material.emissiveIntensity = blinkState ? 2 : 0.1;
        }
      });
    }
  });

  return (
    <group position={position as [number, number, number]} scale={scale} ref={rackRef}>
      {/* Main rack body */}
      <mesh>
        <boxGeometry args={[1, 2, 0.5]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} metalness={0.8} />
      </mesh>
      
      {/* Blinking lights */}
      {blinkingLights.map((light, i) => (
        <mesh key={i} position={light.position as [number, number, number]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial 
            color="#ffffff" 
            emissive={light.color} 
            emissiveIntensity={2} 
          />
        </mesh>
      ))}
      
      {/* Server slots */}
      {Array(6).fill(0).map((_, i) => (
        <mesh key={`slot-${i}`} position={[0, 0.7 - i * 0.25, 0.26]}>
          <boxGeometry args={[0.9, 0.2, 0.05]} />
          <meshStandardMaterial color="#333333" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
};

// Globe Component
const Globe = ({ position = [0, 0, 0], scale = 1 }) => {
  const globeRef = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.Points>(null!);
  
  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = -clock.getElapsedTime() * 0.05;
    }
  });

  // Create network lines
  const networkLines: [number, number, number][][] = [];
  const lineCount = 12;
  for (let i = 0; i < lineCount; i++) {
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;
    const radius = 1.05;
    
    const x1 = radius * Math.sin(theta) * Math.cos(phi);
    const y1 = radius * Math.sin(theta) * Math.sin(phi);
    const z1 = radius * Math.cos(theta);
    
    const phi2 = Math.random() * Math.PI * 2;
    const theta2 = Math.random() * Math.PI;
    
    const x2 = radius * Math.sin(theta2) * Math.cos(phi2);
    const y2 = radius * Math.sin(theta2) * Math.sin(phi2);
    const z2 = radius * Math.cos(theta2);
    
    networkLines.push([[x1, y1, z1], [x2, y2, z2]] as [number, number, number][]);
  }

  // Create particles
  const particleCount = 200;
  const particlePositions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;
    const radius = 1.2 + Math.random() * 0.3;
    
    particlePositions[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
    particlePositions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
    particlePositions[i * 3 + 2] = radius * Math.cos(theta);
  }

  return (
    <group position={position as [number, number, number]} scale={scale}>
      {/* Globe sphere */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          roughness={0}
          transmission={1}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color={"#4060ff"}
          attenuationDistance={0.5}
        />
      </mesh>
      
      {/* Network lines */}
      {networkLines.map((line, i) => (
        <Line
          key={i}
          points={line}
          color="#4080ff"
          lineWidth={1}
        />
      ))}
      
      {/* Particles around globe */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#80a0ff"
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>
    </group>
  );
};

// Data Packet Component
const DataPacket = ({ 
  startPosition, 
  endPosition, 
  color = "#00ffff" 
}: {
  startPosition: [number, number, number],
  endPosition: [number, number, number],
  color?: string
}) => {
  const packetRef = useRef<THREE.Group>(null!);
  const [position, setPosition] = useState<[number, number, number]>([...startPosition] as [number, number, number]);
  const startPos = useRef<[number, number, number]>([...startPosition] as [number, number, number]);
  const endPos = useRef<[number, number, number]>([...endPosition] as [number, number, number]);
  const speed = useRef(0.5 + Math.random() * 0.5);
  const progress = useRef(0);
  
  useFrame(() => {
    progress.current += 0.01 * speed.current;
    
    if (progress.current >= 1) {
      progress.current = 0;
      // Swap start and end positions for continuous movement
      const temp = [...startPos.current] as [number, number, number];
      startPos.current = [...endPos.current] as [number, number, number];
      endPos.current = temp;
    }
    
    // Lerp between start and end positions
    const newPos: [number, number, number] = [
      startPos.current[0] + (endPos.current[0] - startPos.current[0]) * progress.current,
      startPos.current[1] + (endPos.current[1] - startPos.current[1]) * progress.current,
      startPos.current[2] + (endPos.current[2] - startPos.current[2]) * progress.current
    ];
    
    setPosition(newPos);
  });
  
  return (
    <group position={position} ref={packetRef}>
      <Trail
        width={0.2}
        length={8}
        color={color}
        attenuation={(t) => t * t}
      >
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </Trail>
    </group>
  );
};

// Main Component
interface HostingBackground3DProps {
  style?: React.CSSProperties;
}

const HostingBackground3D: React.FC<HostingBackground3DProps> = () => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.z = 10;
  }, [camera]);
  
  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4060ff" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Grid
        position={[0, -4, 0]}
        args={[20, 20]}
        cellSize={1}
        cellThickness={0.3}
        cellColor="#1e3a8a"
        sectionSize={3}
        sectionThickness={1}
        sectionColor="#2563eb"
        fadeDistance={30}
        infiniteGrid
      />
      
      {/* Server Racks */}
      <ServerRack position={[-4, -1, -2]} scale={1.2} />
      <ServerRack position={[-2.5, -1.5, -3]} scale={0.9} />
      <ServerRack position={[3, -2, -4]} scale={1.5} />
      
      {/* Globe */}
      <Globe position={[0, 1, -2]} scale={1.5} />
      
      {/* Cloud Servers */}
      <group position={[4, 2, -3]}>
        <Cloud
          opacity={0.8}
          speed={0.4}
          segments={20}
          color="#ffffff"
        />
        <Billboard>
          <Text
            color="#2563eb"
            fontSize={0.3}
            position={[0, 0, 0.5]}
            font="/fonts/inter-bold.woff"
          >
            CLOUD
          </Text>
        </Billboard>
      </group>
      
      <group position={[-4, 3, -5]}>
        <Cloud
          opacity={0.8}
          speed={0.3}
          segments={20}
          color="#ffffff"
        />
      </group>
      
      {/* Data Packets */}
      <DataPacket 
        startPosition={[-4, -1, -2]} 
        endPosition={[0, 1, -2]} 
        color="#00ffff"
      />
      <DataPacket 
        startPosition={[3, -2, -4]} 
        endPosition={[0, 1, -2]} 
        color="#ff00ff"
      />
      <DataPacket 
        startPosition={[4, 2, -3]} 
        endPosition={[0, 1, -2]} 
        color="#ffaa00"
      />
      
      {/* Floating Elements */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere position={[-2, 3, -4]} args={[0.5, 32, 32]}>
          <MeshDistortMaterial
            color="#4060ff"
            distort={0.4}
            speed={2}
            roughness={0}
            metalness={0.8}
          />
        </Sphere>
      </Float>
    </group>
  );
};

export default HostingBackground3D;
