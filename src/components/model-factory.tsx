import type { Mesh, Vector3Tuple } from 'three';
import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import type { ThreeElements } from '@react-three/fiber';

export enum UNIT {
  m = 1,
  dm = 0.1,
  cm = 0.01,
  mm = 0.001
}

type Props3D = ThreeElements['group'] & {
  unit?: UNIT;
  offset?: [number, number, number];
  opacity?: number;
  zReverse?: boolean;
  xReverse?: boolean;
  yReverse?: boolean;
};

export const get3DModel = (gltfPath: string) => {
  useGLTF.preload(gltfPath);

  // Set the bottom left rear vertex of the 3D model to the origin of the coordinate system,
  // and add unit support to facilitate subsequent positioning.
  return (props: Props3D) => {
    const GLTF = useGLTF(gltfPath);

    const {
      unit = UNIT.m,
      offset = [0, 0, 0],
      opacity = 1,
      zReverse = false,
      xReverse = false,
      yReverse = false,
      ...rest
    } = props;

    const positionOffset = useMemo<[x: number, y: number, z: number]>(() => {
      if (!GLTF || !GLTF.nodes) {
        return [0, 0, 0];
      }

      let offset = [0, 0, 0];
      let radius = 0;
      Object.values(GLTF.nodes).forEach(meshNode => {
        if (!meshNode || !(meshNode as Mesh).isMesh) {
          return;
        }
        const r = (meshNode as Mesh)?.geometry?.boundingSphere?.radius || 0;
        if (r > radius) {
          radius = r;
          const { x = 0, y = 0, z = 0 } = (meshNode as Mesh)?.geometry?.boundingBox?.max || {};
          offset = [x, y, z];
        }
      });

      return offset as [x: number, y: number, z: number];
    }, [GLTF]);

    return (
      <group {...rest} scale={[unit, unit, unit]} dispose={null}>
        <group scale={[1 / unit, 1 / unit, 1 / unit]} dispose={null} position={offset}>
          {Object.values(GLTF.nodes).map((meshNode, index) => {
            if (!meshNode || !(meshNode as Mesh).isMesh) {
              return null;
            }

            const material = (meshNode as Mesh).material;

            if (Array.isArray(material)) {
              material.forEach(m => {
                m.setValues({
                  opacity: 1 - opacity > 0.001 ? opacity : 1,
                  transparent: 1 - opacity > 0.001
                });
              });
            } else {
              material.setValues({
                opacity: 1 - opacity > 0.001 ? opacity : 1,
                transparent: 1 - opacity > 0.001
              });
            }

            return (
              <mesh
                key={index}
                geometry={(meshNode as Mesh).geometry}
                material={material}
                position={positionOffset}
                receiveShadow
                rotation={
                  [
                    xReverse ? Math.PI : 0,
                    yReverse ? Math.PI : 0,
                    zReverse ? Math.PI : 0
                  ] as Vector3Tuple
                }
              />
            );
          })}
        </group>
      </group>
    );
  };
};
