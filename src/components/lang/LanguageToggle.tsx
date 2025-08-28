'use client';

import React, { useEffect, useRef } from 'react';

interface LanguageToggleProps {
  value: 'en' | 'es';
  onChange: (value: 'en' | 'es') => void;
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  value,
  onChange,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          onChange('en');
          break;
        case 'ArrowRight':
          e.preventDefault();
          onChange('es');
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          // Toggle between languages
          onChange(value === 'en' ? 'es' : 'en');
          break;
          }
};

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [value, onChange]);

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label="Language selection"
      className={`inline-flex rounded-full bg-black/70 backdrop-blur-md border border-[#C9974D]/30 p-1 text-sm pointer-events-auto ${className}`}
    >
      <button
        type="button"
        aria-pressed={value === 'en'}
        aria-label="Switch to English"
        onClick={() => onChange('en')}
        className={`px-3 py-1.5 rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9974D] ${
          value === 'en'
            ? 'bg-[#C9974D] text-black font-semibold shadow-sm'
            : 'text-white hover:text-[#C9974D] hover:bg-white/10'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        aria-pressed={value === 'es'}
        aria-label="Cambiar a Español"
        onClick={() => onChange('es')}
        className={`px-3 py-1.5 rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9974D] ${
          value === 'es'
            ? 'bg-[#C9974D] text-black font-semibold shadow-sm'
            : 'text-white hover:text-[#C9974D] hover:bg-white/10'
        }`}
      >
        ES
      </button>
    </div>
  );
};

export default LanguageToggle;