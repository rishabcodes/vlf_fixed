'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BannerProps {
  className?: string;
  locale?: 'en' | 'es';
  message?: string;
}

export function Banner({ className, locale = 'en', message }: BannerProps) {
  const defaultMessage = locale === 'es' 
    ? 'Consulta Gratuita Disponible - Llámanos Ahora' 
    : 'Free Consultation Available - Call Us Now';

  return (
    <div
      className={cn(
        'bg-gradient-to-r from-[#6B1F2E] to-[#8b2635] text-white py-0.5 px-4 overflow-hidden h-[20px] flex items-center',
        'shadow-lg',
        className
      )}
      style={{
        backgroundColor: '#6B1F2E',
        minHeight: '20px',
        position: 'relative',
        zIndex: 100,
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full px-2">
        <div className="flex items-center space-x-4">
          <span className="text-[#C9974D] font-bold text-[10px] uppercase tracking-wider">
            📞 1-844-YO-PELEO
          </span>
          <span className="text-white/50 text-[10px] hidden sm:inline">|</span>
          <span className="text-white text-[10px] hidden sm:inline">
            {locale === 'es' ? '📧 info@vasquezlawnc.com' : '📧 info@vasquezlawnc.com'}
          </span>
          <span className="text-white/50 text-[10px] hidden md:inline">|</span>
          <span className="text-white text-[10px] hidden md:inline">
            📍 Charlotte, NC & Atlanta, GA
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[#C9974D] text-[10px] font-bold animate-pulse">
            {locale === 'es' ? '24/7 Disponible' : '24/7 Available'}
          </span>
        </div>
      </div>
    </div>
  );
}