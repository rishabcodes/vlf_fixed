import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bladen | Vasquez Law Firm',
  description: 'Página en español para bladen',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Bladen"
      description="Esta página necesita ser traducida al español."
    />
  );
}
