import { Canvas } from '@react-three/fiber';
import HostingBackground3D from './HostingBackground3D';

interface HostingBackgroundWrapperProps {
  style?: React.CSSProperties;
}

const HostingBackgroundWrapper: React.FC<HostingBackgroundWrapperProps> = ({ style }) => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', ...style }}>
      <Canvas>
        <HostingBackground3D />
      </Canvas>
    </div>
  );
};

export default HostingBackgroundWrapper;