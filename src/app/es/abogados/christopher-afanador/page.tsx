import { Metadata } from 'next';
import { AttorneyPageTemplate } from '@/components/attorneys/AttorneyPageTemplate';
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
    'Christopher Afanador focuses on immigration law with particular expertise in business immigration matters, H-1B visas, and employment-based green cards.',
  descriptionEs:
    'Christopher Afanador se enfoca en la ley de inmigración con experiencia particular en asuntos de inmigración empresarial, visas H-1B y tarjetas verdes basadas en empleo.',
  slug: 'christopher-afanador',
  photo: '/images/attorneys/christopher-afanador.jpg',
  specialties: ['immigration law', 'business immigration', 'H-1B visas', 'Spanish speaking lawyer'],
});

export default function Page() {
  const attorney = getAttorneyBySlug('christopher-afanador');

  if (!attorney) {
    notFound();
  }

  return (
    <>
      <AttorneyPageHreflang slug="christopher-afanador" />
      <AttorneyPageTemplate attorney={attorney} language="es" />
    </>
  );
}
