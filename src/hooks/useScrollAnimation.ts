import { useMemo } from 'react';
import { useEffect, useState } from 'react';

interface ScrollAnimationOptions {
  yRange?: [number, number];
  yOutput?: [number, number];
  opacityRange?: [number, number];
  opacityOutput?: [number, number];
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    yRange = [0, 500],
    yOutput = [0, 150],
    opacityRange = [0, 300],
    opacityOutput = [1, 0],
  } = options;

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const interpolate = (value: number, inputRange: [number, number], outputRange: [number, number]) => {
    const [inputMin, inputMax] = inputRange;
    const [outputMin, outputMax] = outputRange;
    const clampedValue = Math.min(Math.max(value, inputMin), inputMax);
    const percentage = (clampedValue - inputMin) / (inputMax - inputMin);
    return outputMin + percentage * (outputMax - outputMin);
  };

  const y = useMemo(() => interpolate(scrollY, yRange, yOutput), [scrollY, yRange, yOutput]);
  const opacity = useMemo(
    () => interpolate(scrollY, opacityRange, opacityOutput),
    [scrollY, opacityRange, opacityOutput]
  );

  return { y, opacity, scrollY };
}
