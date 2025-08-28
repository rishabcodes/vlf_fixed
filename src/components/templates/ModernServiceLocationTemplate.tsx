'use client';

import React, { useState } from 'react';

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Scale,
  CheckCircle,
  Star,
  Users,
  Award,
  Building,
  ChevronDown,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/design-system/Button';
import { Heading, Text } from '@/components/design-system/Typography';

interface ServiceLocationData {
  cityName: string;
  serviceName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;

  localStats: {
    stat1: { value: string; label: string };
    stat2: { value: string; label: string };
    stat3: { value: string; label: string };
    stat4: { value: string; label: string };
  };

  serviceDetails: {
    title: string;
    description: string;
    services: Array<{
      name: string;
      description: string;
      localInfo: string;
    }>;
  };

  localExpertise: {
    title: string;
    points: string[];
  };

  courtInfo?: {
    title: string;
    name: string;
    address: string;
    phone: string;
    hours: string;
    parkingInfo: string;
    additionalInfo: string;
  };

  testimonials: Array<{
    text: string;
    author: string;
    location: string;
    rating: number;
  }>;

  caseResults: string[];

  faqs: Array<{
    question: string;
    answer: string;
  }>;

  officeInfo: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    localPhone?: string;
    email: string;
    hours: {
      weekdays: string;
      saturday: string;
      sunday: string;
    };
  };

  servingAreas: string[];
  mapEmbedUrl?: string;

  whyHireUs?: {
    title: string;
    content: string;
  };

  localChallenges?: {
    title: string;
    content: string;
  };
}

interface ModernServiceLocationTemplateProps {
  data: ServiceLocationData;
  language?: 'en' | 'es';
}

export default function ModernServiceLocationTemplate({
  data,
  language: _language = 'en',
}: ModernServiceLocationTemplateProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black to-secondary/10" />
          <div className="absolute inset-0">
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-[90vh] items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Location Badge */}
              <div
className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/20 px-6 py-3 backdrop-blur-sm"
              >
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold text-primary uppercase tracking-wider">
                  {data.cityName} {data.serviceName} Experts
                </span>
              </div>

              {/* Title */}
              <h1
className="mb-6 text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight"
              >
                {data.heroTitle}
              </h1>

              {/* Trademark Subtitle */}
              <p
className="mb-8 text-3xl sm:text-4xl md:text-5xl font-bold text-primary"
              >
                {data.heroSubtitle}
              </p>

              {/* Description */}
              <p
className="mb-12 max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 leading-relaxed"
              >
                {data.heroDescription}
              </p>

              {/* CTAs */}
              <div
