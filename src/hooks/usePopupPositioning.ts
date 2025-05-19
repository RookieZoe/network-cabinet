import React, { useState, useEffect, useRef, useCallback } from 'react';

const usePopupPositioning = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  isVisible: boolean,
  initialClickPosition: { x: number; y: number } | null
) => {
  const [position, setPosition] = useState<{ left?: number; top?: number }>({});
  const originalClickPositionRef = useRef<{ x: number; y: number } | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Debounce function to limit how often the resize handler is called
  const debounce = <T extends (...args: any[]) => any>(fn: T, ms: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  // Store original click position for reference
  useEffect(() => {
    if (initialClickPosition && isVisible) {
      originalClickPositionRef.current = initialClickPosition;
    }
  }, [initialClickPosition, isVisible]);

  // Calculate position based on click position
  const calculatePosition = useCallback(() => {
    if (!originalClickPositionRef.current || !containerRef.current) return {};

    const clickPosition = originalClickPositionRef.current;
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Default position (20px offset from cursor)
    let left = clickPosition.x + 20;
    let top = clickPosition.y + 20;

    // Preferred margins from screen edges (px)
    const margin = 10;

    // Check if there's enough space to the right
    const hasEnoughSpaceRight = left + containerWidth <= windowWidth - margin;

    // Check if there's enough space to the left
    const hasEnoughSpaceLeft = clickPosition.x - containerWidth - 20 >= margin;

    // Check if there's enough space below
    const hasEnoughSpaceBelow = top + containerHeight <= windowHeight - margin;

    // Check if there's enough space above
    const hasEnoughSpaceAbove = clickPosition.y - containerHeight - 20 >= margin;

    // Handle horizontal positioning (always prioritize being close to cursor)
    if (!hasEnoughSpaceRight) {
      // Not enough space to the right, try edge left
      if (hasEnoughSpaceLeft) {
        // Position to the left of cursor
        left = windowWidth - containerWidth - 20;
      } else {
        // Not enough space on either side, align with viewport edge
        left = Math.max(margin, Math.min(windowWidth - containerWidth - margin, left));
      }
    }

    // Handle vertical positioning (always prioritize being close to cursor)
    if (!hasEnoughSpaceBelow) {
      // Not enough space below, try above
      if (hasEnoughSpaceAbove) {
        // Position above cursor
        top = windowHeight - containerHeight - 20;
      } else {
        // Not enough space above or below, align with viewport edge
        top = Math.max(margin, Math.min(windowHeight - containerHeight - margin, top));
      }
    }

    return { left, top };
  }, [containerRef]);

  // Update position based on viewport constraints while respecting original click position
  const adjustPosition = useCallback(() => {
    if (containerRef?.current && originalClickPositionRef?.current) {
      setPosition(() => calculatePosition());
    }
  }, [containerRef, originalClickPositionRef]);

  // Initialize position when component becomes visible
  useEffect(() => {
    if (isVisible && initialClickPosition && containerRef.current) {
      // Small delay to allow the component to render first
      requestAnimationFrame(() => {
        const initialPosition = calculatePosition();
        setPosition(initialPosition);
      });
    }
  }, [isVisible, initialClickPosition, containerRef, calculatePosition]);

  // Set up IntersectionObserver
  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    // Create the observer with a zero margin to detect when popup is at the viewport edge
    const options = {
      root: null, // Use viewport as root
      rootMargin: '0px', // Exact viewport edge
      threshold: 1.0 // Trigger when 100% of the element is visible/invisible
    };

    // Create and connect observer after a small delay to allow initial rendering
    const timer = setTimeout(() => {
      observerRef.current = new IntersectionObserver(entries => {
        // If the popup isn't fully visible (intersectionRatio < 1)
        const entry = entries[0];
        if (entry && 1 - entry.intersectionRatio > 0.001) {
          adjustPosition();
        }
      }, options);

      if (containerRef.current) {
        observerRef.current.observe(containerRef.current);
      }
    }, 100);

    // Create debounced resize handler to limit recalculations
    const handleResize = debounce(() => {
      adjustPosition();
    }, 200); // 200ms debounce time

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      observerRef?.current?.disconnect?.();
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible, containerRef]);

  return position;
};

export default usePopupPositioning;
