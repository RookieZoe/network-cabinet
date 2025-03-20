import './global.less';
import { memo, StrictMode, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import {
  AccumulativeShadows,
  CameraControls,
  ContactShadows,
  Environment,
  RandomizedLight
} from '@react-three/drei';

import NetworkCabinet from './components/network-cabinet';
import OverlayMain from './components/overlays/ol-main';

const Shadows = memo(() => (
  <AccumulativeShadows
    temporal
    frames={100}
    color='#9d4b4b'
    colorBlend={0.5}
    alphaTest={0.9}
    scale={20}
  >
    <RandomizedLight amount={8} radius={4} position={[5, 5, -10]} />
  </AccumulativeShadows>
));

const World = () => {
  const cameraControlsRef = useRef<CameraControls | undefined>(undefined!);

  useEffect(() => {
    if (cameraControlsRef.current) {
      cameraControlsRef.current.setTarget(0, 0.8, 0);
    }
  }, []);

  return (
    <>
      <Shadows />
      {/* 主光源 - 从右上方打光 */}
      <spotLight
        position={[5, 5, 2]}
        penumbra={1}
        intensity={0.8}
        castShadow
        shadow-bias={-0.0001}
        shadow-mapSize={[2048, 2048]}
      />
      {/* 辅助光源 - 左前方补光 */}
      <spotLight
        position={[-3, 2, 3]}
        penumbra={1}
        intensity={0.4}
        angle={0.5}
        color='#4e5362'
      />
      {/* 环境光 - 提供基础亮度 */}
      <ambientLight intensity={0.2} color='#4e5362' />
      <Environment preset='studio' background blur={1} resolution={512}>
        <color attach='background' args={['#212f3d']} />
      </Environment>
      <CameraControls ref={cameraControlsRef as any} onEnd={e => console.log(e)} makeDefault />
      <ContactShadows
        resolution={1024}
        position={[0, 0, 0]}
        opacity={0.8}
        scale={20}
        blur={1.5}
        far={1.2}
        color='#4e5362'
      />
    </>
  );
};

const App = () => (
  <>
    <OverlayMain />
    <Canvas
      dpr={[1, 2]}
      style={{ flex: '1' }}
      eventSource={document.getElementById('app')!}
      eventPrefix='client'
      shadows
      camera={{
        position: [3, 4, 4],
        fov: 30,
        near: 0.1,
        far: 100
      }}
    >
      <World />
      <NetworkCabinet />
    </Canvas>
  </>
);

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
