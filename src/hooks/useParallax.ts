import { useEffect, useState, useRef } from 'react';

export function useParallax(speed: number = 0.5) {
  const [scrollY, setScrollY] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const offsetY = useTransform(() => -scrollY * speed);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { x, y, offsetY, scrollY };
}

export function usePerspectiveParallax(depth: number = 20, scaleValue: number = 1.02) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [depth, -depth]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-depth, depth]);
  const z = useTransform(mouseX, [-0.5, 0.5], [0, 0]);
  const scale = useTransform(mouseX, [-0.5, 0.5], [1, scaleValue]);

  return { cardRef, rotateX, rotateY, z, scale, mouseX, mouseY };
}
