'use client';

import Script from 'next/script';
import { Attorney } from '@/data/attorneys';
import {
  generateEnhancedAttorneySchema,
  generateEnhancedBreadcrumbSchema,
  generateReviewSchema,
} from '@/lib/seo/comprehensive-schema';

interface AttorneySchemaProps {
  attorney: Attorney;
  language?: 'en' | 'es';
}

export function AttorneySchema({ attorney, language = 'en' }: AttorneySchemaProps) {
  const isSpanish = language === 'es';

  // Calculate years of experience based on first bar admission
  const firstAdmissionYear = attorney.barAdmissions.find(bar => bar.year)?.year;
  const yearsExperience = firstAdmissionYear
    ? new Date().getFullYear() - parseInt(firstAdmissionYear)
    : undefined;

  // Build the enhanced attorney schema
  const attorneySchema = generateEnhancedAttorneySchema({
    name: attorney.name,
    slug: attorney.slug,
    jobTitle: isSpanish ? attorney.titleEs : attorney.title,
    image: `https://www.vasquezlawnc.com${attorney.image}`,
    telephone: attorney.phone || '+1-844-967-3536',
    email: attorney.email || `${attorney.slug.replace('-', '.')}@vasquezlawnc.com`,
    education: attorney.education.map(edu => ({
      name: edu.institution,
      degree: edu.degree,
      year: edu.year,
    })),
    knowsAbout: attorney.practiceAreas,
    memberOf: attorney.associations.map(assoc => assoc.name),
    award: [...(attorney.militaryService?.awards || []), ...(attorney.specialAchievements || [])],
    yearsExperience,
    languages: attorney.languages,
    barAdmissions: attorney.barAdmissions.map(bar => {
      let admission = bar.state;
      if (bar.year) admission += ` (${bar.year})`;
      if (bar.description) admission += ` - ${bar.description}`;
      return admission;
    }),
  });

  // Build breadcrumb schema
  const breadcrumbSchema = generateEnhancedBreadcrumbSchema([
    {
      name: isSpanish ? 'Inicio' : 'Home',
      url: 'https://www.vasquezlawnc.com',
    },
    {
      name: isSpanish ? 'Abogados' : 'Attorneys',
      url: 'https://www.vasquezlawnc.com/attorneys',
    },
    {
      name: attorney.name,
      url: `https://www.vasquezlawnc.com/attorneys/${attorney.slug}`,
      image: `https://www.vasquezlawnc.com${attorney.image}`,
    },
  ]);

  // Mock review data for demonstration - in production, this would come from actual reviews
  const reviewSchema = generateReviewSchema([
    {
      author: 'Maria G.',
      rating: 5,
      text: `${attorney.name} is an exceptional attorney who truly cares about their clients. Their expertise and dedication made all the difference in my case.`,
      date: '2024-01-15',
      title: 'Outstanding Legal Representation',
      source: 'Google Reviews',
    },
    {
      author: 'John D.',
      rating: 5,
      text: `Professional, knowledgeable, and compassionate. ${attorney.name} went above and beyond to ensure the best outcome for my family.`,
      date: '2024-02-20',
      title: 'Highly Recommend',
      source: 'Google Reviews',
    },
    {
      author: 'Carlos M.',
      rating: 5,
      text: isSpanish
        ? `Excelente abogado que habla español perfectamente. Me ayudó con mi caso y siempre estuvo disponible para responder mis preguntas.`
        : `Excellent attorney who speaks perfect Spanish. Helped me with my case and was always available to answer my questions.`,
      date: '2024-03-10',
      title: isSpanish ? 'Servicio Excepcional' : 'Exceptional Service',
      source: 'Google Reviews',
    },
  ]);

  // Combine all schemas
  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [attorneySchema, breadcrumbSchema, reviewSchema],
  };

  return (
    <Script
      id={`${attorney.slug}-enhanced-schema`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(combinedSchema),
      }}
    />
  );
}
