'use client';

import React, { useState, useRef, useEffect } from 'react';

// Bouncing ball component
interface BouncingBallProps {
  className?: string;
  color?: string;
  size?: number;
}

export function BouncingBall({
  className = '',
  color = '#6B1F2E',
  size = 20,
}: BouncingBallProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 2, y: 2 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      
      setPosition(prev => {
        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;
        
        // Bounce off walls
        if (newX <= 0 || newX >= rect.width - size) {
          setVelocity(v => ({ ...v, x: -v.x }));
          newX = Math.max(0, Math.min(rect.width - size, newX));
        }
        
        if (newY <= 0 || newY >= rect.height - size) {
          setVelocity(v => ({ ...v, y: -v.y }));
          newY = Math.max(0, Math.min(rect.height - size, newY));
        }
        
        return { x: newX, y: newY };
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
          }
};
  }, [velocity, size]);

  return (
    <div ref={containerRef} className={`relative w-full h-64 border ${className}`}>
      <div
        className="absolute rounded-full transition-transform"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          left: position.x,
          top: position.y,
        }}
      />
    </div>
  );
}

// Gravity simulation
interface GravitySimulationProps {
  className?: string;
  particleCount?: number;
}

export function GravitySimulation({
  className = '',
  particleCount = 10,
}: GravitySimulationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple gravity particles
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height / 2,
      vx: (Math.random() - 0.5) * 4,
      vy: 0,
      size: Math.random() * 5 + 2,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Apply gravity
        particle.vy += 0.1;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off bottom
        if (particle.y > canvas.height - particle.size) {
          particle.y = canvas.height - particle.size;
          particle.vy *= -0.8; // Energy loss on bounce
        }

        // Wrap around sides
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;

        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={300}
      className={`border ${className}`}
    />
  );
}

// Spring animation
interface SpringAnimationProps {
  trigger: boolean;
  children: React.ReactNode;
  className?: string;
}

export function SpringAnimation({
  trigger,
  children,
  className = '',
}: SpringAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (trigger) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div
      className={`transition-transform duration-300 ${
        isAnimating ? 'animate-bounce scale-110' : 'scale-100'
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Pendulum animation
export function Pendulum({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-32 h-32 ${className}`}>
      <div className="absolute top-0 left-1/2 w-1 h-24 bg-gray-400 origin-top animate-pendulum" />
      <div className="absolute bottom-0 left-1/2 w-6 h-6 bg-[#6B1F2E] rounded-full transform -translate-x-1/2 animate-pendulum" />
    </div>
  );
}

// Elastic collision simulation
export function ElasticCollision({ className = '' }: { className?: string }) {
  const [balls, setBalls] = useState([
    { x: 50, y: 100, vx: 2, vy: 0, radius: 15, color: '#6B1F2E' },
    { x: 250, y: 100, vx: -1, vy: 0, radius: 20, color: '#C9974D' },
  ]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = () => {
      setBalls(prevBalls => {
        const newBalls = [...prevBalls];
        
        // Update positions
        newBalls.forEach(ball => {
          ball.x += ball.vx;
          ball.y += ball.vy;
          
          // Bounce off walls
          if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= 300) {
            ball.vx = -ball.vx;
          }
          if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= 200) {
            ball.vy = -ball.vy;
          }
        });

        // Check collisions between balls
        for (let i = 0; i < newBalls.length; i++) {
          for (let j = i + 1; j < newBalls.length; j++) {
            const ball1 = newBalls[i];
            const ball2 = newBalls[j];
            
            const dx = ball2.x - ball1.x;
            const dy = ball2.y - ball1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < ball1.radius + ball2.radius) {
              // Simple elastic collision
              const temp = ball1.vx;
              ball1.vx = ball2.vx;
              ball2.vx = temp;
            }
          }
        }

        return newBalls;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div ref={containerRef} className={`relative w-80 h-48 border bg-gray-50 ${className}`}>
      {balls.map((ball, index) => (
        <div
          key={index}
          className="absolute rounded-full transition-all duration-75"
          style={{
            width: ball.radius * 2,
            height: ball.radius * 2,
            left: ball.x - ball.radius,
            top: ball.y - ball.radius,
            backgroundColor: ball.color,
          }}
        />
      ))}
    </div>
  );
}
