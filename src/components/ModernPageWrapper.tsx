'use client';

import React from 'react';

interface ModernPageWrapperProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showHero?: boolean;
  heroBackgroundImage?: string;
}

export const ModernPageWrapper: React.FC<ModernPageWrapperProps> = ({
  children,
  title,
  subtitle,
  showHero = true,
  heroBackgroundImage,
}) => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      {showHero && (title || subtitle) && (
        <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          {/* Background with gradient overlay */}
          <div className="absolute inset-0">
            {heroBackgroundImage ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroBackgroundImage})` }}
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
          </div>

          {/* Animated particles effect */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute h-1 w-1 bg-gold-400/30 rounded-full"
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            {title && (
              <h1
className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4"
              >
                <span className="bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>
            )}
            {subtitle && (
              <p
className="text-lg md:text-xl text-gray-300 font-light"
              >
                {subtitle}
              </p>
            )}
          </div>

          {/* Scroll indicator */}
          <div
className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div
className="w-6 h-10 border-2 border-gold-400/50 rounded-full flex justify-center"
            >
              <div
className="w-1 h-3 bg-gold-400 rounded-full mt-2"
              />
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <div>
        {children}
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-burgundy-700/10 blur-3xl" />
      </div>
    </div>
  );
};

export default ModernPageWrapper;
