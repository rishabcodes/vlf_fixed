'use client';

import React, { useRef } from 'react';
import { Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function ModernHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}

                className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#6B1F2E] via-[#8B2635] to-[#6B1F2E]"
    >
      {/* Epic Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/20" />
        <div
className="absolute -top-1/2 -right-1/2 w-full h-full"
        >
          <div className="w-full h-full bg-gradient-to-r from-[#C9974D]/10 to-transparent rounded-full blur-3xl" />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Text Content */}
            <div
className="text-white order-2 lg:order-1"
            >
              {/* YO PELEO™ - Epic Typography */}
              <div
className="mb-8"
              >
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-none">
                  <span
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-[#C9974D] to-[#D4A574]"
                  >
                    YO PELEO™
                  </span>
                  <span className="block text-white mt-2">POR TI</span>
                </h1>

                {/* Tagline */}
                <p
                  className="text-xl md:text-2xl text-[#C9974D] font-bold mt-4"
                >
                  I FIGHT FOR YOU
                </p>
              </div>

              {/* Features */}
              <div
                className="space-y-4 mb-8"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#C9974D] rounded-full flex items-center justify-center">
                    <span className="text-2xl">⚔️</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold">60+ Years Fighting</p>
                    <p className="text-sm opacity-80">U.S. Air Force Veteran</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#C9974D] rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold">30,000+ Victories</p>
                    <p className="text-sm opacity-80">Cases Won for Families</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#C9974D] rounded-full flex items-center justify-center">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold">24/7 AI Support</p>
                    <p className="text-sm opacity-80">Instant Help in English & Spanish</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div
className="flex flex-wrap gap-4"
              >
                <Link href="/contact" className="group relative">
                  <div className="absolute inset-0 bg-[#C9974D] rounded-full blur-lg group-hover:blur-xl transition-all duration-300 opacity-70" />
                  <button className="relative px-8 py-4 bg-[#C9974D] text-white font-bold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    <span>FREE CONSULTATION</span>
                  </button>
                </Link>

                <a href="tel:1-844-967-3536" className="group relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
                  <button className="relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/20 transform hover:scale-105 transition-all duration-300 border border-white/30">
                    📞 1-844-YO-PELEO
                  </button>
                </a>
              </div>
            </div>

            {/* Right Side - William's Cutout */}
            <div
className="relative order-1 lg:order-2"
            >
              <div className="relative">
                {/* Glow Effect Behind William */}
                <div
className="absolute inset-0 bg-gradient-to-r from-[#C9974D]/30 to-[#D4A574]/30 blur-3xl"
                />

                {/* William's Cutout Image */}
                <div className="relative z-10">
                  <Image
                    src="/william-vasquez-cutout.png"
                    alt="William Vasquez - YO PELEO POR TI™"
                    width={600}
                    height={800}

                className="w-full h-auto max-w-md mx-auto lg:max-w-full drop-shadow-2xl"
                    priority
                  />

                  {/* Floating Badge */}
                  <div
className="absolute top-10 -right-4 bg-[#C9974D] text-white px-6 py-3 rounded-full shadow-2xl"
                  >
                    <p className="font-bold text-lg">Founding Attorney</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 200" className="w-full h-32 fill-white">
          <path d="M0,100 C320,200 420,0 720,100 C1020,200 1120,0 1440,100 L1440,200 L0,200 Z" />
        </svg>
      </div>
    </div>
  );
};
