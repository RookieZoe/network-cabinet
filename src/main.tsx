import './global.less';
import { StrictMode, useRef, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import {
  CameraControls,
  ContactShadows,
  Environment,
  PerformanceMonitor
} from '@react-three/drei';

import NetworkCabinet from './components/network-cabinet';
import OverlayMain from './components/overlays/ol-main';
import Lightformers from './components/lightformers';

const App = () => {
  const [degraded, degrade] = useState(false);
  const cameraControlsRef = useRef<CameraControls | undefined>(undefined!);

  useEffect(() => {
    if (cameraControlsRef.current) {
      cameraControlsRef.current.setTarget(0, -0.2, 0);
    }
  }, []);

  return (
    <Canvas
      shadows
      camera={{
        position: [3.8, 2.9, 4.4],
        fov: 30,
        near: 0.1,
        far: 100
      }}
      dpr={[1, 2]}
      style={{ flex: '1' }}
      eventSource={document.getElementById('app')!}
      eventPrefix='client'
    >
      <group position={[-0.1, -0.6, 0]}>
        <NetworkCabinet />
      </group>
      <PerformanceMonitor onDecline={() => degrade(true)} />
      <spotLight position={[0, 15, -15]} angle={0.3} penumbra={1} castShadow intensity={1.5} />
      <ambientLight intensity={2.5} />
      <Environment
        frames={degraded ? 1 : Infinity}
        resolution={512}
        background
        blur={1}
        backgroundBlurriness={100}
      >
        <Lightformers />
      </Environment>
      <CameraControls ref={cameraControlsRef as any} onEnd={e => console.log(e)} makeDefault />
      <ContactShadows
        resolution={1024}
        position={[0, -0.6, 0]}
        opacity={0.8}
        scale={20}
        blur={1.5}
        far={1.2}
        color='gray'
      />
    </Canvas>
  );
};

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
    <OverlayMain />
  </StrictMode>
);
