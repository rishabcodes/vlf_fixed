import { useEffect, useState } from 'react';

interface ScrollState {
  isScrolled: boolean;
  isCompact: boolean;
  scrollY: number;
}

export function useScrollHeader(threshold = 4): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    isScrolled: false,
    isCompact: false,
    scrollY: 0,
  });

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      
      setScrollState({
        isScrolled: scrollY > threshold,
        isCompact: scrollY > 100, // Compact mode after 100px
        scrollY,
      });
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    // Initial check
    updateScrollState();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return scrollState;
}