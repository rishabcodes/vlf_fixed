import { UniversalPageTemplate } from '@/components/templates/UniversalPageTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hyde | Vasquez Law Firm',
  description: 'Página en español para hyde',
};

export default function Page() {
  return (
    <UniversalPageTemplate
      title="Hyde"
      description="Esta página necesita ser traducida al español."
    />
  );
}
