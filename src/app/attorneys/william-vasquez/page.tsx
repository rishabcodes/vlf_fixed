import { Metadata } from 'next';
import { OptimizedAttorneyTemplate } from '@/components/attorneys/OptimizedAttorneyTemplate';
import { getAttorneyBySlug } from '@/data/attorneys';
import { notFound } from 'next/navigation';
import { generateAttorneyMetadata } from '@/lib/seo/hreflang-metadata';
import { AttorneyPageHreflang } from '@/components/SEO/DynamicHreflang';

export const metadata: Metadata = generateAttorneyMetadata({
  name: 'William J. Vásquez',
  nameEs: 'William J. Vásquez',
  title: 'Founding Partner | Immigration & Criminal Defense Attorney',
  titleEs: 'Socio Fundador | Abogado de Inmigración y Defensa Criminal',
  description:
    'William J. Vásquez is the founding partner of Vasquez Law Firm. U.S. Air Force veteran with 35+ years of experience in immigration law and criminal defense. YO PELEO POR TI™',
  descriptionEs:
    'William J. Vásquez es el socio fundador de Vasquez Law Firm. Veterano de la Fuerza Aérea de EE.UU. con más de 35 años de experiencia en derecho de inmigración y defensa criminal. YO PELEO POR TI™',
  slug: 'william-vasquez',
  photo: '/images/attorneys/william-vasquez.jpg',
  specialties: [
    'immigration law',
    'criminal defense',
    'veteran attorney',
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
      <OptimizedAttorneyTemplate attorney={attorney} language="en" />
    </>
  );
}
