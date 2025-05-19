import { proxy } from 'valtio';
import { useProxy } from 'valtio/utils';
import type { ModelPart } from '@/components/helper/meta';

type Position = {
  x: number;
  y: number;
};

const store = proxy({
  distance: 6.5,
  explosive: true,
  resetToggle: false,
  selectedModel: null as ModelPart | null,
  clickPosition: null as Position | null,
  infoShow: false
});

export const useStore = () => useProxy(store);
