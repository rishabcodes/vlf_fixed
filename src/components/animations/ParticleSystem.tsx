'use client';

import React, { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  id: number;
}

interface ParticleSystemProps {
  particleCount?: number;
  colors?: string[];
  className?: string;
  speed?: number;
  size?: { min: number; max: number };
}

export function ParticleSystem({
  particleCount = 50,
  colors = ['#6B1F2E', '#C9974D', '#FFD700'],
  className = '',
  speed = 1,
  size = { min: 2, max: 8 },
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize particles
    const initParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          life: Math.random() * 100,
          maxLife: 100,
          size: size.min + Math.random() * (size.max - size.min),
          color: colors[Math.floor(Math.random() * colors.length)],
          id: i,
        });
      }
      setParticles(newParticles);
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setParticles(prevParticles => {
        return prevParticles.map(particle => {
          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) {
            particle.vx *= -1;
          }
          if (particle.y < 0 || particle.y > canvas.height) {
            particle.vy *= -1;
          }

          // Keep particles in bounds
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));

          // Update life
          particle.life += 1;
          if (particle.life > particle.maxLife) {
            particle.life = 0;
            particle.x = Math.random() * canvas.width;
            particle.y = Math.random() * canvas.height;
          }

          // Draw particle
          const alpha = 1 - particle.life / particle.maxLife;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          return particle;
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Resize canvas
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [particleCount, colors, speed, size]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
}

// Floating particles background
interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

export function FloatingParticles({
  count = 30,
  className = '',
}: FloatingParticlesProps) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-[#6B1F2E] opacity-20 animate-float"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// Interactive particle explosion
interface ParticleExplosionProps {
  trigger: boolean;
  x?: number;
  y?: number;
  onComplete?: () => void;
}

export function ParticleExplosion({
  trigger,
  x = 50,
  y = 50,
  onComplete,
}: ParticleExplosionProps) {
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsExploding(true);
      const timer = setTimeout(() => {
        setIsExploding(false);
        onComplete?.();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  if (!isExploding) return null;

  const explosionParticles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    angle: (i / 20) * 360,
    distance: Math.random() * 100 + 50,
    size: Math.random() * 6 + 2,
    color: ['#6B1F2E', '#C9974D', '#FFD700', '#FF6B6B'][Math.floor(Math.random() * 4)],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {explosionParticles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-ping"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            transform: `translate(-50%, -50%) rotate(${particle.angle}deg) translateY(-${particle.distance}px)`,
            animationDuration: '1s',
            animationDelay: `${Math.random() * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}

// Export ParticleExplosion as ConfettiExplosion for compatibility
export const ConfettiExplosion = ParticleExplosion;
