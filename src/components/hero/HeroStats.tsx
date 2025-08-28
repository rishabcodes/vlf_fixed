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
    // Animate stats on scroll
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              stagger: 0.1,
            });
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

                className="stat-card transform scale-0 opacity-0 text-center">
          <div
                className="text-3xl font-black text-[#C9974D] md:text-4xl">{stat.value}</div>
          <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
