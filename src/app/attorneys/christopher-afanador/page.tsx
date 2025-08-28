import { Metadata } from 'next';
import { OptimizedAttorneyTemplate } from '@/components/attorneys/OptimizedAttorneyTemplate';
import { getAttorneyBySlug } from '@/data/attorneys';
import { notFound } from 'next/navigation';
import { generateAttorneyMetadata } from '@/lib/seo/hreflang-metadata';
import { AttorneyPageHreflang } from '@/components/SEO/DynamicHreflang';

export const metadata: Metadata = generateAttorneyMetadata({
  name: 'Christopher Afanador',
  nameEs: 'Christopher Afanador',
  title: 'Immigration Attorney',
  titleEs: 'Abogado de Inmigración',
  description:
    'Christopher Afanador focuses on immigration law with particular expertise in business immigration matters. He assists employers and employees with H-1B visas, employment-based green cards, and other work authorization issues.',
  descriptionEs:
    'Christopher Afanador se especializa en derecho de inmigración con experiencia particular en inmigración empresarial. Ayuda a empleadores y empleados con visas H-1B, tarjetas verdes basadas en empleo y otros asuntos de autorización de trabajo.',
  slug: 'christopher-afanador',
  photo: '/images/attorneys/christopher-afanador.jpg',
  specialties: [
    'immigration law',
    'business immigration',
    'H-1B visas',
    'green cards',
    'naturalization',
    'Spanish speaking lawyer',
  ],
});

export default function Page() {
  const attorney = getAttorneyBySlug('christopher-afanador');

  if (!attorney) {
    notFound();
  }

  return (
    <>
      <AttorneyPageHreflang slug="christopher-afanador" />
      <OptimizedAttorneyTemplate attorney={attorney} language="en" />
    </>
  );
}
