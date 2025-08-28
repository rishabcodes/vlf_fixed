'use client';

import React, { useRef, useState, useEffect } from 'react';

// Magnetic button component
interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  strength = 0.3,
  className = '',
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState('translate3d(0px, 0px, 0px)');

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const moveX = x * strength;
    const moveY = y * strength;

    setTransform(`translate3d(${moveX}px, ${moveY}px, 0px)`);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('translate3d(0px, 0px, 0px)');
  };

  return (
    <button
      ref={buttonRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <span
        className={`block transition-transform duration-300 ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
      >
        {children}
      </span>
    </button>
  );
}

// Magnetic card component
interface MagneticCardProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticCard({
  children,
  strength = 0.2,
  className = '',
}: MagneticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const moveX = x * strength;
    const moveY = y * strength;
    const rotateX = (y / rect.height) * 10;
    const rotateY = (x / rect.width) * 10;

    setTransform(
      `translate3d(${moveX}px, ${moveY}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    );
  };

  const handleMouseLeave = () => {
    setTransform('translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg)');
  };

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transform, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

// Magnetic cursor follower
interface MagneticCursorProps {
  className?: string;
  size?: number;
}

export function MagneticCursor({ className = '', size = 20 }: MagneticCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={`fixed pointer-events-none z-50 rounded-full bg-[#6B1F2E] opacity-50 transition-all duration-200 ${
        isVisible ? 'scale-100' : 'scale-0'
      } ${className}`}
      style={{
        left: position.x - size / 2,
        top: position.y - size / 2,
        width: size,
        height: size,
      }}
    />
  );
}

// Magnetic text component
interface MagneticTextProps {
  children: string;
  className?: string;
  strength?: number;
}

export function MagneticText({
  children,
  className = '',
  strength = 0.1,
}: MagneticTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [transforms, setTransforms] = useState<string[]>([]);

  useEffect(() => {
    setTransforms(new Array(children.length).fill('translate3d(0px, 0px, 0px)'));
  }, [children]);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!textRef.current) return;

    const rect = textRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newTransforms = children.split('').map((_, index) => {
      const charWidth = rect.width / children.length;
      const charX = index * charWidth + charWidth / 2;
      const distance = Math.sqrt(Math.pow(mouseX - charX, 2) + Math.pow(mouseY - rect.height / 2, 2));
      const influence = Math.max(0, 1 - distance / 100);
      
      const moveX = (mouseX - charX) * influence * strength;
      const moveY = (mouseY - rect.height / 2) * influence * strength;

      return `translate3d(${moveX}px, ${moveY}px, 0px)`;
    });

    setTransforms(newTransforms);
  };

  const handleMouseLeave = () => {
    setTransforms(new Array(children.length).fill('translate3d(0px, 0px, 0px)'));
  };

  return (
    <span
      ref={textRef}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block transition-transform duration-200 ease-out"
          style={{ transform: transforms[index] || 'translate3d(0px, 0px, 0px)' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
