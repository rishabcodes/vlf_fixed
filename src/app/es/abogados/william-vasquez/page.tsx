import { Metadata } from 'next';
import { AttorneyPageTemplate } from '@/components/attorneys/AttorneyPageTemplate';
import { getAttorneyBySlug } from '@/data/attorneys';
import { notFound } from 'next/navigation';
import { generateAttorneyMetadata } from '@/lib/seo/hreflang-metadata';
import { AttorneyPageHreflang } from '@/components/SEO/DynamicHreflang';

export const metadata: Metadata = generateAttorneyMetadata({
  name: 'William J. Vásquez',
  nameEs: 'William J. Vásquez',
  title: 'Attorney and Founder',
  titleEs: 'Director Ejecutivo y Abogado Principal',
  description:
    'William Vásquez is a native of Queens, NY and a decorated U.S. Air Force veteran. With over a decade of legal experience, he specializes in immigration law and criminal defense.',
  descriptionEs:
    'William Vásquez es nativo de Queens, NY y un veterano condecorado de la Fuerza Aérea de EE.UU. Con más de una década de experiencia legal, se especializa en ley de inmigración y defensa criminal.',
  slug: 'william-vasquez',
  photo: '/images/attorneys/WV-Headshot.JPEG',
  specialties: [
    'immigration law',
    'criminal defense',
    'federal criminal defense',
    'Spanish speaking lawyer',
  ],
});

export default function Page() {
  const attorney = getAttorneyBySlug('william-vasquez');

  if (!attorney) {
    notFound();
  }

  return (
    <>
      <AttorneyPageHreflang slug="william-vasquez" />
      <AttorneyPageTemplate attorney={attorney} language="es" />
    </>
  );
}
