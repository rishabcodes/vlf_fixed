'use client';

import React from 'react';

import { ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonPhone?: string;
  backgroundImage?: string;
  breadcrumbs?: Array<{ label: string; href: string }>;
  compact?: boolean;
}

export function PageHero({
  title,
  subtitle,
  description,
  primaryButtonText = 'Get Free Consultation',
  primaryButtonLink = '/contact',
  secondaryButtonText = 'Call Now: (855) 929-6299',
  secondaryButtonPhone = '8559296299',
  backgroundImage,
  breadcrumbs,
  compact = false,
}: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden ${compact ? 'py-16' : 'py-24'} ${
        backgroundImage ? '' : 'bg-gradient-to-br from-[#6B1F2E] via-[#8B2F3E] to-[#6B1F2E]'
      }`}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/justice-pattern.svg')] opacity-5" />
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <li className="text-white/50">/</li>
                  <li>
                    {index === breadcrumbs.length - 1 ? (
                      <span className="text-white">{crumb.label}</span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                </React.Fragment>
              ))}
            </ol>
          </nav>
        )}

        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Title */}
          <h1
            className={`font-black text-white ${compact ? 'text-4xl md:text-5xl' : 'text-5xl md:text-7xl'} mb-6`}
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p
              className={`font-bold text-[#FFF8E7] ${compact ? 'text-xl' : 'text-2xl md:text-3xl'} mb-4`}
            >
              {subtitle}
            </p>
          )}

          {/* Description */}
          {description && (
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">{description}</p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryButtonLink}>
              <button className="inline-flex items-center gap-2 bg-white text-[#6B1F2E] px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all">
                {primaryButtonText}
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>

            <a
              href={`tel:${secondaryButtonPhone}`}
              className="inline-flex items-center gap-3 border-2 border-white bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg backdrop-blur-sm hover:bg-white hover:text-[#6B1F2E] transition-all"
            >
              <Phone className="w-6 h-6" />
              {secondaryButtonText}
            </a>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
            <p className="text-white font-semibold">24/7 Available</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
            <p className="text-white font-semibold">Free Consultation</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
            <p className="text-white font-semibold">60+ Years Experience</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
            <p className="text-white font-semibold">Se Habla Español</p>
          </div>
        </div>
      </div>
    </section>
  );
}