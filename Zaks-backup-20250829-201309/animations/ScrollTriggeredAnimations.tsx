'use client';

import React, { useState, useEffect, useRef } from 'react';

// Scroll reveal component
interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getDirectionClasses = () => {
    const baseClasses = 'transition-all duration-700 ease-out';
    
    if (!isVisible) {
      switch (direction) {
        case 'down':
          return `${baseClasses} opacity-0 -translate-y-8`;
        case 'left':
          return `${baseClasses} opacity-0 translate-x-8`;
        case 'right':
          return `${baseClasses} opacity-0 -translate-x-8`;
        default:
          return `${baseClasses} opacity-0 translate-y-8`;
      }
    }
    
    return `${baseClasses} opacity-100 translate-x-0 translate-y-0`;
  };

  return (
    <div ref={elementRef} className={`${getDirectionClasses()} ${className}`}>
      {children}
    </div>
  );
}

// Scroll counter component
interface ScrollCounterProps {
  end: number;
  duration?: number;
  className?: string;
}

export function ScrollCounter({
  end,
  duration = 2000,
  className = '',
}: ScrollCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const increment = end / (duration / 16); // 60 FPS
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, end, duration]);

  return (
    <div ref={elementRef} className={className}>
      {count.toLocaleString()}
    </div>
  );
}

// Scroll progress bar
interface ScrollProgressProps {
  className?: string;
  color?: string;
}

export function ScrollProgress({
  className = '',
  color = '#6B1F2E',
}: ScrollProgressProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full h-1 bg-gray-200 z-50 ${className}`}>
      <div
        className="h-full transition-all duration-150 ease-out"
        style={{
          width: `${scrollProgress * 100}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}

// Parallax on scroll
interface ParallaxScrollProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxScroll({
  children,
  speed = 0.5,
  className = '',
}: ParallaxScrollProps) {
  const [offsetY, setOffsetY] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -speed;
        setOffsetY(rate);
          }
};

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{ transform: `translateY(${offsetY}px)` }}
    >
      {children}
    </div>
  );
}

// Sticky reveal component
interface StickyRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function StickyReveal({
  children,
  className = '',
}: StickyRevealProps) {
  const [isSticky, setIsSticky] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={elementRef} className="h-0" />
      <div
        className={`transition-all duration-300 ${
          isSticky ? 'fixed top-0 left-0 w-full z-40 shadow-lg' : 'relative'
        } ${className}`}
      >
        {children}
      </div>
    </>
  );
}

// Scale on scroll
interface ScaleOnScrollProps {
  children: React.ReactNode;
  maxScale?: number;
  className?: string;
}

export function ScaleOnScroll({
  children,
  maxScale = 1.2,
  className = '',
}: ScaleOnScrollProps) {
  const [scale, setScale] = useState(1);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
        const newScale = 1 + (maxScale - 1) * scrollProgress;
        setScale(newScale);
          }
};

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [maxScale]);

  return (
    <div
      ref={elementRef}
      className={`transition-transform duration-100 ${className}`}
      style={{ transform: `scale(${scale})` }}
    >
      {children}
    </div>
  );
}
