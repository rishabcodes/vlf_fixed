'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Users, Trophy, Clock, Star } from 'lucide-react';
import { block } from 'million/react';

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  label: string;
  color: string;
}

const stats: Stat[] = [
  {
    icon: Users,
    value: 50000,
    suffix: '+',
    label: 'Clientes Satisfechos',
    color: 'from-[#6B1F2E] to-[#8B2635]',
  },
  {
    icon: Trophy,
    value: 95,
    suffix: '%',
    label: 'Casos Exitosos',
    color: 'from-[#C9974D] to-[#D4A574]',
  },
  {
    icon: Clock,
    value: 30,
    suffix: '+',
    label: 'Años de Experiencia',
    color: 'from-[#6B1F2E] to-[#8B2635]',
  },
  {
    icon: Star,
    value: 4.9,
    suffix: '',
    label: 'Calificación Promedio',
    color: 'from-[#C9974D] to-[#D4A574]',
  },
];

// Create the original AnimatedNumber component
function AnimatedNumberComponent({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
          }
};
  }, []);

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}

                className="tabular-nums">
      {count.toFixed(value % 1 !== 0 ? 1 : 0)}
      {suffix}
    </span>
  );
}

// Create a block-optimized version
const AnimatedNumber = block(AnimatedNumberComponent);

export function AnimatedStats() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Números que Hablan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nuestra trayectoria y resultados demuestran nuestro compromiso con cada cliente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}

                className="relative group"
            >
              {/* Card */}
              <div className="glass-card p-8 rounded-2xl text-center relative overflow-hidden">
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Icon */}
                <div
                  className={`inline-flex p-4 rounded-full bg-gradient-to-br ${stat.color} mb-4`}
                >
                  {React.createElement(stat.icon, { className: 'w-8 h-8 text-white' })}
                </div>

                {/* Number */}
                <div className="text-4xl md:text-5xl font-bold mb-2 text-[#6B1F2E]">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <p className="text-gray-600 font-medium">{stat.label}</p>

                {/* Hover Effect Line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className="text-center mt-16"
        >
          <p className="text-xl text-gray-600 mb-6">Únete a miles de clientes satisfechos</p>
          <button className="neumorphic-button px-8 py-4 rounded-lg text-white font-semibold">
            Comienza Tu Caso Hoy
          </button>
        </div>
      </div>
    </section>
  );
}
