'use client';

import React, { useState } from 'react';

// Liquid button component
interface LiquidButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
  className?: string;
}

export function LiquidButton({
  children,
  onClick,
  color = '#6B1F2E',
  className = '',
}: LiquidButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`relative overflow-hidden px-8 py-4 text-white font-semibold rounded-lg transition-all duration-300 ${className}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background liquid effect */}
      <div
        className={`absolute inset-0 transition-transform duration-500 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
        style={{ backgroundColor: color }}
      >
        <svg
          className="absolute bottom-0 left-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="liquid">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="liquid"
              />
            </filter>
          </defs>
          <path
            d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z"
            fill={color}
            filter="url(#liquid)"
            className={`transition-all duration-500 ${
              isHovered ? 'translate-y-2' : 'translate-y-0'
            }`}
          />
        </svg>
      </div>

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// Liquid reveal section
interface LiquidRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function LiquidReveal({
  children,
  className = '',
}: LiquidRevealProps) {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('liquid-reveal');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="liquid-reveal"
      className={`relative overflow-hidden ${className}`}
    >
      {/* Liquid background */}
      <div
        className={`absolute inset-0 transition-transform duration-1000 ease-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 Q25,80 50,100 T100,100 L100,0 L0,0 Z"
            fill="url(#liquidGradient)"
          />
          <defs>
            <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6B1F2E" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#C9974D" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div
        className={`relative z-10 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

// Liquid blob component
interface LiquidBlobProps {
  size?: number;
  color?: string;
  className?: string;
}

export function LiquidBlob({
  size = 200,
  color = '#6B1F2E',
  className = '',
}: LiquidBlobProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className={`transition-transform duration-2000 ease-in-out ${
          isAnimating ? 'scale-110 rotate-180' : 'scale-100 rotate-0'
        }`}
      >
        <defs>
          <filter id="blob" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="blob"
            />
          </filter>
        </defs>
        <path
          d="M100,20 C140,20 180,60 180,100 C180,140 140,180 100,180 C60,180 20,140 20,100 C20,60 60,20 100,20 Z"
          fill={color}
          filter="url(#blob)"
          className={`transition-all duration-2000 ease-in-out ${
            isAnimating ? 'scale-110' : 'scale-100'
          }`}
        />
      </svg>
    </div>
  );
}

// Liquid loader component
export function LiquidLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-16 h-16 ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full animate-spin"
        viewBox="0 0 50 50"
      >
        <defs>
          <filter id="loader" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="loader"
            />
          </filter>
        </defs>
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="#6B1F2E"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="31.416"
          strokeDashoffset="31.416"
          filter="url(#loader)"
        >
          <animate
            attributeName="stroke-dasharray"
            dur="2s"
            values="0 31.416;15.708 15.708;0 31.416"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
