import type { Group } from 'three';
import { useRef } from 'react';

// import { useFrame } from '@react-three/fiber';
import { get3DModel, UNIT } from './model-factory';

const Cabinet = get3DModel('/gltf/cabinet.glb');
const FanDock = get3DModel('/gltf/cooling-system/fan-dock.glb');
const AirDuct = get3DModel('/gltf/cooling-system/air-duct.glb');

export default function NetworkCabinet(props: JSX.IntrinsicElements['group']) {
  const ref = useRef<Group>(undefined!);

  // useFrame(state => {
  //   const t = state.clock.getElapsedTime();
  //   ref?.current?.rotation.set(
  //     Math.sin(t / 2) / 2,
  //     Math.cos(t / 4) / 2,
  //     0.15 + Math.sin(t / 2) / 8
  //   );
  //   ref?.current?.position?.set(
  //     ref?.current?.position.x,
  //     ref?.current?.position.y,
  //     (0.5 + Math.cos(t / 2)) / 7
  //   );
  // });

  return (
    <group ref={ref} {...props} dispose={null}>
      <Cabinet unit={UNIT.mm} />
      <AirDuct unit={UNIT.mm} offset={[20, 1340, 0]} />
      <FanDock unit={UNIT.mm} offset={[20, 1320, 0]} />
      <FanDock unit={UNIT.mm} offset={[20, 200, 0]} />
      <AirDuct unit={UNIT.mm} offset={[20, 100, 0]} zReverse />
    </group>
  );
}
