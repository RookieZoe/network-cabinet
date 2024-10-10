import * as THREE from 'three';
import { useThree } from '@/hooks/useThree';
import { useEffect, useState } from 'react';

export const Demo = () => {
  const { ref, renderer, aspect } = useThree();
  const [scene] = useState<THREE.Scene>(new THREE.Scene());
  const [cam, setCam] = useState<THREE.PerspectiveCamera>(null!);

  const init = () => {
    // CAMERA
    const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 2000);
    camera.translateZ(5);
    setCam(() => camera);

    // 灯光
    const ambientLight = new THREE.AmbientLight(0xffffff, Math.PI / 2);

    const spotLight = new THREE.SpotLight(0xffffff, Math.PI, 0, 0.15, 1, 0);
    spotLight.position.set(10, 10, 10);
    // spotLight.shadow.mapSize.width = 512;
    // spotLight.shadow.mapSize.height = 512;
    // spotLight.shadow.camera.near = 0.5;
    // spotLight.shadow.camera.far = 100;
    spotLight.castShadow = true;

    const pointLight = new THREE.PointLight(0xffffff, Math.PI, 0, 0);
    pointLight.position.set(-10, -10, -10);
    // pointLight.shadow.mapSize.width = 512;
    // pointLight.shadow.mapSize.height = 512;
    // pointLight.shadow.camera.near = 0.5;
    // pointLight.shadow.camera.far = 100;
    pointLight.castShadow = true;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 'hotpink' });
    material.shadowSide = THREE.DoubleSide;
    const cube1 = new THREE.Mesh(geometry, material);
    cube1.position.set(-1.2, 0, 0);
    cube1.receiveShadow = true;
    const cube2 = new THREE.Mesh(geometry, material);
    cube2.position.set(1.2, 0, 0);
    cube2.receiveShadow = true;

    // scene
    scene.background = new THREE.Color(0xffffff);
    scene.add(ambientLight);
    scene.add(spotLight);
    scene.add(pointLight);

    scene.add(cube1);
    scene.add(cube2);

    function animate() {
      requestAnimationFrame(animate);

      cube1.rotation.x += 0.0162;
      cube2.rotation.x += 0.0162;

      renderer?.render?.(scene, camera);
    }

    animate();
  };

  useEffect(() => {
    if (!renderer) {
      return;
    }

    init();
  }, [renderer]);

  useEffect(() => {
    if (!cam) {
      return;
    }

    cam.aspect = aspect;
    cam.updateProjectionMatrix();
  }, [aspect]);

  return (
    <div
      ref={ref}
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'auto'
      }}
    ></div>
  );
};
