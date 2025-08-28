import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roselyn Torrellas | Vasquez Law Firm',
  description: 'Página en español para roselyn-torrellas',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Roselyn Torrellas"
      description="Esta página necesita ser traducida al español."
    />
  );
}
