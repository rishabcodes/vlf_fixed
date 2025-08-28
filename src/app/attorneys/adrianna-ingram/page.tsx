import { Metadata } from 'next';
import { OptimizedAttorneyTemplate } from '@/components/attorneys/OptimizedAttorneyTemplate';
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
    'Adrianna Ingram brings compassion and tenacity to her dual practice in criminal defense and family law. She provides personalized attention and fierce advocacy for families.',
  descriptionEs:
    'Adrianna Ingram aporta compasión y tenacidad a su práctica dual en defensa penal y derecho familiar. Proporciona atención personalizada y defensa feroz para familias.',
  slug: 'adrianna-ingram',
  photo: '/images/attorneys/adrianna-ingram.jpg',
  specialties: [
    'criminal defense',
    'family law',
    'divorce',
    'child custody',
    'domestic violence',
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
      <OptimizedAttorneyTemplate attorney={attorney} language="en" />
    </>
  );
}
