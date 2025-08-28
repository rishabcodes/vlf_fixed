'use client';

import React, { useRef, useEffect, useState } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  backgroundImage?: string;
  height?: string;
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className = '',
  backgroundImage,
  height = '100vh',
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        setOffsetY(rate);
          }
};

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            transform: `translateY(${offsetY}px)`,
          }}
        />
      )}
      
      <div className="relative z-10 h-full flex items-center justify-center">
        {children}
      </div>
    </section>
  );
}

// Parallax image component
interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.5,
  className = '',
}: ParallaxImageProps) {
  const [offsetY, setOffsetY] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        setOffsetY(rate);
          }
};

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={imageRef} className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ transform: `translateY(${offsetY}px)` }}
      />
    </div>
  );
}

// Parallax text component
interface ParallaxTextProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function ParallaxText({
  children,
  speed = 0.3,
  direction = 'up',
  className = '',
}: ParallaxTextProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (textRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        
        switch (direction) {
          case 'down':
            setOffset({ x: 0, y: rate });
            break;
          case 'left':
            setOffset({ x: -rate, y: 0 });
            break;
          case 'right':
            setOffset({ x: rate, y: 0 });
            break;
          default:
            setOffset({ x: 0, y: -rate });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return (
    <div
      ref={textRef}
      className={className}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      {children}
    </div>
  );
}
