import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abogado Lesiones Personales | Vasquez Law Firm',
  description: 'Página en español para abogado-lesiones-personales',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Abogado Lesiones Personales"
      description="Esta página necesita ser traducida al español."
    />
  );
}