className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button href="/contact" size="lg" className="text-lg px-8 py-4">
                  Get Free Case Evaluation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  href="tel:1-844-967-3536"
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: 1-844-YO-PELEO
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}

                className="absolute h-1 w-1 rounded-full bg-primary/40"
             }}
            />
          ))}
        </div>
      </section>

      {/* Local Stats Section */}
      <section className="relative py-20 bg-gradient-to-b from-black to-neutral-950">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {Object.values(data.localStats).map((stat, index) => (
              <div
                key={index}

                className="text-center"
              >
                <div
                className="text-4xl sm:text-5xl md:text-6xl font-black text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Section */}
      <section className="relative py-20 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4">
          <div
className="text-center mb-16"
          >
            <Heading level={2}

                className="text-white mb-4">
              {data.serviceDetails.title}
            </Heading>
            <Text size="lg" className="text-gray-400 max-w-3xl mx-auto">
              {data.serviceDetails.description}
            </Text>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.serviceDetails.services.map((service, index) => (
              <div
                key={index}

                className="group relative"
              >
                <div className="h-full bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
                    <Scale className="h-7 w-7 text-primary" />
                  </div>
                  <h3
                className="mb-3 text-xl font-bold text-white">{service.name}</h3>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <div className="pt-4 border-t border-primary/10">
                    <p className="text-sm text-primary font-medium">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      {service.localInfo}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Expertise Section */}
      <section className="relative py-20 bg-black">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
             }}
            >
              <Heading level={2}

                className="text-white mb-8">
                {data.localExpertise.title}
              </Heading>
              <div className="space-y-4">
                {data.localExpertise.points.map((point, index) => (
                  <div
                    key={index}

                className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <Text
                className="text-gray-300">{point}</Text>
                  </div>
                ))}
              </div>
            </div>

            {/* Court Info Card */}
            {data.courtInfo && (
              <div
className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm rounded-2xl p-8 border border-primary/20"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
                  <Building className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-6">{data.courtInfo.title}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-primary mb-1">{data.courtInfo.name}</p>
                    <p className="text-gray-400">{data.courtInfo.address}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">
                      <Phone className="inline h-4 w-4 mr-2 text-primary" />
                      {data.courtInfo.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">
                      <Clock className="inline h-4 w-4 mr-2 text-primary" />
                      {data.courtInfo.hours}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-primary/10">
                    <p className="text-sm text-gray-400 italic">{data.courtInfo.additionalInfo}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4">
          <div
className="text-center mb-16"
          >
            <Heading level={2}

                className="text-white mb-4">
              What {data.cityName} Clients Say
            </Heading>
            <Text size="lg" className="text-gray-400">
              Real reviews from real people we've helped
            </Text>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.testimonials.map((testimonial, index) => (
              <div
                key={index}

                className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border border-primary/20"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i}

                className="h-5 w-5 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Results Section */}
      <section className="relative py-20 bg-black">
        <div className="mx-auto max-w-7xl px-4">
          <div
className="text-center mb-16"
          >
            <Heading level={2}

                className="text-white mb-4">
              Recent {data.cityName} Case Results
            </Heading>
            <Text size="lg" className="text-gray-400">
              Fighting and winning for our community
            </Text>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
              <div className="space-y-4">
                {data.caseResults.map((result, index) => (
                  <div
                    key={index}

                className="flex items-start gap-3 pb-4 border-b border-primary/10 last:border-0 last:pb-0"
                  >
                    <Award className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <Text
                className="text-gray-300">{result}</Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="relative py-20 bg-neutral-950">
        <div className="mx-auto max-w-4xl px-4">
          <div
className="text-center mb-16"
          >
            <Heading level={2}

                className="text-white mb-4">
              Frequently Asked Questions
            </Heading>
            <Text size="lg" className="text-gray-400">
              Get answers about {data.serviceName} in {data.cityName}
            </Text>
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq, index) => (
              <div
                key={index}
               }
               }
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}

                className="w-full bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-all text-left"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                    <ChevronDown
                      className={`h-5 w-5 text-primary flex-shrink-0 transition-transform ${
                        openFaqIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  <>
                    {openFaqIndex === index && (
                      <div
className="overflow-hidden"
                      >
                        <p className="text-gray-400 mt-4">{faq.answer}</p>
                      </div>
                    )}
                  </>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hire Us Section */}
      {data.whyHireUs && (
        <section className="relative py-20 bg-black">
          <div className="mx-auto max-w-4xl px-4">
            <div
className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-primary/20"
            >
              <Heading level={2}

                className="text-white mb-6">
                {data.whyHireUs.title}
              </Heading>
              <Text size="lg" className="text-gray-300 leading-relaxed">
                {data.whyHireUs.content}
              </Text>
            </div>
          </div>
        </section>
      )}

      {/* Local Challenges Section */}
      {data.localChallenges && (
        <section className="relative py-20 bg-neutral-950">
          <div className="mx-auto max-w-4xl px-4">
            <div
             }}
            >
              <Heading level={2}

                className="text-white mb-6">
                {data.localChallenges.title}
              </Heading>
              <Text size="lg" className="text-gray-300 leading-relaxed">
                {data.localChallenges.content}
              </Text>
            </div>
          </div>
        </section>
      )}

      {/* Serving Areas Section */}
      <section className="relative py-20 bg-black">
        <div className="mx-auto max-w-7xl px-4">
          <div
className="text-center mb-12"
          >
            <Heading level={2}

                className="text-white mb-4">
              Serving All of Greater {data.cityName}
            </Heading>
            <Text size="lg" className="text-gray-400">
              We proudly serve clients throughout the region
            </Text>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.servingAreas.map((area, index) => (
              <div
                key={index}

                className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-3 border border-primary/20 hover:border-primary/40 transition-all text-center"
              >
                <Text
                className="text-gray-300 font-medium">{area}</Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-20 bg-gradient-to-b from-black to-neutral-950">
        <div className="mx-auto max-w-7xl px-4">
          <div className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-primary/30">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Office Info */}
              <div>
                <Heading level={3}

                className="text-white mb-8">
                  Contact Our {data.officeInfo.name}
                </Heading>
                <div className="space-y-6">
                  <div
className="flex items-start gap-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-lg">{data.officeInfo.name}</p>
                      <p className="text-gray-300">{data.officeInfo.street}</p>
                      <p className="text-gray-300">
                        {data.officeInfo.city}, {data.officeInfo.state} {data.officeInfo.zip}
                      </p>
                    </div>
                  </div>

                  <div
className="flex items-start gap-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-lg">Phone</p>
                      <a
                        href={`tel:${data.officeInfo.phone}`}

                className="text-primary hover:text-primary-400 transition-colors text-xl font-bold"
                      >
                        {data.officeInfo.phone}
                      </a>
                      {data.officeInfo.localPhone && (
                        <p className="text-gray-300 mt-1">
                          Local:{' '}
                          <a
                            href={`tel:${data.officeInfo.localPhone}`}

                className="text-primary hover:text-primary-400"
                          >
                            {data.officeInfo.localPhone}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>

                  <div
className="flex items-start gap-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-lg">Email</p>
                      <a
                        href={`mailto:${data.officeInfo.email}`}

                className="text-primary hover:text-primary-400 transition-colors"
                      >
                        {data.officeInfo.email}
                      </a>
                    </div>
                  </div>

                  <div
className="flex items-start gap-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-lg">Office Hours</p>
                      <p className="text-gray-300">{data.officeInfo.hours.weekdays}</p>
                      <p className="text-gray-300">{data.officeInfo.hours.saturday}</p>
                      <p className="text-gray-300">{data.officeInfo.hours.sunday}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col justify-center text-center lg:text-left">
                <Heading level={3}

                className="text-white mb-4">
                  Ready to Fight for Your Rights?
                </Heading>
                <Text size="lg" className="text-gray-300 mb-8">
                  Don't wait. Every moment counts in {data.serviceName.toLowerCase()} cases.
                  Contact us now for a free consultation.
                </Text>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button href="/contact" size="lg" className="text-lg">
                    Schedule Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    href={`tel:${data.officeInfo.phone}`}
                    variant="outline"
                    size="lg"
                    className="text-lg"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </Button>
                </div>
                <div className="mt-6 flex items-center justify-center lg:justify-start gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <Text className="text-gray-400">Available 24/7 for emergencies</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {data.mapEmbedUrl && (
        <section className="relative py-20 bg-black">
          <div className="mx-auto max-w-7xl px-4">
            <div
className="relative h-[500px] rounded-2xl overflow-hidden border border-primary/20"
            >
              <iframe
                src={data.mapEmbedUrl}
                width="100%"
                height="100%"
               }
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${data.officeInfo.name} Location Map`}
              />
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="relative py-20 bg-gradient-to-t from-black to-neutral-950">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div
           }}
          >
            <Heading level={2}

                className="text-white mb-6">
              Don't Face {data.serviceName} Issues Alone
            </Heading>
            <Text size="xl" className="text-gray-300 mb-8">
              You have rights. We have the experience to protect them.
            </Text>
            <Button href="/contact" size="xl" className="text-xl px-10 py-5">
              Start Your Free Case Evaluation Now
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </div>
    </div>
  );
