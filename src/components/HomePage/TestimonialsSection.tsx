'use client';

import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { getHomepageTestimonials } from '@/data/testimonials';

interface TestimonialsSectionProps {
  language?: 'en' | 'es';
}

export function TestimonialsSection({}: TestimonialsSectionProps = {}) {
  const testimonials = getHomepageTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];
  
  if (!currentTestimonial || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-mesh-light relative overflow-hidden">
      {/* Enhanced Background Effects with floating orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="gradient-orb-gold w-80 h-80 top-0 left-1/4 animate-float-orb opacity-40" />
        <div className="gradient-orb-burgundy w-72 h-72 bottom-0 right-1/4 animate-float-orb-reverse opacity-30" />
        <div className="gradient-orb-mixed w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
      </div>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-black to-secondary/5" />
        <div
          className="absolute inset-0 animate-pulse"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div
          className="text-center mb-16 animate-fadeIn"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            What Our Clients <span className="text-primary">Say About Us</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real stories from real people. Over 5,000 satisfied clients have trusted us with their
            cases.
          </p>
        </div>

        {/* Testimonials Grid for Desktop */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-12">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}

                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary/30 transition-all animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="h-8 w-8 text-gold-400/30 mb-4" />

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i}

                className="w-5 h-5 text-primary fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-white mb-6 leading-relaxed">"{testimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold mr-3">
                  {testimonial.name?.[0] || 'C'}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.caseType}</p>
                </div>
              </div>

              {/* Location if available */}
              {testimonial.location && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-primary font-semibold text-sm">Location: {testimonial.location}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden">
            <div
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 animate-fadeIn"
            >
              <Quote className="h-8 w-8 text-gold-400/30 mb-4" />

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i}

                className="w-5 h-5 text-primary fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-white mb-6 leading-relaxed">"{currentTestimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold mr-3">
                  {currentTestimonial.name?.[0] || 'C'}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{currentTestimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{currentTestimonial.caseType}</p>
                </div>
              </div>

              {/* Location if available */}
              {currentTestimonial.location && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-primary font-semibold text-sm">Location: {currentTestimonial.location}</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrevious}

              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}

                onClick={() => setCurrentIndex(index)}

                className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-primary w-8' : 'bg-white/30'
                  }`}

                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}

              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Additional Testimonials */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {testimonials.slice(3, 5).map((testimonial, index) => (
            <div
              key={testimonial.id}

                className="bg-gradient-to-br from-burgundy-900/10 to-gold-900/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 animate-slideUp"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <MessageSquare className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-white/90 mb-3 italic">"{testimonial.content}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-gray-400 text-sm">{testimonial.caseType}</p>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i}

                className="w-4 h-4 text-primary fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div
          className="mt-16 animate-fadeIn"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-gray-400 text-sm">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-gray-400 text-sm">Google Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-gray-400 text-sm">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">60+</div>
              <div className="text-black text-sm">Years Experience</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="text-center mt-12 animate-fadeIn"
        >
          <p className="text-lg text-gray-300 mb-6">
            Join thousands of satisfied clients who trusted us with their cases
          </p>
          <button className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary text-black font-bold rounded-full hover:scale-105 transition-transform inline-flex items-center gap-2">
            <span>Get Your Free Consultation</span>
            <span className="text-black/70 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
