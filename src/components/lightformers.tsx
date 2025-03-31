import { Lightformer } from '@react-three/drei';

export default function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  return (
    <>
      <Lightformer
        intensity={0.75}
        rotation-x={Math.PI / 2}
        position={[0, 5, -9]}
        scale={[10, 10, 1]}
      />
      <group rotation={[0, 0.5, 0]}>
        {positions.map((x, i) => (
          <Lightformer
            key={i}
            form='circle'
            intensity={2}
            rotation={[Math.PI / 2, 0, 0]}
            position={[x, 4, i * 4]}
            scale={[3, 1, 1]}
          />
        ))}
      </group>
      <Lightformer
        intensity={4}
        rotation-y={Math.PI / 2}
        position={[-5, 1, -1]}
        scale={[20, 0.1, 1]}
      />
      <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
      <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
      <Lightformer
        form='circle'
        color='green'
        intensity={3}
        scale={10}
        position={[-15, 4, -18]}
        target={[0, 0, 0]}
      />
    </>
  );
}
