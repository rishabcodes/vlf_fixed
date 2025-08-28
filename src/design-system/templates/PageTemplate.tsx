'use client';

import React from 'react';

// Removed unused design token imports

interface PageTemplateProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: 'default' | 'wide' | 'narrow';
  showHero?: boolean;
  heroImage?: string;
  heroOverlay?: boolean;
}

export const PageTemplate: React.FC<PageTemplateProps> = ({
  title,
  subtitle,
  children,
  variant = 'default',
  showHero = true,
  heroImage,
  heroOverlay = true,
}) => {
  const getMaxWidth = () => {
    switch (variant) {
      case 'wide':
        return 'max-w-7xl';
      case 'narrow':
        return 'max-w-4xl';
      default:
        return 'max-w-6xl';
    }
  };

  return (
    <>
      {/* Hero Section */}
      {showHero && (
        <section
          className="relative bg-gradient-to-b from-neutral-50 to-white py-16 lg:py-24"
          style={{
            backgroundImage: heroImage ? `url(${heroImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {heroImage && heroOverlay && <div className="absolute inset-0 bg-black/50" />}

          <div className={`relative ${getMaxWidth()} mx-auto px-4 sm:px-6 lg:px-8`}>
              <h1
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
                  heroImage ? 'text-white' : 'text-neutral-900'
                }`}
              >
                {title}
              </h1>
              {subtitle && (
                <p
                  className={`text-lg md:text-xl ${
                    heroImage ? 'text-white/90' : 'text-neutral-600'
                  } max-w-3xl mx-auto`}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className={`${getMaxWidth()} mx-auto px-4 sm:px-6 lg:px-8`}>{children}</div>
      </section>
    </>
  );
};
