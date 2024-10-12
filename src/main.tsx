import './global.less';
import { ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { CameraControls, ContactShadows, Environment } from '@react-three/drei';

import NetworkCabinet from './components/network-cabinet';

const World = (props: { children: ReactNode }) => {
  return (
    <Canvas
      dpr={[1, 2]}
      style={{ flex: '1' }}
      eventSource={document.getElementById('app')!}
      eventPrefix='client'
      camera={{
        fov: 8,
        position: [6.6, 8.6, 6.2],
        viewport: new THREE.Vector4(0, 6, 0, 0)
      }}
    >
      <ambientLight intensity={0.2} />
      <spotLight
        intensity={0.1}
        // angle={0.1}
        penumbra={0.2}
        position={[-10, 15, 10]}
        distance={20}
        castShadow
      />
      <Environment preset='studio' background blur={10} />
      <CameraControls />
      //here axes helper is applied
      <primitive object={new THREE.AxesHelper(100)} />
      <ContactShadows
        resolution={512}
        position={[0, 0, 0]}
        opacity={1}
        scale={10}
        blur={2}
        far={0.8}
      />
      {props.children}
    </Canvas>
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
    <World>
      <NetworkCabinet />
    </World>
  </StrictMode>
);
