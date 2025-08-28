'use client';

import React, { useRef } from 'react';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import HeroScene from '@/components/hero/HeroScene';
import HeroStats from '@/components/hero/HeroStats';
import HeroTestimonials from '@/components/hero/HeroTestimonials';
import VeteranBadge from '@/components/hero/VeteranBadge';
import ScrollIndicator from '@/components/hero/ScrollIndicator';
import HeroContent from '@/components/hero/HeroContent';

interface ModernHeroProps {
  language: 'en' | 'es';
}

export default function ModernHero({ language }: ModernHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { y, opacity } = useScrollAnimation();

  const content = {
    en: {
      badge: 'U.S. Air Force Veteran Attorney',
      title: 'YO PELEO POR TI™',
      subtitle: 'I FIGHT FOR YOU',
      description:
        'When you need a fighter in your corner, I bring military discipline and legal expertise to protect your rights and secure your future.',
      cta1: 'Free Case Evaluation',
      cta2: 'Call Now: 1-844-YO-PELEO',
      stats: [
        { value: '60+', label: 'Years Collective Experience' },
        { value: '30,000+', label: 'Clients Helped' },
        { value: '4', label: 'Office Locations' },
        { value: '24/7', label: 'Available' },
      ],
      testimonials: [
        {
          text: "Mr. Vasquez fought tirelessly for my family's immigration case. His dedication changed our lives.",
          author: 'Sofia R., Charlotte',
        },
        {
          text: 'After my accident, Vasquez Law Firm got me the compensation I deserved. True advocates!',
          author: 'Michael T., Raleigh',
        },
        {
          text: 'They helped me when I needed it most. Professional, caring, and effective.',
          author: 'Maria G., Smithfield',
        },
        {
          text: "Outstanding representation for my workers' comp case. Highly recommend!",
          author: 'James P., Orlando',
        },
      ],
    },
    es: {
      badge: 'Abogado Veterano de la Fuerza Aérea',
      title: 'YO PELEO POR TI™',
      subtitle: 'I FIGHT FOR YOU',
      description:
        'Cuando necesitas un luchador en tu esquina, traigo disciplina militar y experiencia legal para proteger tus derechos y asegurar tu futuro.',
      cta1: 'Evaluación Gratuita',
      cta2: 'Llame Ahora: 1-844-YO-PELEO',
      stats: [
        { value: '60+', label: 'Años de Experiencia Colectiva' },
        { value: '30,000+', label: 'Clientes Ayudados' },
        { value: '4', label: 'Oficinas' },
        { value: '24/7', label: 'Disponible' },
      ],
      testimonials: [
        {
          text: 'El Sr. Vasquez luchó incansablemente por el caso de inmigración de mi familia. Su dedicación cambió nuestras vidas.',
          author: 'Sofia R., Charlotte',
        },
        {
          text: 'Después de mi accidente, Vasquez Law Firm me consiguió la compensación que merecía. ¡Verdaderos defensores!',
          author: 'Michael T., Raleigh',
        },
        {
          text: 'Me ayudaron cuando más lo necesitaba. Profesionales, atentos y efectivos.',
          author: 'Maria G., Smithfield',
        },
        {
          text: '¡Excelente representación para mi caso de compensación laboral. Los recomiendo mucho!',
          author: 'James P., Orlando',
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section ref={containerRef}
                className="relative overflow-hidden bg-black" 
                style={{ minHeight: 'calc(100vh + 60px)', paddingTop: '60px' }}>
      {/* 3D Background */}
      <HeroScene />

      {/* Extended Gradient Overlay - starts from the very top */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-secondary/80 to-black" 
           style={{ top: '-60px' }} />

      {/* Main Content - adjusted to ensure CTAs are visible */}
      <div
className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center pt-20"
      >
        {/* Veteran Badge */}
        <VeteranBadge text={t.badge} />

        {/* Main Hero Content */}
        <HeroContent
          title={t.title}
          subtitle={t.subtitle}
          description={t.description}
          cta1={t.cta1}
          cta2={t.cta2}
        />

        {/* Stats */}
        <HeroStats stats={t.stats} />

        {/* Testimonial Carousel */}
        <HeroTestimonials testimonials={t.testimonials} />
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
