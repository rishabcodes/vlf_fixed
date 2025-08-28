import TestimonialsPageClient from '@/components/testimonials/TestimonialsPageClient';
import VideoTestimonials from '@/components/testimonials/VideoTestimonials';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Testimonials | Vasquez Law Firm - YO PELEO™ POR TI',
  description:
    'Read what our clients say about us. Over 30,000 cases won. Immigration, personal injury, and criminal defense attorneys.',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/testimonials',
    languages: {
      en: '/testimonials',
      es: '/es/testimonios',
    },
  },
};

export default function TestimonialsPage() {
  return (
    <>
      <TestimonialsPageClient language="en" />
      {/* Video Testimonials Section with YouTube videos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <VideoTestimonials />
      </div>
    </>
  );
}