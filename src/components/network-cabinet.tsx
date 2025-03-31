import type { Group } from 'three';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import type { ThreeElements } from '@react-three/fiber';
import { get3DModel, UNIT } from './helper/model-factory';

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
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<Group>(null);

  // 存储所有可爆炸组件的引用
  const explodableRefs = new Map<string, Group>();

  const defaultPosition = [0, 0, 0] as [number, number, number];
  // const defaultRotation = [0, 0, 0] as [number, number, number];
  const baseDamping = 0.15;

  type ExplodeConfig = {
    position: [number, number, number];
    speed: number;
  };

  const explodeMap: Record<string, ExplodeConfig> = {
    'Cabinet Door': { position: [0, 0, 0.3], speed: 1.1 },
    'AirNet Up': { position: [0, 0, 0.5], speed: 0.9 },
    'AirNet Down': { position: [0, 0, 0.5], speed: 0.9 },
    'Cooling System Air Duct Up': { position: [0, 0.6, 0], speed: 1.1 },
    'Cooling System Fan Dock Up': { position: [0, 0.5, 0], speed: 1 },
    'Cooling System Air Duct Down': { position: [0, -0.5, 0], speed: 1.1 },
    'Cooling System Fan Dock Down': { position: [0, -0.6, 0], speed: 1 },
    '22U Rack Post Front Left': { position: [-0.5, 0, 0.3], speed: 0.9 },
    '22U Rack Post Front Right': { position: [0.5, 0, 0.3], speed: 0.9 },
    '22U Rack Post Back Left': { position: [-0.5, 0, -0.3], speed: 0.9 },
    '22U Rack Post Back Right': { position: [0.5, 0, -0.3], speed: 0.9 }
  } as const;

  const isExplodable = (title: string) => title in explodeMap;

  const computeTargetPosition = (
    basePosition: [number, number, number],
    explodeOffset: [number, number, number],
    shouldExplode: boolean
  ): [number, number, number] => {
    if (!shouldExplode) return basePosition;
    return [
      basePosition[0] + explodeOffset[0],
      basePosition[1] + explodeOffset[1],
      basePosition[2] + explodeOffset[2]
    ];
  };

  const registerExplodable = (group: Group) => {
    if (!group.userData?.title || !isExplodable(group.userData.title)) return;
    explodableRefs.set(group.userData.title, group);
  };

  useFrame((_, delta) => {
    explodableRefs.forEach((group, title) => {
      const config = explodeMap[title];
      const targetPosition = computeTargetPosition(defaultPosition, config.position, hovered);

      group.position.lerp(
        {
          x: targetPosition[0],
          y: targetPosition[1],
          z: targetPosition[2]
        },
        (hovered ? config.speed : 1.2) * baseDamping * delta * 22
      );
    });
  });

  return (
    <group
      ref={groupRef}
      {...props}
      dispose={null}
      position={[0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <group userData={{ title: 'Cabinet' }}>
        <Cabinet unit={UNIT.mm} castShadow receiveShadow roughness={0.9} metalness={0.0} />
        <group dispose={null}>
          <Door
            ref={ref => ref && registerExplodable(ref)}
            unit={UNIT.mm}
            offset={[0, 0, 330]}
            userData={{ title: 'Cabinet Door' }}
            castShadow
            receiveShadow
            roughness={0.9}
            metalness={0.0}
          />
          <AirNet
            ref={ref => ref && registerExplodable(ref)}
            unit={UNIT.mm}
            offset={[25, 1350, 336]}
            userData={{ title: 'AirNet Up' }}
            castShadow
            receiveShadow
            color='#ffe500'
            roughness={0.5}
            metalness={0.8}
          />
          <AirNet
            ref={ref => ref && registerExplodable(ref)}
            unit={UNIT.mm}
            offset={[25, 110, 336]}
            userData={{ title: 'AirNet Down' }}
            castShadow
            receiveShadow
            color='#ffe500'
            roughness={0.5}
            metalness={0.8}
          />
        </group>
      </group>

      <group userData={{ title: 'Cooling System Up' }} dispose={null}>
        <AirDuct
          ref={ref => ref && registerExplodable(ref)}
          unit={UNIT.mm}
          offset={[20, 1340, 0]}
          userData={{ title: 'Cooling System Air Duct Up' }}
          castShadow
          receiveShadow
          roughness={0.9}
          metalness={0.0}
        />
        <FanDock
          ref={ref => ref && registerExplodable(ref)}
          unit={UNIT.mm}
          offset={[20, 1320, 0]}
          userData={{ title: 'Cooling System Fan Dock Up' }}
          castShadow
          receiveShadow
          roughness={0.9}
          metalness={0.0}
        />
      </group>

      <group userData={{ title: 'Cooling System Down' }} dispose={null}>
        <FanDock
          ref={ref => ref && registerExplodable(ref)}
          unit={UNIT.mm}
          offset={[20, 200, 0]}
          userData={{ title: 'Cooling System Air Duct Down' }}
          castShadow
          receiveShadow
          roughness={0.9}
          metalness={0.0}
        />
        <AirDuct
          ref={ref => ref && registerExplodable(ref)}
          unit={UNIT.mm}
          offset={[20, 100, 0]}
          zReverse
          userData={{ title: 'Cooling System Fan Dock Down' }}
          castShadow
          receiveShadow
          roughness={0.9}
          metalness={0.0}
        />
      </group>

      <group userData={{ title: 'Rackmount' }} dispose={null}>
        <RackPost22U
          ref={ref => ref && registerExplodable(ref)}
          unit={UNIT.mm}
          offset={[20, 270, 217.2]}
          userData={{ title: '22U Rack Post Front Left' }}
          castShadow
          receiveShadow
          color='#000'
          roughness={0.5}
          metalness={0.8}
        />
        <RackPost22U
          ref={ref => ref && registerExplodable(ref)}
          unit={UNIT.mm}
          offset={[500.25, 270, 217.2]}
          userData={{ title: '22U Rack Post Front Right' }}
          zReverse
          castShadow
          receiveShadow
          color='#000'
          roughness={0.5}
          metalness={0.8}
        />
        <RackPost22U
          ref={ref => ref && registerExplodable(ref)}
          unit={UNIT.mm}
          offset={[20, 270, 14.7]}
          userData={{ title: '22U Rack Post Back Left' }}
          xReverse
          castShadow
          receiveShadow
          color='#000'
          roughness={0.5}
          metalness={0.8}
        />
        <RackPost22U
          ref={ref => ref && registerExplodable(ref)}
          unit={UNIT.mm}
          offset={[500.25, 270, 14.7]}
          userData={{ title: '22U Rack Post Back Right' }}
          yReverse
          castShadow
          receiveShadow
          color='#000'
          roughness={0.5}
          metalness={0.8}
        />
        <group userData={{ title: 'Server stuff' }}>
          <Server2U
            unit={UNIT.mm}
            offset={[33.7, 1162.55, 79.2]}
            castShadow
            receiveShadow
            color='#000'
          />
          <Tray1U
            unit={UNIT.mm}
            offset={[32.5, 702.35, 16.95]}
            castShadow
            receiveShadow
            roughness={0.5}
          />
          <Tray1U
            unit={UNIT.mm}
            offset={[32.5, 702.35 - ONE_UNIT * 9, 16.95]}
            castShadow
            receiveShadow
            metalness={0.8}
          />
        </group>
      </group>
    </group>
  );
}
