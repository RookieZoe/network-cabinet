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
  const cabinetRef = useRef<Group>(null);
  const upperCoolingRef = useRef<Group>(null);
  const lowerCoolingRef = useRef<Group>(null);
  const rackmountRef = useRef<Group>(null);

  const defaultPosition = [-0.15, 0.1, -0.1] as [number, number, number];
  const defaultRotation = [0, 0, 0] as [number, number, number];
  const damping = 0.15;

  const explodeAmount = {
    upper: {
      position: [0, 0.5, -0.3],
      rotation: [0.1, 0.2, 0]
    },
    lower: {
      position: [0, -0.3, 0.3],
      rotation: [-0.1, -0.2, 0]
    },
    rack: {
      position: [0.4, 0, -0.2],
      rotation: [0, 0.3, 0.1]
    },
    cabinet: {
      position: [0, 0.1, 0],
      rotation: [0, 0, 0]
    }
  } as const;

  const setGroupTransform = (
    group: Group | null,
    targetPosition: [number, number, number],
    targetRotation: [number, number, number],
    damping: number,
    delta: number
  ) => {
    if (!group) return;

    // 服务器组件不参与爆炸动画
    if (group.userData?.title === 'Server stuff') {
      return;
    }

    group.position.lerp(
      {
        x: targetPosition[0],
        y: targetPosition[1],
        z: targetPosition[2]
      },
      damping * delta * 22
    );

    group.rotation.set(
      group.rotation.x + (targetRotation[0] - group.rotation.x) * damping,
      group.rotation.y + (targetRotation[1] - group.rotation.y) * damping,
      group.rotation.z + (targetRotation[2] - group.rotation.z) * damping
    );
  };

  useFrame((_, delta) => {
    if (hovered) {
      // 更新各组件位置和旋转
      setGroupTransform(
        upperCoolingRef.current,
        [
          defaultPosition[0] + explodeAmount.upper.position[0],
          defaultPosition[1] + explodeAmount.upper.position[1],
          defaultPosition[2] + explodeAmount.upper.position[2]
        ],
        [
          defaultRotation[0] + explodeAmount.upper.rotation[0],
          defaultRotation[1] + explodeAmount.upper.rotation[1],
          defaultRotation[2] + explodeAmount.upper.rotation[2]
        ],
        damping,
        delta
      );

      setGroupTransform(
        lowerCoolingRef.current,
        [
          defaultPosition[0] + explodeAmount.lower.position[0],
          defaultPosition[1] + explodeAmount.lower.position[1],
          defaultPosition[2] + explodeAmount.lower.position[2]
        ],
        [
          defaultRotation[0] + explodeAmount.lower.rotation[0],
          defaultRotation[1] + explodeAmount.lower.rotation[1],
          defaultRotation[2] + explodeAmount.lower.rotation[2]
        ],
        damping,
        delta
      );

      setGroupTransform(
        rackmountRef.current,
        [
          defaultPosition[0] + explodeAmount.rack.position[0],
          defaultPosition[1] + explodeAmount.rack.position[1],
          defaultPosition[2] + explodeAmount.rack.position[2]
        ],
        [
          defaultRotation[0] + explodeAmount.rack.rotation[0],
          defaultRotation[1] + explodeAmount.rack.rotation[1],
          defaultRotation[2] + explodeAmount.rack.rotation[2]
        ],
        damping,
        delta
      );

      setGroupTransform(
        cabinetRef.current,
        [
          defaultPosition[0] + explodeAmount.cabinet.position[0],
          defaultPosition[1] + explodeAmount.cabinet.position[1],
          defaultPosition[2] + explodeAmount.cabinet.position[2]
        ],
        defaultRotation,
        damping,
        delta
      );
    } else {
      // 恢复所有组件到原始位置和旋转，但不包括服务器组件
      [
        upperCoolingRef.current,
        lowerCoolingRef.current,
        rackmountRef.current,
        cabinetRef.current
      ].forEach(group =>
        setGroupTransform(group, defaultPosition, defaultRotation, damping, delta)
      );
    }
  });

  return (
    <group
      ref={ref}
      {...props}
      dispose={null}
      position={[-0.15, 0.1, -0.1]}
      onPointerOver={e => {
        console.log('onPointerOver', e);
        setHovered(true);
      }}
      onPointerOut={e => {
        console.log('onPointerOut', e);
        setHovered(false);
      }}
    >
      <group ref={cabinetRef} userData={{ title: 'Cabinet' }}>
        <Cabinet unit={UNIT.mm} />
        <group dispose={null}>
          <Door unit={UNIT.mm} offset={[0, 0, 330]} />
          <AirNet unit={UNIT.mm} offset={[25, 1350, 336]} userData={{ title: 'AirNet Up' }} />
          <AirNet unit={UNIT.mm} offset={[25, 110, 336]} userData={{ title: 'AirNet Down' }} />
        </group>
      </group>

      <group ref={upperCoolingRef} userData={{ title: 'Cooling System up' }} dispose={null}>
        <AirDuct unit={UNIT.mm} offset={[20, 1340, 0]} />
        <FanDock unit={UNIT.mm} offset={[20, 1320, 0]} />
      </group>

      <group ref={lowerCoolingRef} userData={{ title: 'Cooling System down' }} dispose={null}>
        <FanDock unit={UNIT.mm} offset={[20, 200, 0]} />
        <AirDuct unit={UNIT.mm} offset={[20, 100, 0]} zReverse />
      </group>

      <group ref={rackmountRef} userData={{ title: 'Rackmount' }} dispose={null}>
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
