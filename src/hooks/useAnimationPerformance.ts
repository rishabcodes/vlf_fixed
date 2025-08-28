'use client';

import { useEffect, useState, useRef } from 'react';
import { useDeviceCapabilities } from '@/lib/performance/device-detection';

interface AnimationPerformanceOptions {
  targetFPS?: number;
  enableGPU?: boolean;
  reducedMotion?: boolean;
  adaptive?: boolean;
}

export function useAnimationPerformance({
  targetFPS = 60,
  enableGPU = true,
  reducedMotion = true,
  adaptive = true,
}: AnimationPerformanceOptions = {}) {
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');
  const [actualFPS, setActualFPS] = useState(60);
  const frameCount = useRef(0);
  const lastTime = useRef(Date.now());
  const capabilities = useDeviceCapabilities();

  useEffect(() => {
    if (!adaptive) return;

    let animationId: number;

    const measureFPS = () => {
      frameCount.current++;
      const currentTime = Date.now();
      const delta = currentTime - lastTime.current;

      if (delta >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / delta);
        setActualFPS(fps);

        // Adjust quality based on FPS
        if (fps < targetFPS * 0.5) {
          setQuality('low');
        } else if (fps < targetFPS * 0.8) {
          setQuality('medium');
        } else {
          setQuality('high');
        }

        frameCount.current = 0;
        lastTime.current = currentTime;
      }

      animationId = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [targetFPS, adaptive]);

  // Determine if animations should be enabled
  const shouldAnimate = !capabilities.hasReducedMotion || !reducedMotion;

  // Get optimized animation properties
  const getAnimationProps = () => {
    if (!shouldAnimate) return {};

    const baseProps = {
      willChange: enableGPU ? 'transform' : undefined,
    };

    switch (quality) {
      case 'low':
        return {
          ...baseProps,
          transition: { duration: 0.2, ease: 'linear' },
        };
      case 'medium':
        return {
          ...baseProps,
          transition: { duration: 0.3, ease: 'easeOut' },
        };
      case 'high':
      default:
        return {
          ...baseProps,
          transition: { type: 'spring', damping: 20, stiffness: 300 },
        };
      }
};

  return {
    quality,
    actualFPS,
    shouldAnimate,
    getAnimationProps,
    isLowEnd: capabilities.isLowEnd,
    hasReducedMotion: capabilities.hasReducedMotion,
  };
}

// GPU-accelerated transform hook
export function useGPUTransform() {
  const transform = useRef({
    x: 0,
    y: 0,
    z: 0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
  });

  const getTransformString = () => {
    const { x, y, z, rotateX, rotateY, rotateZ, scale } = transform.current;
    return `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale3d(${scale}, ${scale}, 1)`;
  };

  const updateTransform = (updates: Partial<typeof transform.current>) => {
    transform.current = { ...transform.current, ...updates };
    return getTransformString();
  };

  return {
    transform: transform.current,
    updateTransform,
    getTransformString,
  };
}

// RAF-based animation loop
export function useAnimationFrame(callback: (deltaTime: number) => void) {
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);

  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        }
};
  }, [callback]); // eslint-disable-line react-hooks/exhaustive-deps
  // Callback is intentionally in deps to ensure latest version is used
}

// Smooth value interpolation
export function useSmoothValue(targetValue: number, smoothness: number = 0.1) {
  const [currentValue, setCurrentValue] = useState(targetValue);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      setCurrentValue(prev => {
        const diff = targetValue - prev;
        if (Math.abs(diff) < 0.01) {
          return targetValue;
        }
        return prev + diff * smoothness;
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        }
};
  }, [targetValue, smoothness]);

  return currentValue;
}
