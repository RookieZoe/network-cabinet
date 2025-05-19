import { StrictMode, useRef, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import {
  CameraControls,
  ContactShadows,
  Environment,
  PerformanceMonitor
} from '@react-three/drei';

import { useStore } from '@/store';
import { i18n, updateStaticTexts } from '@/i18n'; // 初始化i18n

import NetworkCabinet from '@/components/network-cabinet';
import Lightformers from '@/components/lightformers';
import Overlays from '@/components/overlays';
import InfoDisplay from '@/components/info-display';

const App = () => {
  const [degraded, degrade] = useState(false);
  const cameraControlsRef = useRef<CameraControls | undefined>(undefined!);
  const store = useStore();

  useEffect(() => {
    cameraControlsRef?.current?.dollyTo?.(store.distance, true);
  }, [store.distance]);

  useEffect(() => {
    cameraControlsRef?.current?.reset?.(true);
  }, [store.resetToggle]);

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
        <NetworkCabinet onClick={(e, meta) => console.log('Clicked:', e, meta)} />
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
      <CameraControls
        ref={cameraControlsRef as any}
        makeDefault
        minDistance={0.65}
        maxDistance={13}
      />
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

if (i18n.isInitialized) {
  updateStaticTexts();
}

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
    <Overlays />
    <InfoDisplay />
  </StrictMode>
);
