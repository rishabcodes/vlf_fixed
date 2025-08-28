import { Metadata } from 'next';
import { AttorneyPageTemplate } from '@/components/attorneys/AttorneyPageTemplate';
import { getAttorneyBySlug } from '@/data/attorneys';
import { notFound } from 'next/navigation';
import { generateAttorneyMetadata } from '@/lib/seo/hreflang-metadata';
import { AttorneyPageHreflang } from '@/components/SEO/DynamicHreflang';

export const metadata: Metadata = generateAttorneyMetadata({
  name: 'Adrianna Ingram',
  nameEs: 'Adrianna Ingram',
  title: 'Criminal Defense and Family Law Attorney',
  titleEs: 'Abogada de Defensa Penal y Derecho de Familia',
  description:
    'Adrianna Ingram brings compassion and tenacity to her dual practice in criminal defense and family law, providing personalized attention and fierce advocacy.',
  descriptionEs:
    'Adrianna Ingram aporta compasión y tenacidad a su práctica dual en defensa penal y derecho familiar, proporcionando atención personalizada y defensa feroz.',
  slug: 'adrianna-ingram',
  photo: '/images/attorneys/adrianna-ingram.jpg',
  specialties: [
    'criminal defense',
    'family law',
    'divorce',
    'child custody',
    'Spanish speaking lawyer',
  ],
});

export default function Page() {
  const attorney = getAttorneyBySlug('adrianna-ingram');

  if (!attorney) {
    notFound();
  }

  return (
    <>
      <AttorneyPageHreflang slug="adrianna-ingram" />
      <AttorneyPageTemplate attorney={attorney} language="es" />
    </>
  );
}
