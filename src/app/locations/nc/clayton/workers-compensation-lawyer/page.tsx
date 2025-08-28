import { Metadata } from 'next';

import { LocationPageTemplate } from '@/components/locations/LocationPageTemplate';
import {
  ncCities,
  generateLocalMetadata,
  generateLocalBusinessSchema,
  generateReviewSchema,
} from '@/lib/seo/local-seo-generator';
export async function generateMetadata(): Promise<Metadata> {
  return generateLocalMetadata('clayton', "Workers' Compensation");
}
export default function ClaytonWorkersCompensationLawyerPage() {
  const cityData = ncCities['clayton'];
  if (!cityData) {
    return <div>City data not found</div>;
  }
  const schemas = {
    localBusiness: generateLocalBusinessSchema('clayton', "Workers' Compensation"),
    breadcrumbs: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.vasquezlawnc.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Locations',
          item: 'https://www.vasquezlawnc.com/locations',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'North Carolina',
          item: 'https://www.vasquezlawnc.com/locations/nc',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: cityData.city,
          item: `https://www.vasquezlawnc.com/locations/nc/clayton`,
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Workers Compensation Lawyer',
          item: `https://www.vasquezlawnc.com/locations/nc/clayton/workers-compensation-lawyer`,
        },
      ],
    },
    faqs: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `How much does a workers compensation lawyer cost in ${cityData.city}, NC?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `At Vasquez Law Firm, we offer transparent pricing for workers compensation lawyer services in ${cityData.city}. We provide free consultations and flexible payment plans. Many cases are handled on a contingency basis, meaning you pay nothing unless we win.`,
          },
        },
        {
          '@type': 'Question',
          name: `How long does it take to resolve a workers compensation case in ${cityData.county} County?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Case timelines vary depending on complexity. Simple cases may resolve in a few months, while complex matters can take longer. During your free consultation, we'll provide a realistic timeline for your specific situation in ${cityData.city}.`,
          },
        },
        {
          '@type': 'Question',
          name: `Do you speak Spanish at your ${cityData.city} office?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Our entire team is bilingual. We provide full legal services in both English and Spanish, including document translation and interpretation services. "YO PELEO POR TI™" - We fight for you!',
          },
        },
      ],
    },
    reviews: generateReviewSchema('clayton'),
  };
  return <LocationPageTemplate data={cityData} schemas={schemas} />;
}
