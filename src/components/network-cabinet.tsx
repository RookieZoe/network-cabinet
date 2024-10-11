import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';

import { FanDock } from './cooling-system/fan-dock';

export default function NetworkCabinet() {
  return (
    <Canvas
      dpr={[1, 2]}
      style={{ flex: '1' }}
      eventSource={document.getElementById('app')!}
      eventPrefix='client'
      camera={{ position: [0, 0, 4], fov: 10 }}
    >
      <ambientLight intensity={0.2} />
      <spotLight
        intensity={0.2}
        angle={0.1}
        penumbra={0.2}
        position={[10, 15, -5]}
        castShadow
      />
      <Environment preset='studio' background blur={1} />
      <ContactShadows
        resolution={512}
        position={[0, 0, 0]}
        opacity={1}
        scale={10}
        blur={2}
        far={0.8}
      />

      <FanDock rotation={[Math.PI / 1.6, 0.3, 0]} />
    </Canvas>
  );
}
