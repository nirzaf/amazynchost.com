import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Line as ThreeLine, 
  Trail, 
  Stars
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
        <boxGeometry args={[2, 3, 0.5]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Blinking LEDs */}
      {blinkingLights.map((light, index) => (
        <mesh key={index} position={light.position as [number, number, number]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial 
            color="#333333" 
            emissive={light.color} 
            emissiveIntensity={0.5} 
          />
        </mesh>
      ))}
      
      {/* Server slots */}
      {Array(5).fill(0).map((_, index) => (
        <mesh key={`slot-${index}`} position={[0, 1 - index * 0.5, 0.26]}>
          <boxGeometry args={[1.8, 0.4, 0.05]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
};

// Globe Component
const Globe = ({ position = [0, 0, 0], scale = 1 }) => {
  const globeRef = useRef<THREE.Mesh>(null!);
  const [points] = useState(() => {
    return Array(20).fill(0).map(() => ({
      lat: (Math.random() - 0.5) * Math.PI,
      lng: (Math.random() - 0.5) * Math.PI * 2,
      color: ['#2563eb', '#0284c7', '#0ea5e9'][Math.floor(Math.random() * 3)]
    }));
  });
  
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });
  
  return (
    <group position={position as [number, number, number]} scale={scale}>
      <mesh ref={globeRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color="#1e40af" 
          metalness={0.3}
          roughness={0.7}
          opacity={0.9}
          transparent={true}
        />
      </mesh>
      
      {/* Connection points */}
      {points.map((point, i) => (
        <mesh 
          key={i}
          position={[
            Math.cos(point.lat) * Math.cos(point.lng) * 1.01,
            Math.sin(point.lat) * 1.01,
            Math.cos(point.lat) * Math.sin(point.lng) * 1.01
          ]}
        >
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshBasicMaterial color={point.color} />
        </mesh>
      ))}
      
      {/* Connection lines */}
      {points.slice(0, 10).map((point, i) => {
        const nextPoint = points[(i + 1) % points.length];
        const start = new THREE.Vector3(
          Math.cos(point.lat) * Math.cos(point.lng) * 1.01,
          Math.sin(point.lat) * 1.01,
          Math.cos(point.lat) * Math.sin(point.lng) * 1.01
        );
        const end = new THREE.Vector3(
          Math.cos(nextPoint.lat) * Math.cos(nextPoint.lng) * 1.01,
          Math.sin(nextPoint.lat) * 1.01,
          Math.cos(nextPoint.lat) * Math.sin(nextPoint.lng) * 1.01
        );
        
        return (
          <ThreeLine
            key={`line-${i}`}
            points={[start, end]}
            color={point.color}
            lineWidth={1}
            opacity={0.5}
            transparent
          />
        );
      })}
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
  const packetRef = useRef<THREE.Mesh>(null!);
  const [progress, setProgress] = useState(0);
  
  useFrame(({ clock }) => {
    if (packetRef.current) {
      // Calculate position along the path
      const newProgress = (Math.sin(clock.getElapsedTime() * 0.5) + 1) / 2;
      setProgress(newProgress);
      
      // Update position
      packetRef.current.position.x = startPosition[0] + (endPosition[0] - startPosition[0]) * progress;
      packetRef.current.position.y = startPosition[1] + (endPosition[1] - startPosition[1]) * progress;
      packetRef.current.position.z = startPosition[2] + (endPosition[2] - startPosition[2]) * progress;
      
      // Rotate the packet
      packetRef.current.rotation.x += 0.02;
      packetRef.current.rotation.y += 0.02;
    }
  });
  
  return (
    <>
      <Trail 
        width={0.5} 
        color={color} 
        length={5} 
        decay={1} 
        attenuation={(width) => width}
      >
        <mesh ref={packetRef}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={0.5} 
          />
        </mesh>
      </Trail>
      
      {/* Connection line */}
      <ThreeLine
        points={[
          new THREE.Vector3(...startPosition),
          new THREE.Vector3(...endPosition)
        ]}
        color={color}
        lineWidth={0.5}
        opacity={0.2}
        transparent
      />
    </>
  );
};

// Cloud Component
const Cloud = ({ position = [0, 0, 0], scale = 1 }) => {
  const cloudRef = useRef<THREE.Group>(null!);
  
  useFrame(({ clock }) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
      cloudRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }
  });
  
  return (
    <group position={position as [number, number, number]} scale={scale} ref={cloudRef}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="white" opacity={0.8} transparent />
      </mesh>
      <mesh position={[0.6, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="white" opacity={0.8} transparent />
      </mesh>
      <mesh position={[-0.6, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="white" opacity={0.8} transparent />
      </mesh>
      <mesh position={[0, 0, 0.6]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="white" opacity={0.8} transparent />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="white" opacity={0.8} transparent />
      </mesh>
    </group>
  );
};

// Data Transmission Effect Component
const DataTransmission = ({ 
  start, 
  end, 
  speed = 1, 
  color = "#00ffff", 
  size = 0.05 
}: {
  start: [number, number, number],
  end: [number, number, number],
  speed?: number,
  color?: string,
  size?: number
}) => {
  const particleRef = useRef<THREE.Mesh>(null!);
  const [active, setActive] = useState(true);
  const [progress, setProgress] = useState(0);
  
  useFrame(({ clock }) => {
    if (particleRef.current && active) {
      // Update progress
      const newProgress = progress + 0.01 * speed;
      
      if (newProgress >= 1) {
        setActive(false);
        setTimeout(() => {
          setProgress(0);
          setActive(true);
        }, 1000 + Math.random() * 2000); // Random delay before restarting
      } else {
        setProgress(newProgress);
      }
      
      // Interpolate position
      particleRef.current.position.x = start[0] + (end[0] - start[0]) * progress;
      particleRef.current.position.y = start[1] + (end[1] - start[1]) * progress;
      particleRef.current.position.z = start[2] + (end[2] - start[2]) * progress;
      
      // Pulse effect
      const material = particleRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = Math.sin(clock.getElapsedTime() * 10) * 0.5 + 0.5;
    }
  });
  
  return (
    <mesh ref={particleRef} position={[start[0], start[1], start[2]]} visible={active}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
};

// Satellite Component
const Satellite = ({ 
  orbitRadius = 4, 
  orbitSpeed = 0.2, 
  orbitAngle = 0,
  connectToGlobe = false,
  globePosition = [-5, 0, -2] as [number, number, number]
}) => {
  const satelliteRef = useRef<THREE.Group>(null!);
  const signalRef = useRef<THREE.Mesh>(null!);
  const connectionRef = useRef<THREE.Line>(null!);
  const [initialAngle] = useState(orbitAngle);
  const [showConnection, setShowConnection] = useState(false);
  const [satellitePosition, setSatellitePosition] = useState<[number, number, number]>([orbitRadius, 0, 0]);
  
  // Create orbit path points
  const orbitPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * orbitRadius,
          Math.sin(angle) * orbitRadius * 0.4, // Elliptical orbit
          0
        )
      );
    }
    return points;
  }, [orbitRadius]);
  
  useFrame(({ clock }) => {
    if (satelliteRef.current) {
      const time = clock.getElapsedTime();
      const angle = initialAngle + time * orbitSpeed;
      
      // Position satellite along orbit path
      const satX = Math.cos(angle) * orbitRadius;
      const satY = Math.sin(angle) * orbitRadius * 0.4;
      satelliteRef.current.position.x = satX;
      satelliteRef.current.position.y = satY;
      
      // Update satellite position for data transmission
      setSatellitePosition([satX, satY, 0]);
      
      // Rotate satellite to face direction of travel
      satelliteRef.current.rotation.z = angle + Math.PI / 2;
      
      // Subtle wobble
      satelliteRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      
      // Blinking signal effect
      if (signalRef.current) {
        const material = signalRef.current.material as THREE.MeshBasicMaterial;
        const blinkState = Math.sin(time * 3) > 0.7;
        material.opacity = blinkState ? 1 : 0.2;
        
        // Signal pulse effect
        if (blinkState && time % 4 < 0.1) {
          // Create signal pulse
          const pulseGeometry = new THREE.RingGeometry(0.05, 0.1, 16);
          const pulseMaterial = new THREE.MeshBasicMaterial({
            color: '#ff0000',
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
          });
          
          const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
          pulse.position.copy(signalRef.current.position);
          pulse.rotation.x = Math.PI / 2;
          satelliteRef.current.add(pulse);
          
          // Animate and remove pulse
          const startTime = time;
          const animatePulse = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            if (elapsed > 1) {
              satelliteRef.current.remove(pulse);
              pulse.geometry.dispose();
              (pulse.material as THREE.Material).dispose();
              return;
            }
            
            const scale = 1 + elapsed * 3;
            pulse.scale.set(scale, scale, scale);
            (pulse.material as THREE.MeshBasicMaterial).opacity = 0.8 - elapsed * 0.8;
            
            requestAnimationFrame(() => animatePulse(clock.getElapsedTime()));
          };
          
          requestAnimationFrame(() => animatePulse(time));
        }
      }
      
      // Globe connection effect
      if (connectToGlobe && connectionRef.current) {
        // Periodically show connection to globe
        if (Math.floor(time) % 8 === 0 && !showConnection) {
          setShowConnection(true);
          setTimeout(() => setShowConnection(false), 3000);
        }
        
        if (showConnection) {
          // Update connection line points
          const lineGeometry = connectionRef.current.geometry as THREE.BufferGeometry;
          const positions = lineGeometry.attributes.position.array as Float32Array;
          
          // Start point (satellite position)
          positions[0] = satX;
          positions[1] = satY;
          positions[2] = 0;
          
          // End point (globe position)
          positions[3] = globePosition[0];
          positions[4] = globePosition[1];
          positions[5] = globePosition[2];
          
          lineGeometry.attributes.position.needsUpdate = true;
          
          // Animate connection line
          const material = connectionRef.current.material as THREE.LineBasicMaterial;
          material.opacity = (Math.sin(time * 10) + 1) / 2;
        }
      }
    }
  });
  
  return (
    <group>
      {/* Orbit path */}
      <group>
        <ThreeLine
          points={orbitPoints.map(p => [p.x, p.y, p.z])}
          color="#2563eb"
          opacity={0.3}
          transparent
        />
      </group>
      
      {/* Satellite */}
      <group ref={satelliteRef} position={[orbitRadius, 0, 0]}>
        {/* Main satellite body */}
        <mesh>
          <boxGeometry args={[0.4, 0.2, 0.2]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Solar panels */}
        <mesh position={[0, 0, 0.3]}>
          <boxGeometry args={[0.1, 0.8, 0.02]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, -0.3]}>
          <boxGeometry args={[0.1, 0.8, 0.02]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.2} />
        </mesh>
        
        {/* Antenna */}
        <mesh position={[0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Blinking signal light */}
        <mesh ref={signalRef} position={[0.2, 0.1, 0]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#ff0000" transparent opacity={0.8} />
        </mesh>
        
        {/* Signal light glow */}
        <pointLight position={[0.2, 0.1, 0]} color="#ff0000" intensity={0.5} distance={2} />
      </group>
      
      {/* Connection to globe */}
      {connectToGlobe && (
        <>
          <group>
            <ThreeLine
              points={[[orbitRadius, 0, 0], [globePosition[0], globePosition[1], globePosition[2]]]}
              color="#00ffff"
              opacity={0.7}
              transparent
              linewidth={1}
            />
          </group>
          
          {/* Data transmission particles */}
          {showConnection && (
            <>
              <DataTransmission 
                start={satellitePosition as [number, number, number]} 
                end={globePosition as [number, number, number]} 
                speed={1.5} 
                color="#00ffff" 
                size={0.05} 
              />
              <DataTransmission 
                start={satellitePosition as [number, number, number]} 
                end={globePosition as [number, number, number]} 
                speed={1.2} 
                color="#0ea5e9" 
                size={0.04} 
              />
              <DataTransmission 
                start={globePosition as [number, number, number]} 
                end={satellitePosition as [number, number, number]} 
                speed={1.8} 
                color="#a855f7" 
                size={0.05} 
              />
            </>
          )}
        </>
      )}
    </group>
  );
};

// Main Background Animation Component
const BackgroundAnimation = ({ style = {} }: { style?: React.CSSProperties }) => {
  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      zIndex: -1, 
      pointerEvents: 'none', 
      ...style 
    }}>
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 60 }}
        style={{ background: 'linear-gradient(to bottom, #0f172a, #1e3a8a)' }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <directionalLight position={[-10, -10, -5]} intensity={0.4} />
        
        {/* Add stars in the background */}
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        
        {/* Globe representing global connectivity */}
        <Globe position={[-5, 0, -2]} scale={2.5} />
        
        {/* Server racks */}
        <ServerRack position={[5, 0, 0]} scale={0.8} />
        <ServerRack position={[6.5, 0, -1]} scale={0.6} />
        
        {/* Data packets moving between servers and globe */}
        <DataPacket 
          startPosition={[-2, 0, -2]} 
          endPosition={[4, 0, 0]} 
          color="#00ffff" 
        />
        <DataPacket 
          startPosition={[5, 1, 0]} 
          endPosition={[-3, 1, -2]} 
          color="#ff00ff" 
        />
        <DataPacket 
          startPosition={[6, -1, -1]} 
          endPosition={[-4, -1, -2]} 
          color="#ffff00" 
        />
        
        {/* Cloud computing representation */}
        <Cloud position={[0, 3, 0]} scale={1.2} />
        <Cloud position={[-3, 2, -1]} scale={0.8} />
        <Cloud position={[3, 3, -2]} scale={1} />
        
        {/* Orbiting satellites */}
        <Satellite 
          orbitRadius={6} 
          orbitSpeed={0.2} 
          orbitAngle={0} 
          connectToGlobe={true}
          globePosition={[-5, 0, -2]}
        />
        <Satellite 
          orbitRadius={8} 
          orbitSpeed={0.15} 
          orbitAngle={Math.PI / 3}
          connectToGlobe={true}
          globePosition={[-5, 0, -2]}
        />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

export default BackgroundAnimation;
