import { Metadata } from 'next';
import { AttorneyPageTemplate } from '@/components/attorneys/AttorneyPageTemplate';
import { getAttorneyBySlug } from '@/data/attorneys';
import { notFound } from 'next/navigation';
import { generateAttorneyMetadata } from '@/lib/seo/hreflang-metadata';
import { AttorneyPageHreflang } from '@/components/SEO/DynamicHreflang';

export const metadata: Metadata = generateAttorneyMetadata({
  name: 'Judith Parkes',
  nameEs: 'Judith Parkes',
  title: "Personal Injury and Workers' Compensation Attorney",
  titleEs: 'Abogada de Lesiones Personales y Compensación Laboral',
  description:
    "Judith Parkes is a dedicated personal injury and workers' compensation attorney who fights tirelessly for clients who have been injured due to the negligence of others.",
  descriptionEs:
    'Judith Parkes es una abogada dedicada de lesiones personales y compensación laboral que lucha incansablemente por clientes que han sido lesionados debido a la negligencia de otros.',
  slug: 'judith-parkes',
  photo: '/images/attorneys/judith-parkes.jpg',
  specialties: [
    'personal injury',
    'workers compensation',
    'auto accidents',
    'medical malpractice',
    'Spanish speaking lawyer',
  ],
});

export default function Page() {
  const attorney = getAttorneyBySlug('judith-parkes');

  if (!attorney) {
    notFound();
  }

  return (
    <>
      <AttorneyPageHreflang slug="judith-parkes" />
      <AttorneyPageTemplate attorney={attorney} language="es" />
    </>
  );
}
