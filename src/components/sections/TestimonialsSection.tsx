'use client';

import React, { useState } from 'react';

import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  caseType: string;
  image?: string;
}

// Sample testimonials - in a real app, these would come from a data source
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    role: 'Personal Injury Client',
    content:
      "The Vasquez Law Firm fought tirelessly for my case. They treated me like family and got me the compensation I deserved. I couldn't have asked for better representation.",
    rating: 5,
    caseType: 'Personal Injury',
  },
  {
    id: '2',
    name: 'John Smith',
    role: 'Criminal Defense Client',
    content:
      'When I was facing serious charges, the team at Vasquez Law Firm stood by me every step of the way. Their expertise and dedication made all the difference in my case.',
    rating: 5,
    caseType: 'Criminal Defense',
  },
  {
    id: '3',
    name: 'Ana Garcia',
    role: 'Family Law Client',
    content:
      'Durante mi divorcio, el equipo de Vasquez Law Firm me brindó el apoyo que necesitaba. Son verdaderos profesionales que se preocupan por sus clientes.',
    rating: 5,
    caseType: 'Family Law',
  },
  {
    id: '4',
    name: 'Robert Johnson',
    role: 'Traffic Violation Client',
    content:
      'I thought I had no chance with my traffic case, but Vasquez Law Firm proved me wrong. They saved my license and kept my record clean. Highly recommend!',
    rating: 5,
    caseType: 'Traffic Law',
  },
];

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  showCaseTypes?: boolean;
  maxTestimonials?: number;
}

export function TestimonialsSection({
  title = 'What Our Clients Say',
  subtitle = "Real stories from real people we've helped",
  showCaseTypes = true,
  maxTestimonials,
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const displayTestimonials = maxTestimonials
    ? testimonials.slice(0, maxTestimonials)
    : testimonials;
  const itemsPerPage = 3;
  const totalPages = Math.ceil(displayTestimonials.length / itemsPerPage);

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % totalPages);
  };

  const visibleTestimonials = displayTestimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>

        {/* Testimonials Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}

                className="bg-white rounded-lg shadow-lg p-6 relative"
              >
                {/* Quote Icon */}
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-200 opacity-50" />

                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i}

                className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-6 italic">&quot;{testimonial.content}&quot;</p>

                {/* Author Info */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  {showCaseTypes && (
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-medium text-primary-700 bg-primary-100 rounded-full">
                      {testimonial.caseType}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons - Only show if there are multiple pages */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button onClick={handlePrevious} className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>

              {/* Page Indicators */}
              <div className="flex space-x-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}

                onClick={() => setCurrentIndex(i)}

                className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentIndex ? 'bg-primary-600' : 'bg-gray-300'
                    }` aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>

              <button onClick={handleNext} className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          )}
        </div>

        {/* Trust Indicators */}
        <div
className="mt-12 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">500+</p>
              <p className="text-gray-600">Satisfied Clients</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">4.9/5</p>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">60+</p>
              <p className="text-gray-600">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
}
