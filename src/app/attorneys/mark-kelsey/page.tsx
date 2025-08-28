import { Metadata } from 'next';
import { OptimizedAttorneyTemplate } from '@/components/attorneys/OptimizedAttorneyTemplate';
import { getAttorneyBySlug } from '@/data/attorneys';
import { notFound } from 'next/navigation';
import { generateAttorneyMetadata } from '@/lib/seo/hreflang-metadata';
import { AttorneyPageHreflang } from '@/components/SEO/DynamicHreflang';

export const metadata: Metadata = generateAttorneyMetadata({
  name: 'Mark Kelsey',
  nameEs: 'Mark Kelsey',
  title: 'Personal Injury and Criminal Defense Attorney',
  titleEs: 'Abogado de Lesiones Personales y Defensa Criminal',
  description:
    "Mark Kelsey brings a unique dual expertise in both personal injury and criminal defense law. He provides skilled representation with a focus on protecting clients' rights.",
  descriptionEs:
    'Mark Kelsey aporta una experiencia dual única tanto en lesiones personales como en defensa criminal. Proporciona representación hábil con un enfoque en proteger los derechos de los clientes.',
  slug: 'mark-kelsey',
  photo: '/images/attorneys/mark-kelsey.jpg',
  specialties: [
    'personal injury',
    'criminal defense',
    'DWI DUI defense',
    'auto accidents',
    'Spanish speaking lawyer',
  ],
});

export default function Page() {
  const attorney = getAttorneyBySlug('mark-kelsey');

  if (!attorney) {
    notFound();
  }

  return (
    <>
      <AttorneyPageHreflang slug="mark-kelsey" />
      <OptimizedAttorneyTemplate attorney={attorney} language="en" />
    </>
  );
}
