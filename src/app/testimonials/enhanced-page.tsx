import { Metadata } from 'next';
import Image from 'next/image';
import PageLayout from '@/components/Layout/PageLayout';
import Section from '@/components/ui/Section';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Script from 'next/script';
import GoogleReviewsWidget from '@/components/testimonials/GoogleReviewsWidget';
import VideoTestimonials from '@/components/testimonials/VideoTestimonials';
import CaseResults from '@/components/testimonials/CaseResults';
import { TestimonialCarousel } from '@/components/ui/testimonial-carousel';

// Import existing testimonials data
import TestimonialsPage from './page';

export const metadata: Metadata = {
  title: 'Client Testimonials & Reviews | Vasquez Law Firm, PLLC',
  description:
    'Read client testimonials, Google reviews, and case results from Vasquez Law Firm. See why we have a 5-star rating with over 30,000 satisfied clients.',
  alternates: {
    canonical: 'https://www.vasquezlawnc.com/testimonials',
  },
  openGraph: {
    title: 'Client Success Stories | Vasquez Law Firm',
    description:
      '5-star rated law firm. Read real reviews, watch video testimonials, and see our case results.',
    images: ['/images/testimonials-og.jpg'],
  },
};

export default function EnhancedTestimonialsPage() {
  // Schema markup for the page
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Client Testimonials & Reviews',
    description: 'Client testimonials, reviews, and case results for Vasquez Law Firm',
    url: 'https://www.vasquezlawnc.com/testimonials',
    mainEntity: {
      '@type': 'LegalService',
      name: 'Vasquez Law Firm, PLLC',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '287',
        bestRating: '5',
        worstRating: '1',
      },
    },
  };

  return (
    <PageLayout>
      <Script
        id="testimonials-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema),
        }}
      />

      <Section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-brand-charcoal mb-4">
                Client Success Stories
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real stories from real clients. See why thousands trust Vasquez Law Firm with their
                legal needs.
              </p>
            </div>

            {/* Tabs Navigation */}
            <Tabs defaultValue="testimonials" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="testimonials">Client Reviews</TabsTrigger>
                <TabsTrigger value="google">Google Reviews</TabsTrigger>
                <TabsTrigger value="videos">Video Stories</TabsTrigger>
                <TabsTrigger value="results">Case Results</TabsTrigger>
              </TabsList>

              <TabsContent value="testimonials" className="mt-8">
                {/* Use the existing testimonials component */}
                <TestimonialsPage />
              </TabsContent>

              <TabsContent value="google" className="mt-8">
                <GoogleReviewsWidget />
              </TabsContent>

              <TabsContent value="videos" className="mt-8">
                <VideoTestimonials />
              </TabsContent>

              <TabsContent value="results" className="mt-8">
                <CaseResults />
              </TabsContent>
            </Tabs>

            {/* Testimonial Carousel for Homepage */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-center text-brand-charcoal mb-8">
                Featured Testimonials
              </h2>
              <TestimonialCarousel />
            </div>

            {/* Review Platforms */}
            <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-center text-brand-charcoal mb-8">
                Find Us On Review Platforms
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <a
                  href="https://www.google.com/search?q=Vasquez+Law+Firm+PLLC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Image src="/images/google-logo.png" alt="Google" width={120} height={32}

                className="mb-2" />
                  <span className="text-sm text-gray-600">5.0 ⭐ (150+ reviews)</span>
                </a>
                <a
                  href="https://www.yelp.com/biz/vasquez-law-firm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Image src="/images/yelp-logo.png" alt="Yelp" width={80} height={32}

                className="mb-2" />
                  <span className="text-sm text-gray-600">4.9 ⭐ (87 reviews)</span>
                </a>
                <a
                  href="https://www.avvo.com/attorneys/vasquez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Image src="/images/avvo-logo.png" alt="Avvo" width={80} height={32}

                className="mb-2" />
                  <span className="text-sm text-gray-600">10.0 Rating</span>
                </a>
                <a
                  href="https://www.facebook.com/vasquezlawfirm/reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Image src="/images/facebook-logo.png" alt="Facebook" width={32} height={32}

                className="mb-2" />
                  <span className="text-sm text-gray-600">5.0 ⭐ (50+ reviews)</span>
                </a>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 bg-brand-skyblue/10 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-brand-charcoal mb-4">
                Ready to Add Your Success Story?
              </h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Join thousands of satisfied clients who have trusted Vasquez Law Firm. Schedule your
                free consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-block bg-brand-crimson text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-crimson/90 transition-colors"
                >
                  Schedule Free Consultation
                </a>
                <a
                  href="tel:7043580470"
                  className="inline-block bg-white text-brand-charcoal px-8 py-3 rounded-lg font-semibold border-2 border-brand-charcoal hover:bg-gray-50 transition-colors"
                >
                  Call (704) 358-0470
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </PageLayout>
  );
}
