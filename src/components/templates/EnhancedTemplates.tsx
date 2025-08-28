'use client';

import React from 'react';

import { cn } from '@/lib/utils';

// Template variants for different page types
export const templateVariants = {
  home: {
    hero: 'full-screen gradient-animated transparent-header',
    sections: 'full-width varied-heights maximum-animation',
    colorScheme: 'dark-premium gradient-heavy',
  },
  practiceArea: {
    hero: 'standard-height dark-gradient solid-header',
    sections: 'contained-width consistent-spacing moderate-animation',
    colorScheme: 'dark-professional gold-accents',
  },
  practiceSubpage: {
    hero: 'compact service-focused',
    sections: 'single-column readable-width minimal-animation',
    colorScheme: 'urgency-based', // dark for urgent, light for planning
  },
  blog: {
    hero: 'minimal image-focused',
    sections: 'article-width generous-whitespace no-animation',
    colorScheme: 'light-readable blue-accents',
  },
  about: {
    hero: 'team-focused warm-gradient',
    sections: 'story-sections scroll-triggered',
    colorScheme: 'dark-warm gold-achievements',
  },
  location: {
    hero: 'city-image local-focused',
    sections: 'info-dense map-integrated',
    colorScheme: 'light-approachable primary-accents',
  },
  contact: {
    hero: 'none form-is-hero',
    sections: 'split-screen form-focused',
    colorScheme: 'high-contrast conversion-optimized',
  },
};

