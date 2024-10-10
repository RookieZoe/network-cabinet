import * as THREE from 'three';

import { useCallback, useEffect, useState } from 'react';
import { useResize } from './useResize';

const useThree = () => {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [aspect, setAspect] = useState<number>(1);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) {
      return;
    }

    const { clientWidth = window.innerWidth, clientHeight = window.innerHeight } = node;
    setAspect(clientWidth / clientHeight);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(clientWidth, clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    node.appendChild(renderer.domElement);
    setNode(() => node);
    setRenderer(() => renderer);
  }, []);

  useEffect(() => {
    return () => {
      if (node) {
        setNode(() => null);
      }

      if (aspect !== 1) {
        setAspect(1);
      }

      if (renderer) {
        setRenderer(() => null);
      }
    };
  }, []);

  useResize(
    node,
    function () {
      const { clientWidth = window.innerWidth, clientHeight = window.innerHeight } = node!;
      setAspect(clientWidth / clientHeight);
      renderer?.setSize?.(clientWidth, clientHeight);
    },
    [renderer, aspect]
  );

  return { ref, renderer, aspect };
};

export { useThree };
