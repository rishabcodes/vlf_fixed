import { Metadata } from 'next';

import { LocationPageTemplate } from '@/components/locations/LocationPageTemplate';
import {
  ncCities,
  generateLocalMetadata,
  generateLocalBusinessSchema,
  generateReviewSchema,
} from '@/lib/seo/local-seo-generator';
export async function generateMetadata(): Promise<Metadata> {
  return generateLocalMetadata('garner');
}
export default function GarnerPage() {
  const cityData = ncCities['garner'];
  if (!cityData) {
    return <div>City data not found</div>;
  }
  const schemas = {
    localBusiness: generateLocalBusinessSchema('garner'),
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
          item: `https://www.vasquezlawnc.com/locations/nc/garner`,
        },
      ],
    },
    faqs: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `What legal services does Vasquez Law Firm offer in ${cityData.city}, NC?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `We provide comprehensive legal services in ${cityData.city} including immigration law, personal injury, workers compensation, criminal defense, and family law. Our bilingual team serves all of ${cityData.county} County with 24/7 availability.`,
          },
        },
        {
          '@type': 'Question',
          name: `How can I schedule a free consultation in ${cityData.city}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Call us at 1-844-YO-PELEO (1-844-967-3536) for a free consultation. We offer in-person meetings in ${cityData.city}, video consultations, and phone consultations. Hablamos español.`,
          },
        },
        {
          '@type': 'Question',
          name: `What courts does Vasquez Law Firm practice in near ${cityData.city}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `We regularly practice in ${cityData.courtInfo.superior}, ${cityData.courtInfo.district}${cityData.courtInfo.federal ? ', and ' + cityData.courtInfo.federal : ''}. Our attorneys have extensive experience with local judges and procedures.`,
          },
        },
      ],
    },
    reviews: generateReviewSchema('garner'),
  };
  return <LocationPageTemplate data={cityData} schemas={schemas} />;
}
