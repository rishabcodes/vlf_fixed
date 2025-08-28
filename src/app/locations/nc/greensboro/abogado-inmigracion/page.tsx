import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Attorney Inmigracion | Vasquez Law Firm',
  description: 'Página en español para abogado-inmigracion',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Attorney Inmigracion"
      description="Esta página necesita ser traducida al español."
    />
  );
}
