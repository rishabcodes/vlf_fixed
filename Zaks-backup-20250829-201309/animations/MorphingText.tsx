'use client';

import React, { useEffect, useState } from 'react';
import { useTextScramble, useGlitchText, useTypewriter } from '@/hooks/useTextScramble';

interface MorphingTextProps {
  texts: string[];
  interval?: number;
  className?: string;
  type?: 'morph' | 'scramble' | 'glitch' | 'typewriter';
}

export function MorphingText({
  texts,
  interval = 3000,
  className = '',
  type = 'morph',
}: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentText = texts[currentIndex] || '';

  // Call all hooks unconditionally at the top level
  const scrambleResult = useTextScramble(currentText || '');
  const glitchResult = useGlitchText(currentText || '');
  const typewriterResult = useTypewriter(currentText || '');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  if (type === 'scramble') {
    const { ref, displayText } = scrambleResult;
    return (
      <span ref={ref as React.RefObject<HTMLSpanElement>}

                className={className}>
        {displayText}
      </span>
    );
  }

  if (type === 'glitch') {
    const { ref, glitchedText } = glitchResult;
    return (
      <span ref={ref as React.RefObject<HTMLSpanElement>}

                className={className}>
        {glitchedText}
      </span>
    );
  }

  if (type === 'typewriter') {
    const { ref, displayText } = typewriterResult;
    return (
      <span ref={ref as React.RefObject<HTMLSpanElement>}

                className={className}>
        {displayText}
      </span>
    );
  }

  // Default morph animation
  return (
    <>
      <span
        key={currentIndex}

                className={className}
      >
        {currentText}
      </span>
    </>
  );
}

// Advanced split text animation component
interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function SplitText({ text, className = '', delay = 0, stagger = 0.03 }: SplitTextProps) {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split('').map((char, charIndex) => (
            <span
                key={`${wordIndex}-${charIndex}`} className="inline-block">
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

// Gradient animated text
export function GradientText({
  text,
  gradient = 'from-[#6B1F2E] via-[#C9974D] to-[#8B2635]',
  className = '',
}: {
  text: string;
  gradient?: string;
  className?: string;
}) {
  return (
    <span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`     }
    >
      {text}
    </span>
  );
}
