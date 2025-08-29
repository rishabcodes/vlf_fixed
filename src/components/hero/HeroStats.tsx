'use client';

import React, { useEffect } from 'react';
// PERFORMANCE: Animation libraries commented out for performance optimization
// 
// import { gsap } from 'gsap';

interface Stat {
  value: string;
  label: string;
}

interface HeroStatsProps {
  stats: Stat[];
}

export default function HeroStats({ stats }: HeroStatsProps) {
  useEffect(() => {
    // Animate stats on scroll using CSS classes
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(stat => observer.observe(stat));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
className="grid grid-cols-2 gap-6 md:grid-cols-4"
    >
      {stats.map((stat, index) => (
        <div key={index}
                className="stat-card text-center opacity-0 transition-all duration-500 ease-out [&.animate-in]:opacity-100 [&.animate-in]:scale-100 scale-95">
          <div
                className="text-3xl font-black text-[#C9974D] md:text-4xl">{stat.value}</div>
          <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
