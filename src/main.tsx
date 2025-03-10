import './global.less';
import { memo, StrictMode, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  AccumulativeShadows,
  CameraControls,
  ContactShadows,
  Environment,
  Grid,
  RandomizedLight
} from '@react-three/drei';

import NetworkCabinet from './components/network-cabinet';

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

function Ground() {
  const gridConfig = {
    cellSize: 0.01,
    cellThickness: 0.8,
    cellColor: '#6f6f6f',
    sectionSize: 0.1,
    sectionThickness: 1,
    sectionColor: '#9d4b4b',
    fadeDistance: 30,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true
  };
  return <Grid position={[0, -0.001, 0]} args={[10.5, 10.5]} {...gridConfig} />;
}

const World = () => {
  const cameraControlsRef = useRef<CameraControls | undefined>(undefined!);

  useFrame(_state => {
    cameraControlsRef?.current?.truck?.(0, -0.01, true);
  });

  return (
    <>
      <Ground />
      <Shadows />
      <spotLight position={[5, 5, 5]} penumbra={1} />
      <axesHelper />
      <ambientLight intensity={0.2} />
      <Environment preset='studio' background blur={10} />
      <CameraControls ref={cameraControlsRef as any} />
      <ContactShadows
        resolution={512}
        position={[0, 0, 0]}
        opacity={1}
        scale={10}
        blur={2}
        far={0.8}
      />
    </>
  );
};

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <div style={{ fontSize: '18px', textAlign: 'center', padding: '16px' }}>
      <h1>
        <a href='https://github.com/RookieZoe/network-cabinet'>Network Cabinet</a>
      </h1>
      <h2>Still Working 🚧</h2>
    </div>
    <Canvas
      dpr={[1, 2]}
      style={{ flex: '1' }}
      eventSource={document.getElementById('app')!}
      eventPrefix='client'
      shadows
      camera={{ position: [0.275, 5, 5], fov: 30, near: 0.1, far: 100 }}
    >
      <World />
      <NetworkCabinet />
    </Canvas>
  </StrictMode>
);
