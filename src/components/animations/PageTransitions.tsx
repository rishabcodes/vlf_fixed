'use client';

import React, { useState, useEffect } from 'react';

// Page transition wrapper
interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  type?: 'fade' | 'slide' | 'scale' | 'rotate';
}

export function PageTransition({
  children,
  className = '',
  type = 'fade',
}: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getTransitionClasses = () => {
    const baseClasses = 'transition-all duration-500 ease-in-out';
    
    switch (type) {
      case 'slide':
        return `${baseClasses} ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`;
      case 'scale':
        return `${baseClasses} ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`;
      case 'rotate':
        return `${baseClasses} ${isVisible ? 'rotate-0 opacity-100' : 'rotate-12 opacity-0'}`;
      default:
        return `${baseClasses} ${isVisible ? 'opacity-100' : 'opacity-0'}`;
        }
};

  return (
    <div className={`${getTransitionClasses()} ${className}`}>
      {children}
    </div>
  );
}

// Route transition component
interface RouteTransitionProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

export function RouteTransition({ children, isLoading = false }: RouteTransitionProps) {
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-[#6B1F2E] rounded-full animate-bounce" />
            <div className="w-3 h-3 bg-[#6B1F2E] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-3 h-3 bg-[#6B1F2E] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>
      )}
      <PageTransition type="fade">
        {children}
      </PageTransition>
    </div>
  );
}

// Slide in from direction
interface SlideInProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  className?: string;
}

export function SlideIn({
  children,
  direction = 'left',
  delay = 0,
  className = '',
}: SlideInProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const getDirectionClasses = () => {
    const baseClasses = 'transition-all duration-700 ease-out';
    
    switch (direction) {
      case 'right':
        return `${baseClasses} ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`;
      case 'up':
        return `${baseClasses} ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`;
      case 'down':
        return `${baseClasses} ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`;
      default:
        return `${baseClasses} ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`;
        }
};

  return (
    <div className={`${getDirectionClasses()} ${className}`}>
      {children}
    </div>
  );
}

// Stagger children animation
interface StaggerChildrenProps {
  children: React.ReactNode[];
  delay?: number;
  className?: string;
}

export function StaggerChildren({
  children,
  delay = 100,
  className = '',
}: StaggerChildrenProps) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    children.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => new Set([...prev, index]));
      }, index * delay);
    });
  }, [children, delay]);

  return (
    <div className={className}>
      {children.map((child, index) => (
        <div
          key={index}
          className={`transition-all duration-500 ease-out ${
            visibleItems.has(index)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

// Modal transition
interface ModalTransitionProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function ModalTransition({
  isOpen,
  onClose,
  children,
}: ModalTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="flex items-center justify-center min-h-full p-4">
        <div
          className={`relative bg-white rounded-lg shadow-xl transition-all duration-300 ${
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// Accordion transition
interface AccordionTransitionProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}

export function AccordionTransition({
  isOpen,
  children,
  className = '',
}: AccordionTransitionProps) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      } ${className}`}
    >
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

// Flip card transition
interface FlipCardTransitionProps {
  front: React.ReactNode;
  back: React.ReactNode;
  isFlipped: boolean;
  className?: string;
}

export function FlipCardTransition({
  front,
  back,
  isFlipped,
  className = '',
}: FlipCardTransitionProps) {
  return (
    <div className={`relative w-full h-full perspective-1000 ${className}`}>
      <div
        className={`relative w-full h-full transition-transform duration-600 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          {front}
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          {back}
        </div>
      </div>
    </div>
  );
}
