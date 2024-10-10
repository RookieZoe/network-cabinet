import { useEffect } from 'react';
import wrapperRaf from 'rc-util/es/raf';
import addEventListener from 'rc-util/es/Dom/addEventListener';

export function useResize(
  $el: HTMLElement | null,
  callback: () => void,
  deps: React.DependencyList | undefined = []
) {
  useEffect(() => {
    let id = 0;
    const handler = () => {
      id = wrapperRaf(callback);
    };

    if ($el) {
      if (window.ResizeObserver) {
        const resizeObserver = new window.ResizeObserver(handler);
        resizeObserver.observe($el);
        return () => {
          wrapperRaf.cancel(id);
          resizeObserver.disconnect();
        };
      } else {
        const { remove } = addEventListener(window, 'resize', handler, true);
        return () => {
          wrapperRaf.cancel(id);
          remove();
        };
      }
    }
  }, [$el, ...deps]);
}
