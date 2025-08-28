'use client';

import React, { useState, useEffect } from 'react';

interface Testimonial {
  text: string;
  author: string;
}

interface HeroTestimonialsProps {
  testimonials: Testimonial[];
}

export default function HeroTestimonials({ testimonials }: HeroTestimonialsProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    
    // Testimonial rotation
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [testimonials.length]);

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonialData = testimonials[currentTestimonial];
  if (!currentTestimonialData) {
    return null;
  }

  return (
    <div
className="absolute bottom-8 left-0 right-0"
    >
      <>
        <div
          key={currentTestimonial}

                className="mx-auto max-w-2xl px-4 text-center"
        >
          <p
                className="italic text-gray-300">
            &quot;{currentTestimonialData.text}&quot;
          </p>
          <p className="mt-2 text-sm text-[#C9974D]">- {currentTestimonialData.author}</p>
        </div>
      </>
    </div>
  );
}
