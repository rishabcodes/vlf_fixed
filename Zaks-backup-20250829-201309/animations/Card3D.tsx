'use client';

import React, { useRef, useState } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
}

export function Card3D({
  children,
  className = '',
}: Card3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative transform-gpu transition-transform duration-300 ${
        isHovered ? 'scale-105' : ''
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full w-full">
        {/* Card content */}
        <div className="relative h-full w-full rounded-xl bg-white shadow-2xl">{children}</div>

        {/* Glow effect */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#6B1F2E]/20 to-[#C9974D]/20 opacity-0 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : ''
          }`}
        />
      </div>
    </div>
  );
}

// Flip card component
interface FlipCard3DProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

export function FlipCard3D({ front, back, className = '' }: FlipCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <div
        className="relative h-full w-full cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front face */}
        <div className={`absolute inset-0 rounded-xl transition-transform duration-500 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}>
          {front}
        </div>

        {/* Back face */}
        <div
          className={`absolute inset-0 rounded-xl transition-transform duration-500 ${
            isFlipped ? '' : 'rotate-y-180'
          }`}
        >
          {back}
        </div>
      </div>
    </div>
  );
}

// 3D carousel card
interface CarouselCard3DProps {
  children: React.ReactNode;
  index: number;
  total: number;
  className?: string;
}

export function CarouselCard3D({
  children,
  index,
  total,
  className = '',
}: CarouselCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative transform-gpu transition-all duration-300 ${
        isHovered ? 'scale-105 z-10' : ''
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full w-full">
        <div className="h-full w-full rounded-xl bg-white shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
}

// Stacked cards component
interface StackedCards3DProps {
  cards: React.ReactNode[];
  className?: string;
}

export function StackedCards3D({ cards, className = '' }: StackedCards3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={`relative ${className}`}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={`absolute inset-0 cursor-pointer transition-all duration-300 ${
            index === activeIndex
              ? 'z-10 scale-100'
              : 'z-0 scale-95 opacity-70'
          }`}
          style={{
            transform: `translateY(${(index - activeIndex) * 10}px) translateX(${
              (index - activeIndex) * 5
            }px)`,
          }}
          onClick={() => setActiveIndex(index)}
        >
          <Card3D>{card}</Card3D>
        </div>
      ))}
    </div>
  );
}
