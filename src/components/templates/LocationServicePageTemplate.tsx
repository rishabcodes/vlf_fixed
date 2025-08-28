'use client';

import React from 'react';
import { Button } from '@/design-system/components/Button';

import { Phone, MapPin, Clock, MessageCircle, CheckCircle } from 'lucide-react';
import {
  generateServiceSchema,
  generateEnhancedBreadcrumbSchema,
} from '@/lib/seo/comprehensive-schema';
import Script from 'next/script';

interface LocationServicePageTemplateProps {
  city: string;
  county: string;
  service: string;
  slug: string;
}

export function LocationServicePageTemplate({
  city,
  county,
  service,
  slug,
}: LocationServicePageTemplateProps) {
  const serviceContent = getServiceContent(service, city);
  
  if (!serviceContent) {
    return null;
  }

  // Generate schemas
  const breadcrumbSchema = generateEnhancedBreadcrumbSchema([
    { name: 'Home', url: 'https://www.vasquezlawnc.com' },
    { name: 'Locations', url: 'https://www.vasquezlawnc.com/locations' },
    {
      name: city,
      url: `https://www.vasquezlawnc.com/locations/nc/${city.toLowerCase().replace(/\s+/g, '-')}`,
    },
    {
      name: service,
      url: `https://www.vasquezlawnc.com/locations/nc/${city.toLowerCase().replace(/\s+/g, '-')}/${slug}`,
    },
  ]);

  const serviceSchema = generateServiceSchema({
    name: `${service} Services in ${city}`,
    description: serviceContent.description,
    provider: 'Vasquez Law Firm, PLLC',
    areaServed: [city, county, 'North Carolina'],
    availableLanguages: ['English', 'Spanish'],
    priceRange: '$$',
    url: `https://www.vasquezlawnc.com/locations/nc/${city.toLowerCase().replace(/\s+/g, '-')}/${slug}`,
    serviceType: service,
  });

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-secondary/10" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-black mb-6 text-white">
                  {city} {service}
                </h1>
                <p className="text-xl md:text-2xl mb-4 font-semibold text-primary">
                  #1 Rated {service} Serving {county} County
                </p>
                <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
                  {serviceContent.heroDescription}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    href="tel:1-844-967-3536"
                    size="lg"
                    className="bg-primary text-black hover:bg-primary-300"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call: 1-844-YO-PELEO
                  </Button>
                  <Button
                    href="/contact"
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Free Case Review
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-16 bg-neutral-950">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Main Content */}
                <div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6">
                      {serviceContent.mainTitle}
                    </h2>
                    <p className="text-gray-300 mb-6">{serviceContent.description}</p>

                    <h3 className="text-2xl font-bold text-primary mb-4">
                      How We Help {city} Residents
                    </h3>
                    <ul className="space-y-3">
                      {serviceContent.services.map((item: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" />
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sidebar */}
                <div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
                    <h3 className="text-2xl font-bold text-white mb-6">Get Help Today</h3>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center text-gray-300">
                        <Phone className="w-5 h-5 text-primary mr-3" />
                        <span>Free Consultation</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Clock className="w-5 h-5 text-primary mr-3" />
                        <span>Available 24/7</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MapPin className="w-5 h-5 text-primary mr-3" />
                        <span>Serving All {county} County</span>
                      </div>
                    </div>
                    <Button
                      href="/contact"
                      className="w-full bg-primary text-black hover:bg-primary-300"
                    >
                      Schedule Free Consultation
                    </Button>
                  </div>

                  <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <h3 className="text-xl font-bold text-primary mb-4">Why Choose Us?</h3>
                    <ul className="space-y-3">
                      {serviceContent.whyChooseUs.map((reason: string, index: number) => (
                        <li key={index} className="text-gray-300">
                          • {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-white mb-12">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6">
                {serviceContent.faqs.map(
                  (faq: { question: string; answer: string }, index: number) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
                    >
                      <h3 className="text-xl font-semibold text-primary mb-3">{faq.question}</h3>
                      <p className="text-gray-300">{faq.answer}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary-300">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-black text-black mb-6">
                Don't Wait - Get Legal Help in {city} Today
              </h2>
              <p className="text-xl text-black/80 mb-8">
                Our experienced {service.toLowerCase()}s are ready to fight for you. Call now for a
                free consultation.
              </p>
              <Button
                href="tel:1-844-967-3536"
                size="lg"
                className="bg-black text-primary hover:bg-gray-900"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now: 1-844-YO-PELEO
              </Button>
            </div>
          </div>
        </section>

        {/* Schemas */}
        <Script
          id={`service-schema-${slug}-${city.toLowerCase()}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [breadcrumbSchema, serviceSchema],
            }),
          }}
        />
      </div>
    </>
  );
}

interface ServiceContentData {
  mainTitle: string;
  heroDescription: string;
  description: string;
  services: string[];
  whyChooseUs: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

// Helper function to get service-specific content
function getServiceContent(service: string, city: string) {
  const contents: Record<string, ServiceContentData> = {
    'Immigration Lawyer': {
      mainTitle: `Experienced Immigration Lawyers in ${city}`,
      heroDescription: `Get expert immigration legal help from North Carolina's most trusted law firm. Green cards, visas, deportation defense, and more.`,
      description: `At Vasquez Law Firm, we understand the challenges facing immigrant families in ${city}. Our bilingual attorneys have helped thousands of clients achieve their American dream through successful immigration cases.`,
      services: [
        'Family-based immigration petitions',
        'Employment-based visas and green cards',
        'Deportation and removal defense',
        'Citizenship and naturalization',
        'DACA applications and renewals',
        'Asylum and refugee protection',
      ],
      whyChooseUs: [
        '60+ years combined experience',
        '98% success rate',
        'Fluent Spanish speakers',
        'Former immigration officers on staff',
        'Same-day consultations available',
        '24/7 emergency support',
      ],
      faqs: [
        {
          question: `How much does an immigration lawyer cost in ${city}?`,
          answer:
            'We offer competitive rates with flexible payment plans. Every case starts with a free consultation to discuss your needs and provide transparent pricing.',
        },
        {
          question: 'Do you handle deportation cases?',
          answer:
            'Yes, we have extensive experience in deportation defense and have successfully helped many clients remain in the United States with their families.',
        },
        {
          question: 'How long do immigration cases take?',
          answer:
            "Processing times vary by case type. During your consultation, we'll provide realistic timelines and keep you updated throughout the process.",
        },
      ],
    },
    'Personal Injury Attorney': {
      mainTitle: `Trusted Personal Injury Attorneys in ${city}`,
      heroDescription: `Injured in an accident? Get the compensation you deserve. No fees unless we win your case. Free consultation available 24/7.`,
      description: `When you're injured due to someone else's negligence, you need an attorney who will fight for maximum compensation. Vasquez Law Firm has recovered millions for ${city} accident victims.`,
      services: [
        'Car, truck, and motorcycle accidents',
        'Slip and fall injuries',
        'Medical malpractice claims',
        'Wrongful death cases',
        'Product liability',
        'Workplace accidents',
      ],
      whyChooseUs: [
        'No win, no fee guarantee',
        '$100+ million recovered',
        'Available 24/7 for emergencies',
        'Direct attorney access',
        'In-house medical experts',
        'Aggressive negotiators',
      ],
      faqs: [
        {
          question: `What's my personal injury case worth in ${city}?`,
          answer:
            'Case values depend on injuries, medical costs, lost wages, and other factors. We offer free case evaluations to assess your potential compensation.',
        },
        {
          question: 'How long do I have to file a claim?',
          answer:
            'North Carolina generally has a 3-year statute of limitations for personal injury, but some cases have shorter deadlines. Contact us immediately to protect your rights.',
        },
        {
          question: 'What if I was partially at fault?',
          answer:
            "North Carolina follows contributory negligence rules. We'll investigate thoroughly to build the strongest possible case for you.",
        },
      ],
    },
    'Workers Compensation Lawyer': {
      mainTitle: `Workers' Compensation Lawyers Serving ${city}`,
      heroDescription: `Injured at work? We'll fight for your benefits. Get medical care, lost wages, and disability compensation you deserve.`,
      description: `Work injuries can devastate families. Vasquez Law Firm helps ${city} workers navigate the complex workers' compensation system to secure maximum benefits.`,
      services: [
        'Workplace injury claims',
        'Denied claims appeals',
        'Disability benefits',
        'Medical treatment authorization',
        'Lost wage recovery',
        'Third-party liability claims',
      ],
      whyChooseUs: [
        'Former insurance adjusters on staff',
        'Direct relationships with doctors',
        'Expedited claim processing',
        'Maximum benefit recovery',
        'No upfront costs',
        'Bilingual support',
      ],
      faqs: [
        {
          question: 'What should I do after a workplace injury?',
          answer:
            'Report the injury immediately, seek medical care, document everything, and contact us for a free consultation to protect your rights.',
        },
        {
          question: 'Can I choose my own doctor?',
          answer:
            "Initially, you must see the employer's approved doctor, but we can help you change doctors and get the treatment you need.",
        },
        {
          question: 'What if my claim was denied?',
          answer:
            "Don't give up. We have a strong track record of overturning denials and securing benefits for injured workers.",
        },
      ],
    },
    'Criminal Defense Attorney': {
      mainTitle: `Aggressive Criminal Defense in ${city}`,
      heroDescription: `Facing criminal charges? Protect your freedom and future with experienced defense attorneys. Available 24/7 for emergencies.`,
      description: `A criminal charge can change your life forever. Vasquez Law Firm provides aggressive defense for ${city} residents, fighting to protect your rights and freedom.`,
      services: [
        'DWI/DUI defense',
        'Drug possession charges',
        'Assault and battery',
        'Theft and property crimes',
        'Federal criminal defense',
        'Traffic violations',
      ],
      whyChooseUs: [
        'Former prosecutors on team',
        '24/7 emergency availability',
        'Aggressive trial attorneys',
        'Proven case dismissals',
        'Flexible payment plans',
        'Confidential consultations',
      ],
      faqs: [
        {
          question: 'Should I talk to police without a lawyer?',
          answer:
            'No. Exercise your right to remain silent and contact us immediately. Anything you say can be used against you.',
        },
        {
          question: 'Can you get my charges dropped?',
          answer:
            "Every case is unique. We'll review evidence, identify weaknesses, and fight for dismissal, reduction, or the best possible outcome.",
        },
        {
          question: 'What about my immigration status?',
          answer:
            'Criminal charges can affect immigration. Our attorneys understand both criminal and immigration law to protect your entire future.',
        },
      ],
    },
    'Car Accident Lawyer': {
      mainTitle: `Car Accident Lawyers Fighting for ${city} Victims`,
      heroDescription: `Injured in a car accident? Get maximum compensation for your injuries. No fees unless we win. Free consultation today.`,
      description: `Car accidents can leave victims with serious injuries and mounting bills. Vasquez Law Firm helps ${city} accident victims recover full compensation from insurance companies.`,
      services: [
        'Car and truck collisions',
        'Rear-end accidents',
        'Drunk driving crashes',
        'Hit and run cases',
        'Uber/Lyft accidents',
        'Uninsured motorist claims',
      ],
      whyChooseUs: [
        'Average settlement $127,000+',
        'Deal directly with insurance',
        'Medical treatment coordination',
        'Property damage help',
        'No recovery, no fee',
        'Bilingual team',
      ],
      faqs: [
        {
          question: 'What should I do after a car accident?',
          answer:
            "Call 911, get medical attention, document the scene, don't admit fault, and contact us before speaking with insurance companies.",
        },
        {
          question: 'How much is my car accident case worth?',
          answer:
            'Values depend on injuries, medical bills, lost wages, and pain/suffering. We offer free evaluations to assess your case.',
        },
        {
          question: 'How long will my case take?',
          answer:
            'Most cases settle in 3-6 months, but serious injuries may take longer. We work efficiently while maximizing your compensation.',
        },
      ],
    },
  };

  return contents[service] || contents['Immigration Lawyer'];
};
