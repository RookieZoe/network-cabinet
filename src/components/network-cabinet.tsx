import type { Group } from 'three';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import type { ThreeElements } from '@react-three/fiber';
import { get3DModel, UNIT } from './model-factory';
import { easing } from 'maath';

const Door = get3DModel('/gltf/door.glb');
const Cabinet = get3DModel('/gltf/cabinet.glb');
const AirNet = get3DModel('/gltf/air-net.glb');
const AirDuct = get3DModel('/gltf/cooling-system/air-duct.glb');
const FanDock = get3DModel('/gltf/cooling-system/fan-dock.glb');
const RackPost22U = get3DModel('/gltf/rackmount/rack-post-22u.glb');
const Server2U = get3DModel('/gltf/rackmount/server-2u.glb');
const Tray1U = get3DModel('/gltf/rackmount/tray-1u.glb');

const ONE_UNIT = 44.45;

export default function NetworkCabinet(props: ThreeElements['group']) {
  const ref = useRef<Group>(undefined!);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    !hovered && easing.damp3(ref?.current?.scale, [1, 1, 1], 0.5, delta);
    hovered && easing.damp3(ref?.current?.scale, [1.5, 1.5, 1.5], 0.5, delta);
  });

  return (
    <group
      ref={ref}
      {...props}
      dispose={null}
      position={[-0.15, 0.1, -0.1]}
      onPointerOver={e => {
        // e.eventObject
        console.log('onPointerOver', e);
        setHovered(true);
      }}
      onPointerOut={e => {
        console.log('onPointerOut', e);
        setHovered(false);
      }}
    >
      <group userData={{ title: 'Cabinet' }}>
        <Cabinet unit={UNIT.mm} />
        <group dispose={null}>
          <Door unit={UNIT.mm} offset={[0, 0, 330]} />
          <AirNet unit={UNIT.mm} offset={[25, 1350, 336]} userData={{ title: 'AirNet Up' }} />
          <AirNet unit={UNIT.mm} offset={[25, 110, 336]} userData={{ title: 'AirNet Down' }} />
        </group>
      </group>

      <group userData={{ title: 'Cooling System up' }} dispose={null}>
        <AirDuct unit={UNIT.mm} offset={[20, 1340, 0]} />
        <FanDock unit={UNIT.mm} offset={[20, 1320, 0]} />
      </group>

      <group userData={{ title: 'Cooling System down' }} dispose={null}>
        <FanDock unit={UNIT.mm} offset={[20, 200, 0]} />
        <AirDuct unit={UNIT.mm} offset={[20, 100, 0]} zReverse />
      </group>

      <group userData={{ title: 'Rackmount' }} dispose={null}>
        <RackPost22U
          unit={UNIT.mm}
          offset={[20, 270, 217.2]}
          userData={{ title: '22U rack post front left' }}
        />
        <RackPost22U
          unit={UNIT.mm}
          offset={[500.25, 270, 217.2]}
          userData={{ title: '22U rack post front right' }}
          zReverse
        />
        <RackPost22U
          unit={UNIT.mm}
          offset={[20, 270, 14.7]}
          userData={{ title: '22U rack post back left' }}
          xReverse
        />
        <RackPost22U
          unit={UNIT.mm}
          offset={[500.25, 270, 14.7]}
          userData={{ title: '22U rack post back right' }}
          yReverse
        />
        <group userData={{ title: 'Server stuff' }}>
          <Server2U unit={UNIT.mm} offset={[33.7, 1162.55, 79.2]} />
          <Tray1U unit={UNIT.mm} offset={[32.5, 702.35, 16.95]} />
          <Tray1U unit={UNIT.mm} offset={[32.5, 702.35 - ONE_UNIT * 9, 16.95]} />
        </group>
      </group>
    </group>
  );
}
