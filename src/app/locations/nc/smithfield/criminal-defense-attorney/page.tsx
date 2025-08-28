import { Metadata } from 'next';

import { LocationPageTemplate } from '@/components/locations/LocationPageTemplate';
import {
  ncCities,
  generateLocalMetadata,
  generateLocalBusinessSchema,
  generateReviewSchema,
} from '@/lib/seo/local-seo-generator';
export async function generateMetadata(): Promise<Metadata> {
  return generateLocalMetadata('smithfield', 'Criminal Defense Attorney');
}
export default function SmithfieldCriminalDefenseAttorneyPage() {
  const cityData = ncCities['smithfield'];
  if (!cityData) {
    return <div>City data not found</div>;
  }
  const schemas = {
    localBusiness: generateLocalBusinessSchema('smithfield', 'Criminal Defense Attorney'),
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
          item: `https://www.vasquezlawnc.com/locations/nc/smithfield`,
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Criminal Defense Attorney',
          item: `https://www.vasquezlawnc.com/locations/nc/smithfield/criminal-defense-attorney`,
        },
      ],
    },
    faqs: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `How much does a criminal defense attorney cost in ${cityData.city}, NC?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `At Vasquez Law Firm, we offer transparent pricing for criminal defense attorney services in ${cityData.city}. We provide free consultations and flexible payment plans. Many cases are handled on a contingency basis, meaning you pay nothing unless we win.`,
          },
        },
        {
          '@type': 'Question',
          name: `How long does it take to resolve a criminal defense case in ${cityData.county} County?`,
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
    reviews: generateReviewSchema('smithfield'),
  };
  return <LocationPageTemplate data={cityData} schemas={schemas} />;
}
