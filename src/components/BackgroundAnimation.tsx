import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = ({ position, color, speed, distort }: { position: [number, number, number], color: string, speed: number, distort: number }) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01 * speed;
  });

  return (
    <Sphere args={[1, 64, 64]} position={position} castShadow ref={mesh}>
      <MeshDistortMaterial 
        color={color} 
        attach="material" 
        distort={distort} 
        speed={speed} 
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

const GridLines = () => {
  const { scene } = useThree();
  
  useEffect(() => {
    const size = 20;
    const divisions = 20;
    const gridHelper = new THREE.GridHelper(size, divisions, 0x0044ff, 0x0044ff);
    gridHelper.position.y = -3;
    gridHelper.material.opacity = 0.1;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);
    
    return () => {
      scene.remove(gridHelper);
    };
  }, [scene]);
  
  return null;
};

const BackgroundAnimation = ({ style = {} }: { style?: React.CSSProperties }) => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, ...style }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <GridLines />
        <AnimatedSphere position={[-4, 2, 0]} color="#2563eb" speed={1.5} distort={0.4} />
        <AnimatedSphere position={[4, -2, -2]} color="#10b981" speed={1} distort={0.3} />
        <AnimatedSphere position={[0, 0, -5]} color="#6366f1" speed={0.5} distort={0.2} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default BackgroundAnimation;
