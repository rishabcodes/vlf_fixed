#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of hooks that use framer-motion
const hooksToUpdate = [
  'useTextScramble.ts',
  'useOptimizedAnimation.ts',
  'useParallax.ts',
  'useMagneticHover.ts',
  'useGestures.ts'
];

// Simple replacement content for each hook
const replacements = {
  'useTextScramble.ts': `import { useEffect, useState } from 'react';

export function useTextScramble(text: string, duration: number = 2000) {
  const [displayText, setDisplayText] = useState(text);
  
  useEffect(() => {
    setDisplayText(text);
  }, [text]);
  
  return displayText;
}`,
  
  'useOptimizedAnimation.ts': `import { useSpring } from '@react-spring/web';

export function useOptimizedAnimation() {
  const springs = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 280, friction: 60 }
  });
  
  return springs;
}`,
  
  'useParallax.ts': `import { useSpring } from '@react-spring/web';
import { useEffect, useState } from 'react';

export function useParallax(speed: number = 0.5) {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const springs = useSpring({
    transform: \`translateY(\${scrollY * speed}px)\`,
    config: { mass: 1, tension: 280, friction: 60 }
  });
  
  return springs;
}`,
  
  'useMagneticHover.ts': `import { useSpring } from '@react-spring/web';
import { useState } from 'react';

export function useMagneticHover() {
  const [isHovered, setIsHovered] = useState(false);
  
  const springs = useSpring({
    scale: isHovered ? 1.05 : 1,
    config: { tension: 300, friction: 20 }
  });
  
  return {
    springs,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false)
  };
}`,
  
  'useGestures.ts': `import { useState } from 'react';

export function useGestures() {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handlers = {
    onMouseDown: () => setIsDragging(true),
    onMouseUp: () => setIsDragging(false),
    onMouseMove: (e: React.MouseEvent) => {
      if (isDragging) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    }
  };
  
  return {
    isDragging,
    position,
    handlers
  };
}`
};

// Update each hook file
hooksToUpdate.forEach(fileName => {
  const filePath = path.join(process.cwd(), 'src', 'hooks', fileName);
  
  if (fs.existsSync(filePath)) {
    const newContent = replacements[fileName];
    if (newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✅ Updated: ${fileName}`);
    }
  } else {
    console.log(`⚠️ File not found: ${fileName}`);
  }
});

console.log('\n✅ All hooks updated to remove framer-motion dependencies!');