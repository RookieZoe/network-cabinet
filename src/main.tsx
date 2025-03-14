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
      <spotLight position={[5, 5, 5]} penumbra={1} intensity={0.8} />
      <ambientLight intensity={0.3} />
      <Environment preset='studio' background blur={10} resolution={256}>
        <color attach='background' args={['#1a1a1a']} />
      </Environment>
      <CameraControls ref={cameraControlsRef as any} onEnd={e => console.log(e)} makeDefault />
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

const App = () => (
  <>
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        padding: '20px',
        zIndex: 10000,
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          pointerEvents: 'auto',
          fontSize: '24px',
          fontWeight: 'bold',
          userSelect: 'none'
        }}
      >
        <a
          href='https://github.com/RookieZoe/network-cabinet'
          style={{ color: '#ffffff', textDecoration: 'none' }}
          target='_blank'
        >
          Network Cabinet
        </a>
        <div style={{ fontSize: '18px', color: '#999', marginTop: '8px' }}>
          Still Working 🚧
        </div>
      </div>
    </div>
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