// Hero component with page-type variants
export const EnhancedHero: React.FC<{
  variant: keyof typeof templateVariants;
  title: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
}> = ({ variant, title, subtitle, description, children }) => {
  const heroClasses = {
    home: 'min-h-screen relative overflow-hidden',
    practiceArea: 'h-[60vh] min-h-[500px] relative',
    practiceSubpage: 'h-[40vh] min-h-[300px] relative',
    blog: 'py-16 bg-white',
    about: 'h-[50vh] relative bg-gradient-to-br from-neutral-900 to-neutral-800',
    location: 'h-[50vh] relative',
    contact: 'hidden',
  };

  const backgroundEffects = {
    home: (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-burgundy-900/20 to-gold-900/10" />
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />
      </>
    ),
    practiceArea: (
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />
    ),
    practiceSubpage: (
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 to-neutral-800" />
    ),
    blog: null,
    about: (
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-burgundy-950/20 to-neutral-900" />
    ),
    location: <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />,
    contact: null,
  };

  if (variant === 'contact') return null;

  return (
    <section className={cn(heroClasses[variant])}>
      {backgroundEffects[variant]}

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div
className={cn(
              'text-center',
              variant === 'home' && 'max-w-5xl mx-auto',
              variant === 'blog' && 'max-w-3xl mx-auto'
            )}
          >
            <h1
              className={cn(
                'font-black mb-6',
                variant === 'home' && 'text-6xl md:text-7xl text-white',
                variant === 'practiceArea' && 'text-4xl md:text-5xl text-white',
                variant === 'practiceSubpage' && 'text-3xl md:text-4xl text-white',
                variant === 'blog' && 'text-3xl md:text-4xl text-gray-900',
                variant === 'about' && 'text-4xl md:text-5xl text-white',
                variant === 'location' && 'text-3xl md:text-4xl text-gray-900'
              )}
            >
              {title}
            </h1>

            {subtitle && (
              <h2
                className={cn(
                  'text-xl md:text-2xl mb-4',
                  ['home', 'practiceArea', 'practiceSubpage', 'about'].includes(variant)
                    ? 'text-gold-400'
                    : 'text-gray-600'
                )}
              >
                {subtitle}
              </h2>
            )}

            {description && (
              <p
                className={cn(
                  'text-lg max-w-3xl mx-auto',
                  ['home', 'practiceArea', 'practiceSubpage', 'about'].includes(variant)
                    ? 'text-gray-300'
                    : 'text-gray-700'
                )}
              >
                {description}
              </p>
            )}

            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

// Section component with page-type variants
export const EnhancedSection: React.FC<{
  variant: keyof typeof templateVariants;
  className?: string;
  children: React.ReactNode;
}> = ({ variant, className, children }) => {
  const sectionClasses = {
    home: 'py-24 relative overflow-hidden',
    practiceArea: 'py-20',
    practiceSubpage: 'py-16',
    blog: 'py-12',
    about: 'py-20',
    location: 'py-16',
    contact: 'py-20',
  };

  const containerClasses = {
    home: 'max-w-7xl mx-auto px-4',
    practiceArea: 'max-w-7xl mx-auto px-4',
    practiceSubpage: 'max-w-4xl mx-auto px-4',
    blog: 'max-w-3xl mx-auto px-4',
    about: 'max-w-7xl mx-auto px-4',
    location: 'max-w-6xl mx-auto px-4',
    contact: 'max-w-6xl mx-auto px-4',
  };

  return (
    <section className={cn(sectionClasses[variant], className)}>
      <div className={containerClasses[variant]}>{children}</div>
    </section>
  );
};

// CTA component with urgency variants
export const EnhancedCTA: React.FC<{
  variant: 'primary' | 'secondary' | 'emergency' | 'chat';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}> = ({ variant, size = 'md', children, href, onClick, className }) => {
  const baseClasses =
    'font-semibold rounded-full transition-all inline-flex items-center justify-center';

  const variantClasses = {
    primary: 'bg-gold-500 text-black hover:bg-gold-400 hover:scale-105',
    secondary: 'border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black',
    emergency: 'bg-red-600 text-white hover:bg-red-700 animate-pulse',
    chat: 'bg-gold-500 text-black hover:bg-gold-400 fixed bottom-6 right-6 shadow-lg hover:shadow-xl',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      href={href}

                onClick={onClick}

                className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
    >
      {children}
    </Component>
  );
};

// Card component with page-type variants
export const EnhancedCard: React.FC<{
  variant: 'service' | 'team' | 'blog' | 'testimonial' | 'stat';
  className?: string;
  children: React.ReactNode;
}> = ({ variant, className, children }) => {
  const cardClasses = {
    service:
      'bg-white/5 backdrop-blur-sm border border-gold-500/20 rounded-lg p-6 hover:border-gold-500/50 transition-all hover:scale-105',
    team: 'bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all',
    blog: 'bg-white rounded-lg shadow-md hover:shadow-lg transition-all',
    testimonial: 'bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 italic',
    stat: 'bg-gradient-to-br from-gold-500/10 to-gold-500/5 border border-gold-500/20 rounded-lg p-6 text-center',
  };

  return (
    <div
      className={cn(cardClasses[variant], className)}
    >
      {children}
    </div>
  );
};

// Urgency indicator component
export const UrgencyBadge: React.FC<{
  level: 'critical' | 'high' | 'medium' | 'low';
  className?: string;
}> = ({ level, className }) => {
  const badges = {
    critical: {
      bg: 'bg-red-600',
      text: 'URGENT - ACT NOW',
      animate: true,
    },
    high: {
      bg: 'bg-orange-600',
      text: 'TIME SENSITIVE',
      animate: false,
    },
    medium: {
      bg: 'bg-yellow-600',
      text: 'IMPORTANT',
      animate: false,
    },
    low: {
      bg: 'bg-blue-600',
      text: 'INFORMATIONAL',
      animate: false,
    },
  };

  const { bg, text, animate } = badges[level];

  return (
    <span
      className={cn(
        'inline-block px-3 py-1 rounded-full text-xs font-bold text-white',
        bg,
        animate && 'animate-pulse',
        className
      )}
    >
      {text}
    </span>
  );
};

// Stats component with animation
export const AnimatedStats: React.FC<{
  stats: Array<{
    value: string;
    label: string;
    prefix?: string;
    suffix?: string;
  }>;
  variant?: 'dark' | 'light';
}> = ({ stats, variant = 'dark' }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}

                className="text-center"
        >
          <div
            className={cn(
              'text-4xl font-black mb-2',
              variant === 'dark' ? 'text-gold-400' : 'text-gold-600'
            )}
          >
            {stat.prefix}
            <span>
              {stat.value}
            </span>
            {stat.suffix}
          </div>
          <div className={cn('text-sm', variant === 'dark' ? 'text-gray-400' : 'text-gray-600')}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};
