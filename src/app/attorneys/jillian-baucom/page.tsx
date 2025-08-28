import { Metadata } from 'next';
import { OptimizedAttorneyTemplate } from '@/components/attorneys/OptimizedAttorneyTemplate';
import { getAttorneyBySlug } from '@/data/attorneys';
import { notFound } from 'next/navigation';
import { generateAttorneyMetadata } from '@/lib/seo/hreflang-metadata';
import { AttorneyPageHreflang } from '@/components/SEO/DynamicHreflang';

export const metadata: Metadata = generateAttorneyMetadata({
  name: 'Jillian Baucom',
  nameEs: 'Jillian Baucom',
  title: 'Immigration Attorney',
  titleEs: 'Abogada de Inmigración',
  description:
    'Jillian Baucom focuses her practice on immigration law, with particular expertise in employment-based immigration and citizenship matters. She guides clients through the complex process of obtaining green cards, work visas, and U.S. citizenship.',
  descriptionEs:
    'Jillian Baucom enfoca su práctica en derecho de inmigración, con experiencia particular en inmigración basada en empleo y asuntos de ciudadanía. Guía a clientes a través del proceso complejo de obtener tarjetas verdes, visas de trabajo y ciudadanía estadounidense.',
  slug: 'jillian-baucom',
  photo: '/images/attorneys/jillian-baucom.jpg',
  specialties: [
    'immigration law',
    'employment-based immigration',
    'citizenship',
    'green cards',
    'naturalization',
    'Spanish speaking lawyer',
  ],
});

export default function Page() {
  const attorney = getAttorneyBySlug('jillian-baucom');

  if (!attorney) {
    notFound();
  }

  return (
    <>
      <AttorneyPageHreflang slug="jillian-baucom" />
      <OptimizedAttorneyTemplate attorney={attorney} language="en" />
    </>
  );
}
