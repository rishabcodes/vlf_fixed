import { Metadata } from 'next';
import { AttorneyPageTemplate } from '@/components/attorneys/AttorneyPageTemplate';
import { getAttorneyBySlug } from '@/data/attorneys';
import { notFound } from 'next/navigation';
import { generateAttorneyMetadata } from '@/lib/seo/hreflang-metadata';
import { AttorneyPageHreflang } from '@/components/SEO/DynamicHreflang';

export const metadata: Metadata = generateAttorneyMetadata({
  name: 'Kelly Vega',
  nameEs: 'Kelly Vega',
  title: 'Immigration Attorney',
  titleEs: 'Abogada de Inmigración',
  description:
    'Kelly Vega is a dedicated immigration attorney at Vasquez Law Firm, helping clients navigate complex immigration matters with compassion and expertise.',
  descriptionEs:
    'Kelly Vega es una abogada de inmigración dedicada en Vasquez Law Firm, ayudando a clientes a navegar asuntos migratorios complejos con compasión y experiencia.',
  slug: 'kelly-vega',
  photo: '/images/attorneys/kelly-vega.jpg',
  specialties: [
    'immigration law',
    'deportation defense',
    'family immigration',
    'Spanish speaking lawyer',
  ],
});

export default function Page() {
  const attorney = getAttorneyBySlug('kelly-vega');

  if (!attorney) {
    notFound();
  }

  return (
    <>
      <AttorneyPageHreflang slug="kelly-vega" />
      <AttorneyPageTemplate attorney={attorney} language="es" />
    </>
  );
}
