import { Metadata } from 'next';

import { LocationPageTemplate } from '@/components/locations/LocationPageTemplate';
import {
  ncCities,
  generateLocalMetadata,
  generateLocalBusinessSchema,
  generateReviewSchema,
} from '@/lib/seo/local-seo-generator';
export async function generateMetadata(): Promise<Metadata> {
  return generateLocalMetadata('apex', 'Car Accident Lawyer');
}
export default function ApexCarAccidentLawyerPage() {
  const cityData = ncCities['apex'];
  if (!cityData) {
    return <div>City data not found</div>;
  }
  const schemas = {
    localBusiness: generateLocalBusinessSchema('apex', 'Car Accident Lawyer'),
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
          item: `https://www.vasquezlawnc.com/locations/nc/apex`,
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Car Accident Lawyer',
          item: `https://www.vasquezlawnc.com/locations/nc/apex/car-accident-lawyer`,
        },
      ],
    },
    faqs: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `How much does a car accident lawyer cost in ${cityData.city}, NC?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `At Vasquez Law Firm, we offer transparent pricing for car accident lawyer services in ${cityData.city}. We provide free consultations and flexible payment plans. Many cases are handled on a contingency basis, meaning you pay nothing unless we win.`,
          },
        },
        {
          '@type': 'Question',
          name: `How long does it take to resolve a car accident case in ${cityData.county} County?`,
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
    reviews: generateReviewSchema('apex'),
  };
  return <LocationPageTemplate data={cityData} schemas={schemas} />;
}
