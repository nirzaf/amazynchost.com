import { Canvas } from '@react-three/fiber';
import { OrbitControls, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import HostingBackground3D from './HostingBackground3D';
import { Suspense } from 'react';

interface HostingBackgroundWrapperProps {
  style?: React.CSSProperties;
}

const HostingBackgroundWrapper: React.FC<HostingBackgroundWrapperProps> = ({ style }) => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, ...style }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <HostingBackground3D />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true}
            autoRotate 
            autoRotateSpeed={0.5} 
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HostingBackgroundWrapper;