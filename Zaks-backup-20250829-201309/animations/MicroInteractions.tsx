'use client';

import React, { useState, useEffect } from 'react';

// Ripple button component
interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  color?: string;
}

export function RippleButton({
  children,
  onClick,
  className = '',
  color = '#6B1F2E',
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [rippleId, setRippleId] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: rippleId };
    setRipples(prev => [...prev, newRipple]);
    setRippleId(prev => prev + 1);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);

    onClick?.();
  };

  return (
    <button
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            backgroundColor: color,
            opacity: 0.3,
          }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// Success animation with confetti
interface SuccessAnimationProps {
  trigger: boolean;
  message?: string;
  onComplete?: () => void;
}

export function SuccessAnimation({
  trigger,
  message = 'Success!',
  onComplete,
}: SuccessAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  useEffect(() => {
    if (trigger) {
      setIsVisible(true);
      
      // Generate confetti
      const newConfetti = Array.from({ length: 20 }, (_, index) => ({
        id: index,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ['#6B1F2E', '#C9974D', '#FFD700', '#FF6B6B'][Math.floor(Math.random() * 4)],
      }));
      setConfetti(newConfetti);

      // Hide after animation
      const timer = setTimeout(() => {
        setIsVisible(false);
        setConfetti([]);
        onComplete?.();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      {/* Confetti */}
      {confetti.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${1 + Math.random()}s`,
          }}
        />
      ))}
      
      {/* Success message */}
      <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-semibold">{message}</span>
        </div>
      </div>
    </div>
  );
}

// Hover scale animation
interface HoverScaleProps {
  children: React.ReactNode;
  scale?: number;
  className?: string;
}

export function HoverScale({
  children,
  scale = 1.05,
  className = '',
}: HoverScaleProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{ transform: isHovered ? `scale(${scale})` : 'scale(1)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}

// Loading dots animation
interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function LoadingDots({
  size = 'md',
  color = '#6B1F2E',
  className = '',
}: LoadingDotsProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const dotSize = sizeClasses[size];

  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map(index => (
        <div
          key={index}
          className={`${dotSize} rounded-full animate-bounce`}
          style={{
            backgroundColor: color,
            animationDelay: `${index * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}

// Pulse animation
interface PulseProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function Pulse({
  children,
  color = '#6B1F2E',
  className = '',
}: PulseProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute inset-0 rounded-full animate-ping opacity-75"
        style={{ backgroundColor: color }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

// Shake animation
interface ShakeProps {
  children: React.ReactNode;
  trigger: boolean;
  className?: string;
}

export function Shake({
  children,
  trigger,
  className = '',
}: ShakeProps) {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 600);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div
      className={`${isShaking ? 'animate-shake' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

// Floating animation
interface FloatingProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}

export function Floating({
  children,
  duration = 3,
  className = '',
}: FloatingProps) {
  return (
    <div
      className={`animate-float ${className}`}
      style={{ animationDuration: `${duration}s` }}
    >
      {children}
    </div>
  );
}

// Rotate on hover
interface RotateOnHoverProps {
  children: React.ReactNode;
  degrees?: number;
  className?: string;
}

export function RotateOnHover({
  children,
  degrees = 180,
  className = '',
}: RotateOnHoverProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`transition-transform duration-300 ease-in-out ${className}`}
      style={{ transform: isHovered ? `rotate(${degrees}deg)` : 'rotate(0deg)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}
