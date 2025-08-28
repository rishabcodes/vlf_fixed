'use client';

import React, { useState, useEffect } from 'react';

import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { getHomepageTestimonials } from '@/data/testimonials';
import { block } from 'million/react';

interface CarouselTestimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  caseType: string;
  language?: 'en' | 'es';
}

// Convert data testimonials to carousel format
const testimonials: CarouselTestimonial[] = getHomepageTestimonials().map(t => ({
  id: t.id,
  name: t.name,
  role: t.service,
  content: t.content,
  rating: t.rating,
  caseType: t.caseType,
  language: t.language,
}));

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]); // eslint-disable-next-line react-hooks/exhaustive-deps
  // handleNext is intentionally omitted to prevent timer reset on every render

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Historias de Éxito</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Miles de clientes confían en nosotros. Estas son sus historias.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div
className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10"
          >
            <div className="p-4 bg-gradient-to-br from-[#C9974D] to-[#D4A574] rounded-full shadow-xl">
              <Quote className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="relative h-[400px] md:h-[300px]">
            <>
              <div
                key={currentIndex}
                className="absolute inset-0"
                style={{
                  opacity: 1,
                  transition: 'opacity 0.2s'
                }}
              >
                <div className="glass-card p-8 md:p-12 rounded-3xl h-full flex flex-col justify-center">
                  {/* Rating */}
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentIndex]?.rating || 0)].map((_, i) => (
                      <div
                        key={i}
                      >
                        <Star className="w-6 h-6 text-[#C9974D] fill-current" />
                      </div>
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-lg md:text-xl text-gray-700 text-center mb-8 italic">
                    &quot;{testimonials[currentIndex]?.content || ''}&quot;
                  </p>

                  {/* Author */}
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-[#6B1F2E] mb-1">
                      {testimonials[currentIndex]?.name || ''}
                    </h4>
                    <p className="text-gray-600 mb-2">{testimonials[currentIndex]?.role || ''}</p>
                    <span className="modern-badge">{testimonials[currentIndex]?.caseType || ''}</span>
                  </div>
                </div>
              </div>
            </>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={handlePrevious} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-[#6B1F2E] group-hover:text-[#C9974D] transition-colors" />
          </button>

          <button
            onClick={handleNext} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-[#6B1F2E] group-hover:text-[#C9974D] transition-colors" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}

                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-gradient-to-r from-[#6B1F2E] to-[#8B2635]'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div
className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '50,000+', label: 'Clientes Felices' },
            { value: '4.9/5', label: 'Calificación' },
            { value: '95%', label: 'Casos Ganados' },
            { value: '24/7', label: 'Disponibilidad' },
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center">
              <div
                className="text-2xl md:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
